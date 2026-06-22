const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'taskmanager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const initDB = async () => {
  let retries = 30;

  while (retries > 0) {
    try {
      const createDB = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        waitForConnections: true,
        connectionLimit: 2,
      });

      await createDB.query(
        `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
      );

      await createDB.end();

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
      console.log(`Waiting for MySQL... (${30 - retries + 1}/30)`);
      retries--;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  throw new Error("Could not connect to MySQL");
};
module.exports = { pool, initDB };
