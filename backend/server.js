require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Import routes
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const taskRoutes = require('./src/routes/taskRoutes')

// Import middleware
const errorHandler = require('./src/middleware/errorMiddleware')

// Import DB (creates tables automatically)
const db = require('./src/config/db')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.use('/api/auth', authRoutes) // Public: signup, login
app.use('/api/users', userRoutes) // Protected: profile routes
app.use('/api/tasks', taskRoutes) // Protected: CRUD tasks

// Status check route
app.get('/', (req, res) => {
  res.send('Primetrade DashBoard Backend is running!')
})

// Error handler middleware
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
