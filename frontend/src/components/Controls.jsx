import React from 'react'
import styles from './Controls.module.css'

const INTENSITIES = [
  { value: 'light',      label: 'Light' },
  { value: 'moderate',   label: 'Moderate' },
  { value: 'aggressive', label: 'Aggressive' },
]

const TONES = [
  { value: 'natural',      label: 'Natural' },
  { value: 'casual',       label: 'Casual' },
  { value: 'professional', label: 'Professional' },
  { value: 'academic',     label: 'Academic' },
]

export default function Controls({ intensity, setIntensity, tone, setTone }) {
  return (
    <div className={styles.bar}>

      <div className={styles.group}>
        <span className={styles.label}>Intensity</span>
        <div className={styles.pills}>
          {INTENSITIES.map(o => (
            <button
              key={o.value}
              className={`${styles.pill} ${intensity === o.value ? styles.active : ''}`}
              onClick={() => setIntensity(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <span className={styles.label}>Tone</span>
        <div className={styles.pills}>
          {TONES.map(o => (
            <button
              key={o.value}
              className={`${styles.pill} ${tone === o.value ? styles.active : ''}`}
              onClick={() => setTone(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
