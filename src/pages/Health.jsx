import { Link } from 'react-router-dom'
import { getHealthProfile, getWeightLogs, getPosts, formatDate } from '../lib/content.js'
import { useAsync } from '../lib/useAsync.js'
import { Loading, ErrorBox } from '../components/Loader.jsx'
import FitnessChecklist from '../components/FitnessChecklist.jsx'

export default function Health() {
  const { loading, error, data } = useAsync(
    () => Promise.all([getHealthProfile(), getWeightLogs(), getPosts('fitness')]),
    [],
  )

  return (
    <div>
      <header className="mb-8 border-b-2 border-arc-purple pb-4">
        <h1 className="font-pixel text-xl text-arc-green glow-green sm:text-2xl">
          ❤ FITNESS — IRL STATS
        </h1>
        <p className="mt-3 font-term text-xl text-arc-dim">
          Leveling up my real-life character. Tracking my weight and crossing off
          fitness goals in public so I actually stick to it.
        </p>
      </header>

      {loading && <Loading label="LOADING STATS" />}
      {error && <ErrorBox error={error} />}

      {data && (() => {
        const [profile, weights, fitnessPosts] = data
        const current = weights.length ? weights[weights.length - 1].weight : null
        const start = profile?.startWeight ?? (weights.length ? weights[0].weight : null)
        const goal = profile?.goalWeight ?? null
        const unit = profile?.unit || 'kg'
        const delta = start != null && current != null ? current - start : null

        return (
          <div className="space-y-8">
            {/* Stat tiles */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="START" value={fmt(start, unit)} color="text-arc-dim" />
              <Stat label="CURRENT" value={fmt(current, unit)} color="text-arc-cyan glow-cyan" />
              <Stat label="GOAL" value={fmt(goal, unit)} color="text-arc-yellow glow-yellow" />
              <Stat
                label="CHANGE"
                value={delta != null ? `${delta > 0 ? '+' : ''}${delta.toFixed(1)}${unit}` : '—'}
                color={delta != null && delta < 0 ? 'text-arc-green glow-green' : 'text-arc-pink'}
              />
            </div>

            {/* Fitness goal checklist */}
            <FitnessChecklist />

            {/* Weekly fitness updates (separate from the dev Logs) */}
            <section>
              <h2 className="mb-4 font-pixel text-sm text-arc-pink glow-pink">📓 FITNESS LOGS</h2>
              {fitnessPosts.length === 0 ? (
                <p className="font-term text-lg text-arc-dim">
                  No fitness updates yet — write your first weekly recap in /admin (LOGS → category: fitness).
                </p>
              ) : (
                <ul className="space-y-4">
                  {fitnessPosts.map((post) => (
                    <li key={post.slug}>
                      <Link to={`/blog/${post.slug}`} className="pixel-panel pixel-hover block p-5">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-pixel text-[11px] leading-relaxed text-arc-green sm:text-xs">
                            {post.title}
                          </h3>
                          <span className="shrink-0 font-pixel text-[9px] text-arc-yellow">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        {post.summary && (
                          <p className="mt-3 font-term text-lg text-arc-dim">{post.summary}</p>
                        )}
                        <span className="mt-3 inline-block font-pixel text-[9px] text-arc-cyan">
                          READ MORE →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )
      })()}
    </div>
  )
}

const fmt = (v, unit) => (v != null ? `${v}${unit}` : '—')

function Stat({ label, value, color }) {
  return (
    <div className="pixel-panel p-4 text-center">
      <p className="font-pixel text-[9px] text-arc-dim">{label}</p>
      <p className={`mt-2 font-pixel text-sm ${color}`}>{value}</p>
    </div>
  )
}
