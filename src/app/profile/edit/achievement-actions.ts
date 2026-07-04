'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function toggleAchievementVisibility(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return
  }

  const userAchievementId = Number(getStringValue(formData, 'userAchievementId'))
  const nextVisibility = getStringValue(formData, 'nextVisibility') === 'true'

  if (!Number.isFinite(userAchievementId)) {
    return
  }

  await supabase
    .from('user_achievements')
    .update({
      is_visible: nextVisibility,
    })
    .eq('id', userAchievementId)
    .eq('profile_id', user.id)

  revalidatePath('/profile/edit')
  revalidatePath(`/profile/${user.id}`)
}