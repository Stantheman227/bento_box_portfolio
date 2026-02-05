import ThemeToggle from '../ui/ThemeToggle'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-display text-xl text-text-primary transition-opacity duration-300 hover:opacity-70"
        >
          Piotr<span className="italic"> Gosiewski</span>
        </a>
        <ThemeToggle />
      </div>
    </nav>
  )
}
