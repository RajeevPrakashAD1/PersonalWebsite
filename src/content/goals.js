// ============================================================
//  SAMPLE GOALS (the "Campaign" / Main Quests).
//
//  These are only used as a fallback BEFORE you connect Supabase.
//  Once Supabase is set up, goals come from the database and you
//  add them from the /admin dashboard instead of editing this file.
//
//  Fields:
//    id          - unique number (used to link projects/posts to a goal)
//    title       - the goal, e.g. 'Master React'
//    why         - one line on why you're doing it
//    status      - 'planned' | 'active' | 'complete'
//    progress    - 0–100 (you set it manually)
//    startedAt   - 'YYYY-MM-DD'
//    targetAt    - 'YYYY-MM-DD'  (the deadline that keeps you honest)
// ============================================================

export const goals = [
  {
    id: 1,
    title: 'Master React',
    why: 'Build interactive game UIs and ship real front-ends.',
    status: 'active',
    progress: 60,
    startedAt: '2026-06-01',
    targetAt: '2026-08-01',
  },
  {
    id: 2,
    title: 'Learn Game Development',
    why: 'Make a small playable game from scratch.',
    status: 'planned',
    progress: 10,
    startedAt: '2026-07-01',
    targetAt: '2026-12-01',
  },
]
