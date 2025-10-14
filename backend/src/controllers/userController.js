const bcrypt = require('bcrypt')
const db = require('../config/db')

// Get logged-in user's profile
const getProfile = (req, res) => {
  db.get(
    `SELECT id, name, email FROM users WHERE id = ?`,
    [req.user.id],
    (err, user) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      if (!user) return res.status(404).json({ message: 'User not found' })

      // Count total tasks for this user
      db.get(
        `SELECT COUNT(*) as totalTasks FROM tasks WHERE userId = ?`,
        [req.user.id],
        (err2, taskCount) => {
          if (err2) return res.status(500).json({ message: 'Server error' })
          res.json({ 
            id: user.id,
            name: user.name,
            email: user.email,
            totalTasks: taskCount.totalTasks
          })
        }
      )
    }
  )
}

// Update logged-in user's profile
const updateProfile = async (req, res) => {
  const { name, email, password } = req.body

  db.get(
    `SELECT * FROM users WHERE id = ?`,
    [req.user.id],
    async (err, user) => {
      if (err) return res.status(500).json({ message: 'Server error' })
      if (!user) return res.status(404).json({ message: 'User not found' })

      const updatedName = name || user.name
      const updatedEmail = email || user.email
      let updatedPassword = user.password

      if (password) {
        updatedPassword = await bcrypt.hash(password, 10)
      }

      db.run(
        `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`,
        [updatedName, updatedEmail, updatedPassword, req.user.id],
        function (err) {
          if (err) return res.status(500).json({ message: 'Server error' })
          res.json({ message: 'Profile updated successfully' })
        }
      )
    }
  )
}

module.exports = { getProfile, updateProfile }
