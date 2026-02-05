import { cn } from '../../lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3'
}

export default function GradientText({
  children,
  className,
  as: Tag = 'span',
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        'bg-gradient-to-r from-accent via-purple-500 to-pink-500 bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </Tag>
  )
}
