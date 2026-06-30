import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type ProfileCardLabels = {
  roles: Record<string, string>
  verification: Record<string, string>
  availability: Record<string, string>
  viewProfile: string
  noRating: string
  noBio: string
  reviewSingular: string
  reviewPlural: string
  locationNotSpecified: string
}

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
  labels: ProfileCardLabels
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

export function ProfileCard({ profile, labels }: ProfileCardProps) {
  const availability = profile.availability ?? 'available'
  const roleDetail = getRoleDetail(profile)
  const averageRating = formatAverageRating(profile.average_rating)
  const reviewCount = profile.review_count ?? 0
  const location =
    [profile.city, profile.province].filter(Boolean).join(', ') ||
    labels.locationNotSpecified

  return (
    <Card className="futcon-card-hover flex h-full flex-col">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{profile.display_name}</CardTitle>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full border px-3 py-1 text-xs font-medium">
                {labels.roles[profile.role] ?? profile.role}
              </span>

              <span className="rounded-full border px-3 py-1 text-xs font-medium">
                {profile.verification
                  ? labels.verification[profile.verification] ??
                    profile.verification
                  : labels.verification.unverified}
              </span>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
              availabilityClassNames[availability] ?? 'border bg-muted'
            }`}
          >
            {labels.availability[availability] ?? availability}
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
            {averageRating ? `${averageRating} / 5` : labels.noRating}
          </p>
          <p className="text-xs text-muted-foreground">
            {reviewCount}{' '}
            {reviewCount === 1 ? labels.reviewSingular : labels.reviewPlural}
          </p>
        </div>

        {profile.bio ? (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {profile.bio}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">{labels.noBio}</p>
        )}

        <div className="mt-auto pt-2">
          <Button asChild className="w-full">
            <Link href={`/profile/${profile.profile_id}`}>
              {labels.viewProfile}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
