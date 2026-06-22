import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPost, formatDate } from '../lib/content.js'
import { useAsync } from '../lib/useAsync.js'
import { Loading, ErrorBox } from '../components/Loader.jsx'

export default function BlogPost() {
  const { slug } = useParams()
  const { loading, error, data: post } = useAsync(() => getPost(slug), [slug])

  if (loading) return <Loading label="LOADING LOG" />
  if (error) return <ErrorBox error={error} />

  if (!post) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-pixel text-lg text-arc-pink glow-pink">
          GAME OVER — POST NOT FOUND
        </h1>
        <Link
          to="/blog"
          className="pixel-btn mt-8 inline-block border-arc-cyan bg-arc-cyan/10 text-arc-cyan"
        >
          ← BACK TO LOGS
        </Link>
      </div>
    )
  }

  const isFitness = post.category === 'fitness'
  const backTo = isFitness ? '/health' : '/blog'
  const backLabel = isFitness ? '← BACK TO FITNESS' : '← BACK TO LOGS'

  return (
    <article className="mx-auto max-w-2xl">
      <Link to={backTo} className="font-pixel text-[10px] text-arc-cyan hover:text-arc-pink">
        {backLabel}
      </Link>

      <header className="mt-4 mb-8 border-b-4 border-arc-purple pb-6">
        <h1 className="font-pixel text-base leading-relaxed text-arc-green glow-green sm:text-lg">
          {post.title}
        </h1>
        {post.date && (
          <p className="mt-3 font-pixel text-[9px] text-arc-yellow">
            ▸ {formatDate(post.date)}
          </p>
        )}
      </header>

      <div className="prose-custom">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </div>
    </article>
  )
}
