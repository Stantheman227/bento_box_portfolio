import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  as?: 'button' | 'a'
  href?: string
}

export default function Button({
  children,
  variant = 'primary',
  className,
  as = 'button',
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    'relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-500',
    'hover:shadow-lg active:scale-[0.97]',
    variant === 'primary' && [
      'bg-accent text-white',
      'hover:bg-accent-hover hover:shadow-accent/25',
      'hover:scale-[1.03]',
    ],
    variant === 'secondary' && [
      'bg-transparent text-text-primary',
      'ring-1 ring-border',
      'hover:ring-text-secondary hover:bg-surface',
      'hover:scale-[1.03]',
    ],
    className
  )

  if (as === 'a') {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
