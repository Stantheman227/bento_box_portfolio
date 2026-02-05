import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import GradientText from '../ui/GradientText'
import Button from '../ui/Button'

const blurWord = {
  hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const reduced = useReducedMotion()
  const nameWords = ['Piotr', 'Gosiewski']

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Gradient mesh blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-blue-500/[0.08] blur-[120px] dark:bg-blue-500/[0.15]" />
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] translate-x-1/2 animate-float-delayed rounded-full bg-purple-500/[0.06] blur-[100px] dark:bg-purple-500/[0.12]" />
        <div className="absolute bottom-1/4 left-1/2 h-[350px] w-[350px] -translate-x-1/2 animate-float rounded-full bg-pink-500/[0.05] blur-[100px] dark:bg-pink-500/[0.08]" />
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Name — word-by-word blur reveal in Instrument Serif */}
        <h1 className="font-display text-6xl tracking-tight text-text-primary sm:text-7xl md:text-8xl lg:text-9xl">
          {nameWords.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={blurWord}
              initial={reduced ? 'visible' : 'hidden'}
              animate="visible"
              className={i === 1 ? 'italic' : ''}
              style={{ display: 'inline-block', marginRight: i === 0 ? '0.3em' : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          custom={0.5}
          variants={fadeIn}
          initial={reduced ? 'visible' : 'hidden'}
          animate="visible"
          className="mt-8 text-xl text-text-secondary md:text-2xl"
        >
          <GradientText className="font-medium">
            Entwickler &amp; KI-Orchestrator
          </GradientText>
        </motion.p>

        {/* Description */}
        <motion.p
          custom={0.7}
          variants={fadeIn}
          initial={reduced ? 'visible' : 'hidden'}
          animate="visible"
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary"
        >
          Ich baue digitale Erlebnisse an der Schnittstelle von Design, Code und
          künstlicher Intelligenz.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.9}
          variants={fadeIn}
          initial={reduced ? 'visible' : 'hidden'}
          animate="visible"
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button as="a" href="#projekte">Projekte ansehen</Button>
          <Button as="a" href="#kontakt" variant="secondary">Kontakt</Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary/60">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-text-secondary/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
