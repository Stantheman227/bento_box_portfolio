import { streamText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

export const config = {
  runtime: 'edge',
  maxDuration: 30,
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

const systemPrompt = `Du bist ein freundlicher KI-Assistent auf der Portfolio-Website von Piotr Gosiewski.
Du antwortest immer auf Deutsch und hältst dich kurz (max 2-3 Sätze).

Über Piotr:
- Full-Stack-Entwickler & KI-Orchestrator aus Berlin
- 8+ Jahre Erfahrung, 50+ Projekte, 30+ Kunden
- Tech-Stack: React, Next.js, TypeScript, Node.js, Python, PostgreSQL, LangChain, OpenAI
- Spezialisiert auf: KI-Anwendungen, RAG-Pipelines, Workflow-Automatisierung, moderne Web-Apps
- Interessen: Fitness, Laufen, Gitarre, Musik
- Kontakt: hello@piotr.dev
- Aktuell verfügbar für neue Projekte

Beantworte Fragen über Piotr, seine Skills und Projekte. Bei Fragen außerhalb des Portfolios, leite freundlich zurück.`

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { messages } = await req.json()

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: systemPrompt,
    messages,
    maxTokens: 200,
  })

  return result.toUIMessageStreamResponse()
}
