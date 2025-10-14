const bcrypt = require('bcrypt')
const db = require('../config/db')
const { generateToken } = require('../utils/jwtUtils')

// Signup
const signup = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message:
        'Please fill out all required fields: name, email, and password.',
    })
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long.',
    })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
      function (err) {
        if (err) {
          // likely email already exists
          return res.status(409).json({
            success: false,
            message: 'This email is already registered. Try logging in.',
          })
        }

        const token = generateToken({ id: this.lastID, email })
        return res.status(201).json({
          success: true,
          message: `Welcome ${name}! Your account has been created successfully.`,
          token,
        })
      }
    )
  } catch (err) {
    return res.status(500).json({
      success: false,
      message:
        'Oops! Something went wrong on our side. Please try again later.',
    })
  }
}

// Login
const login = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password.',
    })
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error occurred. Please try again later.',
      })
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this email. Please sign up first.',
      })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please try again.',
      })
    }

    const token = generateToken(user)
    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}! You have successfully logged in.`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  })
}

module.exports = { signup, login }
