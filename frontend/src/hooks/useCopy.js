import { useState, useCallback } from 'react'

export function useCopy() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available - silent fail
    }
  }, [])

  return { copied, copy }
}
