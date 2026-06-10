import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/app/(auth)/actions'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type DashboardPageProps = {
  searchParams: Promise<{
    message?: string
    error?: string
  }>
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

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('display_name, bio, city, province, availability, verification')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.error(profileError)
  }

  const { data: roles, error: rolesError } = await supabase
    .from('profile_roles')
    .select('role')
    .eq('profile_id', user.id)

  if (rolesError) {
    console.error(rolesError)
  }

  if (!roles || roles.length === 0) {
    redirect('/onboarding')
  }

  return (
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {params.message ? (
          <div className="rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-700">
            {params.message}
          </div>
        ) : null}

        {params.error ? (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {params.error}
          </div>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle>Panell principal</CardTitle>
            <CardDescription>
              Gestiona el teu perfil i la informació bàsica del compte.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-md border bg-background p-4">
              <p className="text-sm text-muted-foreground">Usuari autenticat</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div className="rounded-md border bg-background p-4">
              <p className="text-sm text-muted-foreground">Perfil associat</p>
              <p className="font-medium">
                {profile?.display_name ?? 'Perfil pendent de carregar'}
              </p>

              {profile?.bio ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {profile.bio}
                </p>
              ) : null}

              <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                <p>Ciutat: {profile?.city ?? 'No indicada'}</p>
                <p>Província: {profile?.province ?? 'No indicada'}</p>
                <p>
                  Disponibilitat:{' '}
                  {profile?.availability
                    ? availabilityLabels[profile.availability] ??
                      profile.availability
                    : 'No indicada'}
                </p>
              </div>
            </div>

            <div className="rounded-md border bg-background p-4">
              <p className="text-sm text-muted-foreground">Rol assignat</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {roles.map((item) => (
                  <span
                    key={item.role}
                    className="rounded-full border px-3 py-1 text-sm"
                  >
                    {roleLabels[item.role] ?? item.role}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/profile/edit">Editar perfil</Link>
              </Button>

              <Button asChild variant="secondary">
                <a href="/search">Cercar perfils</a>
              </Button>

              <Button asChild variant="secondary">
                <Link href="/conversations">Missatges</Link>
              </Button>

              <form action={signOut}>
                <Button type="submit" variant="outline">
                  Tancar sessió
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}