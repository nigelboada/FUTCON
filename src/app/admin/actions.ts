'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { awardAchievement } from '@/lib/achievements/award'

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

async function requireAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: isAdmin, error } = await supabase.rpc('is_app_admin')

  if (error || !isAdmin) {
    redirect('/dashboard?error=no_admin_permission')
  }

  return supabase
}

export async function approveVerificationRequest(formData: FormData) {
  const supabase = await requireAdmin()
  const requestId = getStringValue(formData, 'requestId')

  if (!requestId) {
    redirect('/admin?error=invalid_request')
  }

  const { data: request } = await supabase
    .from('verification_requests')
    .select('profile_id')
    .eq('id', requestId)
    .single()

  const targetProfileId = request?.profile_id

  const { error } = await supabase.rpc(
    'approve_profile_verification_request',
    {
      target_request_id: requestId,
    }
  )

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`)
  }

  if (targetProfileId) {
    await awardAchievement(supabase, 'verified_profile', targetProfileId)
  }

  revalidatePath('/admin')
  revalidatePath('/search')

  redirect('/admin?message=verification_approved')
}

export async function rejectVerificationRequest(formData: FormData) {
  const supabase = await requireAdmin()
  const requestId = getStringValue(formData, 'requestId')

  if (!requestId) {
    redirect('/admin?error=invalid_request')
  }

  const { error } = await supabase.rpc(
    'reject_profile_verification_request',
    {
      target_request_id: requestId,
    }
  )

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin')
  revalidatePath('/search')

  redirect('/admin?message=verification_rejected')
}
