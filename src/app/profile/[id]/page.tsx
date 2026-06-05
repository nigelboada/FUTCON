import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
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
}: PublicProfilePageProps) {
  const { id } = await params
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
                El sistema de missatgeria interna s’implementarà en una iteració
                posterior. Aquesta secció queda preparada com a punt d’entrada
                per iniciar converses entre usuaris.
              </p>

              <Button disabled className="mt-4">
                Contactar pròximament
              </Button>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}