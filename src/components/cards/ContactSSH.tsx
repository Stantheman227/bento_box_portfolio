import TerminalWindow from '../terminal/TerminalWindow'

interface ContactLink {
  command: string
  label: string
  url: string
  color: string
}

const LINKS: ContactLink[] = [
  {
    command: '$ open github',
    label: 'github.com/piotrgosiewski',
    url: 'https://github.com/piotrgosiewski',
    color: 'text-terminal-green',
  },
  {
    command: '$ open linkedin',
    label: 'linkedin.com/in/piotrgosiewski',
    url: 'https://linkedin.com/in/piotrgosiewski',
    color: 'text-terminal-cyan',
  },
  {
    command: '$ mail',
    label: 'hello@piotr.dev',
    url: 'mailto:hello@piotr.dev',
    color: 'text-terminal-amber',
  },
  {
    command: '$ open twitter',
    label: '@piotrgosiewski',
    url: 'https://twitter.com/piotrgosiewski',
    color: 'text-terminal-cyan',
  },
]

export default function ContactSSH({ delay = 0 }: { delay?: number }) {
  return (
    <TerminalWindow command="ssh piotr@connect" delay={delay}>
      <div className="text-xs space-y-1 mb-4">
        <div className="text-terminal-green">Connection established.</div>
        <div className="text-terminal-dim">Authorized. Welcome.</div>
      </div>

      <div className="space-y-3 text-xs">
        {LINKS.map((link) => (
          <div key={link.command}>
            <div className="text-terminal-dim">{link.command}</div>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-glow-cyan hover:underline inline-block mt-0.5`}
            >
              → {link.label}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-2 border-t border-terminal-dim/20">
        <div className="text-terminal-dim text-[10px]">
          Schreib mir gerne – ich antworte schnell.
        </div>
      </div>
    </TerminalWindow>
  )
}
