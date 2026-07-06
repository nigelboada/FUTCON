import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ensureUserProfile } from '@/lib/auth/profiles'
import { awardAchievement } from '@/lib/achievements/award'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=auth_callback_missing_code`
    )
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`
    )
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await ensureUserProfile(supabase, user)
    await awardAchievement(supabase, 'welcome', user.id)
  }

  return NextResponse.redirect(`${requestUrl.origin}${next}`)
}
