const User               = require('../models/User')
const { sendTokenResponse } = require('../utils/jwt')

/**
 * POST /api/auth/signup
 */
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' })
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' })
    }

    const user = await User.create({ name, email, password })
    sendTokenResponse(user, 201, res)
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Your account has been disabled.' })
    }

    sendTokenResponse(user, 200, res)
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/auth/me  (protected)
 */
const getMe = async (req, res) => {
  res.json({ success: true, user: req.user })
}

module.exports = { signup, login, getMe }
