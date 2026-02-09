import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import Nav from './components/layout/Nav'
import BentoGrid from './components/bento/BentoGrid'
import BentoCell from './components/bento/BentoCell'
import { experience, projects, socials } from './data/portfolio'

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
          <BentoCell area="name" className="group/photo p-0">
            <img
              src="/profile_foto_color.jpg"
              alt="Piotr Gosiewski"
              className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-500 ease-out group-hover/photo:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 lg:p-6">
              <h1 className="font-display text-4xl leading-[0.9] text-white lg:text-5xl">
                PIOTR<br />GOSIEWSKI
              </h1>
            </div>
          </BentoCell>

          {/* Experience */}
          <BentoCell area="stats" className="flex flex-col justify-between bg-bento-orange">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">roles & positions</span>
            <div className="flex flex-col gap-3">
              {experience.map((exp) => (
                <div key={exp.year} className="flex items-start gap-3">
                  <span className="font-mono text-sm leading-tight text-white/50">{exp.year}</span>
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-1.5 min-w-0 group/exp"
                  >
                    <span className="mt-[3px] text-white/40 transition-all duration-200 group-hover/exp:text-white group-hover/exp:translate-x-0.5">&#8599;</span>
                    <div className="min-w-0">
                      <p className="font-display text-lg leading-[1] text-white transition-colors duration-200 group-hover/exp:text-white/80 lg:text-xl">{exp.company}</p>
                      <p className="font-mono text-[10px] uppercase tracking-wide text-white/60">{exp.position}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </BentoCell>

          {/* Skills */}
          <BentoCell area="skills" className="flex flex-col justify-end bg-bento-purple">
            <h2 className="font-display text-3xl leading-[0.9] text-white lg:text-4xl">
              CODE<br />&amp; KI
            </h2>
            <span className="mt-1 text-xs uppercase tracking-widest text-white/70">React &middot; TypeScript &middot; LangChain</span>
          </BentoCell>

          {/* Chat */}
          <BentoCell area="chat" className="bg-bento-blue">
            <Suspense fallback={<ChatFallback />}>
              <ChatCell />
            </Suspense>
          </BentoCell>

          {/* About — wide cell */}
          <BentoCell area="about" className="flex flex-col justify-end bg-neutral-black">
            <h2 className="font-display text-3xl leading-[0.9] text-white md:text-4xl lg:text-5xl">
              ENTWICKLER<br />&amp; KI-ORCHESTRATOR
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-white/50">Berlin, DE</p>
          </BentoCell>

          {/* Projects — tall cell */}
          <BentoCell area="projects" className="flex flex-col bg-bento-sky">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">Ausgewählte Arbeiten</span>
            <div className="mt-3 flex flex-1 flex-col justify-between">
              {projects.map((project, i) => (
                <a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/proj flex items-center gap-2.5 py-1.5 ${i > 0 ? 'border-t border-white/10' : ''}`}
                >
                  {'image' in project && project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-8 w-12 shrink-0 rounded-md object-cover object-top transition-transform duration-200 group-hover/proj:scale-105"
                    />
                  ) : (
                    <div
                      className="h-8 w-12 shrink-0 rounded-md transition-transform duration-200 group-hover/proj:scale-105"
                      style={{ background: project.color }}
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <p className="truncate font-display text-base leading-[1] text-white transition-colors duration-200 group-hover/proj:text-white/80">{project.title}</p>
                      <span className="text-[10px] text-white/40 transition-all duration-200 group-hover/proj:text-white group-hover/proj:translate-x-0.5">&#8599;</span>
                    </div>
                    <p className="truncate font-mono text-[8px] uppercase tracking-wide text-white/40">{project.tech}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[8px] uppercase tracking-wide text-white/30">{project.tag}</span>
                </a>
              ))}
            </div>
          </BentoCell>

          {/* Social */}
          <BentoCell area="social" className="flex flex-col justify-between bg-bento-pink">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">Socials</span>
            <div className="flex flex-col gap-1.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group/social flex items-center justify-between"
                >
                  <span className="font-display text-lg leading-[1] text-white transition-colors duration-200 group-hover/social:text-white/80 lg:text-xl">{social.label}</span>
                  <span className="text-xs text-white/40 transition-all duration-200 group-hover/social:text-white group-hover/social:translate-x-0.5">&#8599;</span>
                </a>
              ))}
            </div>
          </BentoCell>

          {/* Contact */}
          <BentoCell area="status" className="flex flex-col justify-between bg-neutral-light">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-mid">Kontakt</span>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-1.5"
            >
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-lg border border-neutral-dark/10 bg-white/60 px-2.5 py-1.5 font-mono text-[11px] text-neutral-black placeholder:text-neutral-mid/60 focus:border-neutral-dark/30 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-neutral-dark/10 bg-white/60 px-2.5 py-1.5 font-mono text-[11px] text-neutral-black placeholder:text-neutral-mid/60 focus:border-neutral-dark/30 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Anliegen"
                className="w-full rounded-lg border border-neutral-dark/10 bg-white/60 px-2.5 py-1.5 font-mono text-[11px] text-neutral-black placeholder:text-neutral-mid/60 focus:border-neutral-dark/30 focus:outline-none"
              />
              <button
                type="submit"
                className="mt-0.5 w-full rounded-lg bg-neutral-black px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white transition-colors duration-200 hover:bg-neutral-dark"
              >
                Absenden
              </button>
            </form>
          </BentoCell>
        </BentoGrid>
      </LazyMotion>
    </ThemeProvider>
  )
}
