# Codebase Structure

**Analysis Date:** 2026-02-15

## Directory Layout

```
piotrgosiewski/
├── src/                          # TypeScript React source code
│   ├── App.tsx                   # Root component: layout, grid structure
│   ├── main.tsx                  # Vite entry point: React root creation
│   ├── index.css                 # Tailwind directives + Bento grid CSS
│   ├── vite-env.d.ts             # Vite type definitions
│   ├── components/               # React components
│   │   ├── bento/                # Grid layout and cells
│   │   │   ├── BentoGrid.tsx     # Grid container with stagger animation
│   │   │   ├── BentoCell.tsx     # Individual cell wrapper
│   │   │   └── cells/            # Content components for each grid cell
│   │   │       ├── NameCell.tsx
│   │   │       ├── StatsCell.tsx
│   │   │       ├── SkillsCell.tsx
│   │   │       ├── AboutCell.tsx
│   │   │       ├── ProjectsCell.tsx
│   │   │       ├── ChatCell.tsx
│   │   │       ├── SocialCell.tsx
│   │   │       └── StatusCell.tsx
│   │   ├── layout/               # Global layout components
│   │   │   └── Nav.tsx           # Top navigation with theme toggle
│   │   └── ui/                   # Reusable UI components
│   │       └── ThemeToggle.tsx   # Dark/light mode button
│   ├── contexts/                 # React Context providers
│   │   └── ThemeContext.tsx      # Theme state management
│   ├── hooks/                    # Custom React hooks
│   │   ├── useTheme.ts           # Access theme context
│   │   └── useReducedMotion.ts   # Media query for animation preferences
│   ├── lib/                      # Utility functions and constants
│   │   ├── animations.ts         # Framer Motion variants and transitions
│   │   └── utils.ts              # cn() utility for Tailwind merging
│   ├── data/                     # Static portfolio data
│   │   └── portfolio.ts          # Constants: experience, projects, socials, etc.
│   └── styles/                   # CSS stylesheets (empty, all in index.css)
├── api/                          # Serverless API handlers
│   └── chat.ts                   # Vercel edge function: chat endpoint
├── public/                       # Static assets
│   ├── favicon.svg               # Browser tab icon
│   └── profile_foto_color.jpg    # Profile photo (referenced in NameCell)
├── index.html                    # HTML entry point
├── package.json                  # Project metadata and dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── vite.config.ts                # Vite bundler configuration
└── dist/                         # Build output (generated)
```

## Directory Purposes

**src/:**
- Purpose: All TypeScript/React source code
- Contains: Components, hooks, contexts, utilities, data, styling
- Key files: `App.tsx` (entry), `index.css` (global styles), `main.tsx` (React mount)

**src/components/:**
- Purpose: Reusable and page-level React components
- Contains: Component tree organized by feature (bento, layout, ui)
- Key files: All .tsx files (components are the primary code unit)

**src/components/bento/:**
- Purpose: Bento grid layout and cell management
- Contains: BentoGrid container, BentoCell wrapper, individual cell components
- Key files: `BentoGrid.tsx` (animation orchestration), `BentoCell.tsx` (grid positioning)

**src/components/bento/cells/:**
- Purpose: Content for each grid cell (8 cells total)
- Contains: Named cells that render specific portfolio sections
- Key files: One file per cell, imported and used in App.tsx

**src/components/layout/:**
- Purpose: Global layout elements
- Contains: Navigation bar with theme toggle
- Key files: `Nav.tsx`

**src/components/ui/:**
- Purpose: Standalone UI components (potentially reusable)
- Contains: Theme toggle button
- Key files: `ThemeToggle.tsx`

**src/contexts/:**
- Purpose: React Context providers for global state
- Contains: ThemeProvider and ThemeContext definition
- Key files: `ThemeContext.tsx`

**src/hooks/:**
- Purpose: Custom React hooks encapsulating logic
- Contains: useTheme (context consumer), useReducedMotion (media query listener)
- Key files: Custom hooks for composition in components

**src/lib/:**
- Purpose: Shared utilities and constants for components
- Contains: Animation definitions, styling utilities
- Key files: `animations.ts` (Framer Motion), `utils.ts` (cn utility)

**src/data/:**
- Purpose: Static portfolio content
- Contains: TypeScript const objects for all portfolio data
- Key files: `portfolio.ts` (single file with all data exports)

**api/:**
- Purpose: Serverless backend handlers (Vercel edge functions)
- Contains: Chat endpoint for AI responses
- Key files: `chat.ts` (POST /api/chat handler)

**public/:**
- Purpose: Static assets served by Vite
- Contains: Images, favicon (no code)
- Key files: `profile_foto_color.jpg`, `favicon.svg`

## Key File Locations

