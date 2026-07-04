'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function banUser(formData: FormData) {
  const supabase = await createClient()

  const profileId = getStringValue(formData, 'profileId')
  const reason = getStringValue(formData, 'reason')

  if (!profileId || !reason) {
    redirect('/admin?error=invalid_request')
  }

  const { error } = await supabase.rpc('ban_profile', {
    target_profile_id: profileId,
    reason,
  })

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin')
  redirect('/admin?message=user_banned')
}

export async function unbanUser(formData: FormData) {
  const supabase = await createClient()

  const profileId = getStringValue(formData, 'profileId')

  if (!profileId) {
    redirect('/admin?error=invalid_request')
  }

  const { error } = await supabase.rpc('unban_profile', {
    target_profile_id: profileId,
  })

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin')
  redirect('/admin?message=user_unbanned')
}

export async function sendAdminWarning(formData: FormData) {
  const supabase = await createClient()

  const profileId = getStringValue(formData, 'profileId')
  const reason = getStringValue(formData, 'reason')
  const message = getStringValue(formData, 'message')

  if (!profileId || !reason || !message) {
    redirect('/admin?error=invalid_request')
  }

  const { error } = await supabase.rpc('create_admin_warning', {
    target_profile_id: profileId,
    warning_reason: reason,
    warning_message: message,
  })

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/admin')
  redirect('/admin?message=warning_sent')
}