import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'
import Section from '../layout/Section'
import BentoGrid from '../layout/BentoGrid'
import BentoCard from '../layout/BentoCard'
import SectionHeading from '../ui/SectionHeading'
import Badge from '../ui/Badge'

const skillCategories = [
  {
    title: 'Frontend',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 8 6 4-6 4" /></svg>
    ),
    color: 'from-blue-500/10 to-cyan-500/10',
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    techs: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></svg>
    ),
    color: 'from-emerald-500/10 to-green-500/10',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    techs: ['Node.js', 'Python', 'PostgreSQL', 'REST', 'GraphQL'],
  },
  {
    title: 'KI / ML',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Z" /><circle cx="12" cy="15" r="2" /></svg>
    ),
    color: 'from-violet-500/10 to-purple-500/10',
    iconBg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    techs: ['OpenAI', 'LangChain', 'Claude API', 'RAG', 'Fine-Tuning'],
  },
  {
    title: 'DevOps & Tools',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" /></svg>
    ),
    color: 'from-orange-500/10 to-amber-500/10',
    iconBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    techs: ['Docker', 'Vercel', 'GitHub Actions', 'Git', 'Linux'],
  },
]

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        title="Technologien & Skills"
        subtitle="Die Werkzeuge, mit denen ich arbeite."
      />

      <BentoGrid className="lg:grid-cols-2">
        {skillCategories.map((cat) => (
          <BentoCard key={cat.title} className={`bg-gradient-to-br ${cat.color} bg-surface`}>
            <motion.div variants={fadeUp}>
              <div className="mb-5 flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${cat.iconBg}`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </motion.div>
          </BentoCard>
        ))}
      </BentoGrid>
    </Section>
  )
}
