const db = require('../config/db')

// Get all tasks for the logged-in user
const getTasks = (req, res) => {
  db.all(
    `SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Server error' })

      if (!rows || rows.length === 0) {
        return res.json({ message: 'No tasks found', tasks: [] })
      }

      res.json({ tasks: rows })
    }
  )
}

// Add new task
const addTask = (req, res) => {
  const { title, description } = req.body

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' })
  }

  db.run(
    `INSERT INTO tasks (userId, title, description) VALUES (?, ?, ?)`,
    [req.user.id, title.trim(), description || ''],
    function (err) {
      if (err) return res.status(500).json({ message: 'Server error' })

      res.status(201).json({
        message: 'Task created successfully',
        task: {
          id: this.lastID,
          title: title.trim(),
          description: description || '',
          status: 'pending',
        },
      })
    }
  )
}

// Update existing task
const updateTask = (req, res) => {
  const { id } = req.params
  const { title, description, status } = req.body

  if (!title && !description && !status) {
    return res
      .status(400)
      .json({
        message: 'At least one field (title, description, status) is required',
      })
  }

  // First, check if the task exists and belongs to the user
  db.get(
    `SELECT * FROM tasks WHERE id = ? AND userId = ?`,
    [id, req.user.id],
    (err, task) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      if (!task) return res.status(404).json({ message: 'Task not found' })

      const updatedTitle = title || task.title
      const updatedDescription = description || task.description
      const updatedStatus = status || task.status

      db.run(
        `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND userId = ?`,
        [updatedTitle, updatedDescription, updatedStatus, id, req.user.id],
        function (err) {
          if (err) return res.status(500).json({ message: 'Server error' })
          res.json({
            message: 'Task updated successfully',
            task: {
              id: task.id,
              title: updatedTitle,
              description: updatedDescription,
              status: updatedStatus,
            },
          })
        }
      )
    }
  )
}

// Delete task
const deleteTask = (req, res) => {
  const { id } = req.params

  // Check if task exists and belongs to the user
  db.get(
    `SELECT * FROM tasks WHERE id = ? AND userId = ?`,
    [id, req.user.id],
    (err, task) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      if (!task) return res.status(404).json({ message: 'Task not found' })

      db.run(
        `DELETE FROM tasks WHERE id = ? AND userId = ?`,
        [id, req.user.id],
        function (err) {
          if (err) return res.status(500).json({ message: 'Server error' })
          res.json({ message: 'Task deleted successfully' })
        }
      )
    }
  )
}

module.exports = { getTasks, addTask, updateTask, deleteTask }
