import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoMark}>H</span>
        <span className={styles.logoText}>humanize</span>
      </div>
      <a
        href="https://console.openai.com"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        Get API key ↗
      </a>
    </header>
  )
}
