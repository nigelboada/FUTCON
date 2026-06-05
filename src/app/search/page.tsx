import { createClient } from '@/lib/supabase/server'
import { ProfileCard } from '@/components/profiles/profile-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type SearchPageProps = {
  searchParams: Promise<{
    q?: string
    role?: string
    city?: string
    province?: string
    availability?: string
  }>
}

type SearchProfile = {
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

const roleOptions = [
  { value: 'all', label: 'Tots els rols' },
  { value: 'player', label: 'Jugadors' },
  { value: 'coach', label: 'Entrenadors / cos tècnic' },
  { value: 'club', label: 'Clubs o responsables' },
  { value: 'staff', label: 'Professionals de l’staff' },
]

const availabilityOptions = [
  { value: 'all', label: 'Qualsevol disponibilitat' },
  { value: 'available', label: 'Disponible' },
  { value: 'open_to_offers', label: 'Escolto ofertes' },
  { value: 'unavailable', label: 'No disponible' },
]

function normalizeParam(value: string | undefined) {
  return typeof value === 'string' ? value.trim() : ''
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  const q = normalizeParam(params.q)
  const role = normalizeParam(params.role)
  const city = normalizeParam(params.city)
  const province = normalizeParam(params.province)
  const availability = normalizeParam(params.availability)

  let query = supabase
    .from('profile_search_view')
    .select('*')
    .order('display_name', { ascending: true })

  if (q) {
    query = query.ilike('display_name', `%${q}%`)
  }

  if (role && role !== 'all') {
    query = query.eq('role', role)
  }

  if (city) {
    query = query.ilike('city', `%${city}%`)
  }

  if (province) {
    query = query.ilike('province', `%${province}%`)
  }

  if (availability && availability !== 'all') {
    query = query.eq('availability', availability)
  }

  const { data, error } = await query

  const profiles = (data ?? []) as SearchProfile[]

  return (
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section>
          <h1 className="text-3xl font-bold">Cercar perfils</h1>
          <p className="mt-2 text-muted-foreground">
            Troba jugadors, entrenadors, clubs i professionals del futbol
            amateur.
          </p>
        </section>

        <section className="rounded-lg border bg-background p-4">
          <form className="grid gap-4 md:grid-cols-5" action="/search">
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="q">Nom</Label>
              <Input
                id="q"
                name="q"
                placeholder="Ex: Marc"
                defaultValue={q}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <select
                id="role"
                name="role"
                defaultValue={role || 'all'}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ciutat</Label>
              <Input
                id="city"
                name="city"
                placeholder="Ex: Girona"
                defaultValue={city}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">Província</Label>
              <Input
                id="province"
                name="province"
                placeholder="Ex: Girona"
                defaultValue={province}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Disponibilitat</Label>
              <select
                id="availability"
                name="availability"
                defaultValue={availability || 'all'}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {availabilityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-3 md:col-span-5">
              <Button type="submit">Aplicar filtres</Button>

              <Button asChild variant="outline">
                <a href="/search">Netejar</a>
              </Button>
            </div>
          </form>
        </section>

        {error ? (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error.message}
          </div>
        ) : null}

        <section>
          <p className="mb-4 text-sm text-muted-foreground">
            {profiles.length} resultat{profiles.length === 1 ? '' : 's'} trobat
            {profiles.length === 1 ? '' : 's'}.
          </p>

          {profiles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {profiles.map((profile) => (
                <ProfileCard key={`${profile.profile_id}-${profile.role}`} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border bg-background p-6 text-center text-muted-foreground">
              No s’han trobat perfils amb aquests filtres.
            </div>
          )}
        </section>
      </div>
    </main>
  )
}