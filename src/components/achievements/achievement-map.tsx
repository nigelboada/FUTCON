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
  { x: 8, y: 78 },
  { x: 25, y: 65 },
  { x: 12, y: 50 },
  { x: 33, y: 36 },
  { x: 55, y: 52 },
  { x: 77, y: 38 },
  { x: 60, y: 23 },
  { x: 80, y: 13 },
  { x: 94, y: 8 },
]

const actionRoutes: Record<string, string> = {
  welcome: '/dashboard',
  profile_25: '/profile/edit',
  profile_50: '/profile/edit',
  profile_100: '/profile/edit',
  avatar_uploaded: '/profile/edit#profile-avatar',
  first_message: '/conversations',
  first_review: '/search',
  verified_request: '/profile/edit',
  verified_profile: '/profile/edit',
}

function iconFromKey(iconKey: string) {
  switch (iconKey) {
    case 'ball':
      return '⚽'
    case 'runner':
      return '🏃‍♀️'
    case 'whistle':
      return '🪈'
    case 'boot':
      return '👟'
    case 'chart':
      return '📈'
    case 'trophy':
      return '🏆'
    case 'player':
      return '🧍'
    case 'chat':
      return '💬'
    case 'medal':
      return '🏅'
    case 'badge':
      return '✅'
    case 'cup':
      return '🏆'
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
  const counterText = labels.unlockedCount
    .replace('{unlocked}', String(unlockedCount))
    .replace('{total}', String(achievements.length))

  return (
    <div className="relative overflow-hidden rounded-3xl border bg-[linear-gradient(180deg,#2f855a_0%,#276749_100%)] p-4 text-white shadow-xl sm:p-6">
      <div className="mb-6 text-center">
        <div className="mx-auto w-fit rounded-full bg-white/10 px-5 py-2 text-sm font-medium">
          {counterText}
        </div>
      </div>

      <div className="relative aspect-7/5 min-h-140 overflow-hidden rounded-3xl border border-white/20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] sm:min-h-180">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect
            x="3"
            y="3"
            width="94"
            height="94"
            rx="2"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.55"
          />

          <line
            x1="50"
            y1="3"
            x2="50"
            y2="97"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="0.45"
          />

          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="0.45"
          />

          <rect
            x="3"
            y="38"
            width="9"
            height="24"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="0.45"
          />

          <rect
            x="88"
            y="38"
            width="9"
            height="24"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="0.45"
          />

          <path
            d="
              M 8 78
              C 27 86, 43 75, 25 65
              C 5 53, 2 42, 12 50
              C 31 66, 52 43, 33 36
              C 19 31, 35 66, 55 52
              C 80 34, 95 55, 77 38
              C 58 20, 43 11, 60 23
              C 78 36, 97 20, 80 13
              C 71 9, 83 6, 94 8
            "
            fill="none"
            stroke="black"
            strokeWidth="0.9"
            strokeDasharray="2.2 1.4"
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
                className={`flex h-14 w-14 items-center justify-center rounded-full border-2 text-3xl shadow-lg transition hover:scale-110 sm:h-16 sm:w-16 ${
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
