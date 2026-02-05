import { useRef, useEffect } from 'react'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'
const FONT_SIZE = 14
const COLUMN_GAP = FONT_SIZE + 2
const TARGET_FPS = 18 // Slow, deliberate rain
const FRAME_INTERVAL = 1000 / TARGET_FPS

export default function MatrixRain({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Disable on mobile for performance, or if user prefers reduced motion
    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || isMobile) return

    let animId: number
    let columns: number[] = []
    let lastTime = 0

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const colCount = Math.floor(canvas.width / COLUMN_GAP)
      columns = Array.from({ length: colCount }, () =>
        Math.random() * canvas.height / FONT_SIZE
      )
    }

    resize()
    window.addEventListener('resize', resize)

    function draw(timestamp: number) {
      animId = requestAnimationFrame(draw)

      if (!ctx || !canvas) return

      // Throttle to target FPS
      const elapsed = timestamp - lastTime
      if (elapsed < FRAME_INTERVAL) return
      lastTime = timestamp - (elapsed % FRAME_INTERVAL)

      // Semi-transparent black overlay creates trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${FONT_SIZE}px JetBrains Mono`

      for (let i = 0; i < columns.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * COLUMN_GAP
        const y = columns[i] * FONT_SIZE

        // Bright green for the leading character
        ctx.fillStyle = '#00FF41'
        ctx.globalAlpha = 0.7 + Math.random() * 0.3
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0
        }
        columns[i]++
      }

      ctx.globalAlpha = 1
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full opacity-60 ${className}`}
      aria-hidden="true"
    />
  )
}
