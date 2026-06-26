🚀 TaskFlow Application

A cloud-native Task Management Application built with the MERN Stack and deployed using modern DevOps practices. The application enables users to create, update, organize, and manage daily tasks through an intuitive web interface. It is containerized with Docker, deployed on Kubernetes, and automated using GitHub Actions and ArgoCD.

---

📖 Overview

TaskFlow is a full-stack task management application that demonstrates modern software development and DevOps workflows.

The project follows a production-style architecture with:

Responsive React frontend
RESTful Node.js & Express backend
MySQL database
Docker containerization
Kubernetes orchestration
GitHub Actions CI/CD
ArgoCD GitOps deployment
AWS EC2 hosting

---
```
🏗 Architecture
                GitHub
                   │
                   ▼
          GitHub Actions CI/CD
                   │
                   ▼
             Docker Hub Registry
                   │
                   ▼
               ArgoCD (GitOps)
                   │
                   ▼
             Kubernetes Cluster
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
     React Frontend     Node.js Backend
                               │
                               ▼
                            MySQL

```

---

## ✨ Features

* ✅ Create tasks
* ✏️ Update existing tasks
* ❌ Delete tasks
* 📋 View all tasks
* 🔍 Search tasks
* 📂 Filter by status
* 📅 Due date management
* 📱 Responsive user interface
* 🔄 REST API integration
* 🐳 Containerized application
* ☸ Kubernetes deployment
* 🚀 Automated CI/CD pipeline

---

---

# 📂 Project Structure

```
taskflow-application/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── db/
│   ├── Dockerfile
│   └── package.json
│
├── kubernetes/
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── mysql-deployment.yaml
│   └── services.yaml
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── docker-compose.yml
├── README.md
└── LICENSE
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/taskflow-application.git

cd taskflow-application
```

---

# ⚙ Backend Setup

```bash
cd backend

npm install

npm start
```

Backend runs on

```
http://localhost:5000
```

---

# ⚙ Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs on

```
http://localhost:3000
```

---

# 🐳 Docker Deployment

Build containers

```bash
docker compose build
```

Run containers

```bash
docker compose up -d
```

Stop containers

```bash
docker compose down
```

---

# ☸ Kubernetes Deployment

Apply manifests

```bash
kubectl apply -f kubernetes/
```

Check resources

```bash
kubectl get all
```

---

# 🔄 CI/CD Pipeline

Every push to the **main** branch automatically triggers the GitHub Actions workflow.

Pipeline stages:

1. Checkout source code
2. Install dependencies
3. Build application
4. Build Docker images
5. Push images to Docker Hub
6. Update Kubernetes manifests
7. ArgoCD synchronizes the application
8. Deploy latest version

---

# 🔐 Environment Variables

Backend `.env`

```env
PORT=5000

DB_HOST=mysql

DB_USER=root

DB_PASSWORD=yourpassword

DB_NAME=taskflow

CLIENT_URL=http://localhost:3000
```

---

# 📸 Application Screens

You can add screenshots here.

```
screenshots/
├── dashboard.png
├── add-task.png
├── edit-task.png
└── mobile-view.png
```

---

# 📈 Future Improvements

* User Authentication
* JWT Authorization
* Role-Based Access Control
* Task Categories
* Email Notifications
* File Attachments
* Dark Mode
* Activity Logs
* Task Analytics
* Redis Caching

---

# 🧪 API Endpoints

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | `/api/tasks`     | Get all tasks  |
| GET    | `/api/tasks/:id` | Get task by ID |
| POST   | `/api/tasks`     | Create task    |
| PUT    | `/api/tasks/:id` | Update task    |
| DELETE | `/api/tasks/:id` | Delete task    |

---

# 📊 DevOps Highlights

* Dockerized frontend and backend
* Multi-container architecture
* GitHub Actions CI/CD
* Docker Hub integration
* Kubernetes deployment
* ArgoCD GitOps
* AWS EC2 hosting
* Infrastructure ready for production

---

# 📚 Learning Outcomes

This project demonstrates:

* Full Stack MERN Development
* REST API Design
* Docker Containerization
* Kubernetes Deployments
* GitHub Actions Automation
* GitOps with ArgoCD
* CI/CD Best Practices
* Cloud Deployment on AWS

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ratnesh Vansh Saxena**

**Cloud & DevOps Engineer**

---

⭐ If you found this project useful, please consider giving it a star.

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
