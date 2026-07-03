import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AchievementMap } from '@/components/achievements/achievement-map'

export default async function AchievementsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: achievements } = await supabase
    .from('achievements')
    .select('*')
    .order('sort_order', { ascending: true })

  const { data: unlocked } = await supabase
    .from('user_achievements')
    .select('achievement_id')
    .eq('profile_id', user.id)

  const unlockedIds = new Set((unlocked ?? []).map((item) => item.achievement_id))

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Assoliments</h1>
          <p className="mt-2 text-muted-foreground">
            Avança pel camp i desbloqueja noves insígnies dins de FUTCON.
          </p>
        </div>

        <AchievementMap
          achievements={(achievements ?? []).map((achievement) => ({
            ...achievement,
            unlocked: unlockedIds.has(achievement.id),
          }))}
        />
      </div>
    </main>
  )
}