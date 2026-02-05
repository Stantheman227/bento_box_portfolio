import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'
import { cn } from '../../lib/utils'

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  glass?: boolean
}

export default function BentoCard({ children, className, glass }: BentoCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'group relative overflow-hidden rounded-2xl p-6 transition-all duration-500',
        'hover:shadow-xl hover:shadow-black/5 hover:scale-[1.02]',
        'dark:hover:shadow-white/5',
        glass
          ? 'bg-surface-elevated/60 ring-1 ring-border/50 backdrop-blur-xl'
          : 'bg-surface',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
