import { projects } from '../../../data/portfolio'

export default function ProjectsCell() {
  return (
    <>
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
        Ausgewählte Arbeiten
      </span>

      <div className="mt-3 flex flex-1 flex-col justify-start gap-0 lg:justify-between">
        {projects.map((project, i) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'group/proj flex items-center gap-2.5',
              // Mobile: larger touch targets; Desktop: compact
              'py-2 lg:py-1 xl:py-1.5',
              // Border between items
              i > 0 ? 'border-t border-white/10' : '',
              // Active state for touch devices
              'active:bg-white/5 lg:active:bg-transparent',
              'transition-colors duration-150',
            ].join(' ')}
          >
            {/* Thumbnail / color block */}
            {'image' in project && project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className={[
                  'shrink-0 rounded-md object-cover object-top',
                  // Mobile: slightly larger; Desktop: compact
                  'h-10 w-14 lg:h-6 lg:w-9 xl:h-8 xl:w-12',
                  'transition-transform duration-200',
                  'group-hover/proj:scale-105 group-active/proj:scale-105',
                ].join(' ')}
              />
            ) : (
              <div
                className={[
                  'shrink-0 rounded-md',
                  'h-10 w-14 lg:h-6 lg:w-9 xl:h-8 xl:w-12',
                  'transition-transform duration-200',
                  'group-hover/proj:scale-105 group-active/proj:scale-105',
                ].join(' ')}
                style={{ background: project.color }}
              />
            )}

            {/* Title + tech */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="truncate font-display text-base leading-[1] text-white transition-colors duration-200 group-hover/proj:text-white/80 lg:text-sm xl:text-base">
                  {project.title}
                </p>
                <span className="text-[10px] text-white/40 transition-all duration-200 group-hover/proj:translate-x-0.5 group-hover/proj:text-white group-active/proj:translate-x-0.5 group-active/proj:text-white">
                  &#8599;
                </span>
              </div>
              <p className="truncate font-mono text-[9px] uppercase tracking-wide text-white/40 lg:text-[7px] xl:text-[8px]">
                {project.tech}
              </p>
            </div>

            {/* Tag */}
            <span className="shrink-0 font-mono text-[8px] uppercase tracking-wide text-white/30 lg:text-[7px] xl:text-[8px]">
              {project.tag}
            </span>
          </a>
        ))}
      </div>
    </>
  )
}
