import { redirect } from 'next/navigation'
import { selectInitialRole } from './actions'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type OnboardingPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

const roles = [
  {
    value: 'player',
    title: 'Jugador',
    description: 'Vull crear un perfil esportiu i trobar oportunitats.',
  },
  {
    value: 'coach',
    title: 'Entrenador / cos tècnic',
    description: 'Vull cercar perfils o mostrar la meva experiència tècnica.',
  },
  {
    value: 'club',
    title: 'Club o responsable',
    description: 'Vull trobar jugadors, entrenadors o professionals per al club.',
  },
  {
    value: 'staff',
    title: 'Professional de l’staff',
    description: 'Vull oferir serveis com fisioteràpia, nutrició o preparació física.',
  },
]

export default async function OnboardingPage({
  searchParams,
}: OnboardingPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: existingRoles } = await supabase
    .from('profile_roles')
    .select('role')
    .eq('profile_id', user.id)
    .limit(1)

  if (existingRoles && existingRoles.length > 0) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Selecciona el teu rol inicial</CardTitle>
            <CardDescription>
              Aquest pas permet adaptar el teu perfil i les funcionalitats inicials
              de FUTCON al teu paper dins del futbol amateur.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {params.error ? (
              <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {params.error}
              </div>
            ) : null}

            <form action={selectInitialRole} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {roles.map((role) => (
                  <label
                    key={role.value}
                    className="cursor-pointer rounded-lg border bg-background p-4 transition hover:bg-accent"
                  >
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        className="mt-1"
                        required
                      />

                      <div>
                        <p className="font-medium">{role.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <Button type="submit" className="w-full">
                Continuar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}