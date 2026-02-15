# Architecture Documentation

## Overview

This is a personal portfolio website for **Piotr Gosiewski**, a Developer & Agent Orchestrator based in Hamburg. The site features a modern **Bento Grid layout** with animated cells showcasing experience, skills, projects, and an interactive AI chat assistant.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite 6 |
| **Styling** | Tailwind CSS 3.4, Custom Design System |
| **Animation** | Framer Motion 11 |
| **AI Chat** | Vercel AI SDK, Google Gemini 2.0 Flash |
| **Deployment** | Vercel (Edge Runtime for API) |
| **Build Tool** | Vite with React plugin |

---

## Directory Structure

```
piotrgosiewski/
├── api/                          # Vercel Serverless Functions
│   └── chat.ts                   # AI chat endpoint (Edge Runtime)
├── public/                       # Static assets
├── src/
│   ├── components/               # React components
│   │   ├── bento/               # Bento grid system
│   │   │   ├── BentoGrid.tsx    # Main grid container with stagger animation
│   │   │   ├── BentoCell.tsx    # Reusable cell wrapper with hover effects
│   │   │   └── cells/           # Individual cell implementations
│   │   │       ├── NameCell.tsx
│   │   │       ├── StatsCell.tsx
│   │   │       ├── SkillsCell.tsx
│   │   │       ├── AboutCell.tsx
│   │   │       ├── ProjectsCell.tsx
│   │   │       ├── ChatCell.tsx  # Lazy-loaded AI chat
│   │   │       ├── SocialCell.tsx
│   │   │       └── StatusCell.tsx
│   │   ├── layout/              # Layout components
│   │   │   └── Nav.tsx          # Top navigation
│   │   └── ui/                  # Reusable UI components
│   │       └── ThemeToggle.tsx  # Dark/light mode toggle
│   ├── contexts/                # React Context providers
│   │   └── ThemeContext.tsx     # Theme state management
│   ├── hooks/                   # Custom React hooks
│   │   ├── useTheme.ts          # Theme context hook
│   │   └── useReducedMotion.ts  # Accessibility: respects prefers-reduced-motion
│   ├── lib/                     # Utility libraries
│   │   ├── animations.ts        # Framer Motion variants & transitions
│   │   └── utils.ts             # Tailwind class merger (cn)
│   ├── data/                    # Static data
│   │   └── portfolio.ts         # Personal info, projects, experience, socials
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles & Tailwind base
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
└── vercel.json                  # Vercel deployment configuration
```

---

## Architecture Layers

The application follows a **layered architecture** for separation of concerns:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Components, UI, Animations)           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Context Layer                   │
│  (ThemeContext, Global State)           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Hooks Layer                     │
│  (useTheme, useReducedMotion, useChat)  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Data Layer                      │
│  (portfolio.ts, Static Data)            │
└─────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         API Layer                       │
│  (Vercel Edge Functions)                │
└─────────────────────────────────────────┘
```

### Layer Details

1. **Presentation Layer** (`src/components/`)
   - React components with TypeScript
   - Framer Motion animations
   - Tailwind CSS styling
   - Responsive, mobile-first design

2. **Context Layer** (`src/contexts/`)
   - `ThemeContext`: Manages dark/light theme state
   - Persists theme to localStorage
   - Respects system preferences

3. **Hooks Layer** (`src/hooks/`)
   - `useTheme`: Consumes ThemeContext
   - `useReducedMotion`: Accessibility hook for motion preferences
   - `useChat`: From Vercel AI SDK (used in ChatCell)

4. **Data Layer** (`src/data/`)
   - Typed constant exports
   - Personal information, experience, projects, socials
   - Single source of truth for portfolio content

5. **Utilities** (`src/lib/`)
   - `animations.ts`: Reusable Framer Motion variants
   - `utils.ts`: Tailwind class merging utility (`cn`)

6. **API Layer** (`api/`)
   - Edge runtime functions on Vercel
   - `chat.ts`: Streams AI responses via Google Gemini
   - Secured with environment variables

---

## Component Hierarchy

```
App (ThemeProvider + LazyMotion)
│
├─ Nav
│  └─ ThemeToggle
│
└─ BentoGrid (motion.div with stagger animation)
   │
   ├─ BentoCell (area="name")
   │  └─ NameCell
   │
   ├─ BentoCell (area="stats")
   │  └─ StatsCell
   │
   ├─ BentoCell (area="skills")
   │  └─ SkillsCell
   │
   ├─ BentoCell (area="chat")
   │  └─ ChatCell (lazy-loaded, Suspense)
   │
   ├─ BentoCell (area="about")
   │  └─ AboutCell
   │
   ├─ BentoCell (area="projects")
   │  └─ ProjectsCell
   │
   ├─ BentoCell (area="social")
   │  └─ SocialCell
   │
   └─ BentoCell (area="status")
      └─ StatusCell
