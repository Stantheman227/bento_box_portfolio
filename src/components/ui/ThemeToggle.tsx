import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-surface active:scale-95"
      aria-label={theme === 'light' ? 'Dunkelmodus aktivieren' : 'Hellmodus aktivieren'}
    >
      <AnimatePresence mode="wait">
        <motion.svg
          key={theme}
          initial={{ rotate: -60, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 60, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-primary"
        >
          {theme === 'light' ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </>
          ) : (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  )
}
