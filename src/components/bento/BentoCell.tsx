import { motion } from 'framer-motion'
import { cellEntrance, cellHoverSpring } from '../../lib/animations'
import { cn } from '../../lib/utils'

interface BentoCellProps {
  area: string
  interactive?: boolean
  ariaLabel?: string
  className?: string
  children?: React.ReactNode
  as?: 'div' | 'section' | 'article'
}

export default function BentoCell({
  area,
  interactive = false,
  ariaLabel,
  className,
  children,
  as: Component = 'div',
}: BentoCellProps) {
  const MotionComponent = motion[Component] as typeof motion.div

  return (
    <MotionComponent
      variants={cellEntrance}
      whileHover={interactive ? { scale: 1.01, transition: cellHoverSpring } : undefined}
      aria-label={ariaLabel}
      style={{ gridArea: area }}
      className={cn(
        'relative min-w-0 overflow-hidden rounded-2xl p-5 lg:p-4 xl:p-6',
        interactive && 'cursor-pointer',
        className
      )}
    >
      {children}
    </MotionComponent>
  )
}
