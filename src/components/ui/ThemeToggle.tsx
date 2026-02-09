import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-mid transition-colors duration-300 hover:text-neutral-black"
      aria-label={theme === 'light' ? 'Dunkelmodus aktivieren' : 'Hellmodus aktivieren'}
    >
      <span className={theme === 'dark' ? 'text-neutral-black' : ''}>
        DARK
      </span>
      <span className="mx-2 text-neutral-light">/</span>
      <span className={theme === 'light' ? 'text-neutral-black' : ''}>
        LIGHT
      </span>
    </button>
  )
}
