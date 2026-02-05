import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTypingEffectOptions {
  text: string
  speed?: number
  delay?: number
  startWhenVisible?: boolean
}

export function useTypingEffect({
  text,
  speed = 30,
  delay = 0,
  startWhenVisible = false,
}: UseTypingEffectOptions) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(!startWhenVisible)
  const indexRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const start = useCallback(() => {
    setHasStarted(true)
  }, [])

  useEffect(() => {
    if (!hasStarted) return

    // Clear any previous timers on re-run
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      if (indexRef.current >= text.length) {
        setDisplayedText(text)
        setIsComplete(true)
        return
      }

      intervalRef.current = setInterval(() => {
        if (indexRef.current < text.length) {
          indexRef.current++
          setDisplayedText(text.slice(0, indexRef.current))
        } else {
          setIsComplete(true)
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      }, speed)
    }, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [hasStarted, text, speed, delay])

  return { displayedText, isComplete, start }
}
