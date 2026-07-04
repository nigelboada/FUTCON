import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function requireActiveUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?error=auth_required')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_banned')
    .eq('id', user.id)
    .single()

  if (profile?.is_banned) {
    redirect('/banned')
  }

  return {
    supabase,
    user,
  }
}