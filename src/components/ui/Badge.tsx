import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-medium text-text-secondary',
        'ring-1 ring-border/50',
        'transition-colors duration-300 hover:text-text-primary hover:ring-border',
        className
      )}
    >
      {children}
    </span>
  )
}
