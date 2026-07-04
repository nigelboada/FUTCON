'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { calculateProfileCompleteness } from '@/lib/profiles/completeness'
import {
  awardAchievement,
  awardCompletenessAchievements,
} from '@/lib/achievements/award'

const allowedAvailability = [
  'available',
  'open_to_offers',
  'unavailable',
] as const

const allowedStaffTypes = [
  'physiotherapist',
  'nutritionist',
  'physical_trainer',
  'analyst',
  'other',
] as const

type AvailabilityStatus = (typeof allowedAvailability)[number]
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

function getNumberValue(formData: FormData, key: string, fallback = 0) {
  const value = getStringValue(formData, key)
  const parsed = Number(value)

  if (!Number.isFinite(parsed)) {
    return fallback
  }

  return parsed
}

function getBooleanValue(formData: FormData, key: string): boolean {
  return formData.get(key) === 'on'
}

function isValidAvailability(value: string): value is AvailabilityStatus {
  return allowedAvailability.includes(value as AvailabilityStatus)
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

  const validRoles = ['player', 'coach', 'club', 'staff']

  if (!validRoles.includes(role)) {
    redirect('/profile/edit?error=profile_invalid_role')
  }

  const displayName = getStringValue(formData, 'displayName')
  const bio = getStringValue(formData, 'bio')
  const city = getStringValue(formData, 'city')
  const province = getStringValue(formData, 'province')
  const availability = getStringValue(formData, 'availability')
  const playerModality = getStringValue(formData, 'playerModality')
  const playerDivisionLevel = getStringValue(formData, 'playerDivisionLevel')
  const coachModality = getStringValue(formData, 'coachModality')
  const coachDivisionLevel = getStringValue(formData, 'coachDivisionLevel')
  const clubModality = getStringValue(formData, 'clubModality')
  const clubDivisionLevel = getStringValue(formData, 'clubDivisionLevel')
  const playerExperienceYears = getNumberValue(
    formData,
    'playerExperienceYears',
    0
  )
  const coachExperienceYears = getNumberValue(
    formData,
    'coachExperienceYears',
    0
  )
  const staffExperienceYears = getNumberValue(
    formData,
    'staffExperienceYears',
    0
  )

  if (!displayName) {
    redirect('/profile/edit?error=display_name_required')
  }

  if (!isValidAvailability(availability)) {
    redirect('/profile/edit?error=invalid_availability')
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

  const { error: deleteRoleError } = await supabase
    .from('profile_roles')
    .delete()
    .eq('profile_id', user.id)

  if (deleteRoleError) {
    redirect(`/profile/edit?error=${encodeURIComponent(deleteRoleError.message)}`)
  }

  const { error: insertRoleError } = await supabase
    .from('profile_roles')
    .insert({
      profile_id: user.id,
      role,
    })

  if (insertRoleError) {
    redirect(`/profile/edit?error=${encodeURIComponent(insertRoleError.message)}`)
  }

  if (role === 'player') {
    const { error } = await supabase.from('player_profiles').upsert(
      {
        profile_id: user.id,
        position: getStringValue(formData, 'position') || null,
        preferred_foot: getStringValue(formData, 'preferredFoot') || null,
        modality: playerModality || null,
        category: getStringValue(formData, 'playerCategory') || null,
        division_level: playerDivisionLevel || null,
        current_club: getStringValue(formData, 'playerCurrentClub') || null,
        experience_years: playerExperienceYears,
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
        modality: coachModality || null,
        category: getStringValue(formData, 'coachCategory') || null,
        division_level: coachDivisionLevel || null,
        current_club: getStringValue(formData, 'coachCurrentClub') || null,
        experience_years: coachExperienceYears,
        coaching_license: getStringValue(formData, 'coachingLicense') || null,
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
      redirect('/profile/edit?error=club_name_required')
    }

    const { error } = await supabase.from('club_profiles').upsert(
      {
        profile_id: user.id,
        club_name: clubName,
        modality: clubModality || null,
        category: getStringValue(formData, 'clubCategory') || null,
        division_level: clubDivisionLevel || null,
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
      redirect('/profile/edit?error=invalid_staff_type')
    }

    const { error } = await supabase.from('staff_profiles').upsert(
      {
        profile_id: user.id,
        staff_kind: staffKind,
        services: getStringValue(formData, 'services') || null,
        experience_years: staffExperienceYears,
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

  const { data: updatedProfiles } = await supabase
    .from('profile_search_view')
    .select('*')
    .eq('profile_id', user.id)
    .limit(1)

  const updatedProfile = updatedProfiles?.[0]

  if (updatedProfile) {
    const profileCompleteness = calculateProfileCompleteness(updatedProfile)
    await awardCompletenessAchievements(
      supabase,
      user.id,
      profileCompleteness.percentage
    )
  }

  revalidatePath('/dashboard')
  revalidatePath('/profile/edit')

  redirect('/dashboard?message=profile_updated')
}

export async function requestProfileVerification(formData: FormData) {
  const supabase = await createClient()

  const requestMessage = getStringValue(formData, 'requestMessage')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase.rpc('request_profile_verification', {
    request_message: requestMessage || null,
  })

  if (error) {
    redirect(`/profile/edit?error=${encodeURIComponent(error.message)}`)
  }

  await awardAchievement(supabase, 'verified_request', user.id)

  revalidatePath('/dashboard')
  revalidatePath('/profile/edit')
  revalidatePath(`/profile/${user.id}`)

  redirect('/profile/edit?message=verification_requested')
}

export async function awardAvatarUploaded() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return
  }

  await awardAchievement(supabase, 'avatar_uploaded', user.id)
}
