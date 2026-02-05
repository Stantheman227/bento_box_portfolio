import TerminalWindow from '../terminal/TerminalWindow'

interface FocusItem {
  label: string
  status: 'active' | 'learning' | 'exploring'
  bar: string
}

const FOCUS_ITEMS: FocusItem[] = [
  { label: 'KI-Agenten & RAG', status: 'active', bar: '████████░░' },
  { label: 'Full-Stack Apps', status: 'active', bar: '█████████░' },
  { label: 'Cloud Architektur', status: 'learning', bar: '██████░░░░' },
  { label: 'Content Creation', status: 'exploring', bar: '████░░░░░░' },
]

const STATUS_COLOR = {
  active: 'text-terminal-green',
  learning: 'text-terminal-amber',
  exploring: 'text-terminal-cyan',
}

export default function FocusCard({ delay = 0 }: { delay?: number }) {
  return (
    <TerminalWindow command="cat /etc/focus" delay={delay}>
      <div className="text-xs space-y-2.5">
        <div className="text-terminal-dim">
          # Aktueller Fokus (2025)
        </div>

        {FOCUS_ITEMS.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between items-center">
              <span className="text-terminal-green">{item.label}</span>
              <span className={`text-[10px] ${STATUS_COLOR[item.status]}`}>
                [{item.status}]
              </span>
            </div>
            <div className="text-terminal-mid text-[10px] mt-0.5">
              {item.bar}
            </div>
          </div>
        ))}
      </div>
    </TerminalWindow>
  )
}
