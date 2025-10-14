# PrimeDash - Task Management Platform

**PrimeDash** is a full-stack task management application designed to help users organize, track, and manage their daily tasks efficiently. Built with a modern stack—**React**, **Tailwind CSS**, **Vite** (frontend) and **Node.js**, **Express**, **SQLite** (backend)—PrimeDash features user authentication, CRUD operations for tasks, dashboard analytics, and profile management. The platform prioritizes security, usability, and a responsive user experience.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Key Components](#key-components)
- [Context and Routing](#context-and-routing)
- [Deployment](#deployment)
- [Notes](#notes)

---

## Features

- **User authentication:** Secure login and registration
- **Task management:** Add, edit, delete, search, and filter tasks
- **Dashboard:** Real-time statistics and analytics
- **Profile management:** Update username and email
- **Protected routes:** Only authenticated users access sensitive pages
- **Responsive UI:** Optimized for desktop and mobile devices
- **User experience:** Empty state indicators, tooltips, and form validation
- **Secure API:** JWT-based authentication and secure cookies

---

## Tech Stack

| Layer    | Technologies used                          |
| -------- | ------------------------------------------ |
| Frontend | React, Tailwind CSS, Vite, Axios, Recharts |
| Backend  | Node.js, Express, SQLite                   |

---

## Project Structure

```

PrimeDash/
├── backend/
│ ├── server.js
| ├── src/
│ |   ├── config/
│ |   ├── controllers/
| |   ├── database/
│ |   |   └── database.sqlite
| |   ├── docs/
│ |   ├── middleware/
│ |   ├── routes/
| |   ├── utils/
│ ├── package.json
│ └── .env
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ ├── README.md
│ └── .env
├── README.md (this file)
└── ...

```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

---

### Backend Setup

1. **Navigate to backend directory:**

   ```
   cd backend
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env` and set required variables (see [Environment Variables](#environment-variables)).

4. **Start backend server:**
   ```
   npm start
   ```
   The backend will run at `http://localhost:5000` (or your configured PORT).

---

### Frontend Setup

1. **Navigate to frontend directory:**

   ```
   cd frontend
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env` and set API URL (see [Environment Variables](#environment-variables)).

4. **Start frontend development server:**
   ```
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

---

## Available Scripts

| Directory | Command         | Description              |
| --------- | --------------- | ------------------------ |
| frontend  | npm run dev     | Start Vite dev server    |
| frontend  | npm run build   | Build for production     |
| frontend  | npm run preview | Preview production build |
| frontend  | npm run lint    | Lint frontend code       |
| backend   | npm start       | Start Node.js backend    |

---

## Environment Variables

- Frontend (`frontend/.env`):

```bash
VITE_API_URL=http://localhost:5000/api
```

- Backend (`backend/.env`):

```bash
PORT=5000
JWT_SECRET=your_jwt_secret
```

Adjust settings as needed for your environment.

---

## Key Components

### Frontend

- **AddTaskForm / AddTaskPopup:** Add new tasks via forms and popup modals
- **EditTaskForm / EditTaskPopup:** Edit existing tasks
- **TasksTable:** Display all tasks with actions and status filters
- **Dashboard / StatsCard:** Overview of task statistics
- **LoginForm / SignupForm:** Authentication
- **UpdateProfileForm:** Edit user details
- **EmptyView / Navbar / UserCard:** General UI/UX enhancements
- **ProtectedRoute:** Restrict access to authenticated users

### Backend

- **Routes:** Auth, tasks, user profile CRUD, dashboard stats
- **Models:** SQLite ORM models for users and tasks
- **Controllers:** Business logic for each route (tasks, users, stats)
- **Middleware:** JWT authentication, error handling, validation

---

## Routing

- **Routing:**
  - Public: `/login`, `/register`
  - Protected: `/`, `/profile`, `/tasks`
  - Fallback: `/not-found`

---

## Notes

- Authentication tokens are stored as secure cookies (`jwt_token`)
- All forms include validation and error messages
- Task table supports searching, filtering by status, and UX tooltips
- The interface is built for mobile-first responsiveness
- SQLite database is used for fast, simple deployment, but can be swapped for other DBs
- Backend and frontend are fully decoupled via REST API

---

## License

MIT

```


```
