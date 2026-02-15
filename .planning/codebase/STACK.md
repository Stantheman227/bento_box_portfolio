# Technology Stack

**Analysis Date:** 2026-02-15

## Languages

**Primary:**
- TypeScript ~5.6.2 - Full codebase (`.ts`, `.tsx` files)
- CSS/Tailwind - Styling

**Secondary:**
- JavaScript - PostCSS configuration

## Runtime

**Environment:**
- Node.js (version managed via environment, recommend LTS)
- Browser (ES2020+ target for client)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 18.3.1 - UI framework
- Vite 6.0.5 - Build tool and dev server

**UI/Animation:**
- Framer Motion 11.13.5 - Component animations and transitions
- Tailwind CSS 3.4.17 - Utility-first styling

**AI/Chat:**
- Vercel AI SDK (ai 6.0.73) - Streaming text responses and chat management
- @ai-sdk/react 3.0.75 - React hooks for AI SDK (`useChat`)
- @ai-sdk/google 3.0.21 - Google Generative AI integration

**Styling/Utilities:**
- clsx 2.1.1 - Conditional className joining
- tailwind-merge 2.6.0 - Tailwind class merging

## Key Dependencies

**Critical:**
- ai 6.0.73 - Core AI SDK for streaming, structured output, and message handling
- @ai-sdk/google 3.0.21 - Google Generative AI provider (Gemini models)
- @ai-sdk/react 3.0.75 - React integration for useChat hook, essential for chat functionality

**Infrastructure:**
- framer-motion 11.13.5 - Animation library for micro-interactions and page transitions
- tailwindcss 3.4.17 - CSS framework with extensive customization

**Development:**
- typescript 5.6.2 - Type checking and language support
- eslint 9.17.0 - Code linting
- postcss 8.4.49 - CSS transformation
- autoprefixer 10.4.20 - Vendor prefix automation

## Configuration

**Environment:**
- `GOOGLE_GENERATIVE_AI_API_KEY` - Required for Gemini API access (set in deployment environment)
- Theme preference stored in `localStorage` (key: 'theme')

**Build:**
- `vite.config.ts` - Vite configuration with React plugin and path aliasing (`@/` → `/src`)
- `tsconfig.json` - TypeScript compiler options with strict mode enabled
- `tailwind.config.ts` - Tailwind customization (custom color palette for bento grid)
- `postcss.config.js` - PostCSS plugins (Tailwind + autoprefixer)

**Linting:**
- ESLint configuration (ESLint JS + TypeScript + React hooks rules)

## Platform Requirements

**Development:**
- Node.js (v18+, v20+ recommended)
- npm or compatible package manager
- Modern terminal/shell for development commands
- Familiarity with TypeScript for contributions

**Production:**
- Deployment target: Vercel (optimized for edge runtime)
- API handler runs on edge runtime (`runtime: 'edge'`)
- Static asset hosting (HTML, CSS, JS)
- Environment variable support for `GOOGLE_GENERATIVE_AI_API_KEY`

---

*Stack analysis: 2026-02-15*
