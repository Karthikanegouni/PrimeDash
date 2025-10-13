# PrimeDash Backend - API Documentation

Base URL: `http://localhost:5000/api`

All **protected routes** require JWT token in the header:

Authorization: Bearer `<your_jwt_token>`

---

## Auth Endpoints

### 1. Signup

- **Endpoint:** `/auth/signup`
- **Method:** `POST`
- **Description:** Register a new user
- **Body Parameters (JSON):**
  - `name` (string, required)
  - `email` (string, required, unique)
  - `password` (string, required, min length 6)
- **Responses:**
  - `201 Created` → User created successfully
  - `400 Bad Request` → Missing/invalid fields
  - `409 Conflict` → Email already exists

### 2. Login

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticate user and return JWT
- **Body Parameters (JSON):**
  - `email` (string, required)
  - `password` (string, required)
- **Responses:**
  - `200 OK` → Returns `{ token: "<jwt_token>", user: {id, name, email} }`
  - `400 Bad Request` → Missing fields
  - `401 Unauthorized` → Invalid email or password

---

## User Profile Endpoints (Protected)

### 3. Get Profile

- **Endpoint:** `/users/profile`
- **Method:** `GET`
- **Description:** Fetch details of logged-in user
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK` → Returns user object `{id, name, email}`
  - `401 Unauthorized` → Missing/invalid token

### 4. Update Profile

- **Endpoint:** `/users/profile`
- **Method:** `PUT`
- **Description:** Update logged-in user details
- **Headers:** `Authorization: Bearer <token>`
- **Body Parameters (JSON, optional fields):**
  - `name` (string)
  - `email` (string)
  - `password` (string, min 6 chars)
- **Responses:**
  - `200 OK` → Returns updated user object
  - `400 Bad Request` → No fields provided or invalid data
  - `401 Unauthorized` → Missing/invalid token

---

## Task Endpoints (Protected)

### 5. Get All Tasks

- **Endpoint:** `/tasks`
- **Method:** `GET`
- **Description:** Retrieve all tasks of logged-in user
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK` → Returns `{ tasks: [ {id, title, description, status, userId} ] }`
  - `401 Unauthorized` → Missing/invalid token
  - `200 OK` → If no tasks, `{ message: "No tasks found", tasks: [] }`

### 6. Create Task

- **Endpoint:** `/tasks`
- **Method:** `POST`
- **Description:** Add a new task for the logged-in user
- **Headers:** `Authorization: Bearer <token>`
- **Body Parameters (JSON):**
  - `title` (string, required)
  - `description` (string, optional)
- **Responses:**
  - `201 Created` → Returns created task `{ id, title, description, status }`
  - `400 Bad Request` → Missing title
  - `401 Unauthorized` → Missing/invalid token

### 7. Update Task

- **Endpoint:** `/tasks/:id`
- **Method:** `PUT`
- **Description:** Update a task by ID (must belong to logged-in user)
- **Headers:** `Authorization: Bearer <token>`
- **Body Parameters (JSON, at least one required):**
  - `title` (string)
  - `description` (string)
  - `status` (string: "pending" or "completed")
- **Responses:**
  - `200 OK` → Returns updated task object
  - `400 Bad Request` → No fields provided
  - `404 Not Found` → Task not found or does not belong to user
  - `401 Unauthorized` → Missing/invalid token

### 8. Delete Task

- **Endpoint:** `/tasks/:id`
- **Method:** `DELETE`
- **Description:** Delete a task by ID (must belong to logged-in user)
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK` → `{ message: "Task deleted successfully" }`
  - `404 Not Found` → Task not found or does not belong to user
  - `401 Unauthorized` → Missing/invalid token

---

## Notes

- All responses are in **JSON format**.
- All endpoints with `/users` or `/tasks` are **protected** and require a valid JWT.
- Task `status` can be `"pending"` or `"completed"`.
- Make sure to handle errors gracefully in the frontend when receiving `401` or `404`.
- You can use the included `api.http` or Postman collection for testing.
