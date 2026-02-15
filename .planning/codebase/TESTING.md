# Testing Patterns

**Analysis Date:** 2026-02-15

## Test Framework

**Status:** No testing framework configured

**Current Setup:**
- No test runner installed (Jest, Vitest, etc.)
- No test files in source code
- No test configuration files (`jest.config.js`, `vitest.config.ts`, etc.)
- No testing libraries in `package.json`

**Implications:**
- All testing is manual/browser-based currently
- Test infrastructure will need to be added for automated testing

## Test Infrastructure Needed

To add testing to this project, the following should be installed:

**For Unit Testing:**
```bash
npm install --save-dev vitest @vitest/ui
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev jsdom  # for DOM simulation
```

**For Component Testing:**
- Use `@testing-library/react` for component testing
- Follow React Testing Library principles: test user interactions, not implementation

## Manual Testing Approach (Current)

**What's Being Tested Manually:**

1. **Theme Toggle (`src/components/ui/ThemeToggle.tsx`)**
   - Light/dark mode toggle
   - localStorage persistence
   - Initial theme detection from system preferences
   - Manual test: Click toggle, refresh page, verify theme persists

2. **Form Submission (`src/components/bento/cells/StatusCell.tsx`)**
   - Form validation (name, email, subject required)
   - Submit button disabled when form invalid
   - Form state transitions: idle → sending → sent → idle
   - Error handling with 3-second recovery
   - Manual test: Fill form, submit, verify states update

3. **Chat Component (`src/components/bento/cells/ChatCell.tsx`)**
   - Message input and submission
   - Suggested questions clickable
   - Message display with role differentiation
   - Error fallback UI when API unavailable
   - Auto-scroll to latest message
   - Manual test: Type message, click send, verify appears in chat

4. **Responsive Layout**
   - Mobile-first design with breakpoints
   - BentoGrid layout adjusts at md, lg, xl, 2xl
   - Component padding and sizing responsive
   - Manual test: Use DevTools device emulation at 375px, 768px, 1024px, 1440px, 1920px

5. **Animations**
   - Fade-up animations on initial load
   - Cell entrance animations with stagger
   - Hover effects on interactive elements
   - Reduced motion preference respected
   - Manual test: Check animation smoothness, verify respects prefers-reduced-motion

6. **Accessibility**
   - ARIA labels on buttons: `aria-label="Nachricht senden"`
   - ARIA live regions: `role="log" aria-live="polite"` on chat messages
   - Semantic HTML: proper form elements, links with target/rel attributes
   - Manual test: Screen reader testing, keyboard navigation

## Testing Gaps

**No Automated Tests For:**

1. **Component Rendering**
   - NameCell displays profile image with hover effect
   - StatsCell renders experience timeline correctly
   - ProjectsCell maps and displays projects with links

2. **State Management**
   - Theme context provider/consumer interaction
   - Form state transitions (idle/sending/sent/error)
   - Chat message history accumulation

3. **User Interactions**
   - Form field input and onChange handling
   - Button click handlers (submit, theme toggle, social links)
   - Keyboard interactions (Enter to submit forms)

4. **Integration**
   - Chat API communication with `/api/chat` endpoint
   - Theme persistence in localStorage
   - External link navigation

5. **Edge Cases**
   - Empty message submission
   - Network errors in chat
   - Missing localStorage (private browsing)
   - Rapid form submissions

## Recommended Testing Strategy

### Phase 1: Foundation
1. Set up Vitest + React Testing Library
2. Create utility test helpers for common patterns
3. Add `setupTests.ts` for global test configuration

### Phase 2: Critical Path
1. Test form submission flow in `StatusCell`
2. Test theme context and toggle in `ThemeContext`/`ThemeToggle`
3. Test chat input and message rendering in `ChatCell`

### Phase 3: Component Coverage
1. Test all cell components render without errors
2. Test responsive behavior at key breakpoints
3. Test animation state changes with `useReducedMotion`

### Phase 4: Integration
1. Test API communication mocking
2. Test localStorage integration
3. Test component composition in `App.tsx`

## Code Areas Suitable for Testing

**High Priority (Core Features):**
- `src/components/bento/cells/ChatCell.tsx` (144 lines) - Chat functionality
- `src/components/bento/cells/StatusCell.tsx` (97 lines) - Form handling
- `src/contexts/ThemeContext.tsx` (37 lines) - State management
- `src/hooks/useTheme.ts` (9 lines) - Hook error handling

