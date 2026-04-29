// ─── Intensity instructions ───────────────────────────────────────────────────
const INTENSITY = {
  light: `Make minimal changes. Only fix obvious AI-style phrasing like overused
transitions and filler words. Keep the original sentence structure intact.`,

  moderate: `Rework the text at a sentence level. Change phrasing, vary sentence
length, and remove AI patterns — but keep the same paragraph structure and
overall flow.`,

  aggressive: `Fully rewrite the text. Change sentence structure significantly,
vary rhythm, use contractions and natural transitions. The result should sound
like a confident human writer, not an AI paraphraser.`
}

// ─── Tone instructions ────────────────────────────────────────────────────────
const TONE = {
  natural:      `Use a natural, balanced tone — like a thoughtful person writing clearly.`,
  casual:       `Use a relaxed, conversational tone. Contractions are fine. Keep it light.`,
  professional: `Use a polished, professional tone suitable for business or workplace writing.`,
  academic:     `Use a formal academic tone with precise vocabulary. Avoid contractions.`
}

// ─── Banned AI phrases ────────────────────────────────────────────────────────
const BANNED_PHRASES = [
  'In conclusion',
  'It is important to note',
  'It is worth noting',
  'Delve into',
  'In today\'s world',
  'In today\'s fast-paced world',
  'It goes without saying',
  'At the end of the day',
  'Furthermore',
  'Moreover',
  'Nevertheless',
  'In summary',
  'To summarize',
  'As an AI language model',
  'Certainly',
  'Absolutely',
  'Of course',
]

// ─── Main prompt builder ──────────────────────────────────────────────────────
/**
 * Build the system + user prompt for the rewrite task.
 * @param {string} text       - The original text to rewrite
 * @param {string} intensity  - 'light' | 'moderate' | 'aggressive'
 * @param {string} tone       - 'natural' | 'casual' | 'professional' | 'academic'
 * @returns {{ system: string, user: string }}
 */
export function buildRewritePrompt(text, intensity = 'moderate', tone = 'natural') {
  const intensityInstruction = INTENSITY[intensity] ?? INTENSITY.moderate
  const toneInstruction      = TONE[tone]           ?? TONE.natural
  const bannedList           = BANNED_PHRASES.map(p => `  - "${p}"`).join('\n')

  const system = `You are a human writing editor. Your job is to rewrite text so it
sounds naturally human-written — not AI-generated.

Rules you must follow:
1. ${intensityInstruction}
2. ${toneInstruction}
3. Never use these phrases (they are AI clichés):
${bannedList}
4. Prefer active voice over passive voice.
5. Vary sentence length — mix short punchy sentences with longer ones.
6. Preserve all original meaning and factual information. Do not add new facts.
7. Do not add any commentary, explanation, or preamble about your edits.
8. Return ONLY the rewritten text — nothing else.`

  const user = `Rewrite the following text:\n\n${text}`

  return { system, user }
}
