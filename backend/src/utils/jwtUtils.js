const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'
const JWT_EXPIRES_IN = '7d' // token expires in 7 days

// Generate JWT token
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}

module.exports = { generateToken, verifyToken }
