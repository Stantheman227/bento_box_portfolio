import TerminalWindow from '../terminal/TerminalWindow'

interface LogEntry {
  timestamp: string
  level: 'INFO' | 'NOTE' | 'UPDATE'
  message: string
}

const LOG_ENTRIES: LogEntry[] = [
  {
    timestamp: '2025-02-05 08:30',
    level: 'UPDATE',
    message: 'Portfolio-Redesign als Terminal-Simulation gelauncht',
  },
  {
    timestamp: '2025-01-20 14:15',
    level: 'INFO',
    message: 'Neues KI-Projekt: RAG-Pipeline für Dokumentensuche',
  },
  {
    timestamp: '2025-01-10 09:00',
    level: 'NOTE',
    message: 'TypeScript 5.4 Deep-Dive – Template Literal Types',
  },
  {
    timestamp: '2024-12-18 16:45',
    level: 'INFO',
    message: 'E-Commerce Dashboard v2.0 live geschaltet',
  },
  {
    timestamp: '2024-12-01 11:30',
    level: 'UPDATE',
    message: 'AWS Solutions Architect Zertifizierung bestanden',
  },
  {
    timestamp: '2024-11-15 10:00',
    level: 'NOTE',
    message: 'Vortrag: "KI-Agenten in der Praxis" @ Dev Meetup',
  },
]

const LEVEL_COLOR = {
  INFO: 'text-terminal-green',
  NOTE: 'text-terminal-cyan',
  UPDATE: 'text-terminal-amber',
}

export default function ActivityLog({ delay = 0 }: { delay?: number }) {
  return (
    <TerminalWindow command="tail -f /var/log/activity.log" delay={delay}>
      <div className="text-[10px] md:text-xs space-y-2">
        {LOG_ENTRIES.map((entry, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <div className="flex gap-2 items-center">
              <span className="text-terminal-dim shrink-0">{entry.timestamp}</span>
              <span className={`${LEVEL_COLOR[entry.level]} shrink-0`}>
                [{entry.level}]
              </span>
            </div>
            <div className="text-terminal-green ml-0 md:ml-2">
              {entry.message}
            </div>
          </div>
        ))}
      </div>
    </TerminalWindow>
  )
}
