import { redirect } from 'next/navigation'
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

const roleLabels: Record<string, string> = {
  player: 'Jugador',
  coach: 'Entrenador / cos tècnic',
  club: 'Club o responsable',
  staff: 'Professional de l’staff',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('display_name, city, province, availability, verification')
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
        <Card>
          <CardHeader>
            <CardTitle>Panell principal</CardTitle>
            <CardDescription>
              Has iniciat sessió correctament a FUTCON.
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

              <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                <p>Ciutat: {profile?.city ?? 'No indicada'}</p>
                <p>Província: {profile?.province ?? 'No indicada'}</p>
                <p>Disponibilitat: {profile?.availability ?? 'No indicada'}</p>
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

            <form action={signOut}>
              <Button type="submit" variant="outline">
                Tancar sessió
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}