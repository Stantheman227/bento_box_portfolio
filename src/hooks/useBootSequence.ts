import { useState, useEffect, useCallback } from 'react'
import { BOOT_MESSAGES } from '../constants/bootMessages'

export type BootState = 'booting' | 'waiting' | 'ready'

export function useBootSequence() {
  const [state, setState] = useState<BootState>('booting')
  const [visibleLines, setVisibleLines] = useState<string[]>([])

  const dismiss = useCallback(() => {
    if (state === 'waiting') {
      setState('ready')
    }
  }, [state])

  // Print boot messages one by one
  useEffect(() => {
    let lineIndex = 0
    const interval = setInterval(() => {
      if (lineIndex < BOOT_MESSAGES.length) {
        const line = BOOT_MESSAGES[lineIndex]
        lineIndex++
        setVisibleLines(prev => [...prev, line])
      } else {
        clearInterval(interval)
        setState('waiting')
      }
    }, 80)

    return () => clearInterval(interval)
  }, [])

  // Listen for user input to dismiss
  useEffect(() => {
    if (state !== 'waiting') return

    window.addEventListener('keydown', dismiss)
    window.addEventListener('click', dismiss)

    return () => {
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('click', dismiss)
    }
  }, [state, dismiss])

  return { state, visibleLines, dismiss }
}
