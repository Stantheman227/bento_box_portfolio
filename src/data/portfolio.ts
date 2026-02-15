export const personalInfo = {
  name: 'Piotr Gosiewski',
  firstName: 'Piotr',
  lastName: 'Gosiewski',
  role: 'Developer & Agent Orchestrator',
  tagline: 'Ich baue Produkte, die nicht nur funktionieren, sondern begeistern.',
  location: 'Hamburg, DE',
  timezone: 'Europe/Berlin',
  available: true,
  email: 'hello@piotr.dev',
} as const

export const experience = [
  {
    year: '2025',
    company: 'OMR Education',
    position: 'Frontend Developer & Automation Engineer',
    url: 'https://education.omr.com',
  },
  {
    year: '2022',
    company: 'Paranote',
    position: 'Software Engineer & Co-Founder',
    url: 'https://paranote.de',
  },
  {
    year: '2017',
    company: 'Georg-August-Universität Göttingen',
    position: 'Economics B.Sc.',
    url: 'https://uni-goettingen.de',
  },
] as const

export const projects = [
  {
    title: 'Paranote',
    tag: 'SaaS',
    tech: 'React · Node.js · OpenAI',
    url: 'https://paranote.de',
    color: '#1a1a2e',
    image: '/paranote-preview.png',
  },
  {
    title: 'OMR Dashboard',
    tag: 'Internal',
    tech: 'Next.js · TypeScript · Tailwind',
    url: '#',
    color: '#16213e',
  },
  {
    title: 'KI-Chatbot',
    tag: 'AI',
    tech: 'LangChain · Gemini · Vercel AI',
    url: '#',
    color: '#0f3460',
  },
  {
    title: 'Portfolio Site',
    tag: 'Personal',
    tech: 'React · Framer Motion · Vite',
    url: '#',
    color: '#533483',
  },
  {
    title: 'E-Commerce App',
    tag: 'Freelance',
    tech: 'Next.js · Stripe · Prisma',
    url: '#',
    color: '#e94560',
  },
  {
    title: 'Analytics Tool',
    tag: 'B2B',
    tech: 'Python · FastAPI · React',
    url: '#',
    color: '#1a1a2e',
  },
  {
    title: 'Mobile App',
    tag: 'Startup',
    tech: 'React Native · Firebase',
    url: '#',
    color: '#0f3460',
  },
  {
    title: 'CMS Platform',
    tag: 'Agency',
    tech: 'Next.js · Sanity · Vercel',
    url: '#',
    color: '#533483',
  },
] as const

export const socials = [
  { label: 'LinkedIn', url: 'https://linkedin.com/in/piotrgosiewski' },
  { label: 'GitHub', url: 'https://github.com/piotrgosiewski' },
  { label: 'Instagram', url: 'https://instagram.com/piotrgosiewski' },
  { label: 'Email', url: 'mailto:hello@piotr.dev' },
] as const

export const suggestedQuestions = [
  'Was sind Piotrs Stärken?',
  'Welche Projekte hat er gemacht?',
  'Ist er aktuell verfügbar?',
] as const
