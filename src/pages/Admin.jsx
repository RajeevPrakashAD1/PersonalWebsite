import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '../lib/supabase.js'
import { useSession, signIn, signOut } from '../lib/auth.js'
import {
  getGoals, getProjects, getPosts,
  saveGoal, saveProject, savePost, deleteRow,
  getHealthProfile, getWeightLogs,
  saveHealthProfile, saveWeightLog,
} from '../lib/content.js'

// Shared styles
const input = 'w-full border-2 border-arc-purple bg-arc-surface2 px-3 py-2 font-term text-lg text-arc-ink focus:border-arc-cyan focus:outline-none'
const label = 'block font-pixel text-[10px] text-arc-cyan mb-1'
const btnGreen = 'pixel-btn border-arc-green bg-arc-green/15 text-arc-green'
const btnCyan = 'pixel-btn border-arc-cyan bg-arc-cyan/10 text-arc-cyan'

function Field({ label: l, children }) {
  return (
    <label className="block">
      <span className={label}>{l}</span>
      {children}
    </label>
  )
}

export default function Admin() {
  const { session, ready } = useSession()

  if (!isSupabaseConfigured) return <NotConfigured />
  if (!ready) return <p className="font-pixel text-xs text-arc-dim">CHECKING SESSION…</p>
  if (!session) return <Login />
  return <Dashboard email={session.user?.email} />
}

// ---- Not connected yet -------------------------------------------
function NotConfigured() {
  return (
    <div className="pixel-panel border-arc-yellow p-6">
      <h1 className="font-pixel text-sm text-arc-yellow glow-yellow">⚠ SUPABASE NOT CONNECTED</h1>
      <p className="mt-4 font-term text-lg text-arc-dim">
        The admin needs a database. Add your Supabase credentials to a{' '}
        <code className="text-arc-green">.env</code> file (see{' '}
        <code className="text-arc-green">.env.example</code>) and restart the dev
        server. Until then, the public site runs on the local sample content.
      </p>
    </div>
  )
}

// ---- Login -------------------------------------------------------
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError(null)
    try { await signIn(email, password) }
    catch (err) { setError(err.message) }
    finally { setBusy(false) }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-pixel text-lg text-arc-green glow-green">▶ PLAYER LOGIN</h1>
      <form onSubmit={submit} className="pixel-panel mt-6 space-y-4 p-6">
        <Field label="EMAIL">
          <input className={input} type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </Field>
        <Field label="PASSWORD">
          <input className={input} type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </Field>
        {error && <p className="font-term text-base text-arc-pink">⚠ {error}</p>}
        <button className={btnGreen} disabled={busy}>
          {busy ? 'LOADING…' : 'INSERT COIN'}
        </button>
      </form>
    </div>
  )
}

// ---- Dashboard ---------------------------------------------------
const TABS = [
  { key: 'goals', label: 'QUESTS' },
  { key: 'projects', label: 'PROJECTS' },
  { key: 'posts', label: 'LOGS' },
  { key: 'weight', label: 'WEIGHT' },
  { key: 'profile', label: 'PROFILE' },
]

