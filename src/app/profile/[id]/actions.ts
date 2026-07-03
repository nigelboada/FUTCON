'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { awardAchievementByCode } from '@/lib/achievements/award'

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

export async function submitReview(formData: FormData) {
  const supabase = await createClient()

  const reviewedProfileId = getStringValue(formData, 'reviewedProfileId')
  const ratingValue = getStringValue(formData, 'rating')
  const comment = getStringValue(formData, 'comment')

  if (!reviewedProfileId) {
    redirect('/search')
  }

  const rating = Number(ratingValue)

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    redirect(`/profile/${reviewedProfileId}?error=invalid_rating`)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  if (user.id === reviewedProfileId) {
    redirect(`/profile/${reviewedProfileId}?error=own_review_blocked`)
  }

  const { error } = await supabase.from('reviews').upsert(
    {
      reviewer_profile_id: user.id,
      reviewed_profile_id: reviewedProfileId,
      rating,
      comment: comment || null,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'reviewer_profile_id,reviewed_profile_id',
    }
  )

  if (error) {
    redirect(`/profile/${reviewedProfileId}?error=${encodeURIComponent(error.message)}`)
  }

  await awardAchievementByCode(user.id, 'first_review')

  revalidatePath(`/profile/${reviewedProfileId}`)
  redirect(`/profile/${reviewedProfileId}?message=review_saved`)
}
