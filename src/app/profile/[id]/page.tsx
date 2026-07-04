import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { startConversation } from '@/app/conversations/actions'
import { submitReview } from './actions'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FeedbackMessage } from '@/components/layout/feedback-message'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
import { resolveFeedbackMessage } from '@/lib/i18n/feedback'
import { ProfileAvatar } from '@/components/profiles/profile-avatar'
import { AchievementBadges } from '@/components/achievements/achievement-badges'
import { calculateProfileCompleteness } from '@/lib/profiles/completeness'
import { notFound, redirect } from 'next/navigation'

type PublicProfilePageProps = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

type PublicProfile = {
  profile_id: string
  display_name: string
  avatar_url: string | null
  bio: string | null
  city: string | null
  province: string | null
  availability: string | null
  verification: string | null
  role: string
  player_modality: string | null
  player_position: string | null
  player_category: string | null
  player_division_level: string | null
  player_current_club: string | null
  coach_modality: string | null
  coach_category: string | null
  coach_division_level: string | null
  coach_current_club: string | null
  coaching_license: string | null
  club_modality: string | null
  club_name: string | null
  club_category: string | null
  club_division_level: string | null
  staff_kind: string | null
  staff_services: string | null
  price_range: string | null
}

type PublicProfileLabels = {
  profile: ReturnType<typeof getMessages>['publicProfile']
  profileEdit: ReturnType<typeof getMessages>['profileEdit']
  roles: Record<string, string>
  availability: Record<string, string>
  verification: Record<string, string>
  staffKinds: Record<string, string>
  common: ReturnType<typeof getMessages>['common']
}

type AchievementRecord = {
  id: number
  title_ca: string
  title_es: string
  title_en: string
  description_ca: string
  description_es: string
  description_en: string
  icon_key: string
}

type AchievementJoinRow = {
  achievement: AchievementRecord | AchievementRecord[] | null
}

const availabilityClassNames: Record<string, string> = {
  available: 'border-green-500 bg-green-500/10 text-green-700',
  open_to_offers: 'border-yellow-500 bg-yellow-500/10 text-yellow-700',
  unavailable: 'border-red-500 bg-red-500/10 text-red-700',
}

function iconFromKey(iconKey: string) {
  switch (iconKey) {
    case 'ball':
      return '⚽'
    case 'runner':
      return '🏃‍♀️'
    case 'whistle':
      return '🪈'
    case 'boot':
      return '👟'
    case 'chart':
      return '📈'
    case 'trophy':
      return '🏆'
    case 'player':
      return '🧍'
    case 'chat':
      return '💬'
    case 'medal':
      return '🏅'
    case 'badge':
      return '✅'
    case 'cup':
      return '🏆'
    default:
      return '⭐'
  }
}

function getJoinedAchievement(
  achievement: AchievementJoinRow['achievement']
): AchievementRecord | null {
  if (Array.isArray(achievement)) {
    return achievement[0] ?? null
  }

  return achievement
}

function getLocation(profile: PublicProfile) {
  return [profile.city, profile.province].filter(Boolean).join(', ')
}

