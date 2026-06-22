// ============================================================
//  SAMPLE HEALTH DATA (fallback before Supabase is connected).
//  Once Supabase is set up, this comes from the database and you
//  log it from the /admin dashboard (WEIGHT / ACTIVITY / PROFILE tabs).
// ============================================================

export const healthProfile = {
  startWeight: 85,
  goalWeight: 72,
  unit: 'kg',
  heightCm: 175,
}

// Weigh-ins, oldest first (the chart sorts by date anyway).
export const weightLogs = [
  { id: 1, date: '2026-04-06', weight: 85.0 },
  { id: 2, date: '2026-04-20', weight: 84.1 },
  { id: 3, date: '2026-05-04', weight: 82.8 },
  { id: 4, date: '2026-05-18', weight: 81.9 },
  { id: 5, date: '2026-06-01', weight: 80.5 },
  { id: 6, date: '2026-06-08', weight: 79.8 },
]

// A simple to-do checklist of fitness goals. Tick `done: true` to strike it out.
export const fitnessGoals = [
  { id: 1, text: 'Run 5K without stopping', done: false },
  { id: 2, text: 'Hit the gym 3× a week for a month', done: true },
  { id: 3, text: 'Play badminton every weekend', done: false },
  { id: 4, text: 'Cut out late-night snacking', done: true },
]
