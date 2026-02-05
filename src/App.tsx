import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BootSequence from './components/effects/BootSequence'
import Scanlines from './components/effects/Scanlines'
import WhoCard from './components/cards/WhoCard'
import HeroTerminal from './components/cards/HeroTerminal'
import StatsNeofetch from './components/cards/StatsNeofetch'
import FocusCard from './components/cards/FocusCard'
import ContactSSH from './components/cards/ContactSSH'
import ProjectsGitLog from './components/cards/ProjectsGitLog'
import SkillsListing from './components/cards/SkillsListing'
import ActivityLog from './components/cards/ActivityLog'

export default function App() {
  const [booted, setBooted] = useState(false)

  const handleBootComplete = useCallback(() => {
    setBooted(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative font-mono">
      {/* Boot sequence overlay */}
      <AnimatePresence>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* CRT effects */}
      <Scanlines />

      {/* Main content - appears after boot */}
      {booted && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center justify-center min-h-screen p-3 md:p-6 lg:p-8"
        >
          <div className="w-full max-w-7xl mx-auto">

            {/* Bento Grid
                Desktop (4 columns):
                ┌────────────┬───────────────────────┬────────────┐
                │   WHO      │    HERO TERMINAL      │   STATS    │
                │  (tall)    │    (2x2 center)       │            │
                │            │                       ├────────────┤
                │            │                       │   FOCUS    │
                ├────────────┼───────────┬───────────┼────────────┤
                │  CONTACT   │ PROJECTS  │  SKILLS   │  ACTIVITY  │
                │  (tall)    │ (tall)    │  (tall)   │  (tall)    │
                └────────────┴───────────┴───────────┴────────────┘
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-auto lg:auto-rows-[200px] gap-2 md:gap-3">

              {/* Row 1-2, Col 1: WHO */}
              <div className="lg:row-span-2">
                <WhoCard delay={0.1} />
              </div>

              {/* Row 1-2, Col 2-3: HERO TERMINAL */}
              <div className="lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-0">
                <HeroTerminal delay={0.2} />
              </div>

              {/* Row 1, Col 4: STATS */}
              <div>
                <StatsNeofetch delay={0.3} />
              </div>

              {/* Row 2, Col 4: FOCUS */}
              <div>
                <FocusCard delay={0.4} />
              </div>

              {/* Row 3-4, Col 1: CONTACT */}
              <div className="lg:row-span-2">
                <ContactSSH delay={0.5} />
              </div>

              {/* Row 3-4, Col 2: PROJECTS */}
              <div className="lg:row-span-2">
                <ProjectsGitLog delay={0.6} />
              </div>

              {/* Row 3-4, Col 3: SKILLS */}
              <div className="lg:row-span-2">
                <SkillsListing delay={0.7} />
              </div>

              {/* Row 3-4, Col 4: ACTIVITY */}
              <div className="lg:row-span-2">
                <ActivityLog delay={0.8} />
              </div>

            </div>
          </div>
        </motion.main>
      )}
    </div>
  )
}
