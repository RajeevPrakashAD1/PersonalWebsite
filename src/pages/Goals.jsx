import { getGoals, getProjects, getPosts } from '../lib/content.js'
import { useAsync } from '../lib/useAsync.js'
import { Loading, ErrorBox } from '../components/Loader.jsx'
import GoalCard from '../components/GoalCard.jsx'

export default function Goals() {
  const { loading, error, data } = useAsync(
    () => Promise.all([getGoals(), getProjects(), getPosts()]),
    [],
  )

  return (
    <div>
      <header className="mb-8 border-b-2 border-arc-purple pb-4">
        <h1 className="font-pixel text-xl text-arc-pink glow-pink sm:text-2xl">
          ⚔ QUESTS
        </h1>
        <p className="mt-3 font-term text-xl text-arc-dim">
          My learning journey — the quests I’m chasing, the projects they produced,
          and the logs along the way. Built in public to keep me honest.
        </p>
      </header>

      {loading && <Loading label="LOADING QUESTS" />}
      {error && <ErrorBox error={error} />}

      {data && (() => {
        const [goals, projects, posts] = data
        if (goals.length === 0) {
          return (
            <p className="font-pixel text-xs text-arc-dim">
              NO QUESTS YET — CHECK BACK SOON.
            </p>
          )
        }
        return (
          <div className="space-y-6">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                projects={projects.filter((p) => p.goalId === goal.id)}
                posts={posts.filter((p) => p.goalId === goal.id)}
              />
            ))}
          </div>
        )
      })()}
    </div>
  )
}
