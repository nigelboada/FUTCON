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

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>{profile.display_name}</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              {roleLabels[profile.role] ?? profile.role}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {averageRating
                ? `${averageRating} / 5 · ${reviewCount} valoració${reviewCount === 1 ? '' : 'ns'}`
                : 'Sense valoracions'}
            </p>
          </div>

          <span
            className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${
              availabilityClassNames[availability] ?? 'border bg-muted'
            }`}
          >
            {availabilityLabels[availability] ?? availability}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {roleDetail ? (
          <p className="text-sm text-muted-foreground">{roleDetail}</p>
        ) : null}

        <div className="text-sm text-muted-foreground">
          {[profile.city, profile.province].filter(Boolean).join(', ') ||
            'Ubicació no indicada'}
        </div>

        {profile.bio ? <p className="text-sm">{profile.bio}</p> : null}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline">
            <Link href={`/profile/${profile.profile_id}`}>Veure perfil</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}