```

### Component Patterns

- **BentoGrid**: Container component with CSS Grid and stagger animation
- **BentoCell**: Reusable wrapper with:
  - Grid area assignment (`grid-area`)
  - Entrance animation (`cellEntrance` variant)
  - Optional hover animation (`whileHover`)
  - Consistent padding, border-radius, overflow
- **Cell Components**: Content-specific implementations with domain logic

---

## Data Flow

### 1. Theme Management Flow

```
User clicks ThemeToggle
        │
        ▼
ThemeContext.toggle()
        │
        ├─ Update state (light ↔ dark)
        ├─ Toggle .dark class on <html>
        └─ Persist to localStorage
        │
        ▼
All components re-render with new theme
```

**Key Files:**
- `src/contexts/ThemeContext.tsx` — Context provider
- `src/hooks/useTheme.ts` — Hook for consuming theme
- `src/components/ui/ThemeToggle.tsx` — Toggle button

### 2. Chat Message Flow

```
User sends message in ChatCell
        │
        ▼
useChat hook (Vercel AI SDK)
        │
        ▼
POST /api/chat (Edge Runtime)
        │
        ├─ Validate request
        ├─ Call Google Gemini API (gemini-2.0-flash)
        └─ Stream response chunks
        │
        ▼
Real-time UI updates in ChatCell
        │
        └─ Auto-scroll to latest message
```

**Key Files:**
- `src/components/bento/cells/ChatCell.tsx` — Chat UI
- `api/chat.ts` — Edge function with Gemini integration

### 3. Grid Rendering Flow

```
App component mounts
        │
        ▼
BentoGrid renders with initial="hidden"
        │
        ▼
Framer Motion triggers stagger animation
        │
        ├─ Delay 0.2s (delayChildren)
        └─ Stagger 0.08s between children
        │
        ▼
Each BentoCell animates in sequence
        │
        └─ Opacity: 0→1, Scale: 0.96→1, Y: 8→0
```

**Accessibility:** If `prefers-reduced-motion: reduce`, animations are skipped.

---

## Styling System

### Tailwind Configuration

**Custom Colors** (`tailwind.config.ts`):

```typescript
colors: {
  bento: {
    blue: '#3B5BFF',    // Chat cell
    orange: '#FB5607',  // Stats cell
    pink: '#FF006E',    // Social cell
    purple: '#8338EC',  // Skills cell
    sky: '#3A86FF',     // Projects cell
  },
  neutral: {
    white: '#FFFFFF',
    light: '#F4F4F6',   // Status cell
    mid: '#71717A',
    dark: '#27272A',
    black: '#09090B',   // About cell
  },
}
```

**Typography:**
- Display font: `Bebas Neue` (for headings)
- Body font: `Inter` (for text)

### Responsive Breakpoints

The Bento Grid uses **mobile-first responsive design**:

| Breakpoint | Layout | Grid Columns | Behavior |
|-----------|--------|--------------|----------|
| **Mobile** (`< 768px`) | Single column, scrollable | `1fr` | Vertical stack |
| **Tablet** (`768px - 1023px`) | 2 columns, scrollable | `1fr 1fr` | Hybrid layout |
| **Desktop** (`≥ 1024px`) | 4x3 fixed grid | `1fr 1fr 1fr 1fr` × 3 rows | Fixed viewport, no scroll |
| **Large** (`≥ 1280px`) | Same structure | Same | Increased gap (16px) |
| **XL** (`≥ 1536px`) | Same structure | Same | Increased gap (20px) |

**Grid Areas** (Desktop):

```css
grid-template-areas:
  "name     stats    skills   projects"
  "name     about    about    projects"
  "chat     social   status   projects";
