import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface TerminalWindowProps {
  command: string
  prompt?: string
  children: ReactNode
  className?: string
  delay?: number
}

export default function TerminalWindow({
  command,
  prompt = 'piotr@dev:~$',
  children,
  className = '',
  delay = 0,
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={`terminal-window flex flex-col h-full ${className}`}
    >
      {/* Title bar */}
      <div className="terminal-title-bar shrink-0">
        <span className="prompt">{prompt}</span>
        <span className="command">{command}</span>
      </div>

      {/* Content area */}
      <div className="relative flex-1 overflow-auto p-3 text-sm z-[2]">
        {children}
      </div>
    </motion.div>
  )
}
