import TerminalWindow from '../terminal/TerminalWindow'
import MatrixRain from '../effects/MatrixRain'

const ASCII_PORTRAIT = `
    ┌──────────────────┐
    │  ╔══════════════╗ │
    │  ║   ┌──────┐   ║ │
    │  ║   │  ◉ ◉ │   ║ │
    │  ║   │  ─┬─  │   ║ │
    │  ║   │  ╰─╯  │   ║ │
    │  ║   └──────┘   ║ │
    │  ║    ╔════╗    ║ │
    │  ║    ║    ║    ║ │
    │  ╚════╩════╩════╝ │
    └──────────────────┘
`.trimStart()

export default function HeroTerminal({ delay = 0 }: { delay?: number }) {
  return (
    <TerminalWindow command="./portfolio --interactive" delay={delay} className="min-h-[280px]">
      <div className="relative w-full h-full min-h-[240px]">
        {/* Matrix rain background */}
        <MatrixRain />

        {/* ASCII portrait centered on top */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <pre className="text-terminal-green text-glow-strong text-[10px] md:text-xs leading-tight whitespace-pre bg-[#0a0a0a]/70 p-4 border border-terminal-green/20">
            {ASCII_PORTRAIT}
          </pre>
        </div>
      </div>
    </TerminalWindow>
  )
}
