# Coding Conventions

**Analysis Date:** 2026-02-15

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `NameCell.tsx`, `BentoGrid.tsx`, `ThemeToggle.tsx`)
- Utilities and helpers: camelCase (e.g., `utils.ts`, `animations.ts`, `portfolio.ts`)
- Context files: PascalCase with "Context" suffix (e.g., `ThemeContext.tsx`)
- Hook files: camelCase with "use" prefix (e.g., `useTheme.ts`, `useReducedMotion.ts`)

**Functions:**
- React components: PascalCase, named exports or default exports (e.g., `export default function App()`)
- Utility functions: camelCase (e.g., `function cn(...)`, `function getInitialTheme()`)
- Helper functions: camelCase (e.g., `getTextContent()`, `handleSubmit()`)
- Event handlers: camelCase with "handle" prefix (e.g., `handleChange()`, `handleSuggestion()`)

**Variables:**
- State variables: camelCase (e.g., `const [theme, setTheme]`, `const [input, setInput]`)
- Constants: camelCase for most cases (e.g., `const transport = new DefaultChatTransport()`)
- Template literal constants: camelCase (e.g., `const inputBase = '...'`)
- Exported constants: camelCase or SCREAMING_SNAKE_CASE when appropriate (e.g., `const expoOut = [0.16, 1, 0.3, 1]`)

**Types:**
- Type definitions: PascalCase (e.g., `type Theme = 'light' | 'dark'`, `interface ThemeContextValue`)
- React prop types: PascalCase with "Props" suffix (e.g., `interface BentoGridProps`)
- Generic types: PascalCase (e.g., `type Variants`, `type Transition`)

## Code Style

**Formatting:**
- No dedicated formatter configured (no Prettier, Biome, etc.)
- Line length: flexible, practical wrapping observed in code
- Spacing: 2 spaces for indentation (observed in all code)
- JSX formatting: multiline JSX with proper indentation

**Linting:**
- ESLint is configured in `package.json` with:
  - `@eslint/js` (v9.17.0)
  - `eslint-plugin-react-hooks` (v5.0.0)
  - `eslint-plugin-react-refresh` (v0.4.16)
  - `typescript-eslint` (v8.18.2)
  - `globals` (v15.14.0)
- No ESLint config file present (likely using flat config or defaults)
- Run: `npm run lint`

**TypeScript Strict Mode:**
- Strict mode enabled: `"strict": true` in `tsconfig.json`
- Additional constraints:
  - `"noUnusedLocals": true` - flags unused variables
  - `"noUnusedParameters": true` - flags unused parameters
  - `"noFallthroughCasesInSwitch": true` - prevents switch fall-through
  - `"noUncheckedSideEffectImports": true` - warns about side-effect imports

## Import Organization

**Order:**
1. React and React ecosystem (e.g., `import { useState } from 'react'`)
2. Third-party libraries (e.g., `import { motion } from 'framer-motion'`)
3. AI SDK imports (e.g., `import { useChat } from '@ai-sdk/react'`)
4. Local imports from siblings/parent (relative paths like `'./contexts/ThemeContext'`)
5. Local data imports (e.g., `from '../../../data/portfolio'`)

**Path Aliases:**
- Configured in `tsconfig.json`: `"@/*": ["./src/*"]`
- Not widely used in actual code (mostly relative imports observed)
- Example potential usage: `import { cn } from '@/lib/utils'`

**Type Imports:**
- Type imports use `import type` for type-only imports (e.g., `import type { ReactNode } from 'react'`)
- Example: `import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'`

## Error Handling

**Patterns:**
- Guard clauses with early return (e.g., `if (!context) throw new Error()`)
- Context validation: hooks throw descriptive errors when used outside provider
  - Example in `useTheme.ts`: `if (!context) throw new Error('useTheme must be used within ThemeProvider')`
- Try-catch for async operations:
  - `StatusCell.tsx`: Form submission wrapped in try-catch with error state management
  - Catch block (no param): `catch { setFormState('error') }`

**Error State Management:**
- State-based error handling: `formState` tracks 'idle', 'sending', 'sent', 'error'
- Error recovery: automatic reset to idle after 3 seconds: `setTimeout(() => setFormState('idle'), 3000)`
- User feedback: UI reflects error state with conditional rendering

