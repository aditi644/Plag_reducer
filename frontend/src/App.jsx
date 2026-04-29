import React, { useState } from 'react'
import styles from './App.module.css'
import Header from './components/Header.jsx'
import Controls from './components/Controls.jsx'
import EditorPanel from './components/EditorPanel.jsx'
import DiffView from './components/DiffView.jsx'
import Footer from './components/Footer.jsx'
import { useRewriter } from './hooks/useRewriter.js'

export default function App() {
  const [activeTab, setActiveTab] = useState('editor')

  const {
    inputText, setInputText,
    outputText,
    intensity, setIntensity,
    tone, setTone,
    loading, error, usage,
    rewrite, clear,
    wordCount
  } = useRewriter()

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>

        {/* Hero heading */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Make it <em>human.</em></h1>
          <p className={styles.heroSub}>
            Paste AI-generated text and get a natural, human-sounding rewrite —
            same meaning, zero robot energy.
          </p>
        </div>

        {/* Intensity + tone controls */}
        <Controls
          intensity={intensity} setIntensity={setIntensity}
          tone={tone} setTone={setTone}
        />

        {/* Tab switcher */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tab} ${activeTab === 'editor' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'diff' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('diff')}
            disabled={!outputText}
          >
            Diff view {outputText && <span className={styles.tabDot} />}
          </button>
        </div>

        {/* Main content */}
        {activeTab === 'editor' ? (
          <EditorPanel
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            loading={loading}
            error={error}
            wordCount={wordCount}
            onRewrite={rewrite}
            onClear={clear}
          />
        ) : (
          <DiffView original={inputText} rewritten={outputText} />
        )}

      </main>

      <Footer usage={usage} />
    </div>
  )
}
