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

  coach_category?: string | null
  coach_current_club?: string | null
  coaching_license?: string | null

  club_name?: string | null
  club_category?: string | null

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
  player: ['player_position', 'player_category', 'player_current_club'],
  coach: ['coach_category', 'coach_current_club', 'coaching_license'],
  club: ['club_name', 'club_category'],
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