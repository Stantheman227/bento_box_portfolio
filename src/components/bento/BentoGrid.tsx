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
      className="bento-grid min-h-0 px-4 py-6 md:px-[8vw] md:py-[5vh] lg:h-screen lg:px-[4vw] lg:py-[6vh] xl:px-[6vw] xl:py-[8vh] 2xl:px-[8vw] 2xl:py-[10vh]"
    >
      {children}
    </motion.div>
  )
}
