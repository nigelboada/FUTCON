import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type ProfileCardProps = {
  profile: {
    profile_id: string
    display_name: string
    bio: string | null
    city: string | null
    province: string | null
    availability: string | null
    verification: string | null
    role: string

    player_position: string | null
    player_category: string | null
    player_current_club: string | null

    coach_category: string | null
    coach_current_club: string | null
    coaching_license: string | null

    club_name: string | null
    club_category: string | null

    staff_kind: string | null
    staff_services: string | null
    price_range: string | null

    review_count: number | null
    average_rating: number | string | null
  }
}

const roleLabels: Record<string, string> = {
  player: 'Jugador',
  coach: 'Entrenador / cos tècnic',
  club: 'Club o responsable',
  staff: 'Professional de l’staff',
}

const verificationLabels: Record<string, string> = {
  unverified: 'No verificat',
  pending: 'Verificació pendent',
  verified: 'Verificat',
  rejected: 'No verificat',
}

const availabilityLabels: Record<string, string> = {
  available: 'Disponible',
  open_to_offers: 'Escolto ofertes',
  unavailable: 'No disponible',
}

const availabilityClassNames: Record<string, string> = {
  available: 'border-green-500 bg-green-500/10 text-green-700',
  open_to_offers: 'border-yellow-500 bg-yellow-500/10 text-yellow-700',
  unavailable: 'border-red-500 bg-red-500/10 text-red-700',
}

function formatAverageRating(value: number | string | null) {
  if (value === null || value === undefined) {
    return null
  }

  const parsed = Number(value)

  if (Number.isNaN(parsed)) {
    return null
  }

  return parsed.toFixed(1)
}

function getRoleDetail(profile: ProfileCardProps['profile']) {
  if (profile.role === 'player') {
    return [
      profile.player_position,
      profile.player_category,
      profile.player_current_club,
    ]
      .filter(Boolean)
      .join(' · ')
  }

  if (profile.role === 'coach') {
    return [
      profile.coach_category,
      profile.coach_current_club,
      profile.coaching_license,
    ]
      .filter(Boolean)
      .join(' · ')
  }

  if (profile.role === 'club') {
    return [profile.club_name, profile.club_category].filter(Boolean).join(' · ')
  }

  if (profile.role === 'staff') {
    return [profile.staff_kind, profile.price_range].filter(Boolean).join(' · ')
  }

  return ''
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const availability = profile.availability ?? 'available'
  const roleDetail = getRoleDetail(profile)
  const averageRating = formatAverageRating(profile.average_rating)
  const reviewCount = profile.review_count ?? 0
  const location =
    [profile.city, profile.province].filter(Boolean).join(', ') ||
    'Ubicació no indicada'

  return (
    <Card className="flex h-full flex-col transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{profile.display_name}</CardTitle>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full border px-3 py-1 text-xs font-medium">
                {roleLabels[profile.role] ?? profile.role}
              </span>

              <span className="rounded-full border px-3 py-1 text-xs font-medium">
                {profile.verification
                  ? verificationLabels[profile.verification] ??
                    profile.verification
                  : 'No verificat'}
              </span>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
              availabilityClassNames[availability] ?? 'border bg-muted'
            }`}
          >
            {availabilityLabels[availability] ?? availability}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-4">
        {roleDetail ? (
          <p className="text-sm font-medium text-muted-foreground">
            {roleDetail}
          </p>
        ) : null}

        <p className="text-sm text-muted-foreground">{location}</p>

        <div className="rounded-lg border bg-muted/40 p-3">
          <p className="text-sm font-medium">
            {averageRating
              ? `${averageRating} / 5`
              : 'Sense valoracions'}
          </p>
          <p className="text-xs text-muted-foreground">
            {reviewCount} valoració{reviewCount === 1 ? '' : 'ns'}
          </p>
        </div>

        {profile.bio ? (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {profile.bio}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Aquest perfil encara no ha afegit una biografia.
          </p>
        )}

        <div className="mt-auto pt-2">
          <Button asChild className="w-full">
            <Link href={`/profile/${profile.profile_id}`}>Veure perfil</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}