import { useTypingEffect } from '../../hooks/useTypingEffect'
import BlinkingCursor from './BlinkingCursor'

interface TypedTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  showCursor?: boolean
  onComplete?: () => void
}

export default function TypedText({
  text,
  speed = 30,
  delay = 0,
  className = '',
  showCursor = true,
  onComplete,
}: TypedTextProps) {
  const { displayedText, isComplete } = useTypingEffect({ text, speed, delay })

  if (isComplete && onComplete) {
    onComplete()
  }

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && <BlinkingCursor />}
    </span>
  )
}