**Entry Points:**
- `index.html`: Browser HTML root
- `src/main.tsx`: React root and Vite entry
- `src/App.tsx`: Application root component
- `api/chat.ts`: Chat API endpoint

**Configuration:**
- `package.json`: Dependencies and scripts
- `tsconfig.json`: TypeScript compiler options
- `tailwind.config.ts`: Tailwind CSS theme and content
- `vite.config.ts`: Vite bundler settings

**Core Logic:**
- `src/App.tsx`: Grid layout structure and cell composition
- `src/contexts/ThemeContext.tsx`: Theme state management
- `src/components/bento/BentoGrid.tsx`: Animation orchestration
- `src/components/bento/cells/ChatCell.tsx`: AI chat integration (most complex)

**Styling:**
- `src/index.css`: Global styles, Tailwind directives, responsive grid layout
- `tailwind.config.ts`: Color palette, typography, theme extensions

**Data:**
- `src/data/portfolio.ts`: All portfolio content (experience, projects, socials)

## Naming Conventions

**Files:**
- Components: PascalCase.tsx (e.g., `ThemeToggle.tsx`, `BentoGrid.tsx`)
- Hooks: camelCase.ts with `use` prefix (e.g., `useTheme.ts`)
- Utilities: camelCase.ts (e.g., `animations.ts`, `utils.ts`)
- Data: camelCase.ts (e.g., `portfolio.ts`)
- Context: PascalCase.tsx with Context suffix (e.g., `ThemeContext.tsx`)
- API: camelCase.ts (e.g., `chat.ts`)

**Directories:**
- Components: PascalCase (e.g., `BentoGrid/`, `components/`)
- Features: lowercase (e.g., `bento/`, `layout/`)
- Utilities: lowercase (e.g., `lib/`, `hooks/`)
- API: lowercase (e.g., `api/`)

**Variables/Functions:**
- React components: PascalCase (e.g., `export default function NameCell()`)
- Functions: camelCase (e.g., `handleSubmit()`, `getInitialTheme()`)
- Hooks: camelCase with use prefix (e.g., `useTheme()`)
- Constants: UPPER_SNAKE_CASE (rare in this codebase; most data is in portfolio.ts as exports)

**CSS Classes:**
- Tailwind utility classes only (no custom .css classes outside Tailwind)
- Component layout: Grid areas as strings (e.g., `area="name"`, `area="stats"`)
- BEM-style groups: `group/name` (Framer Motion + Tailwind group utilities)

## Where to Add New Code

**New Feature (e.g., new grid cell):**
- Component code: `src/components/bento/cells/FeatureCell.tsx`
- Data: Add to `src/data/portfolio.ts` exports
- Grid layout: Add BentoCell in `src/App.tsx` with new area name
- CSS Grid: Add area definition to `.bento-grid` in `src/index.css`
- Animation: If custom, add variants to `src/lib/animations.ts`, import in component

**New Global State (beyond theme):**
- Provider: Create new file in `src/contexts/` (e.g., `UserContext.tsx`)
- Hook: Create corresponding hook in `src/hooks/` (e.g., `useUser.ts`)
- Usage: Wrap App or relevant subtree with provider in `src/App.tsx`

**New Utility/Helper:**
- Styling utilities: Add to `src/lib/utils.ts`
- Animation utilities: Add to `src/lib/animations.ts`
- Custom hooks: Create new file in `src/hooks/`

**New API Endpoint:**
- Handler: Create new file in `api/` (e.g., `api/subscribe.ts`)
- Import SDK/libraries as needed
- Return response compatible with client expectations
- Test via fetch/POST from ChatCell or new component

**New Dependency (npm package):**
- Add to package.json via `npm install`
- TypeScript types: Often auto-included or install @types/package-name
- Import in relevant files
- Update tsconfig.json if adding path aliases

## Special Directories

**dist/:**
- Purpose: Build output from Vite
- Generated: Yes (via `npm run build`)
- Committed: No (in .gitignore)
- Contents: HTML, JS, CSS bundles

**node_modules/:**
- Purpose: Installed npm packages
- Generated: Yes (via `npm install`)
- Committed: No (in .gitignore)
- Contents: All dependencies and their dependencies

**.git/:**
- Purpose: Git repository metadata
- Generated: Yes (git init)
- Committed: Yes (tracked by Git itself)

**.planning/:**
- Purpose: GSD codebase analysis and planning documents
- Generated: Yes (by /gsd:map-codebase and /gsd:plan-phase)
- Committed: Yes (tracked in Git)
- Contents: ARCHITECTURE.md, STRUCTURE.md, etc.

**.env files:**
- Purpose: Environment variables (not committed for security)
- Committed: No (in .gitignore)
- Note: GOOGLE_GENERATIVE_AI_API_KEY must be set for chat endpoint

---

*Structure analysis: 2026-02-15*
