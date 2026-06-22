import { site } from '../config.js'
import SocialLinks from './SocialLinks.jsx'

export default function Footer() {
  return (
    <footer className="border-t-4 border-arc-purple bg-arc-bg">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <p className="font-term text-base text-arc-dim">
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  )
}
