import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'
import Section from '../layout/Section'
import BentoGrid from '../layout/BentoGrid'
import BentoCard from '../layout/BentoCard'
import SectionHeading from '../ui/SectionHeading'

const interests = [
  {
    emoji: '\uD83C\uDFCB\uFE0F',
    title: 'Fitness',
    description:
      'Krafttraining und Laufen gehören zu meinem Alltag. Disziplin im Sport überträgt sich auf den Code.',
    bg: 'from-red-500/5 to-orange-500/5',
  },
  {
    emoji: '\uD83C\uDFB8',
    title: 'Musik',
    description:
      'Gitarre spielen ist mein kreativer Ausgleich. Vom Fingerpicking bis zum Songwriting.',
    bg: 'from-violet-500/5 to-pink-500/5',
  },
  {
    emoji: '\uD83C\uDFA5',
    title: 'Content Creation',
    description:
      'Wissen teilen durch Videos, Artikel und Tutorials über Webentwicklung und KI.',
    bg: 'from-blue-500/5 to-cyan-500/5',
  },
  {
    emoji: '\uD83C\uDFC3',
    title: 'Laufen',
    description:
      'Regelmäßige Läufe halten den Kopf frei und bringen neue Ideen.',
    bg: 'from-emerald-500/5 to-green-500/5',
  },
]

export default function BeyondCode() {
  return (
    <Section id="mehr">
      <SectionHeading
        title="Mehr als Code"
        subtitle="Was mich abseits des Bildschirms antreibt."
      />

      <BentoGrid className="lg:grid-cols-2">
        {interests.map((item) => (
          <BentoCard key={item.title} className={`bg-gradient-to-br ${item.bg} bg-surface`}>
            <motion.div variants={fadeUp}>
              <span className="text-4xl">{item.emoji}</span>
              <h3 className="mt-4 font-display text-xl italic text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </motion.div>
          </BentoCard>
        ))}
      </BentoGrid>
    </Section>
  )
}
