# External Integrations

**Analysis Date:** 2026-02-15

## APIs & External Services

**AI/LLM:**
- Google Generative AI (Gemini) - Powers the portfolio AI chatbot
  - SDK/Client: `@ai-sdk/google` via Vercel AI SDK
  - Auth: `GOOGLE_GENERATIVE_AI_API_KEY` environment variable
  - Model: `gemini-2.0-flash` (optimized for chat, fast responses)
  - Endpoint: `/api/chat` (server-side streaming)
  - Implementation: `api/chat.ts` uses `streamText()` to stream responses to client

**Social/Professional Links:**
- LinkedIn - Profile link in footer (`https://linkedin.com/in/piotrgosiewski`)
- GitHub - Profile link in footer (`https://github.com/piotrgosiewski`)
- Instagram - Profile link in footer (`https://instagram.com/piotrgosiewski`)
- Email - Contact via `mailto:hello@piotr.dev`

## Data Storage

**Databases:**
- None - This is a static portfolio site with no backend database

**File Storage:**
- Local filesystem only - Public assets in `/public` directory
  - Images: Portfolio preview images (referenced in portfolio data)
  - No cloud storage integration

**Caching:**
- Browser localStorage only
  - Theme preference stored with key `'theme'` (values: 'light' | 'dark')
  - Managed in `src/contexts/ThemeContext.tsx`

## Authentication & Identity

**Auth Provider:**
- None - Portfolio site is public, no user authentication required
- AI chat operates stateless (no user sessions or identity)
- Contact form uses mailto links (no backend submission)

## Monitoring & Observability

**Error Tracking:**
- None detected - No error tracking service configured

**Logs:**
- Client: Browser console only (via React/Framer Motion)
- Server: Vercel platform logs (implicit, no custom logging configured)
- Chat error handling: Graceful fallback in UI with email contact option (`src/components/bento/cells/ChatCell.tsx` lines 43-59)

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from API handler using edge runtime)
  - API handler: `api/chat.ts` configured for edge runtime
  - Max duration: 30 seconds per request

**CI Pipeline:**
- None detected - No workflow files visible in repository

## Environment Configuration

**Required env vars:**
- `GOOGLE_GENERATIVE_AI_API_KEY` - Gemini API key (critical for chat functionality)

**Secrets location:**
- `.env` or `.env.local` (Vercel environment variables in deployment)
- Never commit secrets to git (enforced by `.gitignore`)

## Webhooks & Callbacks

**Incoming:**
- None - Portfolio is primarily a static site with chat integration

**Outgoing:**
- Contact fallback via email link (`mailto:hello@piotr.dev`)
- No webhook implementations detected

## Service Integration Pattern

**Chat Flow:**
1. User submits message in `ChatCell` component (`src/components/bento/cells/ChatCell.tsx`)
2. Message sent via `useChat` hook from `@ai-sdk/react`
3. Request routed to `/api/chat` endpoint via `DefaultChatTransport`
4. Server handler (`api/chat.ts`) processes request:
   - Authenticates with Google via API key
   - Calls Gemini model with system prompt and conversation history
   - Streams response back to client
5. Response streamed to UI and rendered in message thread
6. Error handling: Falls back to email contact if API unavailable

---

*Integration audit: 2026-02-15*
