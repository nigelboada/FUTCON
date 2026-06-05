'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

const allowedAvailability = [
  'available',
  'open_to_offers',
  'unavailable',
] as const

type AvailabilityStatus = (typeof allowedAvailability)[number]

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

function isValidAvailability(value: string): value is AvailabilityStatus {
  return allowedAvailability.includes(value as AvailabilityStatus)
}

export async function updateCommonProfile(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const displayName = getStringValue(formData, 'displayName')
  const bio = getStringValue(formData, 'bio')
  const city = getStringValue(formData, 'city')
  const province = getStringValue(formData, 'province')
  const availability = getStringValue(formData, 'availability')

  if (!displayName) {
    redirect('/profile/edit?error=El nom visible és obligatori.')
  }

  if (!isValidAvailability(availability)) {
    redirect('/profile/edit?error=L’estat de disponibilitat no és vàlid.')
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: displayName,
      bio: bio || null,
      city: city || null,
      province: province || null,
      availability,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    redirect(`/profile/edit?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard')
  revalidatePath('/profile/edit')

  redirect('/dashboard?message=Perfil actualitzat correctament.')
}