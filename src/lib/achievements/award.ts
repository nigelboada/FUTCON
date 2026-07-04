import type { SupabaseClient } from '@supabase/supabase-js'

export async function awardAchievement(
  supabase: SupabaseClient,
  code: string,
  profileId?: string
) {
  const { error } = await supabase.rpc('award_achievement', {
    achievement_code: code,
    target_profile_id: profileId ?? undefined,
  })

  if (error) {
    console.error('Achievement unlock error:', error.message)
  }
}

export async function awardCompletenessAchievements(
  supabase: SupabaseClient,
  profileId: string,
  percentage: number
) {
  if (percentage >= 25) {
    await awardAchievement(supabase, 'profile_25', profileId)
  }

  if (percentage >= 50) {
    await awardAchievement(supabase, 'profile_50', profileId)
  }

  if (percentage >= 100) {
    await awardAchievement(supabase, 'profile_100', profileId)
  }
}