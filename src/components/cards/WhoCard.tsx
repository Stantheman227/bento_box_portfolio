import TerminalWindow from '../terminal/TerminalWindow'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import BlinkingCursor from '../terminal/BlinkingCursor'
import { ASCII_NAME } from '../../constants/asciiArt'

export default function WhoCard({ delay = 0 }: { delay?: number }) {
  const bio = useTypingEffect({
    text: 'Entwickler & KI-Orchestrator aus Leidenschaft. Ich baue intelligente Lösungen an der Schnittstelle von Code und Kreativität.',
    speed: 25,
    delay: delay * 1000 + 500,
    startWhenVisible: false,
  })

  // Start is already called by default since startWhenVisible=false
  // The delay parameter handles the timing

  return (
    <TerminalWindow command="cat about.txt" delay={delay}>
      <pre
        className="text-terminal-green text-glow text-[8px] md:text-[10px] leading-tight whitespace-pre"
        aria-label="PIOTR"
      >
        {ASCII_NAME}
      </pre>

      <div className="mt-3 border-t border-terminal-dim/30 pt-3">
        <span className="text-terminal-dim">{'>'} </span>
        <span className="text-terminal-green">
          {bio.displayedText}
          {!bio.isComplete && <BlinkingCursor />}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {['React', 'TypeScript', 'KI/ML', 'Node.js'].map(tag => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 border border-terminal-dim/40 text-terminal-mid"
          >
            [{tag}]
          </span>
        ))}
      </div>
    </TerminalWindow>
  )
}
