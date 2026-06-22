import { Link } from 'react-router-dom'
import { formatDate } from '../lib/content.js'

const STATUS = {
  active: { label: 'IN PROGRESS', color: 'text-arc-yellow', glow: 'glow-yellow', icon: '🟡' },
  planned: { label: 'LOCKED', color: 'text-arc-dim', glow: '', icon: '⚪' },
  complete: { label: 'CLEARED', color: 'text-arc-green', glow: 'glow-green', icon: '✅' },
}

// 10-segment XP-style bar from a 0–100 value.
function ProgressBar({ value }) {
  const filled = Math.round((Math.min(100, Math.max(0, value)) / 100) * 10)
  return (
    <div className="flex items-center gap-2">
      <span className="font-pixel text-[10px] tracking-widest">
        <span className="text-arc-green glow-green">{'▰'.repeat(filled)}</span>
        <span className="text-arc-surface2">{'▱'.repeat(10 - filled)}</span>
      </span>
      <span className="font-pixel text-[10px] text-arc-cyan">{value}%</span>
    </div>
  )
}

export default function GoalCard({ goal, projects = [], posts = [] }) {
  const status = STATUS[goal.status] || STATUS.planned

  return (
    <article className="pixel-panel p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-arc-purple pb-3">
        <h3 className="font-pixel text-xs text-arc-pink glow-pink sm:text-sm">
          ⚔ {goal.title}
        </h3>
        <span className={`font-pixel text-[10px] ${status.color} ${status.glow}`}>
          {status.icon} {status.label}
        </span>
      </div>

      {goal.why && (
        <p className="mt-3 font-term text-lg text-arc-dim">
          <span className="text-arc-cyan">WHY:</span> {goal.why}
        </p>
      )}

      {/* XP + dates */}
      <div className="mt-4">
        <ProgressBar value={goal.progress} />
        <p className="mt-2 font-pixel text-[9px] text-arc-dim">
          {goal.startedAt && <>START {formatDate(goal.startedAt)}</>}
          {goal.targetAt && (
            <span className="text-arc-yellow"> · TARGET {formatDate(goal.targetAt)}</span>
          )}
        </p>
      </div>

      {/* Side quests (linked projects) */}
      {projects.length > 0 && (
        <div className="mt-5">
          <p className="font-pixel text-[10px] text-arc-cyan">PROJECTS</p>
          <ul className="mt-2 space-y-1">
            {projects.map((p) => (
              <li key={p.id ?? p.title} className="font-term text-lg text-arc-ink">
                <span className="text-arc-pink">▸</span> {p.title}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="ml-2 font-pixel text-[9px] text-arc-green hover:text-arc-yellow">[PLAY]</a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="ml-1 font-pixel text-[9px] text-arc-cyan hover:text-arc-yellow">[CODE]</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Logs (linked posts) */}
      {posts.length > 0 && (
        <div className="mt-4">
          <p className="font-pixel text-[10px] text-arc-cyan">LOGS</p>
          <ul className="mt-2 space-y-1">
            {posts.map((post) => (
              <li key={post.slug} className="font-term text-lg">
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-arc-ink hover:text-arc-cyan"
                >
                  <span className="text-arc-pink">›</span> {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
