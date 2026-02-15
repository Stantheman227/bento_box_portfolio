# Codebase Concerns

**Analysis Date:** 2026-02-15

## Tech Debt

**Form submission not actually sending emails:**
- Issue: Contact form in `src/components/bento/cells/StatusCell.tsx` only simulates submission with `setTimeout(resolve, 800)` - no actual HTTP request or backend integration
- Files: `src/components/bento/cells/StatusCell.tsx` (lines 29-39)
- Impact: User submissions are silently discarded. No contact form functionality works despite UI indicating success
- Fix approach: Replace setTimeout simulation with actual API call to Formspree, Vercel Functions, or custom email service. Add proper error handling and validation

**Disconnected API endpoint configuration:**
- Issue: `vercel.json` references `api/github.ts` endpoint (line 12-14) but file doesn't exist; also defines 10s timeout
- Files: `vercel.json`, missing `api/github.ts`
- Impact: Dead endpoint configuration creates confusion; if that endpoint is supposed to do something, it silently fails
- Fix approach: Either remove unused github.ts from vercel.json or create the endpoint implementation

**Hardcoded Google AI API key exposed in handler:**
- Issue: Chat API handler reads `process.env.GOOGLE_GENERATIVE_AI_API_KEY` at import time without validation
- Files: `api/chat.ts` (line 10)
- Impact: If env var is missing, error occurs at runtime. No fallback or graceful degradation
- Fix approach: Add validation at handler start with meaningful error response instead of letting process fail

**No input validation in form fields:**
- Issue: StatusCell form accepts any text input without sanitization or validation beyond `.trim()` check
- Files: `src/components/bento/cells/StatusCell.tsx` (lines 53-82)
- Impact: Malicious input (XSS, long strings) can be submitted; email field accepts non-emails
- Fix approach: Add Zod schema validation, HTML5 email validation, string length limits, and XSS sanitization before submission

**Portfolio data contains placeholder URLs:**
- Issue: Several projects in `src/data/portfolio.ts` link to `#` instead of real URLs
- Files: `src/data/portfolio.ts` (lines 47, 54, 61, 89)
- Impact: Projects like "OMR Dashboard", "KI-Chatbot", and "Portfolio Site" don't link anywhere despite being clickable
- Fix approach: Update project URLs or mark as non-linkable; communicate portfolio scope to users

## Known Bugs

**Chat message text extraction fragile:**
- Symptoms: Chat messages only render if they have type 'text' parts; other message types silently disappear
- Files: `src/components/bento/cells/ChatCell.tsx` (lines 10-15)
- Trigger: AI response with non-text content types (structured data, images, etc.) renders as empty
- Workaround: Currently Gemini 2.0 Flash returns only text, but if model changes or message format evolves, silent data loss occurs

**About cell text splitting assumes format:**
- Symptoms: About cell splits role by ' & ' separator and will break if format changes
- Files: `src/components/bento/cells/AboutCell.tsx` (line 4)
- Trigger: If personalInfo.role changes to not contain ' & ', components render incorrectly
- Workaround: None - hardcoded split point is fragile

**Missing image handling in projects:**
- Symptoms: Projects with missing images silently fail to load and render empty colored blocks
- Files: `src/components/bento/cells/ProjectsCell.tsx` (lines 29-51)
- Trigger: If project.image URL is broken or not found, no error indication, just blank placeholder
- Workaround: Check `public/` folder for image assets - currently only `/paranote-preview.png` exists

## Security Considerations

**Unvalidated email submission:**
- Risk: Email field accepts any text input, allowing spam or injection if backend processes it
- Files: `src/components/bento/cells/StatusCell.tsx` (line 64-71)
- Current mitigation: HTML5 `type="email"` provides basic browser validation only
- Recommendations: Add server-side email validation, rate limiting, and CAPTCHA if form becomes functional

**API key in environment variable (correct):**
- Risk: Google AI API key is sensitive
- Files: `api/chat.ts` (line 10)
- Current mitigation: Key is in .env (not committed per .gitignore)
- Recommendations: Add API key rotation schedule, request signing for production, monitor usage limits

**No CORS protection on chat API:**
- Risk: DefaultChatTransport at `/api/chat` may accept requests from any origin
- Files: `api/chat.ts`, `src/components/bento/cells/ChatCell.tsx` (line 8)
- Current mitigation: Edge function with rate limiting via maxDuration
- Recommendations: Add explicit CORS headers, origin validation, or request signature verification

