import { createClient } from '@/lib/supabase/server'
import { ProfileCard } from '@/components/profiles/profile-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'

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

  review_count: number | null
  average_rating: number | string | null
}

function normalizeParam(value: string | undefined) {
  return typeof value === 'string' ? value.trim() : ''
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const locale = await getLocale()
  const m = getMessages(locale)

  const q = normalizeParam(params.q)
  const role = normalizeParam(params.role)
  const city = normalizeParam(params.city)
  const province = normalizeParam(params.province)
  const availability = normalizeParam(params.availability)
  const plural = profilesPluralSuffix(locale)

  const roleOptions = [
    { value: 'all', label: m.rolePlural.all },
    { value: 'player', label: m.rolePlural.player },
    { value: 'coach', label: m.rolePlural.coach },
    { value: 'club', label: m.rolePlural.club },
    { value: 'staff', label: m.rolePlural.staff },
  ]

  const availabilityOptions = [
    { value: 'all', label: m.availability.all },
    { value: 'available', label: m.availability.available },
    { value: 'open_to_offers', label: m.availability.open_to_offers },
    { value: 'unavailable', label: m.availability.unavailable },
  ]

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
  const resultPlural = profiles.length === 1 ? '' : plural
  const profileCardLabels = {
    roles: { ...m.roles },
    verification: { ...m.verification },
    availability: { ...m.availability },
    ...m.profileCard,
  }

  return (
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section>
          <h1 className="text-3xl font-bold">{m.search.title}</h1>
          <p className="mt-2 text-muted-foreground">{m.search.description}</p>
        </section>

        <section className="rounded-lg border bg-background p-4">
          <form className="grid gap-4 md:grid-cols-5" action="/search">
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="q">{m.search.name}</Label>
              <Input
                id="q"
                name="q"
                placeholder={m.search.namePlaceholder}
                defaultValue={q}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">{m.search.role}</Label>
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
              <Label htmlFor="city">{m.search.city}</Label>
              <Input
                id="city"
                name="city"
                placeholder={m.search.cityPlaceholder}
                defaultValue={city}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">{m.search.province}</Label>
              <Input
                id="province"
                name="province"
                placeholder={m.search.provincePlaceholder}
                defaultValue={province}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">{m.search.availability}</Label>
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
              <Button type="submit">{m.search.applyFilters}</Button>

              <Button asChild variant="outline">
                <a href="/search">{m.search.clear}</a>
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
            {m.search.resultsFound
              .replace('{count}', String(profiles.length))
              .replaceAll('{plural}', resultPlural)}
          </p>

          {profiles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {profiles.map((profile) => (
                <ProfileCard
                  key={`${profile.profile_id}-${profile.role}`}
                  profile={profile}
                  labels={profileCardLabels}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border bg-background p-6 text-center text-muted-foreground">
              <p className="text-lg font-semibold">{m.search.noResultsTitle}</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                {m.search.noResultsDescription}
              </p>

              <Button asChild className="mt-4" variant="secondary">
                <a href="/search">{m.search.clearFilters}</a>
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function profilesPluralSuffix(locale: string) {
  return locale === 'en' ? 's' : 's'
}
