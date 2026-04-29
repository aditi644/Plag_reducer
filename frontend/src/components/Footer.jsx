import React from 'react'
import styles from './Footer.module.css'

export default function Footer({ usage }) {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>Built with OpenAI API</span>
      {usage && (
        <span className={styles.text}>
          {(usage.input_tokens ?? usage.prompt_tokens ?? 0) +
           (usage.output_tokens ?? usage.completion_tokens ?? 0)} tokens used
        </span>
      )}
    </footer>
  )
}
