import { site } from '../config.js'
import SocialLinks from '../components/SocialLinks.jsx'
import { experience, education, skills, achievements } from '../content/resume.js'

export default function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <h1 className="font-pixel text-xl text-arc-yellow glow-yellow sm:text-2xl">
        ☺ PLAYER INFO
      </h1>

      {/* Player card */}
      <div className="pixel-panel p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-arc-purple pb-3">
          <span className="font-pixel text-xs text-arc-green glow-green">{site.name}</span>
          <span className="font-pixel text-[9px] text-arc-cyan">CLASS: DEV</span>
        </div>
        <p className="mt-3 font-pixel text-[10px] leading-relaxed text-arc-pink">{site.role}</p>
        <div className="prose-custom mt-4">
          {(site.about ?? [site.bio]).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <a
          href="/Rajeev_Prakash_Resume.pdf"
          download
          className="pixel-btn mt-5 inline-block border-arc-green bg-arc-green/15 text-arc-green"
        >
          ⬇ DOWNLOAD RÉSUMÉ
        </a>
      </div>

      {/* Experience */}
      <Section title="⚔ EXPERIENCE" color="text-arc-green glow-green">
        <div className="space-y-5">
          {experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="pixel-panel p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="font-pixel text-[11px] text-arc-cyan sm:text-xs">
                  {job.role} <span className="text-arc-pink">@ {job.company}</span>
                </h3>
                <span className="font-pixel text-[9px] text-arc-yellow">{job.period}</span>
              </div>
              <p className="mt-1 font-pixel text-[8px] text-arc-dim">{job.location}</p>
              <ul className="mt-3 space-y-1.5">
                {job.points.map((pt, i) => (
                  <li key={i} className="font-term text-lg leading-snug text-arc-ink">
                    <span className="text-arc-pink">▸</span> {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section title="🎓 EDUCATION" color="text-arc-cyan glow-cyan">
        <ul className="pixel-panel divide-y-2 divide-arc-purple">
          {education.map((ed) => (
            <li key={ed.school} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-5 py-4">
              <div>
                <p className="font-pixel text-[11px] text-arc-ink">{ed.school}</p>
                <p className="mt-1 font-term text-lg text-arc-dim">{ed.detail}</p>
              </div>
              {ed.period && <span className="font-pixel text-[9px] text-arc-yellow">{ed.period}</span>}
            </li>
          ))}
        </ul>
      </Section>

      {/* Skills */}
      <Section title="🧰 SKILLS" color="text-arc-pink glow-pink">
        <div className="space-y-5">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <p className="font-pixel text-[10px] text-arc-cyan">{group.toUpperCase()}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {items.map((s) => (
                  <span key={s} className="border-2 border-arc-pink px-2 py-1 font-pixel text-[9px] text-arc-pink">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Achievements */}
      <Section title="🏆 ACHIEVEMENTS" color="text-arc-yellow glow-yellow">
        <ul className="space-y-3">
          {achievements.map((a) => (
            <li key={a.title} className="pixel-panel flex gap-4 p-4">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-pixel text-[10px] text-arc-green">{a.title}</p>
                <p className="mt-1 font-term text-lg text-arc-dim">{a.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Contact */}
      <Section title="📡 CONTACT" color="text-arc-cyan glow-cyan">
        <div className="pixel-panel p-6">
          {site.email && (
            <p className="font-term text-lg text-arc-dim">
              EMAIL:{' '}
              <a href={`mailto:${site.email}`} className="text-arc-cyan underline underline-offset-4 hover:text-arc-yellow">
                {site.email}
              </a>
            </p>
          )}
          <SocialLinks className="mt-4" />
        </div>
      </Section>
    </div>
  )
}

function Section({ title, color, children }) {
  return (
    <section>
      <h2 className={`mb-4 border-b-2 border-arc-purple pb-2 font-pixel text-sm ${color} sm:text-base`}>
        {title}
      </h2>
      {children}
    </section>
  )
}
