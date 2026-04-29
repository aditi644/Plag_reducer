import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rewriteRouter from './routes/rewrite.js'
import path from 'path'

dotenv.config()

// ── Sanity check: crash early if API key is missing ───────────────────────────
if (!process.env.OPENAI_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY is not set in your .env file.')
  process.exit(1)
}

const app = express()
const _dirname = path.resolve();

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
  })
}

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}))
app.use(express.json({ limit: '100kb' }))

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/rewrite', rewriteRouter)

app.get('/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() })
})

// ── 404 fallback ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' })
})

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`✓ Backend running at http://localhost:${PORT}`)
  console.log(`  POST /rewrite  — rewrite text`)
  console.log(`  GET  /health   — health check`)
})
