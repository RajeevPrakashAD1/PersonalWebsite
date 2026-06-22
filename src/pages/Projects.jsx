import { getProjects } from '../lib/content.js'
import { useAsync } from '../lib/useAsync.js'
import { Loading, ErrorBox } from '../components/Loader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

export default function Projects() {
  const { loading, error, data } = useAsync(() => getProjects(), [])

  return (
    <div>
      <header className="mb-8 border-b-2 border-arc-purple pb-4">
        <h1 className="font-pixel text-xl text-arc-green glow-green sm:text-2xl">
          ⚔ PROJECTS
        </h1>
        <p className="mt-3 font-term text-xl text-arc-dim">
          Things I’ve built. Each one has a short briefing and, where I have one,
          a demo video.
        </p>
      </header>

      {loading && <Loading label="LOADING PROJECTS" />}
      {error && <ErrorBox error={error} />}

      {data && (data.length === 0 ? (
        <p className="font-pixel text-xs text-arc-dim">
          NO PROJECTS YET — CHECK BACK SOON.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {data.map((p, i) => (
            <ProjectCard key={p.id ?? p.title} project={p} index={i} />
          ))}
        </div>
      ))}
    </div>
  )
}