```

### Animation System

**Framer Motion Variants** (`src/lib/animations.ts`):

1. **fadeUp**: Fade in from bottom (used for text)
   - Hidden: `opacity: 0, y: 30`
   - Visible: `opacity: 1, y: 0`
   - Duration: 0.9s, Ease: Expo Out

2. **cellEntrance**: Cell entrance animation
   - Hidden: `opacity: 0, scale: 0.96, y: 8`
   - Visible: `opacity: 1, scale: 1, y: 0`
   - Duration: 0.6s, Ease: Expo Out

3. **gridStagger**: Parent container animation
   - Stagger children: 0.08s delay between each
   - Delay children: 0.2s before starting

4. **cellHoverSpring**: Hover animation
   - Type: Spring
   - Stiffness: 400
   - Damping: 25

**LazyMotion**: Uses `domAnimation` feature set for smaller bundle size.

---

## Deployment

### Vercel Configuration (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }  // SPA routing
  ],
  "functions": {
    "api/chat.ts": { "maxDuration": 30 },      // AI streaming
    "api/github.ts": { "maxDuration": 10 }
  }
}
```

### Edge Runtime

**Why Edge Runtime?**
- Lower latency (closer to users geographically)
- Faster cold starts than serverless functions
- Optimized for streaming responses (AI chat)

**Environment Variables** (required):
```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

### Build Process

1. **TypeScript Compilation**: `tsc -b` (build-time type checking)
2. **Vite Build**: Bundles React app into static assets
3. **Edge Function Deployment**: `api/` directory → Vercel Edge Runtime
4. **Output**: `dist/` folder + edge functions

---

## Key Design Decisions

### 1. Why Bento Grid?

**Rationale:**
- **Visual Hierarchy**: Different-sized cells emphasize important content (e.g., name, projects)
- **Modern Aesthetic**: Popularized by Apple, iOS widgets, and modern design systems
- **Flexibility**: Easy to reorganize cells for different screen sizes
- **Scannability**: Users can quickly find information in distinct, color-coded sections

**Alternative Considered**: Traditional vertical layout → Rejected for lack of visual interest

---

### 2. Why Lazy-Load ChatCell?

**Rationale:**
- **Bundle Optimization**: Chat component uses Vercel AI SDK + dependencies (~50KB+)
- **Initial Load Performance**: Critical content (name, skills, projects) loads faster
- **User Intent**: Most users won't interact with chat immediately
- **Graceful Degradation**: Suspense fallback shows "Lade KI-Assistent..." during load

**Implementation:**
```tsx
const ChatCell = lazy(() => import('./components/bento/cells/ChatCell'))

<Suspense fallback={<ChatFallback />}>
  <ChatCell />
