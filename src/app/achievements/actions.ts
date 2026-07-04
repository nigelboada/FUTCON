'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function markAchievementSeen(achievementUserId: number) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return
  }

  await supabase
    .from('user_achievements')
    .update({
      seen_at: new Date().toISOString(),
    })
    .eq('id', achievementUserId)
    .eq('profile_id', user.id)

  revalidatePath('/')
}
