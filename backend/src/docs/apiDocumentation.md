# PrimeDash Backend - API Documentation

> **Base URL:** `http://localhost:5000/api`

All **protected routes** require a JWT token in the header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Auth Endpoints

### 1. Signup

- **Endpoint:** `/auth/signup`
- **Method:** `POST`
- **Description:** Register a new user
- **Body (JSON):**
  - `name` (string, required)
  - `email` (string, required, unique)
  - `password` (string, required, min length 6)
- **Responses:**
  - `201 Created`:
    ```
    {
      "success": true,
      "message": "Welcome <name>! Your account has been created successfully.",
      "token": "<jwt_token>"
    }
    ```
  - `400 Bad Request`:
    - Missing fields:
      ```
      {
        "success": false,
        "message": "Please fill out all required fields: name, email, and password."
      }
      ```
    - Password too short:
      ```
      {
        "success": false,
        "message": "Password must be at least 6 characters long."
      }
      ```
  - `409 Conflict`:
    ```
    {
      "success": false,
      "message": "This email is already registered. Try logging in."
    }
    ```

---

### 2. Login

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticate user and return JWT
- **Body (JSON):**
  - `email` (string, required)
  - `password` (string, required)
- **Responses:**
  - `200 OK`:
    ```
    {
      "success": true,
      "message": "Welcome back, <name>! You have successfully logged in.",
      "token": "<jwt_token>",
      "user": { "id": 1, "name": "<name>", "email": "<email>" }
    }
    ```
  - `400 Bad Request`:
    ```
    {
      "success": false,
      "message": "Please provide both email and password."
    }
    ```
  - `401 Unauthorized`:
    - Email not found:
      ```
      {
        "success": false,
        "message": "No account found with this email. Please sign up first."
      }
      ```
    - Incorrect password:
      ```
      {
        "success": false,
        "message": "Incorrect password. Please try again."
      }
      ```

---

## User Profile Endpoints (Protected)

### 3. Get Profile

- **Endpoint:** `/users/profile`
- **Method:** `GET`
- **Description:** Fetch details of the logged-in user
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK`:
    ```
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "totalTasks": 3
    }
    ```
  - `401 Unauthorized`:
    ```
    { "message": "Missing/invalid token" }
    ```
  - `404 Not Found`:
    ```
    { "message": "User not found" }
    ```

---

### 4. Update Profile

- **Endpoint:** `/users/profile`
- **Method:** `PUT`
- **Description:** Update logged-in user details
- **Headers:** `Authorization: Bearer <token>`
- **Body (JSON, any fields):**
  - `name` (string)
  - `email` (string)
  - `password` (string, min 6 chars)
- **Responses:**
  - `200 OK`:
    ```
    { "message": "Profile updated successfully" }
    ```
  - `400 Bad Request`:
    ```
    { "message": "No fields provided or invalid data" }
    ```
  - `401 Unauthorized`:
    ```
    { "message": "Missing/invalid token" }
    ```
  - `404 Not Found`:
    ```
    { "message": "User not found" }
    ```

---

## Task Endpoints (Protected)

> All task endpoints require a valid JWT.

### 5. Get All Tasks

- **Endpoint:** `/tasks`
- **Method:** `GET`
- **Description:** Retrieve all tasks of the logged-in user
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK` (with tasks):
    ```
    { "tasks": [ { "id": 1, "title": "Task1", "description": "", "status": "pending", "userId": 1, ... } ] }
    ```
  - `200 OK` (no tasks):
    ```
    { "message": "No tasks found", "tasks": [] }
    ```
  - `401 Unauthorized`:
    ```
    { "message": "Missing/invalid token" }
    ```

---

### 6. Task Stats

- **Endpoint:** `/tasks/stats`
- **Method:** `GET`
- **Description:** Get a summary of the user's task statistics
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK`:
    ```
    {
      "totalTasks": 5,
      "completedTasks": 2,
      "pendingTasks": 2,
      "inProgressTasks": 1
    }
    ```
  - `401 Unauthorized` or `500 Server Error` as above

---

### 7. Create Task

- **Endpoint:** `/tasks`
- **Method:** `POST`
- **Description:** Add a new task for the logged-in user
- **Headers:** `Authorization: Bearer <token>`
- **Body (JSON):**
  - `title` (string, required)
  - `description` (string, optional)
- **Responses:**
  - `201 Created`:
    ```
    {
      "message": "Task created successfully",
      "task": {
        "id": 42,
        "title": "My Task",
        "description": "desc",
        "status": "pending"
      }
    }
    ```
  - `400 Bad Request`:
    ```
    { "message": "Title is required" }
    ```
  - `401 Unauthorized` as above

---

### 8. Update Task

- **Endpoint:** `/tasks/:id`
- **Method:** `PUT`
- **Description:** Update a task by id (must belong to user)
- **Headers:** `Authorization: Bearer <token>`
- **Body (JSON, at least one):**
  - `title` (string)
  - `description` (string)
  - `status` (string: `"pending"`, `"completed"`, `"in-progress"`)
- **Responses:**
  - `200 OK`:
    ```
    {
      "message": "Task updated successfully",
      "task": {
        "id": 42,
        "title": "Updated Task",
        "description": "desc",
        "status": "completed"
      }
    }
    ```
  - `400 Bad Request`:
    ```
    { "message": "At least one field (title, description, status) is required" }
    ```
  - `404 Not Found`:
    ```
    { "message": "Task not found" }
    ```
  - `401 Unauthorized` as above

---

### 9. Delete Task

- **Endpoint:** `/tasks/:id`
- **Method:** `DELETE`
- **Description:** Delete a task by id (must belong to user)
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK`:
    ```
    { "message": "Task deleted successfully" }
    ```
  - `404 Not Found`:
    ```
    { "message": "Task not found" }
    ```
  - `401 Unauthorized` as above

---

## Notes

- All responses are in **JSON**.
- All `/users` and `/tasks` endpoints are **protected** (JWT required).
- Task `status` can be `"pending"`, `"in-progress"`, or `"completed"`.
- Errors always return a `message` field for frontend use.
- Gracefully handle `401` or `404` errors in your frontend.
- You can test endpoints with `api.http` or a Postman collection.

---
