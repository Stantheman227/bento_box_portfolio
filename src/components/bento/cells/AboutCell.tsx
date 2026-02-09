import { personalInfo } from '../../../data/portfolio'

export default function AboutCell() {
  const [line1, line2] = personalInfo.role.split(' & ')

  return (
    <div className="flex h-full min-h-[120px] flex-col justify-end">
      <h2 className="font-display text-2xl uppercase leading-[0.9] text-white md:text-4xl lg:text-5xl">
        {line1}
        <br />
        &amp; {line2}
      </h2>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 md:text-xs">
        {personalInfo.location}
      </p>
    </div>
  )
}
