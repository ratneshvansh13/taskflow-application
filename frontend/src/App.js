import React, { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask, getStats } from './api';
import './App.css';

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = ['todo', 'in_progress', 'done'];

const STATUS_LABELS = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };
const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };

const emptyForm = { title: '', description: '', status: 'todo', priority: 'medium' };

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function TaskForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial || emptyForm);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Title *</label>
        <input
          value={form.title}
          onChange={e => set('title', e.target.value)}
          placeholder="What needs to be done?"
          required
          autoFocus
        />
      </div>
      <div className="field">
        <label>Description</label>
        <textarea
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Add details..."
          rows={3}
        />
      </div>
      <div className="field-row">
        <div className="field">
          <label>Status</label>
          <select value={form.status} onChange={e => set('status', e.target.value)}>
            {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Priority</label>
          <select value={form.priority} onChange={e => set('priority', e.target.value)}>
            {PRIORITIES.map(p => <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>)}
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (initial ? 'Update Task' : 'Add Task')}
        </button>
      </div>
    </form>
  );
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(task.id);
  };

  return (
    <div className={`task-card priority-${task.priority} ${deleting ? 'deleting' : ''}`}>
      <div className="task-card-top">
        <span className={`badge status-${task.status}`}>{STATUS_LABELS[task.status]}</span>
        <span className={`badge priority-badge priority-${task.priority}`}>{PRIORITY_LABELS[task.priority]}</span>
      </div>
      <h3 className="task-title">{task.title}</h3>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-footer">
        <span className="task-date">{new Date(task.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        <div className="task-actions">
          <select
            className="quick-status"
            value={task.status}
            onChange={e => onStatusChange(task.id, e.target.value)}
          >
            {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
          <button className="icon-btn edit-btn" onClick={() => onEdit(task)} title="Edit">✎</button>
          <button className="icon-btn del-btn" onClick={handleDelete} title="Delete">✕</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.search) params.search = filters.search;
      const [taskRes, statsRes] = await Promise.all([getTasks(params), getStats()]);
      setTasks(taskRes.data.data);
      setStats(statsRes.data.data);
    } catch (e) {
      setError('Cannot connect to server. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleCreate = async (form) => {
    setSaving(true);
    try {
      await createTask(form);
      setShowModal(false);
      fetchTasks();
    } catch (e) {
      alert('Error creating task');
    } finally { setSaving(false); }
  };

  const handleUpdate = async (form) => {
    setSaving(true);
    try {
      await updateTask(editTask.id, form);
      setEditTask(null);
      fetchTasks();
    } catch (e) {
      alert('Error updating task');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (e) { alert('Error deleting task'); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTask(id, { status });
      fetchTasks();
    } catch (e) { alert('Error updating status'); }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">◈</span>
            <span className="brand-name">TaskFlow</span>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ New Task</button>
        </div>
      </header>

      {stats && (
        <section className="stats-bar">
          <div className="stat">
            <span className="stat-num">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-num todo-color">{stats.todo}</span>
            <span className="stat-label">To Do</span>
          </div>
          <div className="stat">
            <span className="stat-num prog-color">{stats.in_progress}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat">
            <span className="stat-num done-color">{stats.done}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat">
            <span className="stat-num high-color">{stats.high_priority}</span>
            <span className="stat-label">High Priority</span>
          </div>
        </section>
      )}

      <section className="filters">
        <input
          className="search-input"
          placeholder="🔍 Search tasks..."
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
        />
        <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
        <select value={filters.priority} onChange={e => setFilters(f => ({ ...f, priority: e.target.value }))}>
          <option value="">All Priority</option>
          {PRIORITIES.map(p => <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>)}
        </select>
        {(filters.status || filters.priority || filters.search) &&
          <button className="btn-ghost" onClick={() => setFilters({ status: '', priority: '', search: '' })}>Clear</button>}
      </section>

      <main className="main">
        {error && (
          <div className="error-box">
            <span>⚠ {error}</span>
            <button onClick={fetchTasks}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="loader-wrap">
            <div className="loader"></div>
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◫</div>
            <h3>No tasks yet</h3>
            <p>Create your first task to get started</p>
            <button className="btn-primary" onClick={() => setShowModal(true)}>+ New Task</button>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={setEditTask}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <Modal title="New Task" onClose={() => setShowModal(false)}>
          <TaskForm onSubmit={handleCreate} onCancel={() => setShowModal(false)} loading={saving} />
        </Modal>
      )}

      {editTask && (
        <Modal title="Edit Task" onClose={() => setEditTask(null)}>
          <TaskForm initial={editTask} onSubmit={handleUpdate} onCancel={() => setEditTask(null)} loading={saving} />
        </Modal>
      )}
    </div>
  );
}
