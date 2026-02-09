import { experience } from '../../../data/portfolio'

export default function StatsCell() {
  return (
    <>
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
        roles & positions
      </span>
      <div className="flex flex-col gap-4 md:gap-3 lg:gap-2 xl:gap-3">
        {experience.map((exp) => (
          <div key={exp.year} className="flex items-start gap-3">
            <span className="font-mono text-sm leading-tight text-white/50">
              {exp.year}
            </span>
            <a
              href={exp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/exp flex min-w-0 items-start gap-1.5"
            >
              <span className="mt-[3px] text-white/40 transition-all duration-200 group-hover/exp:translate-x-0.5 group-hover/exp:text-white">
                &#8599;
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-lg leading-[1] text-white transition-colors duration-200 group-hover/exp:text-white/80 lg:text-base xl:text-xl">
                  {exp.company}
                </p>
                <p className="truncate font-mono text-[10px] uppercase tracking-wide text-white/60 lg:text-[9px] xl:text-[10px]">
                  {exp.position}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  )
}
