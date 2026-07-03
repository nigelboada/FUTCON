type UnlockedAchievement = {
  id: number
  title: string
  icon: string
}

export function AchievementBadges({
  achievements,
  title,
  compact = false,
}: {
  achievements: UnlockedAchievement[]
  title?: string
  compact?: boolean
}) {
  if (achievements.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {!compact && title ? (
        <h3 className="text-lg font-semibold">{title}</h3>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`flex items-center gap-2 rounded-full border bg-background px-3 py-1 shadow-sm ${
              compact ? 'text-xs' : 'text-sm'
            }`}
            title={achievement.title}
          >
            <span>{achievement.icon}</span>
            {!compact ? <span>{achievement.title}</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
