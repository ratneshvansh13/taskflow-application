const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool to manage multiple database connections efficiently
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Root@123',
  database: process.env.DB_NAME || 'taskmanager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Initializes the database by ensuring the DB exists and creating the necessary tables.
 * Includes a retry mechanism to wait for MySQL to be ready.
 */
const initDB = async () => {
  let retries = 15;

  while (retries > 0) {
    try {
      // Temporary pool to create the database if it doesn't exist
      const createDB = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Root@123',
        waitForConnections: true,
        connectionLimit: 2,
      });

      await createDB.query(
        `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'taskmanager'}\``
      );

      await createDB.end();

      // Create the tasks table using the main pool
      await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          status ENUM('todo', 'in_progress', 'done') DEFAULT 'todo',
          priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      console.log("✅ Database and tables initialized");
      return;
    } catch (err) {
      console.log(`Waiting for MySQL... (${15 - retries + 1}/15)`);
      retries--;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  throw new Error("Could not connect to MySQL");
};

module.exports = {
  pool,
  initDB
};
