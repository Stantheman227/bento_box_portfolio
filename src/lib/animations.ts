import type { Variants, Transition } from 'framer-motion'

const expoOut = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: expoOut },
  },
}

// ─── Bento-specific animations ───

export const cellEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: expoOut },
  },
}

export const gridStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

export const cellHoverSpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
}
