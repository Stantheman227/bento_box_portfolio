import { motion } from 'framer-motion'
import { staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, children, className }: SectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.05 })
  const reduced = useReducedMotion()

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={staggerContainer}
      initial={reduced ? 'visible' : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      className={cn('mx-auto max-w-6xl px-6 py-28', className)}
    >
      {children}
    </motion.section>
  )
}