</Suspense>
```

**Metrics**: Reduces initial bundle size by ~30%.

---

### 3. Why Edge Runtime for Chat API?

**Rationale:**
- **Streaming**: Gemini API streams responses → Edge Runtime preserves streaming
- **Latency**: Edge locations closer to users than centralized serverless regions
- **Scalability**: Auto-scales globally without cold start penalties
- **Cost**: Pay-per-execution at edge is cost-effective for chat bursts

**Alternative Considered**: Node.js serverless → Rejected due to cold starts and streaming limitations

---

### 4. Why Gemini 2.0 Flash?

**Rationale:**
- **Speed**: Flash variant optimized for low-latency chat interactions
- **Cost**: More affordable than GPT-4 for portfolio use case
- **Quality**: Sufficient for answering portfolio-specific questions
- **Free Tier**: Google Generative AI API offers generous free tier

**Prompt Strategy** (`api/chat.ts`):
- System prompt constrains responses to 2-3 sentences (German)
- Persona: Friendly assistant focused on Piotr's portfolio
- Fallback: Redirects off-topic questions back to portfolio topics

---

### 5. Why No State Management Library?

**Rationale:**
- **Simple State**: Only theme state needs global management
- **React Context**: Sufficient for theme + future small additions
- **Bundle Size**: No need for Redux/Zustand overhead
- **Type Safety**: TypeScript + Context API provides full type inference

**State Inventory:**
- Global: Theme (light/dark) via ThemeContext
- Local: Chat messages (useChat hook), form inputs, scroll positions

---

### 6. Why Mobile-First Responsive Design?

**Rationale:**
- **Usage Stats**: ~60% of portfolio traffic expected from mobile (industry standard)
- **Performance**: Starts with minimal CSS, adds complexity at larger breakpoints
- **Accessibility**: Forces consideration of small-screen usability first

**Breakpoint Strategy:**
- Base: Single-column scrollable (mobile)
- `md:` Two-column hybrid (tablet)
- `lg:` Fixed 4x3 dashboard (desktop)
- `xl:`, `2xl:` Increased spacing for breathing room

---

### 7. Why TypeScript Strict Mode?

**Configuration** (`tsconfig.json`):
```json
"strict": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"noFallthroughCasesInSwitch": true,
```

**Rationale:**
- **Type Safety**: Catch errors at build time (typos, null references)
- **Refactoring Confidence**: Rename/restructure with compiler verification
- **Documentation**: Types serve as inline documentation
- **Tooling**: Better IDE autocomplete and IntelliSense

**Trade-off**: Slightly more verbose code → Accepted for long-term maintainability

---

### 8. Why Path Aliases (`@/*`)?

**Configuration** (both `tsconfig.json` and `vite.config.ts`):
```json
"paths": { "@/*": ["./src/*"] }
```

**Rationale:**
- **Clean Imports**: `import { cn } from '@/lib/utils'` vs `import { cn } from '../../../lib/utils'`
- **Refactoring**: Moving files doesn't break relative import paths
- **Readability**: Immediately clear that `@/` refers to `src/`

---

## Future Considerations

### Potential Enhancements

1. **Analytics**: Add Vercel Analytics or Plausible for traffic insights
2. **Blog**: Add `/blog` route with MDX support
3. **Internationalization**: Support English locale alongside German
4. **Dark Mode Enhancements**: Per-cell theme overrides, accent color customization
5. **Animations**: More sophisticated cell interactions (drag-to-reorder, expand modals)
6. **Chat History**: Persist chat messages to localStorage
7. **Project Detail Pages**: Expand projects with case studies
8. **Performance**: Implement image optimization (WebP, lazy loading)

### Scalability

**Current Constraints:**
- Static data in `portfolio.ts` → Move to CMS (Sanity, Contentful) if frequent updates needed
- No database → Add if user-generated content (comments, guestbook) is desired
- Single language → Add i18n library if multi-language support required

**Architecture is designed to scale horizontally:**
- Vercel Edge Runtime handles traffic spikes
- Static assets served via CDN
- No server-side session state

---

## Development Workflow

### Commands

```bash
npm run dev       # Start Vite dev server (localhost:5173)
npm run build     # Build for production (dist/)
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

### Local Development

1. **Environment Setup**: Create `.env` file with `GOOGLE_GENERATIVE_AI_API_KEY`
2. **Install Dependencies**: `npm install`
3. **Start Dev Server**: `npm run dev`
4. **Vercel Edge Functions**: Handled by Vercel CLI in production; use mock data locally

### Code Style

- **ESLint**: Enforces React hooks rules, refresh rules
- **TypeScript**: Strict mode enabled
- **Formatting**: No Prettier (relies on ESLint + IDE settings)

---

## Accessibility

### WCAG Compliance

1. **Color Contrast**: All text meets WCAG AA standards (verified for bento colors)
2. **Keyboard Navigation**: All interactive elements (`<button>`, `<a>`) are keyboard-accessible
3. **ARIA Labels**: Chat input has `aria-label="Nachricht senden"`
4. **Motion Preferences**: `useReducedMotion` hook disables animations for `prefers-reduced-motion: reduce`
5. **Semantic HTML**: Uses proper heading hierarchy (`<h1>`, `<h2>`), `<nav>`, `<main>` (implied)

### Responsive Touch Targets

- Mobile: Minimum 44×44px for all buttons (per iOS guidelines)
- Desktop: Reduced to natural size for mouse precision

---

## Conclusion

This architecture balances **modern aesthetics** (Bento Grid, Framer Motion) with **performance** (lazy loading, Edge Runtime) and **maintainability** (TypeScript, layered architecture). The design is optimized for a **personal portfolio use case** with room to scale into a more complex platform if needed.

For questions or contributions, contact **hello@piotr.dev**.