function ProfileInfoRow({
  label,
  value,
}: {
  label: string
  value: string | null | undefined
}) {
  if (!value) {
    return null
  }

  return (
    <div className="rounded-md border bg-background p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  )
}

function RoleSpecificInfo({
  profile,
  labels,
}: {
  profile: PublicProfile
  labels: PublicProfileLabels
}) {
  const p = labels.profile

  if (profile.role === 'player') {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{p.sportsInfo}</h2>
          <p className="text-sm text-muted-foreground">
            {p.sportsInfoDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ProfileInfoRow
            label={labels.profileEdit.modality}
            value={profile.player_modality}
          />
          <ProfileInfoRow label={p.position} value={profile.player_position} />
          <ProfileInfoRow label={p.category} value={profile.player_category} />
          <ProfileInfoRow
            label={labels.profileEdit.division}
            value={profile.player_division_level}
          />
          <ProfileInfoRow
            label={p.currentClub}
            value={profile.player_current_club}
          />
        </div>
      </section>
    )
  }

  if (profile.role === 'coach') {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{p.technicalInfo}</h2>
          <p className="text-sm text-muted-foreground">
            {p.technicalInfoDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ProfileInfoRow
            label={labels.profileEdit.modality}
            value={profile.coach_modality}
          />
          <ProfileInfoRow label={p.category} value={profile.coach_category} />
          <ProfileInfoRow
            label={labels.profileEdit.division}
            value={profile.coach_division_level}
          />
          <ProfileInfoRow
            label={p.currentClub}
            value={profile.coach_current_club}
          />
          <ProfileInfoRow label={p.license} value={profile.coaching_license} />
        </div>
      </section>
    )
  }

  if (profile.role === 'club') {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{p.clubInfo}</h2>
          <p className="text-sm text-muted-foreground">
            {p.clubInfoDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ProfileInfoRow label={p.clubName} value={profile.club_name} />
          <ProfileInfoRow
            label={labels.profileEdit.modality}
            value={profile.club_modality}
          />
          <ProfileInfoRow label={p.category} value={profile.club_category} />
          <ProfileInfoRow
            label={labels.profileEdit.division}
            value={profile.club_division_level}
          />
        </div>
      </section>
    )
  }

  if (profile.role === 'staff') {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{p.professionalInfo}</h2>
          <p className="text-sm text-muted-foreground">
            {p.professionalInfoDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ProfileInfoRow
            label={p.professionalType}
            value={
              profile.staff_kind
                ? labels.staffKinds[profile.staff_kind] ?? profile.staff_kind
                : null
            }
          />
          <ProfileInfoRow label={p.priceRange} value={profile.price_range} />
          <ProfileInfoRow label={p.services} value={profile.staff_services} />
        </div>
      </section>
    )
  }

  return null
}

export default async function PublicProfilePage({
  params,
  searchParams,
}: PublicProfilePageProps) {
  const { id } = await params
  const query = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?error=auth_required')
  }


  const locale = await getLocale()
  const m = getMessages(locale)
  const message = resolveFeedbackMessage(query.message, m.feedback)
  const errorMessage = resolveFeedbackMessage(query.error, m.feedback)
  const labels: PublicProfileLabels = {
    profile: m.publicProfile,
    profileEdit: m.profileEdit,
    roles: { ...m.roles },
    availability: { ...m.availability },
    verification: { ...m.verification },
    staffKinds: { ...m.staffKinds },
    common: m.common,
  }

  const { data, error } = await supabase
    .from('profile_search_view')
    .select('*')
    .eq('profile_id', id)

  if (error) {
    console.error(error)
    notFound()
  }

  if (!data || data.length === 0) {
    notFound()
  }

  const profiles = data as PublicProfile[]
  const profile = profiles[0]
  const publicCompleteness = calculateProfileCompleteness(profile).percentage

  const { data: achievementsRaw } = await supabase
    .from('user_achievements')
    .select(
      `
        id,
        achievement:achievements (
          id,
          title_ca,
          title_es,
          title_en,
          description_ca,
          description_es,
          description_en,
          icon_key
        )
      `
    )
    .eq('profile_id', profile.profile_id)
    .order('unlocked_at', { ascending: true })

  const unlockedAchievements = ((achievementsRaw ?? []) as AchievementJoinRow[])
    .flatMap((item) => {
      const achievement = getJoinedAchievement(item.achievement)

      return achievement
        ? [
            {
              id: achievement.id,
              title:
                locale === 'es'
                  ? achievement.title_es
                  : locale === 'en'
                    ? achievement.title_en
                    : achievement.title_ca,
              description:
                locale === 'es'
                  ? achievement.description_es
                  : locale === 'en'
                    ? achievement.description_en
                    : achievement.description_ca,
              icon: iconFromKey(achievement.icon_key),
            },
          ]
        : []
    })

  const isOwnProfile = user?.id === profile.profile_id

  const { data: reviewSummary } = await supabase
    .from('profile_review_summary_view')
    .select('review_count, average_rating')
    .eq('reviewed_profile_id', profile.profile_id)
    .maybeSingle()

  const { data: reviewsData } = await supabase
    .from('profile_reviews_view')
    .select(
      'id, reviewer_profile_id, reviewer_display_name, rating, comment, created_at'
    )
    .eq('reviewed_profile_id', profile.profile_id)
    .order('created_at', { ascending: false })
    .limit(10)

  const { data: currentUserReview } =
    user && !isOwnProfile
      ? await supabase
          .from('reviews')
          .select('rating, comment')
          .eq('reviewer_profile_id', user.id)
          .eq('reviewed_profile_id', profile.profile_id)
          .maybeSingle()
      : { data: null }

  const reviews = reviewsData ?? []
  const reviewCount = reviewSummary?.review_count ?? 0
  const averageRating = reviewSummary?.average_rating
    ? Number(reviewSummary.average_rating)
    : null
  const availability = profile.availability ?? 'available'
  const location = getLocation(profile)

  return (
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link href="/search" className="text-sm text-muted-foreground underline">
            {m.common.backToSearch}
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <ProfileAvatar
                  src={profile.avatar_url ?? null}
                  name={profile.display_name}
                  completeness={publicCompleteness}
                  size="lg"
                />

                <div>
                  <CardTitle className="text-3xl">
                    {profile.display_name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {profiles
                      .map((item) => labels.roles[item.role] ?? item.role)
                      .join(' · ')}
                  </CardDescription>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-sm font-medium ${
                    availabilityClassNames[availability] ?? 'border bg-muted'
                  }`}
                >
                  {labels.availability[availability] ?? availability}
                </span>

                <span className="rounded-full border px-3 py-1 text-sm font-medium">
                  {profile.verification
                    ? labels.verification[profile.verification] ??
                      profile.verification
                    : labels.verification.unverified}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <FeedbackMessage message={message} error={errorMessage} />

            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {m.publicProfile.generalInfo}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {m.publicProfile.generalInfoDescription}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ProfileInfoRow
                  label={m.publicProfile.location}
                  value={location || null}
                />
                <ProfileInfoRow
                  label={m.publicProfile.availability}
                  value={labels.availability[availability] ?? availability}
                />
              </div>

              {profile.bio ? (
                <div className="rounded-md border bg-background p-4">
                  <p className="text-sm text-muted-foreground">
                    {m.publicProfile.biography}
                  </p>
                  <p className="mt-2 whitespace-pre-line">{profile.bio}</p>
                </div>
              ) : null}
            </section>

            {profiles.map((item) => (
              <div key={`${item.profile_id}-${item.role}`}>
                <RoleSpecificInfo profile={item} labels={labels} />
              </div>
            ))}

            <section className="space-y-4 rounded-md border bg-background p-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {m.publicProfile.reviewsTitle}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {m.publicProfile.reviewsDescription}
                </p>
              </div>

              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">
                  {m.publicProfile.averageRating}
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {averageRating
                    ? `${averageRating.toFixed(1)} / 5`
                    : m.common.noRatings}
                </p>
                <p className="text-sm text-muted-foreground">
                  {reviewCount}{' '}
                  {reviewCount === 1 ? m.common.rating : m.common.ratings}
                </p>
              </div>

              {!user ? (
                <div className="rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">
                    {m.publicProfile.signInToReview}
                  </p>

                  <Button asChild className="mt-3">
                    <Link href="/login">{m.common.signIn}</Link>
                  </Button>
                </div>
              ) : isOwnProfile ? (
                <div className="rounded-md border p-4 text-sm text-muted-foreground">
                  {m.publicProfile.cannotReviewOwnProfile}
                </div>
              ) : (
                <form action={submitReview} className="space-y-4 rounded-md border p-4">
                  <input
                    type="hidden"
                    name="reviewedProfileId"
                    value={profile.profile_id}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="rating">
                      {m.publicProfile.ratingLabel}
                    </Label>
                    <select
                      id="rating"
                      name="rating"
                      defaultValue={currentUserReview?.rating ?? 5}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="5">{m.publicProfile.ratingOptions[5]}</option>
                      <option value="4">{m.publicProfile.ratingOptions[4]}</option>
                      <option value="3">{m.publicProfile.ratingOptions[3]}</option>
                      <option value="2">{m.publicProfile.ratingOptions[2]}</option>
                      <option value="1">{m.publicProfile.ratingOptions[1]}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">{m.publicProfile.comment}</Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      defaultValue={currentUserReview?.comment ?? ''}
                      placeholder={m.publicProfile.commentPlaceholder}
                      rows={4}
                    />
                  </div>

                  <Button type="submit">{m.publicProfile.saveReview}</Button>
                </form>
              )}

              {reviews.length > 0 ? (
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-md border p-4">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-medium">
                          {review.reviewer_display_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {review.rating} / 5
                        </p>
                      </div>

                      {review.comment ? (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {m.publicProfile.noPublishedReviews}
                </p>
              )}
            </section>

            <AchievementBadges
              achievements={unlockedAchievements}
              emptyText="Aquest perfil encara no ha desbloquejat assoliments."
            />

            <section className="rounded-md border bg-background p-4">
              <h2 className="text-lg font-semibold">
                {m.publicProfile.contactTitle}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {m.publicProfile.contactDescription}
              </p>

              <div className="mt-4">
                {!user ? (
                  <Button asChild>
                    <Link href="/login">{m.publicProfile.signInToContact}</Link>
                  </Button>
                ) : isOwnProfile ? (
                  <Button disabled>
                    {m.publicProfile.cannotContactOwnProfile}
                  </Button>
                ) : (
                  <form action={startConversation}>
                    <input
                      type="hidden"
                      name="targetProfileId"
                      value={profile.profile_id}
                    />

                    <Button type="submit">{m.publicProfile.contact}</Button>
                  </form>
                )}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
