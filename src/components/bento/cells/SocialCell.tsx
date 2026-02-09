import { socials } from '../../../data/portfolio'

export default function SocialCell() {
  return (
    <>
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
        Socials
      </span>

      <div className="flex flex-col gap-2 sm:gap-1.5">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target={social.url.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={
              social.url.startsWith('mailto:')
                ? `E-Mail an ${social.label}`
                : `${social.label} (wird in neuem Tab geöffnet)`
            }
            className="group/social flex min-h-[44px] items-center justify-between py-2 sm:min-h-0 sm:py-0"
          >
            <span className="font-display text-lg leading-[1] text-white transition-colors duration-200 group-hover/social:text-white/80 group-active/social:text-white/80 lg:text-xl">
              {social.label}
            </span>
            <span
              aria-hidden="true"
              className="text-xs text-white/40 transition-all duration-200 group-hover/social:translate-x-0.5 group-hover/social:text-white group-active/social:translate-x-0.5 group-active/social:text-white"
            >
              &#8599;
            </span>
          </a>
        ))}
      </div>
    </>
  )
}
