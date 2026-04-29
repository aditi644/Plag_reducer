import { Router } from 'express'
import Anthropic from '@anthropic-ai/sdk'
import { buildRewritePrompt } from '../prompts.js'
import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })



const router = Router()
// const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const VALID_INTENSITIES = ['light', 'moderate', 'aggressive']
const VALID_TONES = ['natural', 'casual', 'professional', 'academic']
const MAX_CHARS = 10_000   // ~2,500 words — safe limit for Haiku

/**
 * POST /rewrite
 * Body: { text: string, intensity?: string, tone?: string }
 * Response: { rewritten: string, usage: object }
 */
router.post('/', async (req, res) => {
  const { text, intensity = 'moderate', tone = 'natural' } = req.body

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'text is required and must be a non-empty string.' })
  }

  if (text.length > MAX_CHARS) {
    return res.status(400).json({
      error: `Text too long. Max ${MAX_CHARS} characters (yours: ${text.length}).`
    })
  }

  if (!VALID_INTENSITIES.includes(intensity)) {
    return res.status(400).json({
      error: `Invalid intensity. Must be one of: ${VALID_INTENSITIES.join(', ')}.`
    })
  }

  if (!VALID_TONES.includes(tone)) {
    return res.status(400).json({
      error: `Invalid tone. Must be one of: ${VALID_TONES.join(', ')}.`
    })
  }

  // ── Build prompt ────────────────────────────────────────────────────────────
  const { system, user } = buildRewritePrompt(text, intensity, tone)

  // ── Call Claude ─────────────────────────────────────────────────────────────
  try {
    // const message = await client.messages.create({
    //   model:      'claude-haiku-4-5-20251001',  // fast + cheap, great for rewrites
    //   max_tokens: 2048,
    //   system,
    //   messages: [{ role: 'user', content: user }]
    // })

    // const rewritten = message.content?.[0]?.text?.trim() ?? ''

    // return res.status(200).json({
    //   rewritten,
    //   usage: message.usage   // { input_tokens, output_tokens } — useful for cost tracking
    // })

    const message = await client.chat.completions.create({
      model: 'gpt-4o-mini',   // cheap + fast, great for rewrites
      max_tokens: 2048,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ]
    })

    const rewritten = message.choices?.[0]?.message?.content?.trim() ?? ''

    return res.status(200).json({   // ← this was the missing piece
      rewritten,
      usage: message.usage
    })

  } catch (err) {
    // Anthropic SDK throws structured errors
    console.error('[/rewrite] Anthropic API error:', err.message)

    if (err.status === 401) {
      return res.status(401).json({ error: 'Invalid Anthropic API key.' })
    }
    if (err.status === 429) {
      return res.status(429).json({ error: 'Rate limit hit. Try again in a moment.' })
    }

    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

export default router