function Dashboard({ email }) {
  const [tab, setTab] = useState('goals')

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-arc-purple pb-4">
        <h1 className="font-pixel text-base text-arc-yellow glow-yellow">⚙ ADMIN CONSOLE</h1>
        <div className="flex items-center gap-3">
          <span className="font-term text-base text-arc-dim">{email}</span>
          <button onClick={signOut} className="font-pixel border-2 border-arc-pink px-3 py-2 text-[9px] text-arc-pink hover:bg-arc-pink/15">
            LOGOUT
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`font-pixel border-2 px-3 py-2 text-[10px] ${
              tab === t.key
                ? 'border-arc-green bg-arc-green/15 text-arc-green'
                : 'border-arc-purple text-arc-dim hover:text-arc-cyan'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'goals' && <GoalManager />}
      {tab === 'projects' && <ProjectManager />}
      {tab === 'posts' && <PostManager />}
      {tab === 'weight' && <WeightManager />}
      {tab === 'profile' && <ProfileManager />}
    </div>
  )
}

// Generic save/feedback wrapper for a form submit.
function useSaver(reload) {
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)
  const run = async (fn) => {
    setBusy(true); setError(null)
    try { await fn(); await reload(); return true }
    catch (err) { setError(err.message); return false }
    finally { setBusy(false) }
  }
  return { error, busy, run }
}

// ---- GOALS -------------------------------------------------------
function GoalManager() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const reload = async () => setItems(await getGoals())
  useEffect(() => { reload() }, [])
  const { error, busy, run } = useSaver(reload)

  const blank = { title: '', why: '', status: 'active', progress: 0, startedAt: '', targetAt: '' }
  const form = editing ?? blank

  return (
    <div className="space-y-6">
      <GoalForm key={editing?.id ?? 'new'} initial={form} busy={busy} error={error}
        onSubmit={(g) => run(() => saveGoal(g)).then((ok) => ok && setEditing(null))}
        onCancel={editing ? () => setEditing(null) : null} />
      <ItemList items={items} render={(g) => `${g.title} · ${g.progress}% · ${g.status}`}
        onEdit={setEditing} onDelete={(id) => run(() => deleteRow('goals', id))} />
    </div>
  )
}

function GoalForm({ initial, onSubmit, onCancel, busy, error }) {
  const [g, setG] = useState(initial)
  const set = (k) => (e) => setG({ ...g, [k]: e.target.value })
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(g) }} className="pixel-panel space-y-4 p-6">
      <p className="font-pixel text-[11px] text-arc-pink">{g.id ? 'EDIT QUEST' : '+ NEW QUEST'}</p>
      <Field label="TITLE"><input className={input} value={g.title} onChange={set('title')} required /></Field>
      <Field label="WHY (one line)"><input className={input} value={g.why} onChange={set('why')} /></Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="STATUS">
          <select className={input} value={g.status} onChange={set('status')}>
            <option value="active">active</option>
            <option value="planned">planned</option>
            <option value="complete">complete</option>
          </select>
        </Field>
        <Field label={`PROGRESS ${g.progress}%`}>
          <input className={input} type="range" min="0" max="100" value={g.progress} onChange={set('progress')} />
        </Field>
        <div />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="STARTED"><input className={input} type="date" value={g.startedAt || ''} onChange={set('startedAt')} /></Field>
        <Field label="TARGET"><input className={input} type="date" value={g.targetAt || ''} onChange={set('targetAt')} /></Field>
      </div>
      <FormActions busy={busy} error={error} onCancel={onCancel} />
    </form>
  )
}

// ---- PROJECTS ----------------------------------------------------
function ProjectManager() {
  const [items, setItems] = useState([])
  const [goals, setGoals] = useState([])
  const [editing, setEditing] = useState(null)
  const reload = async () => { setItems(await getProjects()); setGoals(await getGoals()) }
  useEffect(() => { reload() }, [])
  const { error, busy, run } = useSaver(reload)

  const blank = { title: '', description: '', tags: [], video: '', image: '', github: '', demo: '', goalId: '' }
  const form = editing ?? blank

  return (
    <div className="space-y-6">
      <ProjectForm key={editing?.id ?? 'new'} initial={form} goals={goals} busy={busy} error={error}
        onSubmit={(p) => run(() => saveProject(p)).then((ok) => ok && setEditing(null))}
        onCancel={editing ? () => setEditing(null) : null} />
      <ItemList items={items} render={(p) => p.title}
        onEdit={(p) => setEditing({ ...p, tags: p.tags || [] })}
        onDelete={(id) => run(() => deleteRow('projects', id))} />
    </div>
  )
}

function ProjectForm({ initial, goals, onSubmit, onCancel, busy, error }) {
  const [p, setP] = useState({ ...initial, tagsText: (initial.tags || []).join(', ') })
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    onSubmit({
      ...p,
      tags: p.tagsText.split(',').map((t) => t.trim()).filter(Boolean),
      goalId: p.goalId ? Number(p.goalId) : null,
    })
  }
  return (
    <form onSubmit={submit} className="pixel-panel space-y-4 p-6">
      <p className="font-pixel text-[11px] text-arc-pink">{p.id ? 'EDIT PROJECT' : '+ NEW PROJECT'}</p>
      <Field label="TITLE"><input className={input} value={p.title} onChange={set('title')} required /></Field>
      <Field label="DESCRIPTION"><textarea className={input} rows="3" value={p.description} onChange={set('description')} /></Field>
      <Field label="TAGS (comma separated)"><input className={input} value={p.tagsText} onChange={set('tagsText')} placeholder="React, Vite, Tailwind" /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="VIDEO URL (YouTube/Vimeo or /videos/x.mp4)"><input className={input} value={p.video} onChange={set('video')} /></Field>
        <Field label="IMAGE URL (used if no video)"><input className={input} value={p.image} onChange={set('image')} /></Field>
        <Field label="GITHUB URL"><input className={input} value={p.github} onChange={set('github')} /></Field>
        <Field label="LIVE DEMO URL"><input className={input} value={p.demo} onChange={set('demo')} /></Field>
      </div>
      <Field label="LINK TO QUEST (optional)">
        <select className={input} value={p.goalId || ''} onChange={set('goalId')}>
          <option value="">— none —</option>
          {goals.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
        </select>
      </Field>
      <FormActions busy={busy} error={error} onCancel={onCancel} />
    </form>
  )
}

// ---- POSTS -------------------------------------------------------
function PostManager() {
  const [items, setItems] = useState([])
  const [goals, setGoals] = useState([])
  const [editing, setEditing] = useState(null)
  const reload = async () => { setItems(await getPosts()); setGoals(await getGoals()) }
  useEffect(() => { reload() }, [])
  const { error, busy, run } = useSaver(reload)

  const today = new Date().toISOString().slice(0, 10)
  const blank = { title: '', slug: '', summary: '', date: today, body: '', category: 'dev', goalId: '' }
  const form = editing ?? blank

  return (
    <div className="space-y-6">
      <PostForm key={editing?.id ?? 'new'} initial={form} goals={goals} busy={busy} error={error}
        onSubmit={(post) => run(() => savePost(post)).then((ok) => ok && setEditing(null))}
        onCancel={editing ? () => setEditing(null) : null} />
      <ItemList items={items} render={(p) => `${p.category === 'fitness' ? '🏋 ' : ''}${p.title} (${p.date})`}
        onEdit={setEditing} onDelete={(id) => run(() => deleteRow('posts', id))} />
    </div>
  )
}

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function PostForm({ initial, goals, onSubmit, onCancel, busy, error }) {
  const [p, setP] = useState(initial)
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    onSubmit({ ...p, slug: p.slug || slugify(p.title), goalId: p.goalId ? Number(p.goalId) : null })
  }
  return (
    <form onSubmit={submit} className="pixel-panel space-y-4 p-6">
      <p className="font-pixel text-[11px] text-arc-pink">{p.id ? 'EDIT LOG' : '+ NEW LOG'}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="TITLE"><input className={input} value={p.title} onChange={set('title')} required /></Field>
        <Field label="DATE"><input className={input} type="date" value={p.date || ''} onChange={set('date')} /></Field>
      </div>
      <Field label="SLUG (URL — auto from title if blank)"><input className={input} value={p.slug} onChange={set('slug')} placeholder={slugify(p.title) || 'my-post'} /></Field>
      <Field label="SUMMARY (one line in the list)"><input className={input} value={p.summary} onChange={set('summary')} /></Field>
      <Field label="CATEGORY">
        <select className={input} value={p.category || 'dev'} onChange={set('category')}>
          <option value="dev">dev — shows in LOGS</option>
          <option value="fitness">fitness — shows on FITNESS page</option>
        </select>
      </Field>
      <Field label="BODY (Markdown)"><textarea className={`${input} font-mono`} rows="10" value={p.body} onChange={set('body')} /></Field>
      <Field label="LINK TO QUEST (optional)">
        <select className={input} value={p.goalId || ''} onChange={set('goalId')}>
          <option value="">— none —</option>
          {goals.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
        </select>
      </Field>
      <FormActions busy={busy} error={error} onCancel={onCancel} />
    </form>
  )
}

// ---- WEIGHT ------------------------------------------------------
function WeightManager() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const reload = async () => setItems((await getWeightLogs()).slice().reverse())
  useEffect(() => { reload() }, [])
  const { error, busy, run } = useSaver(reload)

  const today = new Date().toISOString().slice(0, 10)
  const form = editing ?? { date: today, weight: '' }

  return (
    <div className="space-y-6">
      <WeightForm key={editing?.id ?? 'new'} initial={form} busy={busy} error={error}
        onSubmit={(w) => run(() => saveWeightLog(w)).then((ok) => ok && setEditing(null))}
        onCancel={editing ? () => setEditing(null) : null} />
      <ItemList items={items} render={(w) => `${w.date} — ${w.weight}`}
        onEdit={setEditing} onDelete={(id) => run(() => deleteRow('weight_logs', id))} />
    </div>
  )
}

function WeightForm({ initial, onSubmit, onCancel, busy, error }) {
  const [w, setW] = useState(initial)
  const set = (k) => (e) => setW({ ...w, [k]: e.target.value })
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(w) }} className="pixel-panel space-y-4 p-6">
      <p className="font-pixel text-[11px] text-arc-pink">{w.id ? 'EDIT WEIGH-IN' : '+ LOG WEIGHT'}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="DATE"><input className={input} type="date" value={w.date || ''} onChange={set('date')} required /></Field>
        <Field label="WEIGHT (number)"><input className={input} type="number" step="0.1" value={w.weight} onChange={set('weight')} required /></Field>
      </div>
      <FormActions busy={busy} error={error} onCancel={onCancel} />
    </form>
  )
}

// ---- PROFILE (goal weight) ---------------------------------------
function ProfileManager() {
  const [p, setP] = useState(null)
  const reload = async () => setP(await getHealthProfile())
  useEffect(() => { reload() }, [])
  const { error, busy, run } = useSaver(reload)
  if (!p) return <p className="font-pixel text-[10px] text-arc-dim">LOADING…</p>
  return <ProfileForm initial={p} busy={busy} error={error} onSubmit={(v) => run(() => saveHealthProfile(v))} />
}

function ProfileForm({ initial, onSubmit, busy, error }) {
  const [p, setP] = useState({
    startWeight: initial.startWeight ?? '',
    goalWeight: initial.goalWeight ?? '',
    unit: initial.unit || 'kg',
    heightCm: initial.heightCm ?? '',
  })
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value })
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(p) }} className="pixel-panel space-y-4 p-6">
      <p className="font-pixel text-[11px] text-arc-pink">FITNESS PROFILE</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="START WEIGHT"><input className={input} type="number" step="0.1" value={p.startWeight} onChange={set('startWeight')} /></Field>
        <Field label="GOAL WEIGHT"><input className={input} type="number" step="0.1" value={p.goalWeight} onChange={set('goalWeight')} /></Field>
        <Field label="UNIT">
          <select className={input} value={p.unit} onChange={set('unit')}>
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </Field>
        <Field label="HEIGHT (cm, optional)"><input className={input} type="number" value={p.heightCm} onChange={set('heightCm')} /></Field>
      </div>
      <FormActions busy={busy} error={error} onCancel={null} />
    </form>
  )
}

// ---- Shared form bits --------------------------------------------
function FormActions({ busy, error, onCancel }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      <button className={btnGreen} disabled={busy}>{busy ? 'SAVING…' : '✔ SAVE'}</button>
      {onCancel && (
        <button type="button" onClick={onCancel} className={btnCyan}>CANCEL</button>
      )}
      {error && <span className="font-term text-base text-arc-pink">⚠ {error}</span>}
    </div>
  )
}

function ItemList({ items, render, onEdit, onDelete }) {
  if (!items.length) {
    return <p className="font-pixel text-[10px] text-arc-dim">NOTHING SAVED YET.</p>
  }
  return (
    <ul className="pixel-panel divide-y-2 divide-arc-purple">
      {items.map((it) => (
        <li key={it.id} className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="font-term text-lg text-arc-ink">{render(it)}</span>
          <span className="flex shrink-0 gap-2">
            <button onClick={() => onEdit(it)} className="font-pixel border-2 border-arc-cyan px-2 py-1 text-[9px] text-arc-cyan hover:bg-arc-cyan/15">EDIT</button>
            <button onClick={() => { if (confirm('Delete this?')) onDelete(it.id) }} className="font-pixel border-2 border-arc-pink px-2 py-1 text-[9px] text-arc-pink hover:bg-arc-pink/15">DEL</button>
          </span>
        </li>
      ))}
    </ul>
  )
}
