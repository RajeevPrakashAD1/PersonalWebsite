import { Link } from 'react-router-dom'
import { getPosts, formatDate } from '../lib/content.js'
import { useAsync } from '../lib/useAsync.js'
import { Loading, ErrorBox } from '../components/Loader.jsx'

export default function Blog() {
  const { loading, error, data } = useAsync(() => getPosts('dev'), [])

  return (
    <div>
      <header className="mb-8 border-b-2 border-arc-purple pb-4">
        <h1 className="font-pixel text-xl text-arc-cyan glow-cyan sm:text-2xl">
          ▤ MISSION LOGS
        </h1>
        <p className="mt-3 font-term text-xl text-arc-dim">
          Weekly updates and notes on what I’m learning.
        </p>
      </header>

      {loading && <Loading label="LOADING LOGS" />}
      {error && <ErrorBox error={error} />}

      {data && (data.length === 0 ? (
        <p className="font-pixel text-xs text-arc-dim">
          NO LOGS YET — CHECK BACK SOON.
        </p>
      ) : (
        <ul className="space-y-5">
          {data.map((post, i) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="pixel-panel pixel-hover block p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-pixel text-[11px] leading-relaxed text-arc-green sm:text-xs">
                    <span className="text-arc-pink">LOG_{String(i + 1).padStart(2, '0')}</span>{' '}
                    {post.title}
                  </h2>
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
      ))}
    </div>
  )
}
