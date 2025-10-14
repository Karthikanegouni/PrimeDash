# PrimeDash - Task Management Platform

**PrimeDash** is a full-stack task management application designed to help users organize, track, and manage their daily tasks efficiently. Built with a modern stack—**React**, **Tailwind CSS**, **Vite** (frontend) and **Node.js**, **Express**, **SQLite** (backend)—PrimeDash features user authentication, CRUD operations for tasks, dashboard analytics, and profile management. The platform prioritizes security, usability, and a responsive user experience.

---

## Deployed Live Link

- ### [https://primedashak.netlify.app](https://primedashak.netlify.app/)

## Features

- **User authentication:** Secure login and registration
- **Task management:** Add, edit, delete, search, and filter tasks
- **Dashboard:** Real-time statistics and analytics
- **Profile management:** Update username and email
- **Protected routes:** Only authenticated users access sensitive pages
- **Responsive UI:** Optimized for desktop and mobile devices
- **User experience:** Empty state indicators, tooltips, and form validation
- **Secure API:** JWT-based authentication and secure cookies 1-day expiry

---

## Tech Stack

| Layer      | Technologies used                                       |
| ---------- | ------------------------------------------------------- |
| Frontend   | React, Tailwind CSS, Vite, Axios, Recharts, Context API |
| Backend    | Node.js, Express, SQLite                                |
| Deployment | render(backend), netlify(frontend)                      |

- Server may take 50 - 60 secs to load as it is free tier

---

## Snapshots of UI

<img src="https://github.com/user-attachments/assets/0833a3a2-6d6e-420c-8d63-0a80274beb55" width="300"/>
<img src="https://github.com/user-attachments/assets/e5f7a84c-c9bd-4d02-82f1-5f5933994812" width="300"/>
<img src="https://github.com/user-attachments/assets/d6376a87-9758-4dab-84fd-a5d8b33ba499" width="300"/>

<img src="https://github.com/user-attachments/assets/64bdee4c-8b12-4a4c-8920-7fafcd8a4d23" width="300"/>
<img src="https://github.com/user-attachments/assets/12f81656-3202-4586-9c00-69d68af354e8" width="300"/>

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
