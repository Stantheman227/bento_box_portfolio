import ThemeToggle from '../ui/ThemeToggle'

export default function Nav() {
  return (
    <nav className="pointer-events-none absolute inset-x-0 top-0 z-10">
      <div className="pointer-events-auto flex items-center justify-between px-6 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-mid">
          Portfolio / 2026
        </span>
        <ThemeToggle />
      </div>
    </nav>
  )
}
