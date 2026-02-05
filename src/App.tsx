import { ThemeProvider } from './contexts/ThemeContext'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import AboutBento from './components/sections/AboutBento'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import BeyondCode from './components/sections/BeyondCode'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <ThemeProvider>
      <div className="grain min-h-screen bg-background">
        <Nav />
        <Hero />
        <AboutBento />
        <Skills />
        <Projects />
        <BeyondCode />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
