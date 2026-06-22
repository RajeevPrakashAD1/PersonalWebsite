// Loads blog posts from src/content/blog/*.md at build time.
//
// Each .md file starts with a small "frontmatter" block like:
//
//   ---
//   title: My first week
//   date: 2026-06-14
//   summary: A short one-line description.
//   ---
//
//   ...markdown body...
//
// You don't need any external library — we parse the frontmatter here.

// Grab every markdown file in the blog folder as a raw string.
const files = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontmatter(raw) {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw)
  if (!match) return { data: {}, body: raw }

  const data = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    // strip optional surrounding quotes
    value = value.replace(/^["']|["']$/g, '')
    data[key] = value
  }
  return { data, body: match[2] }
}

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

// Build the posts array, sorted newest-first by date.
export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: data.title || slugFromPath(path),
      date: data.date || '',
      summary: data.summary || '',
      body,
      category: data.category || 'dev',
      goalId: data.goal ? Number(data.goal) : null,
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPost(slug) {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d)) return date
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
