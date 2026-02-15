# Architecture

**Analysis Date:** 2026-02-15

## Pattern Overview

**Overall:** Component-Driven Bento Grid Portfolio with Context-Based State Management

**Key Characteristics:**
- React 18 SPA with lazy-loaded AI chat integration
- Responsive grid layout that adapts from mobile single-column to desktop 4x3 fixed viewport
- Framer Motion for entrance animations with reduced-motion support
- AI-powered chat via Vercel AI SDK (Google Gemini) with streaming responses
- Centralized portfolio data in TypeScript constants
- Context API for theme (light/dark) management
- Vite as build tool with hot module replacement

## Layers

**Presentation Layer (Components):**
- Purpose: Render UI elements with Tailwind CSS styling and Framer Motion animations
- Location: `src/components/`
- Contains: Bento grid layout, individual cell components, navigation, theme toggle
- Depends on: Context (theme), hooks (useTheme, useReducedMotion), utilities (cn, animations)
- Used by: App.tsx

**Context Layer (State Management):**
- Purpose: Manage global application state (theme preference)
- Location: `src/contexts/ThemeContext.tsx`
- Contains: Theme provider, context definition, initial theme detection from localStorage
- Depends on: React hooks (useState, useEffect, useContext)
- Used by: App.tsx, ThemeToggle, other components via useTheme hook

**Hooks Layer (Custom Logic):**
- Purpose: Encapsulate reusable React logic and media query subscriptions
- Location: `src/hooks/`
- Contains: useTheme (access theme context), useReducedMotion (respect accessibility preferences)
- Depends on: React hooks, context
- Used by: Components throughout the app

**Data Layer:**
- Purpose: Store portfolio constants (personal info, experience, projects, socials)
- Location: `src/data/portfolio.ts`
- Contains: TypeScript const objects with portfolio content
- Depends on: Nothing (pure data)
- Used by: Individual cell components (StatsCell, ProjectsCell, etc.)

**Utilities Layer:**
- Purpose: Provide helper functions for styling and animation
- Location: `src/lib/`
- Contains: Animation definitions (Framer Motion variants), className utilities (cn)
- Depends on: clsx, tailwind-merge, Framer Motion
- Used by: Components throughout the app

**API Layer:**
- Purpose: Handle server-side chat processing via edge function
- Location: `api/chat.ts`
- Contains: Vercel edge function that streams text from Google Gemini
- Depends on: Vercel AI SDK (ai, @ai-sdk/google)
- Used by: ChatCell via useChat hook

## Data Flow

**Theme Management:**

1. App mounts → ThemeProvider initializes
2. getInitialTheme() checks localStorage → falls back to system preference
3. Theme state stored in localStorage on change
4. Root element gets 'dark' class based on theme
5. ThemeToggle accesses theme via useTheme hook → calls toggle callback
6. Components use dark: CSS modifiers to adjust colors

**Chat Message Flow:**

1. User types in ChatCell input and submits form
2. sendMessage() from useChat hook sends POST to `/api/chat`
3. Request includes message history and user message
4. Edge function `/api/chat` receives request
5. Calls streamText with Google Gemini model and system prompt
6. Response streams back as UIMessageStreamResponse
7. Messages rendered in chat component with auto-scroll
8. Suggested questions appear on initial load

**Grid Layout Rendering:**

1. BentoGrid receives children (BentoCells) and manages staggered animation
2. Each BentoCell positioned via CSS Grid `grid-area` property
3. CSS Grid layout defined in index.css with responsive breakpoints
4. Desktop (lg+): Fixed 4x3 viewport layout; Tablet (md): 2-column scrollable; Mobile: Single column
5. Framer Motion applies cellEntrance variants with stagger effect
6. useReducedMotion disables animations if user prefers reduced motion

**Portfolio Data Display:**

1. Data imported from `src/data/portfolio.ts`
2. Each cell component maps over relevant data (experience[], projects[], socials[])
3. Components render UI with Tailwind classes
4. Links open in new tabs or navigate internally

**State Management:**

- Theme state: Stored in Context + localStorage (persists across sessions)
- Form state: Local component state in StatusCell (contact form) and ChatCell (chat input)
- Message history: Managed by useChat hook in ChatCell
- No global app state beyond theme

## Key Abstractions

**BentoCell:**
- Purpose: Reusable container for grid cells with animation and accessibility
- Examples: `src/components/bento/BentoCell.tsx`
- Pattern: Motion div with grid-area positioning, cellEntrance animation, optional hover state

**Cell Components:**
- Purpose: Display specific content (name, stats, skills, projects, chat, social, contact)
- Examples: `src/components/bento/cells/*.tsx`
- Pattern: Functional components that import data and render static/interactive content

**ThemeProvider + useTheme:**
- Purpose: Centralize theme state and provide hooks for consumption
- Examples: `src/contexts/ThemeContext.tsx`, `src/hooks/useTheme.ts`
- Pattern: Context API + custom hook for clean consumption in components

**Animation Variants:**
- Purpose: Centralize Framer Motion animation definitions
- Examples: `src/lib/animations.ts` (fadeUp, cellEntrance, gridStagger, cellHoverSpring)
- Pattern: Exported Variants and Transition objects for reuse across components

**Tailwind cn() Utility:**
- Purpose: Merge Tailwind classes without conflicts (clsx + tailwind-merge)
- Examples: `src/lib/utils.ts`
- Pattern: Utility function for safe class composition (handles dark: prefixes, arbitrary values)

## Entry Points

**Browser:**
- Location: `index.html`
- Triggers: Browser request to portfolio site
- Responsibilities: HTML document structure, loads Vite module

**React App:**
- Location: `src/main.tsx`
- Triggers: Vite entry point
- Responsibilities: Creates React root, mounts App component

**App Component:**
- Location: `src/App.tsx`
- Triggers: React mount
- Responsibilities: Provides ThemeProvider context, LazyMotion setup, renders Nav + BentoGrid

**API Endpoint:**
- Location: `api/chat.ts`
- Triggers: POST request from ChatCell to `/api/chat`
- Responsibilities: Stream chat response from Google Gemini with system prompt context

## Error Handling

**Strategy:** Graceful degradation with fallbacks

**Patterns:**
- Chat error state: Error message displayed in ChatCell, fallback to email contact link
- Missing data: Cells render empty if data is unavailable (no runtime errors)
- API failures: useChat hook captures error status, surfaces in UI
- Theme detection: Falls back to light mode if localStorage unavailable
- Reduced motion detection: Uses try-catch around matchMedia, defaults to false

## Cross-Cutting Concerns

**Logging:** console methods (no centralized logging framework; console.error for development)

**Validation:**
- Contact form validates required fields (name, email, subject) before submit
- Chat input trimmed and checked for empty strings before sending
- Email validation at HTML input level only

**Authentication:**
- None (public portfolio site)
- API key for Google Gemini stored in env var (GOOGLE_GENERATIVE_AI_API_KEY)

**Accessibility:**
- Semantic HTML (nav, form, img alt text)
- ARIA labels for interactive elements (ThemeToggle, ChatCell buttons)
- aria-live="polite" on chat messages
- Reduced motion respected via useReducedMotion hook
- Touch-friendly button sizes on mobile (44px minimum)

**Performance:**
- ChatCell lazy-loaded with Suspense boundary
- Framer Motion uses domAnimation (no heavy 3D)
- Grid uses CSS Grid (native browser rendering)
- Images use object-fit for responsive behavior

---

*Architecture analysis: 2026-02-15*
