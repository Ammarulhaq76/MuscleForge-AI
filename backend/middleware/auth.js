const jwt  = require('jsonwebtoken')
const User = require('../models/User')

/**
 * protect
 * Verifies the JWT from the Authorization header.
 * Attach to any route that requires authentication.
 *
 * Usage:
 *   router.get('/profile', protect, getProfile)
 */
const protect = async (req, res, next) => {
  try {
    let token
    const auth = req.headers.authorization
    if (auth && auth.startsWith('Bearer ')) {
      token = auth.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated. Please log in.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user    = await User.findById(decoded.id).select('-password')

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User not found or account disabled.' })
    }

    req.user = user
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' })
  }
}

/**
 * adminOnly
 * Must be used after `protect`.
 */
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required.' })
  }
  next()
}

module.exports = { protect, adminOnly }
