import { Link } from 'react-router-dom'
import { site } from '../config.js'
import { getGoals, getProjects, getPosts, formatDate } from '../lib/content.js'
import { useAsync } from '../lib/useAsync.js'
import { Loading, ErrorBox } from '../components/Loader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import SocialLinks from '../components/SocialLinks.jsx'

export default function Home() {
  const { loading, error, data } = useAsync(
    () => Promise.all([getGoals(), getProjects(), getPosts('dev')]),
    [],
  )

  const goals = data?.[0] ?? []
  const projects = data?.[1] ?? []
  const posts = data?.[2] ?? []
  const activeGoal = goals.find((g) => g.status === 'active') || goals[0]
  const featured = projects.slice(0, 2)
  const latestPosts = posts.slice(0, 3)

  return (
    <div className="space-y-16">
      {/* Title screen / hero */}
      <section className="pixel-panel relative overflow-hidden px-6 py-12 text-center sm:py-16">
        <p className="font-pixel text-[10px] text-arc-pink glow-pink">
          ● HIGH SCORE · 999999
        </p>

        <h1 className="mt-6 font-pixel text-2xl leading-relaxed text-arc-ink sm:text-4xl">
          <span className="rainbow">{site.name}</span>
        </h1>

        <p className="mt-5 font-pixel text-[11px] leading-relaxed text-arc-green glow-green sm:text-sm">
          {site.role}
        </p>

        <p className="mx-auto mt-6 max-w-2xl font-term text-xl leading-snug text-arc-dim">
          {site.bio}
        </p>

        {/* Lives / power HUD */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-pixel text-[10px]">
          <span className="text-arc-pink">LIVES ♥ ♥ ♥</span>
          <span className="text-arc-cyan">PWR ▮▮▮▮▯</span>
          <span className="text-arc-yellow">★ × {projects.length}</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/projects" className="pixel-btn border-arc-green bg-arc-green/15 text-arc-green">
            <span className="blink">▶</span> PRESS START
          </Link>
          <Link to="/about" className="pixel-btn border-arc-cyan bg-arc-cyan/10 text-arc-cyan">
            PLAYER INFO
          </Link>
        </div>

        <SocialLinks className="mt-8 justify-center" />
      </section>

      {loading && <Loading label="LOADING SAVE FILE" />}
      {error && <ErrorBox error={error} />}

      {data && (
        <>
          {/* Current quest spotlight */}
          {activeGoal && (
            <section>
              <SectionHeading title="CURRENT QUEST" to="/goals" linkLabel="ALL QUESTS" />
              <Link
                to="/goals"
                className="pixel-panel pixel-hover block p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-pixel text-xs text-arc-pink glow-pink sm:text-sm">
                    ⚔ {activeGoal.title}
                  </p>
                  <span className="font-pixel text-[10px] text-arc-yellow">
                    {activeGoal.progress}% COMPLETE
                  </span>
                </div>
                {activeGoal.why && (
                  <p className="mt-3 font-term text-lg text-arc-dim">{activeGoal.why}</p>
                )}
              </Link>
            </section>
          )}

          {/* Featured quests */}
          {featured.length > 0 && (
            <section>
              <SectionHeading title="FEATURED PROJECTS" to="/projects" linkLabel="ALL PROJECTS" />
              <div className="grid gap-6 sm:grid-cols-2">
                {featured.map((p, i) => (
                  <ProjectCard key={p.id ?? p.title} project={p} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Latest logs */}
          {latestPosts.length > 0 && (
            <section>
              <SectionHeading title="MISSION LOGS" to="/blog" linkLabel="ALL LOGS" />
              <ul className="pixel-panel divide-y-2 divide-arc-purple">
                {latestPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-arc-surface2 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-pixel text-[11px] text-arc-cyan">
                          <span className="text-arc-pink">›</span> {post.title}
                        </p>
                        {post.summary && (
                          <p className="mt-1 font-term text-lg text-arc-dim">{post.summary}</p>
                        )}
                      </div>
                      <span className="shrink-0 font-pixel text-[9px] text-arc-yellow">
                        {formatDate(post.date)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  )
}

function SectionHeading({ title, to, linkLabel }) {
  return (
    <div className="mb-5 flex items-end justify-between border-b-2 border-arc-purple pb-2">
      <h2 className="font-pixel text-sm text-arc-yellow glow-yellow sm:text-base">{title}</h2>
      <Link to={to} className="font-pixel text-[9px] text-arc-cyan hover:text-arc-pink">
        {linkLabel} →
      </Link>
    </div>
  )
}
