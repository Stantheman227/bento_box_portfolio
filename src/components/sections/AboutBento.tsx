import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'
import Section from '../layout/Section'
import BentoGrid from '../layout/BentoGrid'
import BentoCard from '../layout/BentoCard'
import SectionHeading from '../ui/SectionHeading'

const stats = [
  { label: 'Jahre Erfahrung', value: '8+' },
  { label: 'Projekte', value: '50+' },
  { label: 'Kunden', value: '30+' },
  { label: 'Kaffee', value: '\u221E' },
]

const focusAreas = [
  { label: 'Web-Applikationen', color: 'bg-blue-500' },
  { label: 'KI-Integration', color: 'bg-violet-500' },
  { label: 'Design Systems', color: 'bg-emerald-500' },
  { label: 'Automatisierung', color: 'bg-amber-500' },
]

export default function AboutBento() {
  return (
    <Section id="ueber-mich">
      <SectionHeading title="Über mich" />

      <BentoGrid>
        {/* Avatar — animated gradient border */}
        <BentoCard className="animated-border flex items-center justify-center lg:row-span-2">
          <div className="relative">
            <div className="flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-accent via-purple-500 to-pink-500">
              <span className="font-display text-6xl text-white">P</span>
            </div>
            {/* Ambient glow behind avatar */}
            <div className="absolute inset-0 -z-10 h-44 w-44 rounded-full bg-accent/20 blur-2xl" />
          </div>
        </BentoCard>

        {/* About text — spans 2 columns */}
        <BentoCard className="md:col-span-2">
          <motion.div variants={fadeUp}>
            <h3 className="font-display text-2xl italic text-text-primary">Hallo!</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
              Ich bin Piotr — Entwickler mit Leidenschaft für sauberen Code und
              durchdachte Nutzererlebnisse. Mit über 8 Jahren Erfahrung in der
              Webentwicklung bringe ich Projekte von der Idee bis zum Launch. Mein
              Fokus liegt auf modernen Web-Technologien und der Integration von
              künstlicher Intelligenz in reale Produkte.
            </p>
          </motion.div>
        </BentoCard>

        {/* Stats — large numbers */}
        <BentoCard>
          <motion.div variants={fadeUp}>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-secondary">
              Zahlen
            </h3>
            <div className="grid grid-cols-2 gap-y-5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl text-text-primary">{stat.value}</div>
                  <div className="mt-0.5 text-xs text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </BentoCard>

        {/* Focus areas — colored dots */}
        <BentoCard>
          <motion.div variants={fadeUp}>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-secondary">
              Fokus
            </h3>
            <ul className="space-y-3.5">
              {focusAreas.map((area) => (
                <li key={area.label} className="flex items-center gap-3 text-sm text-text-primary">
                  <span className={`h-2.5 w-2.5 rounded-full ${area.color}`} />
                  {area.label}
                </li>
              ))}
            </ul>
          </motion.div>
        </BentoCard>

        {/* Interests */}
        <BentoCard>
          <motion.div variants={fadeUp}>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-secondary">
              Interessen
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Fitness', 'Laufen', 'Gitarre', 'Musik', 'Content'].map((i) => (
                <span
                  key={i}
                  className="rounded-full bg-background px-3 py-1.5 text-xs text-text-secondary ring-1 ring-border/50"
                >
                  {i}
                </span>
              ))}
            </div>
          </motion.div>
        </BentoCard>

        {/* Location */}
        <BentoCard className="flex items-center justify-center">
          <motion.div variants={fadeUp} className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-3 text-accent"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="font-medium text-text-primary">Deutschland</p>
            <p className="mt-1 text-xs text-text-secondary">Remote-First</p>
          </motion.div>
        </BentoCard>
      </BentoGrid>
    </Section>
  )
}
