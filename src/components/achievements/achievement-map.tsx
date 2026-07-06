import Link from 'next/link'

type Achievement = {
  id: number
  code: string
  title: string
  description: string
  icon_key: string
  sort_order: number
  unlocked: boolean
}

type AchievementMapLabels = {
  unlockedCount: string
  actionHint: string
}

const positions = [
  { x: 10, y: 82 },
  { x: 32, y: 70 },
  { x: 14, y: 57 },
  { x: 38, y: 45 },
  { x: 64, y: 56 },
  { x: 86, y: 42 },
  { x: 62, y: 28 },
  { x: 82, y: 18 },
  { x: 94, y: 8 },
]

const actionRoutes: Record<string, string> = {
  welcome: '/dashboard',
  profile_25: '/profile/edit',
  avatar_uploaded: '/profile/edit#profile-avatar',
  profile_50: '/profile/edit',
  search_explorer: '/search',
  first_message: '/conversations',
  first_review: '/search',
  achievement_explorer: '/achievements',
  profile_100: '/profile/edit',
}

function iconFromKey(iconKey: string) {
  switch (iconKey) {
    case 'ball':
      return '⚽'
    case 'runner':
      return '🏃'
    case 'whistle':
      return '🪈'
    case 'boot':
      return '👟'
    case 'chart':
      return '📈'
    case 'search':
      return '🔎'
    case 'map':
      return '🗺️'
    case 'trophy':
    case 'cup':
      return '🏆'
    case 'player':
      return '🧍'
    case 'chat':
      return '💬'
    case 'medal':
      return '🏅'
    case 'badge':
      return '✅'
    default:
      return '⭐'
  }
}

export function AchievementMap({
  achievements,
  labels,
}: {
  achievements: Achievement[]
  labels: AchievementMapLabels
}) {
  const unlockedCount = achievements.filter((item) => item.unlocked).length
  const unlockedCountLabel = labels.unlockedCount
    .replace('{unlocked}', String(unlockedCount))
    .replace('{total}', String(achievements.length))

  return (
    <div className="relative overflow-hidden rounded-3xl border bg-[linear-gradient(180deg,#2f855a_0%,#276749_100%)] p-6 text-white shadow-xl">
      <div className="mb-6 text-center">
        <div className="mx-auto w-fit rounded-full bg-white/10 px-5 py-2 text-sm font-medium">
          {unlockedCountLabel}
        </div>
      </div>

      <div className="relative h-205 rounded-3xl border border-white/20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect
            x="2"
            y="2"
            width="96"
            height="96"
            rx="2"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.4"
          />
          <line
            x1="50"
            y1="2"
            x2="50"
            y2="98"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="9"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.3"
          />

          <path
            d="
              M 10 82
              C 30 86, 46 75, 32 70
              C 10 62, 2 55, 14 57
              C 34 60, 56 46, 38 45
              C 20 44, 44 68, 64 56
              C 88 42, 96 34, 86 42
              C 68 54, 42 22, 62 28
              C 82 34, 98 18, 82 18
              C 70 18, 82 8, 94 8
            "
            fill="none"
            stroke="black"
            strokeWidth="0.8"
            strokeDasharray="2 1.5"
            strokeLinecap="round"
          />
        </svg>

        {achievements.map((achievement, index) => {
          const position = positions[index] ?? positions[positions.length - 1]
          const route = actionRoutes[achievement.code] ?? '/dashboard'

          return (
            <Link
              key={achievement.id}
              href={route}
              className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full border-2 text-3xl shadow-lg transition hover:scale-110 ${
                  achievement.unlocked
                    ? 'border-yellow-200 bg-white text-foreground'
                    : 'border-white/30 bg-white/10 grayscale opacity-50 hover:opacity-80'
                }`}
              >
                {iconFromKey(achievement.icon_key)}
              </div>

              <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 hidden w-64 -translate-x-1/2 rounded-xl border-2 border-yellow-400 bg-white px-4 py-3 text-left text-sm text-foreground shadow-xl group-hover:block group-focus:block">
                <p className="font-bold">{achievement.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {achievement.description}
                </p>
                <p className="mt-2 text-xs font-medium text-yellow-700">
                  {labels.actionHint}
                </p>
              </div>

              <p className="mt-2 max-w-27.5 text-center text-xs font-medium text-white">
                {achievement.title}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
