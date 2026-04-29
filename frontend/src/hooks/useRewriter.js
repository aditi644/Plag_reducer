import { useState, useCallback } from 'react'
import { rewriteText } from '../api.js'

export function useRewriter() {
  const [inputText, setInputText]   = useState('')
  const [outputText, setOutputText] = useState('')
  const [intensity, setIntensity]   = useState('moderate')
  const [tone, setTone]             = useState('natural')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)
  const [usage, setUsage]           = useState(null)

  const rewrite = useCallback(async () => {
    if (!inputText.trim()) return
    setLoading(true)
    setError(null)
    setOutputText('')
    try {
      const result = await rewriteText(inputText, intensity, tone)
      setOutputText(result.rewritten)
      setUsage(result.usage)
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }, [inputText, intensity, tone])

  const clear = useCallback(() => {
    setInputText('')
    setOutputText('')
    setError(null)
    setUsage(null)
  }, [])

  const wordCount = (text) =>
    text.trim() ? text.trim().split(/\s+/).length : 0

  return {
    inputText, setInputText,
    outputText,
    intensity, setIntensity,
    tone, setTone,
    loading, error, usage,
    rewrite, clear,
    wordCount
  }
}
