'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { awardAchievement } from '@/lib/achievements/award'

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  })

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  if (data.user) {
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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/auth/callback?next=/dashboard`,
    },
  })

  if (error || !data.url) {
    redirect('/login?error=google_oauth_error')
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