**Missing user input sanitization in chat:**
- Risk: User messages sent to Gemini without sanitization (though Gemini has safeguards)
- Files: `src/components/bento/cells/ChatCell.tsx` (line 35)
- Current mitigation: Gemini API has built-in safety filters
- Recommendations: Add HTML entity encoding and profanity filtering on client before sending

## Performance Bottlenecks

**Chat cell lazy-loaded but large component:**
- Problem: ChatCell is 144 lines and uses heavy AI SDK, lazy loaded behind Suspense which helps
- Files: `src/components/bento/cells/ChatCell.tsx` (144 lines), `src/App.tsx` (line 15)
- Cause: AI SDK (@ai-sdk/react, @ai-sdk/google, ai) adds ~500KB total to bundle if not tree-shaken properly
- Improvement path: Verify tree-shaking in build, consider dynamic imports for AI SDK only when chat opened, monitor bundle size with `npm run build`

**No pagination or limit on projects list:**
- Problem: Projects component renders all 8 projects always visible
- Files: `src/components/bento/cells/ProjectsCell.tsx` (lines 11-73)
- Cause: If portfolio grows to 50+ projects, DOM nodes increase linearly without virtualization
- Improvement path: Add pagination, lazy loading, or virtual scrolling if projects exceed 20 items

**Hardcoded suggested questions loaded on every chat open:**
- Problem: Suggested questions array always in memory even if chat never opened
- Files: `src/data/portfolio.ts` (lines 101-105), `src/components/bento/cells/ChatCell.tsx` (line 6)
- Cause: Not a major issue at current size (3 questions) but pattern doesn't scale
- Improvement path: Load questions on-demand when ChatCell mounts, consider server-side if personalized

**All Framer Motion animations enabled by default:**
- Problem: Grid stagger animation runs on every page load with `delayChildren: 0.2` and `staggerChildren: 0.08`
- Files: `src/lib/animations.ts` (lines 26-34), `src/components/bento/BentoGrid.tsx` (line 15)
- Cause: Adds 1.5+ seconds to initial render visibility; respects prefers-reduced-motion but all users wait for animations
- Improvement path: Consider instant initial render with optional animations, or shorter stagger times (0.03-0.05)

## Fragile Areas

**Chat transport endpoint hardcoded:**
- Files: `src/components/bento/cells/ChatCell.tsx` (line 8)
- Why fragile: `/api/chat` is hardcoded string, no config abstraction; if route changes, search required across files
- Safe modification: Extract to constant or env var in `src/lib/config.ts` or similar; import single source of truth
- Test coverage: No tests; manual verification required for endpoint changes

**ThemeContext accessed with thrown error on missing provider:**
- Files: `src/hooks/useTheme.ts` (line 6)
- Why fragile: Throws error if used outside ThemeProvider without TypeScript type safety preventing it
- Safe modification: Add TypeScript strict null checking at call sites, test ThemeProvider wrapping at root
- Test coverage: No tests for context provider wrapping

**About cell assumes personalInfo.role format:**
- Files: `src/components/bento/cells/AboutCell.tsx` (line 4)
- Why fragile: String split on ' & ' has no fallback; if role doesn't contain separator, renders incorrectly
- Safe modification: Use lodash split, create structured role type with title/subtitle fields, add assertion/fallback
- Test coverage: No tests; brittle string parsing unverified

**Form field state management with multiple setTimeout timers:**
- Files: `src/components/bento/cells/StatusCell.tsx` (lines 32-39)
- Why fragile: Multiple setTimeout calls can stack if user submits multiple times; state updates after unmount possible
- Safe modification: Use AbortController for cleanup, queue state updates, add mounted ref check before setState
- Test coverage: No tests; race conditions possible under rapid submissions

## Scaling Limits

**Gemini API rate limiting:**
- Current capacity: 1 RPM (requests per minute) per IP with free tier, 15 RPM with paid; 30s timeout per request
- Limit: If portfolio gets more traffic, API rate limits will kick in immediately
- Scaling path: Upgrade to Generative Language API with higher limits, implement request queuing on client, add caching layer

**Static portfolio data grows linearly:**
- Current capacity: 8 projects, 3 experience entries, 3 suggested questions hardcoded
- Limit: If portfolio scales to 100+ projects, all loaded in memory; no filtering/search
- Scaling path: Move to CMS (Sanity, Contentful), add search/filter UI, paginate projects, lazy-load project details

**localStorage for theme persists forever:**
- Current capacity: Theme string stored in localStorage, no size limit issue at current scale
- Limit: If adding more user preferences (sidebar collapsed, recent chats, etc.), could exceed storage quota (usually 5-10MB)
- Scaling path: Use IndexedDB for larger data, implement cleanup of old data, add quota checking

