export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-10 text-center">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Piotr Gosiewski
        </p>
      </div>
    </footer>
  )
}
