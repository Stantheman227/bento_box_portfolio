import TerminalWindow from '../terminal/TerminalWindow'

interface SkillEntry {
  name: string
  permissions: string
  size: string
  date: string
}

const SKILLS: SkillEntry[] = [
  { name: 'react.tsx', permissions: 'drwxr-xr-x', size: '████████░░', date: '2024-12' },
  { name: 'typescript.ts', permissions: 'drwxr-xr-x', size: '████████░░', date: '2024-12' },
  { name: 'python.py', permissions: 'drwxr-x---', size: '███████░░░', date: '2024-11' },
  { name: 'nodejs.js', permissions: 'drwxr-xr-x', size: '████████░░', date: '2024-12' },
  { name: 'ai-ml.model', permissions: 'drwxr-x---', size: '██████░░░░', date: '2025-01' },
  { name: 'nextjs.tsx', permissions: 'drwxr-xr-x', size: '███████░░░', date: '2024-12' },
  { name: 'aws.cloud', permissions: '-rwxr-----', size: '██████░░░░', date: '2024-10' },
  { name: 'docker.yml', permissions: '-rwxr-xr-x', size: '██████░░░░', date: '2024-11' },
  { name: 'tailwind.css', permissions: 'drwxr-xr-x', size: '████████░░', date: '2024-12' },
]

export default function SkillsListing({ delay = 0 }: { delay?: number }) {
  return (
    <TerminalWindow command="ls -la /skills/" delay={delay}>
      <div className="text-xs space-y-0.5 font-mono">
        <div className="text-terminal-dim mb-1">
          total {SKILLS.length}
        </div>
        {SKILLS.map((skill) => (
          <div key={skill.name} className="flex gap-2 whitespace-nowrap">
            <span className="text-terminal-dim text-[10px]">{skill.permissions}</span>
            <span className="text-terminal-amber text-[10px]">{skill.date}</span>
            <span className="text-terminal-mid text-[10px]">{skill.size}</span>
            <span className="text-terminal-green text-[10px]">{skill.name}</span>
          </div>
        ))}
      </div>
    </TerminalWindow>
  )
}