## Dependencies at Risk

**@ai-sdk/* packages outdated:**
- Risk: @ai-sdk/google at 3.0.21 (wants 3.0.29), @ai-sdk/react at 3.0.75 (wants 3.0.88); multiple minor versions behind
- Impact: Missing bug fixes, security patches, and new features; potential compatibility issues with Gemini API updates
- Migration plan: Run `npm update @ai-sdk/google @ai-sdk/react ai` immediately, test chat functionality, review CHANGELOG for breaking changes

**ESLint major version upgrade available:**
- Risk: @eslint/js at 9.39.2 (wants 10.0.1); eslint-plugin-react-hooks at 5.2.0 (wants 7.0.1) - two major versions behind
- Impact: May miss new lint rules detecting bugs, deprecated rules no longer enforced, potential runtime issues
- Migration plan: Upgrade to ESLint 10, test linting, update config if needed, run lint check and fix violations

**React 19 available but locked at 18.3.1:**
- Risk: React 18.3.1 current; React 19.2.4 available with major improvements
- Impact: Missing Server Component improvements, automatic batching enhancements, new hooks
- Migration plan: Not urgent for portfolio but consider for next major version bump; requires testing with Framer Motion compatibility

**Framer Motion lagging:**
- Risk: framer-motion at 11.18.2 (wants 12.34.0); missing latest animation optimizations
- Impact: Potential performance issues with complex animations, may miss bug fixes in layout animations
- Migration plan: Review breaking changes in 12.x, test animations after upgrade, verify grid animations still work

## Missing Critical Features

**Contact form doesn't actually work:**
- Problem: No way for visitors to send messages - form UI exists but doesn't connect to backend
- Blocks: Can't receive inquiries, collaboration requests, or feedback from portfolio visitors
- Workaround: Manual email address link exists but not obvious

**API endpoint references non-existent github.ts:**
- Problem: vercel.json config points to `api/github.ts` but file missing
- Blocks: Any GitHub integration (stats, recent repos, activity feed) cannot be implemented
- Workaround: Remove config line if feature not planned, or create stub endpoint

**No error state for missing images:**
- Problem: Broken project images silently fail, only showing colored blocks
- Blocks: Can't verify image availability before deployment, no user feedback on broken assets
- Workaround: Manually verify images in `public/` folder before deploy

**No analytics or tracking:**
- Problem: No way to know if portfolio is being visited or which sections people use
- Blocks: Can't optimize portfolio design based on user behavior
- Workaround: Manual use of Google Analytics via gtag if needed later

## Test Coverage Gaps

**No tests for chat API:**
- What's not tested: API request handling, streaming response, error states, message format validation
- Files: `api/chat.ts`
- Risk: API could break silently, malformed requests could crash handler, rate limiting untested
- Priority: High - chat is critical user-facing feature

**No tests for form submission:**
- What's not tested: Form validation, error handling, state transitions, double-submit prevention
- Files: `src/components/bento/cells/StatusCell.tsx`
- Risk: Form state machine could deadlock, validation could be bypassed, errors could render unexpectedly
- Priority: High - contact form security concern

**No tests for theme context:**
- What's not tested: Theme persistence, localStorage integration, media query matching, context consumption
- Files: `src/contexts/ThemeContext.tsx`, `src/hooks/useTheme.ts`
- Risk: Theme toggle could fail silently, localStorage could become out of sync, useTheme could be used outside provider
- Priority: Medium - theme is visible but not critical

**No tests for responsive layout:**
- What's not tested: Breakpoint changes, grid layout at different screen sizes, animation behavior on mobile
- Files: `src/components/bento/BentoGrid.tsx`, all cell components
- Risk: Responsive design could break on specific viewport sizes undetected, animation could lag on mobile
- Priority: Medium - portfolio appearance is important

**No tests for portfolio data:**
- What's not tested: Data structure validation, missing fields, URL validity, image existence
- Files: `src/data/portfolio.ts`
- Risk: Typos in experience dates, broken project links, missing alt text for images
- Priority: Low - data-driven but currently static

**No E2E tests:**
- What's not tested: Full user flows (view portfolio, toggle theme, chat with AI, submit form, click projects)
- Files: None
- Risk: Regressions in user interactions go undetected, deployment surprises possible
- Priority: Medium - portfolio has interactive features worth verifying

---

*Concerns audit: 2026-02-15*
