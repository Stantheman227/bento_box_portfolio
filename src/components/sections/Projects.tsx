import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'
import Section from '../layout/Section'
import SectionHeading from '../ui/SectionHeading'
import Badge from '../ui/Badge'

const projects = [
  {
    title: 'KI-Chat-Plattform',
    description:
      'Echtzeit-Chat-Anwendung mit integrierter KI-Assistenz. Unterstützt mehrere LLM-Provider, RAG-basierte Wissensdatenbanken und Team-Kollaboration.',
    techs: ['React', 'Node.js', 'OpenAI', 'WebSocket', 'PostgreSQL'],
    gradient: 'from-blue-600 via-indigo-600 to-violet-600',
    glow: 'bg-blue-500/20',
  },
  {
    title: 'E-Commerce Dashboard',
    description:
      'Umfassendes Analytics-Dashboard für Online-Shops. Echtzeit-Verkaufsdaten, Bestandsverwaltung und KI-gestützte Prognosen.',
    techs: ['Next.js', 'TypeScript', 'Tailwind', 'Chart.js', 'Stripe'],
    gradient: 'from-emerald-600 via-green-600 to-teal-600',
    glow: 'bg-emerald-500/20',
  },
  {
    title: 'Automatisierungs-Suite',
    description:
      'No-Code Workflow-Builder für Geschäftsprozess-Automatisierung. Drag-and-Drop-Interface mit über 50 Integrationen.',
    techs: ['React', 'Python', 'FastAPI', 'Redis', 'Docker'],
    gradient: 'from-amber-600 via-orange-600 to-rose-600',
    glow: 'bg-amber-500/20',
  },
]

export default function Projects() {
  return (
    <Section id="projekte">
      <SectionHeading
        title="Ausgewählte Projekte"
        subtitle="Eine Auswahl meiner jüngsten Arbeiten."
      />

      <div className="space-y-8">
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
            className="group relative"
          >
            {/* Ambient glow on hover */}
            <div
              className={`absolute -inset-px rounded-[18px] ${project.glow} opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100`}
            />

            <div className="relative overflow-hidden rounded-2xl bg-surface ring-1 ring-border/30 transition-all duration-500 group-hover:ring-border/60 group-hover:shadow-2xl">
              {/* Gradient accent bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

              <div className="p-8 md:p-10">
                <h3 className="font-display text-2xl italic text-text-primary">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
