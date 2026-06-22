// Renders a project video. Accepts either:
//   - a YouTube/Vimeo URL  -> embeds the player in an iframe
//   - a local file path (e.g. '/videos/demo.mp4' placed in /public) -> <video> tag
//
// This means you don't have to decide today: paste a YouTube link now,
// or swap in a local clip later, and the card just works.

function getEmbedUrl(url) {
  // YouTube: watch?v=ID, youtu.be/ID, or /shorts/ID
  const yt =
    url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`

  // Vimeo: vimeo.com/ID
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`

  return null
}

export default function VideoEmbed({ src, title }) {
  if (!src) return null

  const embedUrl = getEmbedUrl(src)
  const isLocalFile = /\.(mp4|webm|ogg)$/i.test(src)

  return (
    <div className="aspect-video w-full overflow-hidden bg-black">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title || 'Project video'}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : isLocalFile ? (
        <video src={src} controls className="h-full w-full" />
      ) : (
        // Fallback: unknown URL — just link out
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="flex h-full w-full items-center justify-center font-pixel text-[10px] text-arc-cyan hover:text-arc-yellow"
        >
          ▶ WATCH VIDEO ↗
        </a>
      )}
    </div>
  )
}
