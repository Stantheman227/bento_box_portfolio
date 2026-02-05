export default function BlinkingCursor({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block w-[0.6em] h-[1.1em] bg-terminal-green align-middle animate-blink ${className}`}
      aria-hidden="true"
    />
  )
}
