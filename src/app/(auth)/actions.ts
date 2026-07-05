'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { awardAchievement } from '@/lib/achievements/award'
import { ensureUserProfile } from '@/lib/auth/profiles'

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000')

  return siteUrl.replace(/\/$/, '')
}

function getAuthErrorParam(error: unknown, fallbackKey: string) {
  const message = error instanceof Error ? error.message : String(error)
  const normalizedMessage = message.toLowerCase()

  if (
    normalizedMessage.includes('<!doctype') ||
    normalizedMessage.includes('not valid json') ||
    normalizedMessage.includes('unexpected token') ||
    normalizedMessage.includes('failed to fetch') ||
    normalizedMessage.includes('fetch failed')
  ) {
    return fallbackKey
  }

  return encodeURIComponent(message)
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const displayName = getStringValue(formData, 'displayName')
  const email = getStringValue(formData, 'email')
  const password = getStringValue(formData, 'password')

  if (!displayName || !email || !password) {
    redirect('/register?error=signup_missing_fields')
  }

  if (password.length < 6) {
    redirect('/register?error=password_too_short')
  }

  let signUpResult

  try {
    signUpResult = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    })
  } catch (error) {
    redirect(`/register?error=${getAuthErrorParam(error, 'auth_service_unavailable')}`)
  }

  const { data, error } = signUpResult

  if (error) {
    redirect(`/register?error=${getAuthErrorParam(error, 'auth_service_unavailable')}`)
  }

  if (data.user) {
    await ensureUserProfile(supabase, data.user)
    await awardAchievement(supabase, 'welcome', data.user.id)
  }

  revalidatePath('/', 'layout')

  if (!data.session) {
    redirect('/login?message=account_created_check_email')
  }

  redirect('/onboarding')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = getStringValue(formData, 'email')
  const password = getStringValue(formData, 'password')

  if (!email || !password) {
    redirect('/login?error=signin_missing_credentials')
  }

  let signInResult

  try {
    signInResult = await supabase.auth.signInWithPassword({
      email,
      password,
    })
  } catch (error) {
    redirect(`/login?error=${getAuthErrorParam(error, 'auth_service_unavailable')}`)
  }

  const { data, error } = signInResult

  if (error) {
    redirect(`/login?error=${getAuthErrorParam(error, 'auth_service_unavailable')}`)
  }

  if (data.user) {
    const { error: profileError } = await ensureUserProfile(supabase, data.user)

    if (profileError) {
      redirect('/login?error=profile_load_failed')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const siteUrl = getSiteUrl()

  let oauthResult

  try {
    oauthResult = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${siteUrl}/auth/callback?next=/dashboard`,
      },
    })
  } catch (error) {
    redirect(`/login?error=${getAuthErrorParam(error, 'google_oauth_error')}`)
  }

  const { data, error } = oauthResult

  if (error || !data.url) {
    redirect('/login?error=google_oauth_error')
  }

  if (data.url.startsWith('/')) {
    redirect('/login?error=supabase_url_misconfigured')
  }

  redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  
  const cookieStore = await cookies()
  cookieStore.delete('futcon-completeness-dismissed')
  
  redirect('/login')
}
