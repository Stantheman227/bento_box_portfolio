import { useState, type FormEvent } from 'react'

const inputBase =
  'w-full rounded-lg border border-neutral-dark/10 bg-white/60 font-mono text-neutral-black placeholder:text-neutral-mid/60 transition-colors duration-200 focus:border-neutral-dark/30 focus:outline-none focus:ring-1 focus:ring-neutral-dark/10'

// Mobile: 16px (text-base) prevents iOS auto-zoom; desktop: compact 11px
const inputResponsive = 'px-3 py-2.5 text-base md:px-2.5 md:py-2 md:text-xs lg:py-1.5 lg:text-[11px]'

export default function StatusCell() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [fields, setFields] = useState({ name: '', email: '', subject: '' })

  const canSubmit =
    formState === 'idle' &&
    fields.name.trim() !== '' &&
    fields.email.trim() !== '' &&
    fields.subject.trim() !== ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setFormState('sending')

    try {
      // Static form — submit via Formspree / Vercel edge / etc.
      // For now, simulate a short delay then confirm
      await new Promise((resolve) => setTimeout(resolve, 800))
      setFormState('sent')
      setFields({ name: '', email: '', subject: '' })
      setTimeout(() => setFormState('idle'), 3000)
    } catch {
      setFormState('error')
      setTimeout(() => setFormState('idle'), 3000)
    }
  }

  return (
    <>
      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-mid">
        Kontakt
      </span>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 md:gap-1.5"
        noValidate
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={fields.name}
          onChange={handleChange}
          autoComplete="name"
          required
          className={`${inputBase} ${inputResponsive}`}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={fields.email}
          onChange={handleChange}
          autoComplete="email"
          required
          className={`${inputBase} ${inputResponsive}`}
        />
        <input
          type="text"
          name="subject"
          placeholder="Anliegen"
          value={fields.subject}
          onChange={handleChange}
          autoComplete="off"
          required
          className={`${inputBase} ${inputResponsive}`}
        />

        <button
          type="submit"
          disabled={!canSubmit && formState === 'idle'}
          className="mt-1 w-full rounded-lg bg-neutral-black px-3 py-2.5 font-mono text-base uppercase tracking-wider text-white transition-all duration-200 hover:bg-neutral-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 md:py-2 md:text-xs lg:mt-0.5 lg:py-1.5 lg:text-[11px]"
        >
          {formState === 'sending' && 'Sende...'}
          {formState === 'sent' && 'Gesendet!'}
          {formState === 'error' && 'Fehler -- erneut versuchen'}
          {formState === 'idle' && 'Absenden'}
        </button>
      </form>
    </>
  )
}
