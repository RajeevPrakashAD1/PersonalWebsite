// ============================================================
//  CONTENT LAYER
//  One place the whole app asks for goals / projects / posts.
//
//  - If Supabase is configured -> read & write the database (live, instant).
//  - If not -> fall back to the local sample files in src/content/
//    so the site always runs while you set things up.
//
//  Tables expected in Supabase (see supabase-schema.sql):
//    goals(id, title, why, status, progress, started_at, target_at, created_at)
//    projects(id, title, description, tags, video, image, github, demo,
//             goal_id, created_at)
//    posts(id, slug, title, summary, date, body, goal_id, created_at)
// ============================================================
import { supabase, isSupabaseConfigured } from './supabase.js'
import { goals as localGoals } from '../content/goals.js'
import { projects as localProjects } from '../content/projects.js'
import { posts as localPosts } from './posts.js'
import {
  healthProfile as localProfile,
  weightLogs as localWeight,
  fitnessGoals as localFitnessGoals,
} from '../content/health.js'

export { formatDate } from './posts.js'

const STATUS_ORDER = { active: 0, planned: 1, complete: 2 }

// ---- Shape mappers (DB snake_case <-> app camelCase) -------------

const fromGoalRow = (r) => ({
  id: r.id,
  title: r.title,
  why: r.why || '',
  status: r.status || 'planned',
  progress: r.progress ?? 0,
  startedAt: r.started_at || '',
  targetAt: r.target_at || '',
})

const fromProjectRow = (r) => ({
  id: r.id,
  title: r.title,
  description: r.description || '',
  tags: r.tags || [],
  video: r.video || '',
  image: r.image || '',
  github: r.github || '',
  demo: r.demo || '',
  goalId: r.goal_id ?? null,
})

const fromPostRow = (r) => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  summary: r.summary || '',
  date: r.date || '',
  body: r.body || '',
  category: r.category || 'dev',
  goalId: r.goal_id ?? null,
})

// ---- READS -------------------------------------------------------

export async function getGoals() {
  if (!isSupabaseConfigured) return sortGoals([...localGoals])
  const { data, error } = await supabase.from('goals').select('*')
  if (error) throw error
  return sortGoals(data.map(fromGoalRow))
}

export async function getProjects() {
  if (!isSupabaseConfigured) return [...localProjects]
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(fromProjectRow)
}

// `category` is optional: 'dev' for the Logs page, 'fitness' for the Fitness page.
export async function getPosts(category) {
  let posts
  if (!isSupabaseConfigured) {
    posts = [...localPosts]
  } else {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false })
    if (error) throw error
    posts = data.map(fromPostRow)
  }
  if (category) posts = posts.filter((p) => (p.category || 'dev') === category)
  return posts
}

export async function getPost(slug) {
  const posts = await getPosts()
  return posts.find((p) => p.slug === slug)
}

function sortGoals(goals) {
  return goals.sort((a, b) => {
    const s = (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9)
    if (s !== 0) return s
    return (b.startedAt || '').localeCompare(a.startedAt || '')
  })
}

// ---- WRITES (admin only; require Supabase) -----------------------

function requireDb() {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Add your credentials to .env to use the admin.',
    )
  }
}

export async function saveGoal(goal) {
  requireDb()
  const row = {
    title: goal.title,
    why: goal.why,
    status: goal.status,
    progress: Number(goal.progress) || 0,
    started_at: goal.startedAt || null,
    target_at: goal.targetAt || null,
  }
  const q = goal.id
    ? supabase.from('goals').update(row).eq('id', goal.id)
    : supabase.from('goals').insert(row)
  const { error } = await q
  if (error) throw error
}

export async function saveProject(project) {
  requireDb()
  const row = {
    title: project.title,
    description: project.description,
    tags: project.tags,
    video: project.video || null,
    image: project.image || null,
    github: project.github || null,
    demo: project.demo || null,
    goal_id: project.goalId || null,
  }
  const q = project.id
    ? supabase.from('projects').update(row).eq('id', project.id)
    : supabase.from('projects').insert(row)
  const { error } = await q
  if (error) throw error
}

export async function savePost(post) {
  requireDb()
  const row = {
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    date: post.date || null,
    body: post.body,
    category: post.category || 'dev',
    goal_id: post.goalId || null,
  }
  const q = post.id
    ? supabase.from('posts').update(row).eq('id', post.id)
    : supabase.from('posts').insert(row)
  const { error } = await q
  if (error) throw error
}

export async function deleteRow(table, id) {
  requireDb()
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw error
}

// ---- HEALTH ------------------------------------------------------

const fromProfileRow = (r) => ({
  startWeight: r.start_weight,
  goalWeight: r.goal_weight,
  unit: r.unit || 'kg',
  heightCm: r.height_cm,
})

const fromWeightRow = (r) => ({ id: r.id, date: r.date, weight: Number(r.weight) })

const fromFitnessGoalRow = (r) => ({ id: r.id, text: r.text, done: !!r.done })

export async function getHealthProfile() {
  if (!isSupabaseConfigured) return localProfile
  const { data, error } = await supabase
    .from('health_profile').select('*').eq('id', 1).maybeSingle()
  if (error) throw error
  return data ? fromProfileRow(data) : { startWeight: null, goalWeight: null, unit: 'kg', heightCm: null }
}

export async function getWeightLogs() {
  if (!isSupabaseConfigured) {
    return [...localWeight].sort((a, b) => a.date.localeCompare(b.date))
  }
  const { data, error } = await supabase
    .from('weight_logs').select('*').order('date', { ascending: true })
  if (error) throw error
  return data.map(fromWeightRow)
}

export async function getFitnessGoals() {
  if (!isSupabaseConfigured) return [...localFitnessGoals]
  const { data, error } = await supabase
    .from('fitness_goals').select('*').order('created_at', { ascending: true })
  if (error) throw error
  return data.map(fromFitnessGoalRow)
}

export async function saveHealthProfile(p) {
  requireDb()
  const { error } = await supabase.from('health_profile').upsert({
    id: 1,
    start_weight: p.startWeight === '' ? null : Number(p.startWeight),
    goal_weight: p.goalWeight === '' ? null : Number(p.goalWeight),
    unit: p.unit || 'kg',
    height_cm: p.heightCm === '' ? null : Number(p.heightCm),
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

export async function saveWeightLog(w) {
  requireDb()
  const row = { date: w.date, weight: Number(w.weight) }
  const q = w.id
    ? supabase.from('weight_logs').update(row).eq('id', w.id)
    : supabase.from('weight_logs').insert(row)
  const { error } = await q
  if (error) throw error
}

export async function saveFitnessGoal(g) {
  requireDb()
  const row = { text: g.text, done: !!g.done }
  const q = g.id
    ? supabase.from('fitness_goals').update(row).eq('id', g.id)
    : supabase.from('fitness_goals').insert(row)
  const { error } = await q
  if (error) throw error
}
