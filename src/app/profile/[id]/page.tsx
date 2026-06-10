import Link from 'next/link'
import { notFound } from 'next/navigation'
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

const verificationLabels: Record<string, string> = {
  unverified: 'No verificat',
  pending: 'Verificació pendent',
  verified: 'Perfil verificat',
  rejected: 'Verificació rebutjada',
}

const staffKindLabels: Record<string, string> = {
  physiotherapist: 'Fisioterapeuta',
  nutritionist: 'Nutricionista',
  physical_trainer: 'Preparador físic',
  analyst: 'Analista',
  other: 'Altres',
}

const availabilityClassNames: Record<string, string> = {
  available: 'border-green-500 bg-green-500/10 text-green-700',
  open_to_offers: 'border-yellow-500 bg-yellow-500/10 text-yellow-700',
  unavailable: 'border-red-500 bg-red-500/10 text-red-700',
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

function RoleSpecificInfo({ profile }: { profile: PublicProfile }) {
  if (profile.role === 'player') {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Informació esportiva</h2>
          <p className="text-sm text-muted-foreground">
            Dades específiques del perfil de jugador.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ProfileInfoRow label="Posició" value={profile.player_position} />
          <ProfileInfoRow label="Categoria" value={profile.player_category} />
          <ProfileInfoRow label="Club actual" value={profile.player_current_club} />
        </div>
      </section>
    )
  }

  if (profile.role === 'coach') {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Informació tècnica</h2>
          <p className="text-sm text-muted-foreground">
            Dades específiques del perfil d’entrenador o cos tècnic.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ProfileInfoRow label="Categoria" value={profile.coach_category} />
          <ProfileInfoRow label="Club actual" value={profile.coach_current_club} />
          <ProfileInfoRow label="Llicència o formació" value={profile.coaching_license} />
        </div>
      </section>
    )
  }

  if (profile.role === 'club') {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Informació del club</h2>
          <p className="text-sm text-muted-foreground">
            Dades principals de l’entitat o responsable esportiu.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ProfileInfoRow label="Nom del club" value={profile.club_name} />
          <ProfileInfoRow label="Categoria" value={profile.club_category} />
        </div>
      </section>
    )
  }

  if (profile.role === 'staff') {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Informació professional</h2>
          <p className="text-sm text-muted-foreground">
            Dades específiques del perfil de professional de l’staff.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ProfileInfoRow
            label="Tipus de professional"
            value={
              profile.staff_kind
                ? staffKindLabels[profile.staff_kind] ?? profile.staff_kind
                : null
            }
          />
          <ProfileInfoRow label="Rang de preu" value={profile.price_range} />
          <ProfileInfoRow label="Serveis oferts" value={profile.staff_services} />
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

  const {
    data: { user },
  } = await supabase.auth.getUser()

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
            Tornar al cercador
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle className="text-3xl">{profile.display_name}</CardTitle>
                <CardDescription className="mt-2">
                  {profiles.map((item) => roleLabels[item.role] ?? item.role).join(' · ')}
                </CardDescription>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-sm font-medium ${
                    availabilityClassNames[availability] ?? 'border bg-muted'
                  }`}
                >
                  {availabilityLabels[availability] ?? availability}
                </span>

                <span className="rounded-full border px-3 py-1 text-sm font-medium">
                  {profile.verification
                    ? verificationLabels[profile.verification] ?? profile.verification
                    : 'No verificat'}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {query.message ? (
              <div className="rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-700">
                {query.message}
              </div>
            ) : null}

            {query.error ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {query.error}
              </div>
            ) : null}

            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Informació general</h2>
                <p className="text-sm text-muted-foreground">
                  Dades públiques principals del perfil.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ProfileInfoRow label="Ubicació" value={location || null} />
                <ProfileInfoRow
                  label="Disponibilitat"
                  value={availabilityLabels[availability] ?? availability}
                />
              </div>

              {profile.bio ? (
                <div className="rounded-md border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Biografia</p>
                  <p className="mt-2 whitespace-pre-line">{profile.bio}</p>
                </div>
              ) : null}
            </section>

            {profiles.map((item) => (
              <div key={`${item.profile_id}-${item.role}`}>
                <RoleSpecificInfo profile={item} />
              </div>
            ))}

            <section className="rounded-md border bg-background p-4">
              <h2 className="text-lg font-semibold">Contacte</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Pots iniciar una conversa interna amb aquest perfil per fer un primer
                contacte dins de FUTCON.
              </p>

              <div className="mt-4">
                {!user ? (
                  <Button asChild>
                    <Link href="/login">Inicia sessió per contactar</Link>
                  </Button>
                ) : isOwnProfile ? (
                  <Button disabled>No pots contactar amb el teu propi perfil</Button>
                ) : (
                  <form action={startConversation}>
                    <input
                      type="hidden"
                      name="targetProfileId"
                      value={profile.profile_id}
                    />

                    <Button type="submit">Contactar</Button>
                  </form>
                )}
              </div>
            </section>

            <section className="space-y-4 rounded-md border bg-background p-4">
              <div>
                <h2 className="text-lg font-semibold">Valoracions</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Les valoracions permeten reforçar la confiança entre usuaris de la
                  plataforma.
                </p>
              </div>



              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">Puntuació mitjana</p>
                <p className="mt-1 text-2xl font-semibold">
                  {averageRating ? `${averageRating.toFixed(1)} / 5` : 'Sense valoracions'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {reviewCount} valoració{reviewCount === 1 ? '' : 'ns'}
                </p>
              </div>

              {!user ? (
                <div className="rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">
                    Inicia sessió per valorar aquest perfil.
                  </p>

                  <Button asChild className="mt-3">
                    <Link href="/login">Iniciar sessió</Link>
                  </Button>
                </div>
              ) : isOwnProfile ? (
                <div className="rounded-md border p-4 text-sm text-muted-foreground">
                  No pots valorar el teu propi perfil.
                </div>
              ) : (
                <form action={submitReview} className="space-y-4 rounded-md border p-4">
                  <input
                    type="hidden"
                    name="reviewedProfileId"
                    value={profile.profile_id}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="rating">Puntuació</Label>
                    <select
                      id="rating"
                      name="rating"
                      defaultValue={currentUserReview?.rating ?? 5}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="5">5 - Excel·lent</option>
                      <option value="4">4 - Bona</option>
                      <option value="3">3 - Correcta</option>
                      <option value="2">2 - Millorable</option>
                      <option value="1">1 - Dolenta</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Comentari</Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      defaultValue={currentUserReview?.comment ?? ''}
                      placeholder="Escriu una recomanació breu o una valoració del perfil."
                      rows={4}
                    />
                  </div>

                  <Button type="submit">Desar valoració</Button>
                </form>
              )}

              {reviews.length > 0 ? (
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-md border p-4">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-medium">{review.reviewer_display_name}</p>
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
                  Encara no hi ha valoracions publicades per aquest perfil.
                </p>
              )}
            
            </section>

          </CardContent>
        </Card>
      </div>
    </main>
  )
}