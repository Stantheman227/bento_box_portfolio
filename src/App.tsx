import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import Nav from './components/layout/Nav'
import BentoGrid from './components/bento/BentoGrid'
import BentoCell from './components/bento/BentoCell'
import NameCell from './components/bento/cells/NameCell'
import StatsCell from './components/bento/cells/StatsCell'
import SkillsCell from './components/bento/cells/SkillsCell'
import AboutCell from './components/bento/cells/AboutCell'
import ProjectsCell from './components/bento/cells/ProjectsCell'
import SocialCell from './components/bento/cells/SocialCell'
import StatusCell from './components/bento/cells/StatusCell'

const ChatCell = lazy(() => import('./components/bento/cells/ChatCell'))

function ChatFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <span className="font-mono text-xs text-gray-500">Lade KI-Assistent...</span>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LazyMotion features={domAnimation}>
        <Nav />
        <BentoGrid>
          {/* Photo + name overlay */}
          <BentoCell area="name" className="group/photo min-h-[280px] p-0 md:min-h-[200px] lg:min-h-0">
            <NameCell />
          </BentoCell>

          {/* Experience */}
          <BentoCell area="stats" className="flex flex-col justify-between bg-bento-orange">
            <StatsCell />
          </BentoCell>

          {/* Skills */}
          <BentoCell area="skills" className="flex flex-col justify-end bg-bento-purple">
            <SkillsCell />
          </BentoCell>

          {/* Chat */}
          <BentoCell area="chat" className="bg-bento-blue">
            <Suspense fallback={<ChatFallback />}>
              <ChatCell />
            </Suspense>
          </BentoCell>

          {/* About — wide cell */}
          <BentoCell area="about" className="flex flex-col justify-end bg-neutral-black">
            <AboutCell />
          </BentoCell>

          {/* Projects — tall cell */}
          <BentoCell area="projects" className="flex flex-col bg-bento-sky">
            <ProjectsCell />
          </BentoCell>

          {/* Social */}
          <BentoCell area="social" className="flex flex-col justify-between bg-bento-pink">
            <SocialCell />
          </BentoCell>

          {/* Contact */}
          <BentoCell area="status" className="flex flex-col justify-between bg-neutral-light">
            <StatusCell />
          </BentoCell>
        </BentoGrid>
      </LazyMotion>
    </ThemeProvider>
  )
}
