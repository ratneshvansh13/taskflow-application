const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];

    if (status) { query += ' AND status = ?'; params.push(status); }
    if (priority) { query += ' AND priority = ?'; params.push(priority); }
    if (search) { query += ' AND (title LIKE ? OR description LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }

    query += ' ORDER BY created_at DESC';
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET stats — must be before /:id
router.get('/meta/stats', async (req, res) => {
  try {
    const [stats] = await pool.query(`
  SELECT 
    COUNT(*) as total,
    SUM(status = 'todo') as todo,
    SUM(status = 'in_progress') as \`in_progress\`,
    SUM(status = 'done') as done,
    SUM(priority = 'high') as \`high_priority\`
  FROM tasks
`);
    res.json({ success: true, data: stats[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single task
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create task
router.post('/', async (req, res) => {
  try {
    const { title, description, status = 'todo', priority = 'medium' } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, priority) VALUES (?, ?, ?, ?)',
      [title, description || '', status, priority]
    );
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: rows[0], message: 'Task created' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const [existing] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (!existing.length) return res.status(404).json({ success: false, message: 'Task not found' });

    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ? WHERE id = ?',
      [
        title || existing[0].title,
        description ?? existing[0].description,
        status || existing[0].status,
        priority || existing[0].priority,
        req.params.id
      ]
    );
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: rows[0], message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
