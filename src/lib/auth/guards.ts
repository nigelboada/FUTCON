import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ensureUserProfile } from './profiles'

export async function requireActiveUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?error=auth_required')
  }

  const { profile, error } = await ensureUserProfile(supabase, user)

  if (error) {
    redirect('/login?error=profile_load_failed')
  }

  if (profile?.is_banned) {
    redirect('/banned')
  }

  return {
    supabase,
    user,
  }
}
