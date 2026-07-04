import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AchievementMap } from '@/components/achievements/achievement-map'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'

type AchievementRow = {
  id: number
  code: string
  title_ca: string
  title_es: string
  title_en: string
  description_ca: string
  description_es: string
  description_en: string
  icon_key: string
  sort_order: number
}

export default async function AchievementsPage() {
  const supabase = await createClient()
  const locale = await getLocale()
  const m = getMessages(locale)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: achievements } = await supabase
    .from('achievements')
    .select(
      'id, code, title_ca, title_es, title_en, description_ca, description_es, description_en, icon_key, sort_order'
    )
    .order('sort_order', { ascending: true })

  const { data: unlocked } = await supabase
    .from('user_achievements')
    .select('achievement_id')
    .eq('profile_id', user.id)

  const unlockedIds = new Set((unlocked ?? []).map((item) => item.achievement_id))

  const localizedAchievements = ((achievements ?? []) as AchievementRow[]).map(
    (achievement) => ({
      id: achievement.id,
      code: achievement.code,
      title:
        locale === 'es'
          ? achievement.title_es
          : locale === 'en'
            ? achievement.title_en
            : achievement.title_ca,
      description:
        locale === 'es'
          ? achievement.description_es
          : locale === 'en'
            ? achievement.description_en
            : achievement.description_ca,
      icon_key: achievement.icon_key,
      sort_order: achievement.sort_order,
      unlocked: unlockedIds.has(achievement.id),
    })
  )

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            {m.achievements.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {m.achievements.description}
          </p>
        </div>

        <AchievementMap
          achievements={localizedAchievements}
          labels={{
            unlockedCount: m.achievements.unlockedCount,
          }}
        />
      </div>
    </main>
  )
}
