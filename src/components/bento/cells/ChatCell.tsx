import { useState, useRef, useEffect, type FormEvent } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { motion } from 'framer-motion'
import { fadeUp } from '../../../lib/animations'
import { suggestedQuestions, personalInfo } from '../../../data/portfolio'

const transport = new DefaultChatTransport({ api: '/api/chat' })

function getTextContent(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === 'text')
    .map((p) => p.text ?? '')
    .join('')
}

export default function ChatCell() {
  const { messages, sendMessage, status, error } = useChat({ transport })
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    sendMessage({ text })
  }

  const handleSuggestion = (q: string) => {
    setInput('')
    sendMessage({ text: q })
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
          KI-Assistent offline
        </span>
        <p className="text-xs text-white/50">
          Schreib mir direkt!
        </p>
        <a
          href={`mailto:${personalInfo.email}`}
          className="font-mono text-xs text-white underline"
        >
          {personalInfo.email}
        </a>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-[250px] flex-col lg:min-h-0">
      <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white md:mb-2 lg:mb-1">
        KI-Assistent
      </span>

      {/* Messages */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 lg:space-y-2"
      >
        {messages.length === 0 ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2"
          >
            <p className="text-xs text-white/60">
              Frag mich etwas über Piotr!
            </p>
            <div className="flex flex-wrap gap-2 md:gap-1.5">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestion(q)}
                  className="min-h-[44px] border border-white/20 px-3 py-1.5 font-mono text-[10px] text-white/60 transition-colors duration-300 hover:border-white/40 hover:text-white md:min-h-0 md:px-2 md:py-1 md:text-[9px] lg:px-1.5 lg:py-0.5 lg:text-[8px] xl:px-2 xl:py-1 xl:text-[9px]"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'text-white'
                  : 'text-white/70'
              }`}
            >
              <span className="mr-1.5 font-mono text-[9px] uppercase tracking-wider text-white">
                {msg.role === 'user' ? 'Du' : 'KI'}
              </span>
              {getTextContent(msg.parts)}
            </div>
          ))
        )}
        {isLoading && messages.at(-1)?.role === 'user' && (
          <div className="text-xs text-white/70">
            <span className="mr-1.5 font-mono text-[9px] uppercase tracking-wider text-white">
              KI
            </span>
            <span className="animate-pulse">...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2 md:mt-2 lg:mt-1">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Frag mich etwas..."
          className="min-h-[44px] flex-1 border-b border-white/20 bg-transparent px-0 py-2 font-mono text-xs text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none md:min-h-0 md:py-1.5 md:text-[11px]"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="min-h-[44px] min-w-[44px] font-mono text-xs uppercase tracking-wider text-white/60 transition-colors duration-300 hover:text-white disabled:opacity-30 md:min-h-0 md:min-w-0 md:text-[10px]"
          aria-label="Nachricht senden"
        >
          &rarr;
        </button>
      </form>
    </div>
  )
}
