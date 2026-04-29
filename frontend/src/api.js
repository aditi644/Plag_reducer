import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || '/api'

/**
 * Send text to the backend and get a rewritten version back.
 * @param {string} text - the original text
 * @param {string} intensity - 'light' | 'moderate' | 'aggressive'
 * @param {string} tone - 'natural' | 'casual' | 'professional' | 'academic'
 */
export async function rewriteText(text, intensity = 'moderate', tone = 'natural') {
  const { data } = await axios.post(`${BASE}/rewrite`, { text, intensity, tone })
  return data
}
