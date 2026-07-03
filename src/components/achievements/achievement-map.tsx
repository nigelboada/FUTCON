type Achievement = {
  id: number
  code: string
  title_ca: string
  description_ca: string
  icon_key: string
  sort_order: number
  unlocked: boolean
}

const positions = [
  { top: '78%', left: '8%' },
  { top: '68%', left: '18%' },
  { top: '58%', left: '32%' },
  { top: '64%', left: '47%' },
  { top: '47%', left: '60%' },
  { top: '38%', left: '74%' },
  { top: '24%', left: '84%' },
  { top: '16%', left: '70%' },
  { top: '10%', left: '90%' },
]

function iconFromKey(iconKey: string) {
  switch (iconKey) {
    case 'ball':
      return '⚽'
    case 'whistle':
      return '🪈'
    case 'boot':
      return '👟'
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

export function AchievementMap({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-[linear-gradient(180deg,#2f855a_0%,#276749_100%)] p-6 text-white shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
          Inici 🔴 → Meta 🏆
        </div>
        <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
          {achievements.filter((a) => a.unlocked).length}/{achievements.length} assoliments
        </div>
      </div>

      <div className="relative h-200 rounded-3xl border border-white/20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="2" y="2" width="96" height="96" rx="2" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.4" />
          <line x1="50" y1="2" x2="50" y2="98" stroke="rgba(255,255,255,0.25)" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="9" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.3" />

          <path
            d="M 8 83 C 18 78, 22 70, 31 67
               S 44 55, 51 60
               S 62 44, 74 39
               S 82 22, 92 12"
            fill="none"
            stroke="black"
            strokeWidth="0.7"
            strokeDasharray="2 1.3"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute bottom-[10%] left-[5%] text-2xl">❌</div>
        <div className="absolute top-[8%] right-[6%] text-4xl">🏆</div>

        {achievements.map((achievement, index) => {
          const position = positions[index] ?? positions[positions.length - 1]

          return (
            <div
              key={achievement.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: position.top, left: position.left }}
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full border-2 text-3xl shadow-lg transition ${
                  achievement.unlocked
                    ? 'border-yellow-200 bg-white text-foreground'
                    : 'border-white/30 bg-white/10 grayscale opacity-55'
                }`}
                title={achievement.title_ca}
              >
                {iconFromKey(achievement.icon_key)}
              </div>

              <p className="mt-2 max-w-22.5 text-center text-xs font-medium text-white">
                {achievement.title_ca}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}