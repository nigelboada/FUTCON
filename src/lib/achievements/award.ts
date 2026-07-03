import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

export async function awardAchievementByCode(profileId: string, code: string) {
  const supabase = createAdminClient()

  const { data: achievement } = await supabase
    .from('achievements')
    .select('id, code')
    .eq('code', code)
    .maybeSingle()

  if (!achievement) return

  const { data: existing } = await supabase
    .from('user_achievements')
    .select('id')
    .eq('profile_id', profileId)
    .eq('achievement_id', achievement.id)
    .maybeSingle()

  if (existing) return

  const { error } = await supabase
    .from('user_achievements')
    .insert({
      profile_id: profileId,
      achievement_id: achievement.id,
    })

  if (!error) {
    const cookieStore = await cookies()
    cookieStore.set('futcon_achievement_popup', code, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 10,
    })
  }
}