**Medium Priority (UI Components):**
- `src/components/bento/BentoCell.tsx` (35 lines) - Cell container, animations
- `src/components/bento/cells/ProjectsCell.tsx` (77 lines) - List rendering
- `src/components/bento/cells/StatsCell.tsx` (38 lines) - Experience timeline

**Low Priority (Simple Presentational):**
- `src/components/bento/cells/NameCell.tsx` (21 lines)
- `src/components/bento/cells/SkillsCell.tsx` (14 lines)
- `src/components/bento/cells/AboutCell.tsx` (18 lines)
- `src/components/bento/cells/SocialCell.tsx` (38 lines)

## Suggested Test Structure

### File Organization
```
src/
├── components/
│   ├── bento/
│   │   ├── BentoCell.tsx
│   │   ├── BentoCell.test.tsx
│   │   ├── cells/
│   │   │   ├── ChatCell.tsx
│   │   │   ├── ChatCell.test.tsx
│   │   │   ├── StatusCell.tsx
│   │   │   └── StatusCell.test.tsx
├── contexts/
│   ├── ThemeContext.tsx
│   ├── ThemeContext.test.tsx
├── hooks/
│   ├── useTheme.ts
│   ├── useTheme.test.ts
│   ├── useReducedMotion.ts
│   └── useReducedMotion.test.ts
└── __tests__/
    ├── setup.ts
    └── test-utils.tsx
```

### Test File Pattern
Co-locate test files next to source files with `.test.tsx` suffix

### Test Utilities
Create `src/__tests__/test-utils.tsx`:
```typescript
import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '../contexts/ThemeContext'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

## Testing API Interactions

**ChatCell API Setup:**

Mock the `/api/chat` endpoint for testing:

```typescript
import { DefaultChatTransport } from 'ai'
import { vi } from 'vitest'

// Mock transport
vi.mock('ai', () => ({
  DefaultChatTransport: vi.fn()
}))

// Test expects transport to be created:
// const transport = new DefaultChatTransport({ api: '/api/chat' })
```

## Testing localStorage

**ThemeContext localStorage tests:**

```typescript
beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

it('persists theme to localStorage', () => {
  render(<ThemeProvider><ChildComponent /></ThemeProvider>)
  // verify localStorage.setItem called with correct value
})

it('restores theme from localStorage on mount', () => {
  localStorage.setItem('theme', 'dark')
  render(<ThemeProvider><ChildComponent /></ThemeProvider>)
  // verify dark theme is applied
})
```

## Testing Animations

**useReducedMotion hook:**

```typescript
it('respects prefers-reduced-motion', () => {
  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }))
  })

  const { result } = renderHook(() => useReducedMotion())
  expect(result.current).toBe(true)
})
```

## Testing Form Validation

**StatusCell form tests:**

```typescript
it('disables submit when form is empty', () => {
  render(<StatusCell />)
  const submitButton = screen.getByRole('button', { name: /absenden/i })
  expect(submitButton).toBeDisabled()
})

it('enables submit when all fields filled', async () => {
  render(<StatusCell />)
  const nameInput = screen.getByPlaceholderText('Name')
  const emailInput = screen.getByPlaceholderText('Email')
  const subjectInput = screen.getByPlaceholderText('Anliegen')

  await userEvent.type(nameInput, 'John Doe')
  await userEvent.type(emailInput, 'john@example.com')
  await userEvent.type(subjectInput, 'Hello')

  const submitButton = screen.getByRole('button', { name: /absenden/i })
  expect(submitButton).toBeEnabled()
})

it('shows loading state during submission', async () => {
  render(<StatusCell />)
  // fill form and submit
  await userEvent.click(screen.getByRole('button', { name: /absenden/i }))
  expect(screen.getByRole('button')).toHaveTextContent('Sende...')
})
```

## Testing Accessibility

**ARIA attributes tests:**

```typescript
it('has proper ARIA labels', () => {
  render(<StatusCell />)
  const submitButton = screen.getByRole('button', { name: /absenden/i })
  expect(submitButton).toBeInTheDocument()
})

it('chat messages have live region', () => {
  render(<ChatCell />)
  const messagesContainer = screen.getByRole('log')
  expect(messagesContainer).toHaveAttribute('aria-live', 'polite')
})
```

## Performance Testing

**No performance benchmarks currently configured**

**Recommended metrics to track:**
- Component render time
- Animation frame rate (60fps target)
- Lighthouse scores (Core Web Vitals)
- Bundle size impact of new features

---

*Testing analysis: 2026-02-15*
