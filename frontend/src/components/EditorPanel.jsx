import React from 'react'
import styles from './EditorPanel.module.css'
import { useCopy } from '../hooks/useCopy.js'

export default function EditorPanel({
  inputText, setInputText,
  outputText,
  loading, error,
  wordCount,
  onRewrite, onClear
}) {
  const { copied, copy } = useCopy()

  const inputWords  = wordCount(inputText)
  const outputWords = wordCount(outputText)

  return (
    <div className={styles.grid}>

      {/* ── Left: input ── */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelLabel}>Original</span>
          <span className={styles.wordCount}>{inputWords} words</span>
        </div>

        <textarea
          className={styles.textarea}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Paste your AI-generated text here…"
          spellCheck={false}
        />

        <div className={styles.panelFooter}>
          <button
            className={styles.btnGhost}
            onClick={onClear}
            disabled={!inputText && !outputText}
          >
            Clear
          </button>
          <button
            className={styles.btnPrimary}
            onClick={onRewrite}
            disabled={loading || !inputText.trim()}
          >
            {loading
              ? <span className={styles.loadingRow}><span className={styles.spinner} /> Rewriting…</span>
              : 'Rewrite →'}
          </button>
        </div>
      </div>

      {/* ── Right: output ── */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelLabel}>Rewritten</span>
          {outputText && <span className={styles.wordCount}>{outputWords} words</span>}
        </div>

        <div className={styles.outputBody}>
          {error ? (
            <div className={styles.errorBox}>
              <span className={styles.errorIcon}>!</span>
              <p>{error}</p>
            </div>
          ) : loading ? (
            <div className={styles.shimmerWrap}>
              <div className={`${styles.shimmer} ${styles.long}`}  />
              <div className={`${styles.shimmer} ${styles.med}`}   />
              <div className={`${styles.shimmer} ${styles.long}`}  />
              <div className={`${styles.shimmer} ${styles.short}`} />
              <div className={`${styles.shimmer} ${styles.long}`}  />
              <div className={`${styles.shimmer} ${styles.med}`}   />
            </div>
          ) : outputText ? (
            <p className={styles.outputText}>{outputText}</p>
          ) : (
            <p className={styles.placeholder}>Your rewritten text will appear here…</p>
          )}
        </div>

        {outputText && !loading && (
          <div className={styles.panelFooter}>
            <button className={styles.btnGhost} onClick={() => copy(outputText)}>
              {copied ? '✓ Copied!' : 'Copy text'}
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
