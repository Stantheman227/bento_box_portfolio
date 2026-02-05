import TerminalWindow from '../terminal/TerminalWindow'

interface Project {
  hash: string
  message: string
  tags: string[]
  date: string
}

const PROJECTS: Project[] = [
  {
    hash: 'a3f7c21',
    message: 'feat: KI-Chat-Plattform mit RAG-Pipeline',
    tags: ['React', 'Python', 'LangChain'],
    date: '2025-01',
  },
  {
    hash: 'b8d4e55',
    message: 'feat: E-Commerce Dashboard mit Echtzeit-Analytics',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    date: '2024-11',
  },
  {
    hash: 'c1f9a02',
    message: 'feat: Automatisierungs-Suite für KMU',
    tags: ['Node.js', 'AWS', 'Docker'],
    date: '2024-09',
  },
  {
    hash: 'd5e3b77',
    message: 'feat: Portfolio-Terminal (diese Seite)',
    tags: ['React', 'Tailwind', 'Canvas'],
    date: '2025-02',
  },
]

export default function ProjectsGitLog({ delay = 0 }: { delay?: number }) {
  return (
    <TerminalWindow command="git log --oneline --graph" delay={delay}>
      <div className="text-xs space-y-3">
        {PROJECTS.map((project, i) => (
          <div key={project.hash}>
            <div className="flex items-start gap-2">
              <span className="text-terminal-dim shrink-0">
                {i === 0 ? '* ' : '│ '}
              </span>
              <span className="text-terminal-amber shrink-0">{project.hash}</span>
              <span className="text-terminal-green">{project.message}</span>
            </div>
            <div className="flex gap-1 ml-4 mt-1 flex-wrap">
              <span className="text-terminal-dim text-[10px]">{project.date}</span>
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] text-terminal-cyan px-1 border border-terminal-cyan/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TerminalWindow>
  )
}
