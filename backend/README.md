# PrimeDash Backend

## Overview

This backend supports the **PrimeDash** with the following functionalities:

- User **signup, login, and profile management**
- **JWT authentication** for protected routes
- **CRUD operations** for tasks
- SQLite database for simplicity
- Secure password hashing with **bcrypt**
- Modular and scalable structure for future extensions

---

## Tech Stack

- Node.js / Express
- SQLite (`sqlite3`)
- JWT (`jsonwebtoken`)
- Bcrypt (`bcrypt`)
- CORS & body-parser

---

## Features

### Authentication

- User signup (POST /api/auth/signup)
- User login (POST /api/auth/login)
- JWT-based protected routes
- Passwords hashed securely

### User Profile

- Fetch profile (GET /api/users/profile)
- Update profile (PUT /api/users/profile)

### Task Management

- Get all tasks (GET /api/tasks)
- Create task (POST /api/tasks)
- Update task (PUT /api/tasks/:id)
- Delete task (DELETE /api/tasks/:id)
- All task operations are **user-specific**

### Security

- JWT middleware protects sensitive routes
- Input validation and edge-case handling in controllers
- Only authenticated users can access/modify their data

---

## Project Structure

```
backend/
├── src/
│   ├── controllers/       # authController.js, userController.js, taskController.js
│   ├── routes/            # authRoutes.js, userRoutes.js, taskRoutes.js
│   ├── middleware/        # authMiddleware.js, errorMiddleware.js
│   ├── utils/             # jwtUtils.js, errorUtils.js
│   ├── config/            # db.js
│   └── server.js          # Main server entry
├── database/              # SQLite database file (database.sqlite)
├── .env                   # Environment variables
├── package.json           # Node.js dependencies
└── README.md              # Project documentation
```

---

## Setup & Installation

1. Clone the repository:

```bash
git clone <your-repo-link>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in the root:

```bash
PORT=5000
JWT_SECRET=your_super_secret_key_here
```

4. Run the server:

```bash
npm start
```

5. The server will run on `http://localhost:5000`

---

## API Endpoints

### Auth

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | /api/auth/signup | Register a new user |
| POST   | /api/auth/login  | Login and get JWT   |

### User Profile (Protected)

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| GET    | /api/users/profile | Fetch logged-in user profile  |
| PUT    | /api/users/profile | Update logged-in user profile |

### Tasks (Protected)

| Method | Endpoint       | Description               |
| ------ | -------------- | ------------------------- |
| GET    | /api/tasks     | Get all tasks of the user |
| POST   | /api/tasks     | Create a new task         |
| PUT    | /api/tasks/:id | Update a task             |
| DELETE | /api/tasks/:id | Delete a task             |

---

## Testing

- Use the included `api.http` file with VS Code REST Client extension to test all endpoints.
- Make sure to include the JWT token in Authorization header for protected routes in the place of `{{token}}`

Authorization: Bearer {{token}}

---

## Scalability Notes

- Modular structure (controllers, routes, middleware, utils) allows easy feature addition.
- JWT-based auth makes it compatible with microservices.
- SQLite can be replaced with PostgreSQL/MySQL for production or can use Tursor for cloud based Sqlite hosting.
- Error handling middleware ensures consistent API responses.
