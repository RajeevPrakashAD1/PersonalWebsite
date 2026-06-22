import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { site } from '../config.js'

const links = [
  { to: '/', label: 'HOME', end: true },
  { to: '/about', label: 'PLAYER' },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/blog', label: 'LOGS' },
  { to: '/goals', label: 'QUESTS' },
  { to: '/health', label: 'FITNESS' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `font-pixel text-[10px] px-3 py-2 border-2 transition-colors ${
      isActive
        ? 'border-arc-green bg-arc-green/15 text-arc-green glow-green'
        : 'border-transparent text-arc-dim hover:border-arc-cyan hover:text-arc-cyan'
    }`

  return (
    <header className="sticky top-0 z-50 border-b-4 border-arc-purple bg-arc-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="group flex items-center gap-2">
          <span className="font-pixel text-arc-yellow glow-yellow">★</span>
          <span className="font-pixel text-xs text-arc-ink group-hover:text-arc-pink sm:text-sm">
            {site.name}
          </span>
          <span className="blink font-pixel text-arc-green">_</span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="font-pixel border-2 border-arc-cyan px-3 py-2 text-[10px] text-arc-cyan hover:bg-arc-cyan/15 sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? 'X' : '≡'}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-1 border-t-4 border-arc-purple px-4 py-3 sm:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
