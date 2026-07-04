type UnlockedAchievement = {
  id: number
  title: string
  description?: string
  icon: string
}

export function AchievementBadges({
  achievements,
  emptyText,
}: {
  achievements: UnlockedAchievement[]
  emptyText: string
}) {
  return (
    <section className="space-y-4 rounded-md border bg-background p-4">
      <div>
        <h2 className="text-lg font-semibold">Assoliments</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Col·lecció d’insígnies desbloquejades dins de FUTCON.
        </p>
      </div>

      {achievements.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center gap-3 rounded-xl border bg-muted/40 p-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-2xl shadow-sm">
                {achievement.icon}
              </div>

              <div>
                <p className="font-medium">{achievement.title}</p>
                {achievement.description ? (
                  <p className="text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      )}
    </section>
  )
}
