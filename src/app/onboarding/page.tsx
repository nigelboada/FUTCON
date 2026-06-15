import { redirect } from 'next/navigation'
import { selectInitialRole } from './actions'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { FeedbackMessage } from '@/components/layout/feedback-message'

type OnboardingPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

const roles = [
  {
    value: 'player',
    title: 'Jugador',
    description:
      'Crea un perfil esportiu, mostra la teva disponibilitat i facilita que clubs o entrenadors et trobin.',
    highlights: ['Posició', 'Categoria', 'Club actual', 'Disponibilitat'],
  },
  {
    value: 'coach',
    title: 'Entrenador / cos tècnic',
    description:
      'Mostra la teva experiència tècnica, categoria, formació i disponibilitat per a nous projectes.',
    highlights: ['Experiència', 'Llicència', 'Categoria', 'Club actual'],
  },
  {
    value: 'club',
    title: 'Club o responsable',
    description:
      'Cerca perfils, contacta amb jugadors o professionals i representa una entitat esportiva.',
    highlights: ['Nom del club', 'Categoria', 'Ubicació', 'Contacte'],
  },
  {
    value: 'staff',
    title: 'Professional de l’staff',
    description:
      'Ofereix serveis vinculats al rendiment, salut, preparació física o suport tècnic.',
    highlights: ['Serveis', 'Preu orientatiu', 'Experiència', 'Treball remot'],
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
    <main className="min-h-screen bg-muted/50 px-4 py-8">
      <div className="futcon-fade-up mx-auto max-w-6xl space-y-8">
        <section className="space-y-3">
          <p className="w-fit rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
            Configuració inicial
          </p>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Selecciona el teu rol dins de FUTCON
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            Aquesta selecció permet adaptar el teu perfil, els camps d’edició i
            la informació que es mostrarà al cercador.
          </p>
        </section>

        <FeedbackMessage error={params.error} />

        <form action={selectInitialRole} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role) => (
              <label
                key={role.value}
                className="futcon-card-hover cursor-pointer rounded-xl border bg-background p-5"
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    className="mt-1"
                    required
                  />

                  <div className="space-y-3">
                    <div>
                      <p className="text-lg font-semibold">{role.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {role.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-xl border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Rol inicial del perfil</p>
              <p className="text-sm text-muted-foreground">
                Més endavant el model permetria associar més d’un rol a un
                mateix perfil.
              </p>
            </div>

            <Button type="submit" size="lg">
              Continuar
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}