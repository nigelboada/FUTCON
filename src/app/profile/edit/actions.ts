'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

const allowedAvailability = [
  'available',
  'open_to_offers',
  'unavailable',
] as const

const allowedRoles = ['player', 'coach', 'club', 'staff'] as const

const allowedStaffTypes = [
  'physiotherapist',
  'nutritionist',
  'physical_trainer',
  'analyst',
  'other',
] as const

type AvailabilityStatus = (typeof allowedAvailability)[number]
type UserRole = (typeof allowedRoles)[number]
type StaffType = (typeof allowedStaffTypes)[number]

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

function getOptionalNumber(formData: FormData, key: string): number | null {
  const value = getStringValue(formData, key)

  if (!value) {
    return null
  }

  const parsed = Number(value)

  if (Number.isNaN(parsed)) {
    return null
  }

  return parsed
}

function getBooleanValue(formData: FormData, key: string): boolean {
  return formData.get(key) === 'on'
}

function isValidAvailability(value: string): value is AvailabilityStatus {
  return allowedAvailability.includes(value as AvailabilityStatus)
}

function isValidRole(value: string): value is UserRole {
  return allowedRoles.includes(value as UserRole)
}

function isValidStaffType(value: string): value is StaffType {
  return allowedStaffTypes.includes(value as StaffType)
}

export async function updateFullProfile(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const role = getStringValue(formData, 'role')

  if (!isValidRole(role)) {
    redirect('/profile/edit?error=El rol del perfil no és vàlid.')
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

  const { error: profileError } = await supabase
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

  if (profileError) {
    redirect(`/profile/edit?error=${encodeURIComponent(profileError.message)}`)
  }

  if (role === 'player') {
    const { error } = await supabase.from('player_profiles').upsert(
      {
        profile_id: user.id,
        position: getStringValue(formData, 'position') || null,
        preferred_foot: getStringValue(formData, 'preferredFoot') || null,
        category: getStringValue(formData, 'playerCategory') || null,
        current_club: getStringValue(formData, 'playerCurrentClub') || null,
        experience_years: getOptionalNumber(formData, 'playerExperienceYears'),
        birth_year: getOptionalNumber(formData, 'birthYear'),
        height_cm: getOptionalNumber(formData, 'heightCm'),
      },
      {
        onConflict: 'profile_id',
      }
    )

    if (error) {
      redirect(`/profile/edit?error=${encodeURIComponent(error.message)}`)
    }
  }

  if (role === 'coach') {
    const { error } = await supabase.from('coach_profiles').upsert(
      {
        profile_id: user.id,
        category: getStringValue(formData, 'coachCategory') || null,
        current_club: getStringValue(formData, 'coachCurrentClub') || null,
        experience_years: getOptionalNumber(formData, 'coachExperienceYears'),
        coaching_license: getStringValue(formData, 'coachingLicense') || null,
        preferred_age_group: getStringValue(formData, 'preferredAgeGroup') || null,
      },
      {
        onConflict: 'profile_id',
      }
    )

    if (error) {
      redirect(`/profile/edit?error=${encodeURIComponent(error.message)}`)
    }
  }

  if (role === 'club') {
    const clubName = getStringValue(formData, 'clubName')

    if (!clubName) {
      redirect('/profile/edit?error=El nom del club és obligatori.')
    }

    const { error } = await supabase.from('club_profiles').upsert(
      {
        profile_id: user.id,
        club_name: clubName,
        category: getStringValue(formData, 'clubCategory') || null,
        city: city || null,
        province: province || null,
        website: getStringValue(formData, 'website') || null,
        contact_role: getStringValue(formData, 'contactRole') || null,
      },
      {
        onConflict: 'profile_id',
      }
    )

    if (error) {
      redirect(`/profile/edit?error=${encodeURIComponent(error.message)}`)
    }
  }

  if (role === 'staff') {
    const staffKind = getStringValue(formData, 'staffKind')

    if (!isValidStaffType(staffKind)) {
      redirect('/profile/edit?error=El tipus de professional no és vàlid.')
    }

    const { error } = await supabase.from('staff_profiles').upsert(
      {
        profile_id: user.id,
        staff_kind: staffKind,
        services: getStringValue(formData, 'services') || null,
        experience_years: getOptionalNumber(formData, 'staffExperienceYears'),
        price_range: getStringValue(formData, 'priceRange') || null,
        works_remotely: getBooleanValue(formData, 'worksRemotely'),
      },
      {
        onConflict: 'profile_id',
      }
    )

    if (error) {
      redirect(`/profile/edit?error=${encodeURIComponent(error.message)}`)
    }
  }

  revalidatePath('/dashboard')
  revalidatePath('/profile/edit')

  redirect('/dashboard?message=Perfil actualitzat correctament.')
}