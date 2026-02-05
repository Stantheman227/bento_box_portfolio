import TerminalWindow from '../terminal/TerminalWindow'

const MINI_LOGO = [
  '  ██████╗ ',
  '  ██╔══██╗',
  '  ██████╔╝',
  '  ██╔═══╝ ',
  '  ██║     ',
  '  ╚═╝     ',
]

const STATS = [
  { key: 'OS', value: 'Developer v8.0' },
  { key: 'Uptime', value: '8+ Jahre' },
  { key: 'Projekte', value: '50+' },
  { key: 'Kunden', value: '30+' },
  { key: 'Shell', value: 'TypeScript' },
  { key: 'DE', value: 'React + Vite' },
]

export default function StatsNeofetch({ delay = 0 }: { delay?: number }) {
  return (
    <TerminalWindow command="neofetch" delay={delay}>
      <div className="flex gap-4">
        {/* ASCII logo */}
        <pre className="text-terminal-green text-glow text-[8px] md:text-[10px] leading-tight whitespace-pre shrink-0 hidden md:block">
          {MINI_LOGO.join('\n')}
        </pre>

        {/* Stats */}
        <div className="text-xs space-y-1 min-w-0">
          <div className="text-terminal-green text-glow font-bold mb-2">
            piotr@dev
          </div>
          <div className="text-terminal-dim text-[10px]">{'─'.repeat(16)}</div>
          {STATS.map(({ key, value }) => (
            <div key={key} className="flex gap-2">
              <span className="text-terminal-amber">{key}:</span>
              <span className="text-terminal-green">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </TerminalWindow>
  )
}
