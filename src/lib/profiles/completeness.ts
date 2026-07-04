type SearchProfileLike = {
  display_name?: string | null
  bio?: string | null
  city?: string | null
  province?: string | null
  avatar_url?: string | null
  availability?: string | null
  role?: string | null

  player_position?: string | null
  player_category?: string | null
  player_current_club?: string | null
  player_modality?: string | null
  player_division_level?: string | null


  coach_category?: string | null
  coach_current_club?: string | null
  coaching_license?: string | null
  coach_modality?: string | null
  coach_division_level?: string | null


  club_name?: string | null
  club_category?: string | null
  club_modality?: string | null
  club_division_level?: string | null


  staff_kind?: string | null
  staff_services?: string | null
  price_range?: string | null
}

const baseFields: (keyof SearchProfileLike)[] = [
  'display_name',
  'bio',
  'city',
  'province',
  'avatar_url',
  'availability',
]

const roleFields: Record<string, (keyof SearchProfileLike)[]> = {
  player: ['player_position', 'player_category', 'player_current_club', 'player_modality', 'player_division_level'],
  coach: ['coach_category', 'coach_current_club', 'coaching_license', 'coach_modality', 'coach_division_level'],
  club: ['club_name', 'club_category', 'club_modality', 'club_division_level'],
  staff: ['staff_kind', 'staff_services', 'price_range'],
}

function hasValue(value: unknown) {
  return typeof value === 'string' ? value.trim().length > 0 : Boolean(value)
}

export function calculateProfileCompleteness(profile: SearchProfileLike) {
  const requiredFields = [
    ...baseFields,
    ...(profile.role ? roleFields[profile.role] ?? [] : []),
  ]

  const completedFields = requiredFields.filter((field) =>
    hasValue(profile[field])
  )

  const percentage =
    requiredFields.length === 0
      ? 0
      : Math.round((completedFields.length / requiredFields.length) * 100)

  return {
    percentage,
    completed: completedFields.length,
    total: requiredFields.length,
  }
}

const fieldAnchors: Record<string, string> = {
  display_name: 'profile-general',
  bio: 'profile-general',
  city: 'profile-location',
  province: 'profile-location',
  avatar_url: 'profile-avatar',
  availability: 'profile-general',

  player_position: 'profile-player',
  player_category: 'profile-player',
  player_division_level: 'profile-player',
  player_modality: 'profile-player',
  player_current_club: 'profile-player',

  coach_category: 'profile-coach',
  coach_division_level: 'profile-coach',
  coach_modality: 'profile-coach',
  coach_current_club: 'profile-coach',
  coaching_license: 'profile-coach',

  club_name: 'profile-club',
  club_category: 'profile-club',
  club_division_level: 'profile-club',
  club_modality: 'profile-club',

  staff_kind: 'profile-staff',
  staff_services: 'profile-staff',
  price_range: 'profile-staff',
}

export function getProfileCompletenessFields(profile: SearchProfileLike) {
  return [
    ...baseFields,
    ...(profile.role ? roleFields[profile.role] ?? [] : []),
  ]
}

export function getCompletenessFieldContribution(profile: SearchProfileLike) {
  const fields = getProfileCompletenessFields(profile)

  if (fields.length === 0) {
    return 0
  }

  return Math.round(100 / fields.length)
}

export function getFirstIncompleteProfileAnchor(profile: SearchProfileLike) {
  const fields = getProfileCompletenessFields(profile)

  const firstIncompleteField = fields.find((field) => !hasValue(profile[field]))

  if (!firstIncompleteField) {
    return 'profile-general'
  }

  return fieldAnchors[firstIncompleteField] ?? 'profile-general'
}