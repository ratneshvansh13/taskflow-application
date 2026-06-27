const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDB } = require('./db');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const morgan = require("morgan");

app.use(morgan("dev"));

// Routes
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start
const start = async () => {
  try {
    await initDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📋 API: http://localhost:${PORT}/api/tasks`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
