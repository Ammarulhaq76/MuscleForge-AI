const express    = require('express')
const router     = express.Router()
const { sendMessage } = require('../controllers/chatController')
const { aiLimiter }   = require('../middleware/rateLimiter')
// const { protect } = require('../middleware/auth')  // ← uncomment to require login

router.post('/message', aiLimiter, /* protect, */ sendMessage)

module.exports = router
