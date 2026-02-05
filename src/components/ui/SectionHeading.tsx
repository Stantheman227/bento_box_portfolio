import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div variants={fadeUp} className="mb-16 text-center">
      <h2 className="font-display text-4xl italic tracking-tight text-text-primary sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary">{subtitle}</p>
      )}
    </motion.div>
  )
}
