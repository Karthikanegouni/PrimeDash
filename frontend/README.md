# PrimeDash Frontend

**PrimeDash Frontend** is the user interface for a modern task management system, built with **React**, **Tailwind CSS**, and **Vite**. It delivers user authentication, full task CRUD, profile management, and dashboard statistics in a responsive, production-ready SPA.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)
- [Components Overview](#components-overview)
- [Context](#context)
- [Routing](#routing)
- [Notes](#notes)

---

## Features

- **User authentication:** Login & Register
- **Dashboard:** View task statistics at a glance
- **Task management:**
  - Add, edit, and delete tasks
  - Search and filter tasks by status
- **Profile management:** Update username/email
- **Protected routes:** Only authenticated users access sensitive pages
- **Responsive UI:** Built with Tailwind CSS for all devices
- **User experience:** Empty state views, tooltips, and validated forms throughout

---

## Project Structure

```
├── package.json
├── package-lock.json
├── public
│   ├── assets
│   │   ├── avatar1.png
│   │   ├── avatar2.png
│   │   ├── avatar3.png
│   │   ├── avatar4.png
│   │   ├── avatar5.png
│   │   └── notasks.svg
│   └── vite.svg
├── README.md
├── .env
├── src
│   ├── App.jsx
│   ├── components
│   │   ├── AddTaskForm.jsx
│   │   ├── AddTaskPopup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditTaskForm.jsx
│   │   ├── EditTaskPopup.jsx
│   │   ├── EmptyView.jsx
│   │   ├── LoginForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── SignupForm.jsx
│   │   ├── StatsCard.jsx
│   │   ├── TasksTable.jsx
│   │   ├── UpdateProfileForm.jsx
│   │   └── UserCard.jsx
│   ├── context
│   │   └── UserContext.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   └── Tasks.jsx
│   └── utils
│       └── ProtectedRoute.jsx
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Backend API server running at `http://localhost:5000`

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Karthikanegouni/PrimeDash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a .env file at the root of the project with:**

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

   - This environment variable is used by Axios to point to the backend API.

4. **Start the development server:**

```bash
npm run dev
```

5. **Open in your browser:**
   ```bash
   http://localhost:5173
   ```

---

## Available Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| npm run dev     | Start Vite development server |
| npm run build   | Build production bundle       |
| npm run preview | Preview production build      |
| npm run lint    | Run ESLint checks             |

---

## Dependencies

### Runtime

- **react** & **react-dom** – Frontend framework
- **react-router-dom** – SPA routing
- **axios** – HTTP client
- **js-cookie** – Cookie handling
- **react-icons** – UI icons
- **reactjs-popup** – Modal popups
- **tailwindcss** – UI styling
- **recharts** – Data visualization for dashboard
- **dotenv**

### Development

- **vite** – Build tool

---

## Environment Variables

Create a `.env` file for environment configuration. For example:

```
VITE_API_URL=http://localhost:5000/api
```

---

## Components Overview

- **AddTaskForm** – New task entry form
- **AddTaskPopup** – Modal for adding tasks
- **EditTaskForm** – Edit existing tasks
- **EditTaskPopup** – Modal for editing tasks
- **TasksTable** – Main table: all tasks, actions, status
- **Dashboard** – User dashboard, stats summary
- **StatsCard** – Individual dashboard stat
- **LoginForm** / **SignupForm** – Authentication forms
- **UpdateProfileForm** – User profile update form
- **EmptyView** – Placeholder for no tasks
- **Navbar** – Responsive navigation bar
- **UserCard** – User info display

---

## Context

**UserContext** handles:

- `username`, `email`, `stats`, `userAvatar`
- Update functions: `updateUsername`, `updateEmail`, `updateStats`, `updateUserAvatar`

**Usage Example:**

```
import useUser from '../context/UserContext'

const { username, updateUsername } = useUser()
```

---

## Routing

- **Public routes:** `/login`, `/register`
- **Protected routes:** `/`, `/profile`, `/tasks`
  - Require user authentication (cookie-based)
- **404:** `/not-found` – Catches all invalid routes

---

## Notes

- Authentication uses cookies (`jwt_token`) for secure API headers.
- The task table offers search, filter, and tooltips on action buttons.
- Fully responsive: works on desktop, mobile, and tablets.
- All forms provide clear validation, error, and success feedback.
- Environment variable: VITE_API_URL in .env should point to backend API.
