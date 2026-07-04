import type { SupabaseClient } from '@supabase/supabase-js'
import { awardCompletenessAchievements } from './award'

export async function syncCompletenessAchievements(
  supabase: SupabaseClient,
  profileId: string,
  percentage: number
) {
  await awardCompletenessAchievements(supabase, profileId, percentage)
}
