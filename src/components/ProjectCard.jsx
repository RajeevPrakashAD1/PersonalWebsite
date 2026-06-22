import VideoEmbed from './VideoEmbed.jsx'

export default function ProjectCard({ project, index = 0 }) {
  const { title, description, tags = [], video, image, github, demo } = project
  const id = String(index + 1).padStart(2, '0')

  return (
    <article className="pixel-panel pixel-hover flex flex-col">
      {/* Quest banner */}
      <div className="flex items-center justify-between border-b-4 border-arc-purple bg-arc-surface2 px-3 py-2">
        <span className="font-pixel text-[10px] text-arc-green glow-green">
          PROJECT_{id}
        </span>
        <span className="font-pixel text-[9px] text-arc-yellow">★ ★ ★</span>
      </div>

      {/* Media: video takes priority; otherwise an image if provided */}
      {video ? (
        <div className="border-b-4 border-arc-purple">
          <VideoEmbed src={video} title={title} />
        </div>
      ) : image ? (
        <div className="aspect-video w-full overflow-hidden border-b-4 border-arc-purple bg-black">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover [image-rendering:pixelated]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-pixel text-xs leading-relaxed text-arc-cyan">{title}</h3>
        <p className="mt-3 flex-1 font-term text-lg leading-snug text-arc-dim">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border-2 border-arc-pink px-2 py-1 font-pixel text-[9px] uppercase text-arc-pink"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {(github || demo) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn border-arc-green bg-arc-green/15 text-arc-green"
              >
                ▶ PLAY
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn border-arc-cyan bg-arc-cyan/10 text-arc-cyan"
              >
                &lt;/&gt; CODE
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
