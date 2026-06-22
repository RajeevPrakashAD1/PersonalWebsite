// Arcade-flavored loading + error states, reused across pages.

export function Loading({ label = 'LOADING' }) {
  return (
    <div className="py-20 text-center">
      <p className="font-pixel text-sm text-arc-green glow-green">
        {label}
        <span className="blink">_</span>
      </p>
      <p className="mt-4 font-pixel text-[10px] text-arc-dim">
        ▰▰▰▰▰▱▱▱▱▱
      </p>
    </div>
  )
}

export function ErrorBox({ error }) {
  return (
    <div className="pixel-panel border-arc-pink p-6 text-center">
      <p className="font-pixel text-xs text-arc-pink glow-pink">⚠ CONNECTION LOST</p>
      <p className="mt-4 font-term text-lg text-arc-dim">
        {String(error?.message || error)}
      </p>
    </div>
  )
}
