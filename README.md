# TaskFlow — React + Node.js + MySQL

A full-stack Task Manager with full CRUD, filtering, priority, and status tracking.

---

## Requirements

| Tool | Version | Install |
|------|---------|---------|
| Node.js | v18+ | https://nodejs.org |
| npm | v9+ | (comes with Node) |
| MySQL | v8+ | https://dev.mysql.com/downloads/ |

---

## Project Structure

```
taskapp/
├── backend/
│   ├── routes/
│   │   └── tasks.js       # CRUD API routes
│   ├── db.js              # MySQL connection + init
│   ├── server.js          # Express app entry
│   ├── .env               # Environment config
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   ├── api.js         # Axios API calls
│   │   └── index.js       # React entry
│   └── package.json
└── README.md
```

---

## Setup & Run

### Step 1 — Start MySQL
Make sure MySQL is running on your machine:
```bash
# macOS (Homebrew)
brew services start mysql

# Ubuntu/Debian
sudo systemctl start mysql

# Windows — start from Services or MySQL Workbench
```

### Step 2 — Configure Backend
Edit `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=taskmanager
PORT=5000
```

### Step 3 — Install & Start Backend
```bash
cd backend
npm install
npm start
```
You should see:
```
✅ Database and tables initialized
🚀 Server running at http://localhost:5000
```

### Step 4 — Install & Start Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm start
```
Browser opens at **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (supports `?status=`, `?priority=`, `?search=`) |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/meta/stats` | Get dashboard stats |
| GET | `/api/health` | Health check |

### Example: Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My Task", "description": "Details here", "priority": "high", "status": "todo"}'
```

---

## Database Schema

```sql
CREATE TABLE tasks (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  status      ENUM('todo', 'in_progress', 'done') DEFAULT 'todo',
  priority    ENUM('low', 'medium', 'high')       DEFAULT 'medium',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
The database and table are **auto-created** on first server start.

---

## Features

- Create, Read, Update, Delete tasks
- Filter by status and priority
- Live search
- Quick status change from card
- Dashboard stats (total, todo, in progress, done, high priority)
- Responsive design (mobile-friendly)

---

## Troubleshooting

**"Cannot connect to server"**
- Make sure the backend is running: `cd backend && npm start`
- Check MySQL is running and credentials in `.env` are correct

**MySQL auth error**
```sql
-- Run in MySQL console:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

**Port conflicts**
- Backend default: 5000 → change `PORT` in `.env`
- Frontend default: 3000 → set `PORT=3001` before `npm start`