**Fallback Components:**
- Suspense boundaries with fallback UI (e.g., `<Suspense fallback={<ChatFallback />}>``)
- Fallback shows loading state: gray text "Lade KI-Assistent..." in mono font

## Logging

**Framework:** No dedicated logging library configured

**Current Approach:**
- Minimal logging in production code
- No console statements observed in source code
- Error states handled through React component state, not logs

**Recommended Approach:**
- Use browser console only for development debugging
- Rely on error boundaries and error state in components
- Consider adding analytics/error tracking for production monitoring

## Comments

**When to Comment:**
- Inline comments explain non-obvious logic or design decisions
- Example in `StatusCell.tsx`: "Mobile: 16px (text-base) prevents iOS auto-zoom; desktop: compact 11px"
- Section comments with dashes: "─── Bento-specific animations ───" in `animations.ts`

**JSDoc/TSDoc:**
- Not extensively used
- Function parameters and return types are TypeScript-annotated
- Self-documenting code preferred where possible

**Comment Style:**
- Single-line comments: `// ─── [section] ───`
- Multiline intent comments: `// Mobile: [explanation]; Desktop: [explanation]`

## Function Design

**Size:** Compact functions preferred
- Average function size: 8-40 lines
- Largest component: `ChatCell.tsx` at 144 lines (includes JSX markup)
- Helper functions like `getTextContent()` are 5-7 lines

**Parameters:**
- Destructured where possible (e.g., `({ children }: BentoGridProps)`)
- Optional parameters typed explicitly (e.g., `interactive?: boolean`)
- Event handlers use typed parameters: `(e: FormEvent)`, `(e: React.ChangeEvent<HTMLInputElement>)`

**Return Values:**
- Explicit return types on functions
- React components: implicitly return JSX
- Utility functions return specific types (e.g., `function cn(...): string`)
- Conditional rendering: early returns for edge cases

## Module Design

**Exports:**
- Default export for all React components: `export default function ComponentName()`
- Named exports for utilities and hooks: `export function useTheme()`, `export const cn = (...) => {}`
- Context exports: `export const ThemeContext` and `export function ThemeProvider`

**Barrel Files:**
- Not used in this project
- Direct imports preferred from source files

**Directory Structure for Imports:**
- Components import from relative paths: `import Nav from './components/layout/Nav'`
- Data imports: `from '../../../data/portfolio'`
- Utility imports: `from '../../lib/animations'`, `from '../../lib/utils'`

## Tailwind CSS

**Styling Approach:**
- Tailwind CSS classes applied directly to elements
- Responsive modifiers: `md:`, `lg:`, `xl:`, `2xl:` for breakpoints
- Mobile-first design: base classes for mobile, then breakpoint modifiers

**Complex Class Combinations:**
- Array-based approach for multiline readability in `ProjectsCell.tsx`:
  ```typescript
  className={[
    'group/proj flex items-center gap-2.5',
    'py-2 lg:py-1 xl:py-1.5',
    i > 0 ? 'border-t border-white/10' : '',
  ].join(' ')}
  ```
- Utility function `cn()` used for merging Tailwind classes: `cn(base, conditional, className)`

**Custom Colors:**
- Defined in `tailwind.config.ts`:
  - `bento.*`: primary brand colors (blue, orange, pink, purple, sky)
  - `neutral.*`: grayscale colors (white, light, mid, dark, black)

## React Patterns

**Hooks:**
- Standard hooks: `useState`, `useContext`, `useEffect`, `useCallback`, `useRef`
- Custom hooks with "use" prefix
- Hook dependencies clearly specified: `useEffect(() => {...}, [messages])`

**Context Usage:**
- Context created with `createContext<T | null>(null)`
- Provider component wraps app tree
- Consumer hook guards against missing provider: `if (!context) throw new Error(...)`

**Lazy Loading:**
- Code splitting for heavy components: `const ChatCell = lazy(() => import('...'))`
- Suspense boundary with fallback UI

**Animation:**
- Framer Motion variants exported as constants: `export const fadeUp: Variants = {...}`
- Motion components use `variants`, `initial`, `animate` props
- Reduced motion support: `useReducedMotion()` hook disables animations for users with preference

## Data Organization

**Constants:**
- Portfolio data in dedicated file: `src/data/portfolio.ts`
- Exported as `const` with `as const` type assertion for immutability
- Structured data: arrays of objects with typed fields

**Example Data Structure:**
```typescript
export const experience = [
  {
    year: '2025',
    company: 'OMR Education',
    position: 'Frontend Developer & Automation Engineer',
    url: 'https://education.omr.com',
  },
] as const
```

---

*Convention analysis: 2026-02-15*
