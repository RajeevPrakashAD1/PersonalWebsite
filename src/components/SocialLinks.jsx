import { site } from '../config.js'

// Simple inline SVG icons so we don't need an icon library.
const icons = {
  github: (
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.7 1.2 1.7 1.2 0 .6.4 1.1.7 1.4-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  ),
  twitter: (
    <path d="M18.9 1.5h3.7l-8.1 9.2L24 22.5h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.9L0 1.5h7.6l5.2 6.9 6.1-6.9Zm-1.3 18.8h2L6.5 3.6h-2.2l13.3 16.7Z" />
  ),
  youtube: (
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
  ),
  // Code brackets — used for LeetCode
  leetcode: (
    <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
  ),
}

export default function SocialLinks({ className = '' }) {
  const entries = [
    ['email', site.email ? `mailto:${site.email}` : ''],
    ['github', site.links.github],
    ['linkedin', site.links.linkedin],
    ['leetcode', site.links.leetcode],
    ['twitter', site.links.twitter],
    ['youtube', site.links.youtube],
  ].filter(([, url]) => url)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {entries.map(([key, url]) => (
        <a
          key={key}
          href={url}
          target={key === 'email' ? undefined : '_blank'}
          rel="noreferrer"
          className="border-2 border-arc-purple p-2 text-arc-dim transition-colors hover:border-arc-cyan hover:text-arc-cyan"
          aria-label={key}
        >
          {key === 'email' ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm10 7L3.5 6h17L12 11Zm0 2.2L3 7.3V18h18V7.3l-9 5.9Z" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              {icons[key]}
            </svg>
          )}
        </a>
      ))}
    </div>
  )
}
