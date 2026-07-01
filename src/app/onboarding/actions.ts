'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

const allowedRoles = ['player', 'coach', 'club', 'staff'] as const

type UserRole = (typeof allowedRoles)[number]

function isValidRole(value: string): value is UserRole {
  return allowedRoles.includes(value as UserRole)
}

export async function selectInitialRole(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const role = formData.get('role')

  if (typeof role !== 'string' || !isValidRole(role)) {
    redirect('/onboarding?error=invalid_role')
  }

  const { error } = await supabase.from('profile_roles').insert({
    profile_id: user.id,
    role,
  })

  if (error) {
    redirect(`/onboarding?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
