import { redirect } from 'next/navigation'
import Link from 'next/link'
import { requestProfileVerification, updateFullProfile } from './actions'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type ProfileEditPageProps = {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

type UserRole = 'player' | 'coach' | 'club' | 'staff'

const availabilityOptions = [
  {
    value: 'available',
    label: 'Disponible',
    description: 'Busco equip, club o oportunitats professionals.',
  },
  {
    value: 'open_to_offers',
    label: 'Escolto ofertes',
    description: 'Actualment tinc vinculació, però estic obert a propostes.',
  },
  {
    value: 'unavailable',
    label: 'No disponible',
    description: 'No busco noves oportunitats en aquest moment.',
  },
]

const roleLabels: Record<UserRole, string> = {
  player: 'Jugador',
  coach: 'Entrenador / cos tècnic',
  club: 'Club o responsable',
  staff: 'Professional de l’staff',
}

const staffTypeLabels = [
  {
    value: 'physiotherapist',
    label: 'Fisioterapeuta',
  },
  {
    value: 'nutritionist',
    label: 'Nutricionista',
  },
  {
    value: 'physical_trainer',
    label: 'Preparador físic',
  },
  {
    value: 'analyst',
    label: 'Analista',
  },
  {
    value: 'other',
    label: 'Altres',
  },
]

const verificationLabels: Record<string, string> = {
  unverified: 'No verificat',
  pending: 'Verificació pendent',
  verified: 'Perfil verificat',
  rejected: 'Verificació rebutjada',
}

const verificationDescriptions: Record<string, string> = {
  unverified: 'Encara no has sol·licitat la verificació del perfil.',
  pending: 'La sol·licitud de verificació està pendent de revisió.',
  verified: 'Aquest perfil ha estat verificat.',
  rejected: 'La verificació ha estat rebutjada. Pots tornar a sol·licitar-la.',
}

const verificationClassNames: Record<string, string> = {
  unverified: 'border-muted bg-muted text-muted-foreground',
  pending: 'border-yellow-500 bg-yellow-500/10 text-yellow-700',
  verified: 'border-green-500 bg-green-500/10 text-green-700',
  rejected: 'border-red-500 bg-red-500/10 text-red-700',
}

export default async function ProfileEditPage({
  searchParams,
}: ProfileEditPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  // Authenticate user session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch roles associated with the profile
  const { data: roles } = await supabase
    .from('profile_roles')
    .select('role')
    .eq('profile_id', user.id)

  if (!roles || roles.length === 0) {
    redirect('/onboarding')
  }

  const primaryRole = roles[0].role as UserRole

  // Fetch core profile information
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('display_name, bio, city, province, availability, verification')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    redirect('/dashboard?error=No s’ha pogut carregar el perfil.')
  }

  // Conditional fetches based on primary role (Table-Per-Type pattern support)
  const { data: playerProfile } =
    primaryRole === 'player'
      ? await supabase
          .from('player_profiles')
          .select(
            'position, preferred_foot, category, current_club, experience_years, birth_year, height_cm'
          )
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  const { data: coachProfile } =
    primaryRole === 'coach'
      ? await supabase
          .from('coach_profiles')
          .select(
            'category, current_club, experience_years, coaching_license, preferred_age_group'
          )
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  const { data: clubProfile } =
    primaryRole === 'club'
      ? await supabase
          .from('club_profiles')
          .select('club_name, category, website, contact_role')
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  const { data: staffProfile } =
    primaryRole === 'staff'
      ? await supabase
          .from('staff_profiles')
          .select(
            'staff_kind, services, experience_years, price_range, works_remotely'
          )
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  return (
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground underline"
          >
            Tornar al panell
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Editar perfil</CardTitle>
            <CardDescription>
              Actualitza la informació comuna i específica del teu perfil a
              FUTCON.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {params.message ? (
              <div className="mb-4 rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-700">
                {params.message}
              </div>
            ) : null}

            {params.error ? (
              <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {params.error}
              </div>
            ) : null}

            {/* Main Form: updateFullProfile Server Action */}
            <form action={updateFullProfile} className="space-y-8">
              <input type="hidden" name="role" value={primaryRole} />

              <section className="space-y-5">
                <div className="rounded-md border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Rol assignat</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {roles.map((item) => (
                      <span
                        key={item.role}
                        className="rounded-full border px-3 py-1 text-sm"
                      >
                        {roleLabels[item.role as UserRole] ?? item.role}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Informació comuna</h2>
                  <p className="text-sm text-muted-foreground">
                    Aquesta informació és compartida per qualsevol tipus de
                    perfil.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Nom visible</Label>
                  <Input
                    id="displayName"
                    name="displayName"
                    type="text"
                    defaultValue={profile.display_name ?? ''}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia breu</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profile.bio ?? ''}
                    placeholder="Explica breument qui ets, què busques o quina experiència tens."
                    rows={5}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciutat</Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      defaultValue={profile.city ?? ''}
                      placeholder="Ex: Girona"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="province">Província</Label>
                    <Input
                      id="province"
                      name="province"
                      type="text"
                      defaultValue={profile.province ?? ''}
                      placeholder="Ex: Girona"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="availability">Disponibilitat</Label>

                  <select
                    id="availability"
                    name="availability"
                    defaultValue={profile.availability ?? 'available'}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {availabilityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <div className="space-y-2">
                    {availabilityOptions.map((option) => (
                      <p
                        key={option.value}
                        className="text-sm text-muted-foreground"
                      >
                        <strong>{option.label}:</strong> {option.description}
                      </p>
                    ))}
                  </div>
                </div>
              </section>

              {/* Player Role Subform View */}
              {primaryRole === 'player' ? (
                <section className="space-y-5 border-t pt-6">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Informació de jugador
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Camps específics per construir la fitxa esportiva del
                      jugador.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="position">Posició</Label>
                      <Input
                        id="position"
                        name="position"
                        defaultValue={playerProfile?.position ?? ''}
                        placeholder="Ex: Davanter centre"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredFoot">Cama hàbil</Label>
                      <Input
                        id="preferredFoot"
                        name="preferredFoot"
                        defaultValue={playerProfile?.preferred_foot ?? ''}
                        placeholder="Ex: Dreta"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="playerCategory">Categoria</Label>
                      <Input
                        id="playerCategory"
                        name="playerCategory"
                        defaultValue={playerProfile?.category ?? ''}
                        placeholder="Ex: 3a Catalana"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="playerCurrentClub">Club actual</Label>
                      <Input
                        id="playerCurrentClub"
                        name="playerCurrentClub"
                        defaultValue={playerProfile?.current_club ?? ''}
                        placeholder="Ex: CF Banyoles"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="playerExperienceYears">
                        Anys d’experiència
                      </Label>
                      <Input
                        id="playerExperienceYears"
                        name="playerExperienceYears"
                        type="number"
                        min={0}
                        defaultValue={playerProfile?.experience_years ?? ''}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthYear">Any de naixement</Label>
                      <Input
                        id="birthYear"
                        name="birthYear"
                        type="number"
                        min={1950}
                        max={2020}
                        defaultValue={playerProfile?.birth_year ?? ''}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="heightCm">Alçada en cm</Label>
                      <Input
                        id="heightCm"
                        name="heightCm"
                        type="number"
                        min={100}
                        max={230}
                        defaultValue={playerProfile?.height_cm ?? ''}
                      />
                    </div>
                  </div>
                </section>
              ) : null}

              {/* Coach Role Subform View */}
              {primaryRole === 'coach' ? (
                <section className="space-y-5 border-t pt-6">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Informació d’entrenador
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Camps específics per mostrar experiència i perfil tècnic.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="coachCategory">Categoria</Label>
                      <Input
                        id="coachCategory"
                        name="coachCategory"
                        defaultValue={coachProfile?.category ?? ''}
                        placeholder="Ex: Juvenil Preferent"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coachCurrentClub">Club actual</Label>
                      <Input
                        id="coachCurrentClub"
                        name="coachCurrentClub"
                        defaultValue={coachProfile?.current_club ?? ''}
                        placeholder="Ex: UE Figueres"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coachExperienceYears">
                        Anys d’experiència
                      </Label>
                      <Input
                        id="coachExperienceYears"
                        name="coachExperienceYears"
                        type="number"
                        min={0}
                        defaultValue={coachProfile?.experience_years ?? ''}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coachingLicense">
                        Llicència o formació
                      </Label>
                      <Input
                        id="coachingLicense"
                        name="coachingLicense"
                        defaultValue={coachProfile?.coaching_license ?? ''}
                        placeholder="Ex: UEFA C"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="preferredAgeGroup">
                        Etapa o edat preferida
                      </Label>
                      <Input
                        id="preferredAgeGroup"
                        name="preferredAgeGroup"
                        defaultValue={coachProfile?.preferred_age_group ?? ''}
                        placeholder="Ex: Futbol base, amateur sènior..."
                      />
                    </div>
                  </div>
                </section>
              ) : null}

              {/* Club Role Subform View */}
              {primaryRole === 'club' ? (
                <section className="space-y-5 border-t pt-6">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Informació de club
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Camps específics per identificar l’entitat o responsable
                      esportiu.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="clubName">Nom del club</Label>
                      <Input
                        id="clubName"
                        name="clubName"
                        defaultValue={clubProfile?.club_name ?? ''}
                        placeholder="Ex: CF Banyoles"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clubCategory">Categoria principal</Label>
                      <Input
                        id="clubCategory"
                        name="clubCategory"
                        defaultValue={clubProfile?.category ?? ''}
                        placeholder="Ex: 2a Catalana"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Web</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        defaultValue={clubProfile?.website ?? ''}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactRole">Rol de contacte</Label>
                      <Input
                        id="contactRole"
                        name="contactRole"
                        defaultValue={clubProfile?.contact_role ?? ''}
                        placeholder="Ex: Coordinador esportiu"
                      />
                    </div>
                  </div>
                </section>
              ) : null}

              {/* Staff Role Subform View */}
              {primaryRole === 'staff' ? (
                <section className="space-y-5 border-t pt-6">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Informació de professional de l’staff
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Camps específics per mostrar serveis, experiència i
                      disponibilitat professional.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="staffKind">Tipus de professional</Label>
                      <select
                        id="staffKind"
                        name="staffKind"
                        defaultValue={
                          staffProfile?.staff_kind ?? 'physiotherapist'
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      >
                        {staffTypeLabels.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="staffExperienceYears">
                        Anys d’experiència
                      </Label>
                      <Input
                        id="staffExperienceYears"
                        name="staffExperienceYears"
                        type="number"
                        min={0}
                        defaultValue={staffProfile?.experience_years ?? ''}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priceRange">Rang de preu orientatiu</Label>
                      <Input
                        id="priceRange"
                        name="priceRange"
                        defaultValue={staffProfile?.price_range ?? ''}
                        placeholder="Ex: 20-30 €/sessió"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-7">
                      <input
                        id="worksRemotely"
                        name="worksRemotely"
                        type="checkbox"
                        defaultChecked={staffProfile?.works_remotely ?? false}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="worksRemotely">
                        Ofereixo serveis remots
                      </Label>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="services">Serveis oferts</Label>
                      <Textarea
                        id="services"
                        name="services"
                        defaultValue={staffProfile?.services ?? ''}
                        placeholder="Ex: recuperació de lesions, readaptació, nutrició esportiva..."
                        rows={4}
                      />
                    </div>
                  </div>
                </section>
              ) : null}

              {/* Core Actions Buttons inside primary form */}
              <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
                <Button type="submit">Guardar canvis</Button>

                <Button asChild variant="outline">
                  <Link href="/dashboard">Cancel·lar</Link>
                </Button>
              </div>
            </form>

            
            <section className="mt-8 space-y-4 border-t pt-6">
              <div>
                <h2 className="text-lg font-semibold">Confiança i verificació</h2>
                <p className="text-sm text-muted-foreground">
                  La verificació permet reforçar la credibilitat del perfil dins de FUTCON.
                </p>
              </div>

              <div className="rounded-md border bg-background p-4">
                <p className="text-sm text-muted-foreground">Estat actual</p>

                <span
                  className={`mt-2 inline-flex rounded-full border px-3 py-1 text-sm font-medium ${
                    verificationClassNames[profile.verification ?? 'unverified']
                  }`}
                >
                  {verificationLabels[profile.verification ?? 'unverified']}
                </span>

                <p className="mt-3 text-sm text-muted-foreground">
                  {verificationDescriptions[profile.verification ?? 'unverified']}
                </p>
              </div>

              {profile.verification === 'verified' ? (
                <div className="rounded-md border bg-green-500/10 p-4 text-sm text-green-700">
                  El teu perfil ja consta com a verificat.
                </div>
              ) : profile.verification === 'pending' ? (
                <div className="rounded-md border bg-yellow-500/10 p-4 text-sm text-yellow-700">
                  La teva sol·licitud de verificació està pendent de revisió.
                </div>
              ) : (
                <form action={requestProfileVerification} className="space-y-3 rounded-md border bg-background p-4">
                  <div className="space-y-2">
                    <label htmlFor="requestMessage" className="text-sm font-medium">
                      Missatge opcional
                    </label>

                    <textarea
                      id="requestMessage"
                      name="requestMessage"
                      rows={3}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Ex: Sol·licito la verificació perquè soc responsable d’un club / jugador federat / professional de l’staff..."
                    />
                  </div>

                  <Button type="submit">Sol·licitar verificació</Button>
                </form>
              )}
            </section>

          </CardContent>
        </Card>
      </div>
    </main>
  )
}