import { motion } from 'framer-motion'
import { gridStagger } from '../../lib/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface BentoGridProps {
  children: React.ReactNode
}

export default function BentoGrid({ children }: BentoGridProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      variants={gridStagger}
      initial={reduced ? 'visible' : 'hidden'}
      animate="visible"
      className="bento-grid h-screen px-8 py-10 md:px-[8vw] md:py-[10vh] lg:px-[10vw] lg:py-[12vh]"
    >
      {children}
    </motion.div>
  )
}
