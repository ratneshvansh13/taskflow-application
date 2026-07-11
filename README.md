🚀 TaskFlow Application

A cloud-native Task Management Application built and deployed using modern DevOps practices. The application enables users to create, update, organize, and manage daily tasks through an intuitive web interface. It is containerized with Docker, deployed on Kubernetes, and automated using GitHub Actions and ArgoCD.

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
## Demo-Video

<video src="/screenshot/bandicam 2026-06-27 15-07-50-383.mp4" controls width="900"></video>

---

# 👨‍💻 Author

**Ratnesh Vansh Saxena**

**Cloud & DevOps Engineer**

---

⭐ If you found this project useful, please consider giving it a star.

---

![React](https://img.shields.io/badge/React-19-blue?logo=react)

![NodeJS](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)

![Docker](https://img.shields.io/badge/Docker-Containerized-blue?logo=docker)

![Kubernetes](https://img.shields.io/badge/Kubernetes-Deployed-blue?logo=kubernetes)

![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-black?logo=githubactions)

![ArgoCD](https://img.shields.io/badge/CD-ArgoCD-red)

![AWS](https://img.shields.io/badge/AWS-EC2-orange?logo=amazonaws)

![License](https://img.shields.io/badge/License-MIT-green)
