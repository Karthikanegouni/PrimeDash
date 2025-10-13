const bcrypt = require('bcrypt')
const db = require('../config/db')
const { generateToken } = require('../utils/jwtUtils')

// Signup
const signup = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' })

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
      function (err) {
        if (err)
          return res.status(400).json({ message: 'Email already exists' })
        const token = generateToken({ id: this.lastID, email })
        res.status(201).json({ token })
      }
    )
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Login
const login = (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' })

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })

    const token = generateToken(user)
    res.json({ token })
  })
}



module.exports = { signup, login }
