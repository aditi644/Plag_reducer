import React, { useMemo } from 'react'
import styles from './DiffView.module.css'

function computeDiff(original, rewritten) {
  const a = original.trim().split(/\s+/).filter(Boolean).slice(0, 200)
  const b = rewritten.trim().split(/\s+/).filter(Boolean).slice(0, 200)

  // Build LCS table
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1])

  // Traceback
  const lcs = []
  let i = a.length, j = b.length
  while (i > 0 && j > 0) {
    if (a[i-1] === b[j-1]) { lcs.unshift(a[i-1]); i--; j-- }
    else if (dp[i-1][j] > dp[i][j-1]) i--
    else j--
  }

  // Build token list
  const tokens = []
  let ai = 0, bi = 0
  for (const word of lcs) {
    while (ai < a.length && a[ai] !== word) tokens.push({ type: 'del', text: a[ai++] })
    while (bi < b.length && b[bi] !== word) tokens.push({ type: 'ins', text: b[bi++] })
    tokens.push({ type: 'same', text: word })
    ai++; bi++
  }
  while (ai < a.length) tokens.push({ type: 'del', text: a[ai++] })
  while (bi < b.length) tokens.push({ type: 'ins', text: b[bi++] })

  return tokens
}

export default function DiffView({ original, rewritten }) {
  const tokens = useMemo(() => {
    if (!original || !rewritten) return []
    return computeDiff(original, rewritten)
  }, [original, rewritten])

  if (!original || !rewritten) {
    return <p className={styles.empty}>Run a rewrite first to see what changed.</p>
  }

  const added     = tokens.filter(t => t.type === 'ins').length
  const removed   = tokens.filter(t => t.type === 'del').length
  const unchanged = tokens.filter(t => t.type === 'same').length

  return (
    <div className={styles.wrapper}>
      <div className={styles.stats}>
        <span className={styles.ins}>+{added} added</span>
        <span className={styles.del}>−{removed} removed</span>
        <span className={styles.same}>{unchanged} unchanged</span>
      </div>
      <div className={styles.box}>
        {tokens.map((token, idx) => (
          <React.Fragment key={idx}>
            {token.type === 'ins'  && <mark className={styles.markIns}>{token.text}</mark>}
            {token.type === 'del'  && <del  className={styles.markDel}>{token.text}</del>}
            {token.type === 'same' && <span>{token.text}</span>}
            {' '}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
