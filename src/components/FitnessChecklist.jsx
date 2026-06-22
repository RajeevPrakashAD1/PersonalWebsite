import { useState } from 'react'
import { isSupabaseConfigured } from '../lib/supabase.js'
import { useSession } from '../lib/auth.js'
import { getFitnessGoals, saveFitnessGoal, deleteRow } from '../lib/content.js'
import { useAsync } from '../lib/useAsync.js'

// A to-do list of fitness goals.
// - Visitors see it read-only (done items struck through).
// - When YOU are logged in (Supabase), you can add, tick off, and delete inline.
export default function FitnessChecklist() {
  const { session } = useSession()
  const canEdit = isSupabaseConfigured && !!session

  const [version, setVersion] = useState(0)
  const reload = () => setVersion((v) => v + 1)
  const { loading, error, data } = useAsync(() => getFitnessGoals(), [version])

  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)

  const run = async (fn) => {
    setBusy(true)
    try { await fn(); reload() }
    catch (err) { alert(err.message) }
    finally { setBusy(false) }
  }

  const add = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    run(async () => { await saveFitnessGoal({ text: text.trim(), done: false }); setText('') })
  }

  const done = data ? data.filter((g) => g.done).length : 0

  return (
    <section className="pixel-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-pixel text-[11px] text-arc-cyan">☑ FITNESS GOALS</h2>
        {data && data.length > 0 && (
          <span className="font-pixel text-[9px] text-arc-green glow-green">
            {done}/{data.length} DONE
          </span>
        )}
      </div>

      {loading && <p className="font-term text-lg text-arc-dim">Loading…</p>}
      {error && <p className="font-term text-base text-arc-pink">⚠ {error.message}</p>}

      {data && (
        <ul className="space-y-2">
          {data.length === 0 && (
            <li className="font-term text-lg text-arc-dim">No goals yet — add your first one!</li>
          )}
          {data.map((g) => (
            <li key={g.id} className="flex items-center gap-3">
              {canEdit ? (
                <button
                  onClick={() => run(() => saveFitnessGoal({ ...g, done: !g.done }))}
                  disabled={busy}
                  aria-label={g.done ? 'mark not done' : 'mark done'}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 font-pixel text-xs ${
                    g.done
                      ? 'border-arc-green bg-arc-green/15 text-arc-green'
                      : 'border-arc-dim text-transparent hover:border-arc-cyan'
                  }`}
                >
                  ✓
                </button>
              ) : (
                <span className={`shrink-0 font-pixel text-sm ${g.done ? 'text-arc-green' : 'text-arc-dim'}`}>
                  {g.done ? '☑' : '☐'}
                </span>
              )}

              <span className={`flex-1 font-term text-lg ${g.done ? 'text-arc-dim line-through' : 'text-arc-ink'}`}>
                {g.text}
              </span>

              {canEdit && (
                <button
                  onClick={() => run(() => deleteRow('fitness_goals', g.id))}
                  disabled={busy}
                  aria-label="delete"
                  className="shrink-0 font-pixel text-[11px] text-arc-pink hover:glow-pink"
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {canEdit && (
        <form onSubmit={add} className="mt-5 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a fitness goal…"
            className="flex-1 border-2 border-arc-purple bg-arc-surface2 px-3 py-2 font-term text-lg text-arc-ink focus:border-arc-cyan focus:outline-none"
          />
          <button disabled={busy} className="pixel-btn border-arc-green bg-arc-green/15 text-arc-green">
            ADD
          </button>
        </form>
      )}

      {!canEdit && isSupabaseConfigured && (
        <p className="mt-4 font-pixel text-[9px] text-arc-dim">
          Log in at /admin to edit your checklist.
        </p>
      )}
    </section>
  )
}
