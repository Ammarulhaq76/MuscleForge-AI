require('dotenv').config()
const express      = require('express')
const cors         = require('cors')
const helmet       = require('helmet')
const morgan       = require('morgan')
const connectDB    = require('./config/db')
const errorHandler = require('./middleware/errorHandler')
const { apiLimiter } = require('./middleware/rateLimiter')

/* ── Bootstrap DB ─────────────────────────────── */
connectDB()

const app = express()

/* ── Security & Parsing ───────────────────────── */
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

/* ── Logging ──────────────────────────────────── */
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

/* ── Global rate limit ────────────────────────── */
app.use('/api', apiLimiter)

/* ── Routes ───────────────────────────────────── */
app.use('/api/auth',    require('./routes/auth'))
app.use('/api/workout', require('./routes/workout'))
app.use('/api/chat',    require('./routes/chat'))

/* ── Health check ─────────────────────────────── */
app.get('/api/health', (_, res) =>
  res.json({ success: true, status: 'ok', env: process.env.NODE_ENV })
)

/* ── 404 ──────────────────────────────────────── */
app.use((req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` })
)

/* ── Error handler ────────────────────────────── */
app.use(errorHandler)

/* ── Start ────────────────────────────────────── */
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`🚀  Server running on http://localhost:${PORT}  [${process.env.NODE_ENV}]`)
)
