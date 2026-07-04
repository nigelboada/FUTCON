import { toggleAchievementVisibility } from '@/app/profile/edit/achievement-actions'

type EditableAchievement = {
  userAchievementId: number
  title: string
  description: string
  icon: string
  isVisible: boolean
}

type EditableAchievementCollectionProps = {
  achievements: EditableAchievement[]
  labels: {
    title: string
    description: string
    visible: string
    hidden: string
    hide: string
    show: string
    emptyVisible: string
    emptyHidden: string
  }
}

function AchievementItem({
  achievement,
  actionLabel,
  nextVisibility,
}: {
  achievement: EditableAchievement
  actionLabel: string
  nextVisibility: boolean
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border bg-background p-4 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-3xl">
        {achievement.icon}
      </div>

      <p className="mt-3 text-sm font-semibold">{achievement.title}</p>

      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
        {achievement.description}
      </p>

      <form action={toggleAchievementVisibility} className="mt-3">
        <input
          type="hidden"
          name="userAchievementId"
          value={achievement.userAchievementId}
        />
        <input
          type="hidden"
          name="nextVisibility"
          value={String(nextVisibility)}
        />

        <button
          type="submit"
          className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
        >
          {actionLabel}
        </button>
      </form>
    </div>
  )
}

export function EditableAchievementCollection({
  achievements,
  labels,
}: EditableAchievementCollectionProps) {
  const visibleAchievements = achievements.filter((item) => item.isVisible)
  const hiddenAchievements = achievements.filter((item) => !item.isVisible)

  return (
    <section className="space-y-6 rounded-xl border bg-background p-5">
      <div>
        <h2 className="text-lg font-semibold">{labels.title}</h2>
        <p className="text-sm text-muted-foreground">{labels.description}</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">{labels.visible}</h3>

        {visibleAchievements.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visibleAchievements.map((achievement) => (
              <AchievementItem
                key={achievement.userAchievementId}
                achievement={achievement}
                actionLabel={labels.hide}
                nextVisibility={false}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {labels.emptyVisible}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">{labels.hidden}</h3>

        {hiddenAchievements.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {hiddenAchievements.map((achievement) => (
              <AchievementItem
                key={achievement.userAchievementId}
                achievement={achievement}
                actionLabel={labels.show}
                nextVisibility
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {labels.emptyHidden}
          </p>
        )}
      </div>
    </section>
  )
}