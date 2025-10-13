const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const authMiddleware = (req, res, next) => {
  try {
    // Expect header: Authorization: Bearer <token>
    const authHeader = req.headers.authorization
    if (!authHeader)
      return res.status(401).json({ message: 'Authorization header missing' })

    const token = authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Token missing' })

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded // attach user info to request
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = authMiddleware
