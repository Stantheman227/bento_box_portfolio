import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBootSequence } from '../../hooks/useBootSequence'
import BlinkingCursor from '../terminal/BlinkingCursor'

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const { state, visibleLines } = useBootSequence()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state === 'ready') {
      onComplete()
    }
  }, [state, onComplete])

  // Auto-scroll to bottom as new lines appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleLines])

  return (
    <AnimatePresence>
      {state !== 'ready' && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col"
        >
          <div
            ref={scrollRef}
            className="flex-1 overflow-auto p-4 md:p-8 font-mono text-xs md:text-sm"
          >
            {visibleLines.map((line, i) => {
              const text = line ?? ''
              return (
                <div
                  key={i}
                  className={`${
                    text.startsWith('  [OK]')
                      ? 'text-terminal-green'
                      : text.includes('██')
                      ? 'text-terminal-green text-glow-strong'
                      : 'text-terminal-dim'
                  } animate-boot-fade`}
                >
                  <pre className="font-mono">{text || '\u00A0'}</pre>
                </div>
              )
            })}
            <span className="text-terminal-dim">
              <BlinkingCursor />
            </span>
          </div>

          {state === 'waiting' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 text-center text-terminal-green text-sm animate-glow-pulse"
            >
              Drücke eine beliebige Taste...
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
