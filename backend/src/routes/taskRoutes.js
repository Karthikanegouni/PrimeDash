const express = require('express')
const {
  getTasks,
  getTaskStats,
  addTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

// All task routes are protected
router.use(authMiddleware)

router.get('/stats', getTaskStats)
router.get('/', getTasks)
router.post('/', addTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router
