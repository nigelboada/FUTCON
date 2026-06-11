import Link from 'next/link'
import { redirect } from 'next/navigation'
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

type ConversationOverview = {
  conversation_id: string
  other_display_name: string
  other_role: string | null
  last_message_content: string | null
  last_message_at: string | null
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

const availabilityClassNames: Record<string, string> = {
  available: 'border-green-500 bg-green-500/10 text-green-700',
  open_to_offers: 'border-yellow-500 bg-yellow-500/10 text-yellow-700',
  unavailable: 'border-red-500 bg-red-500/10 text-red-700',
}

function formatAvailability(value: string | null | undefined) {
  if (!value) {
    return 'No indicada'
  }

  return availabilityLabels[value] ?? value
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

  const { data: conversationsData } = await supabase
    .from('conversation_overview_view')
    .select(
      'conversation_id, other_display_name, other_role, last_message_content, last_message_at'
    )
    .eq('viewer_profile_id', user.id)
    .order('last_message_at', { ascending: false, nullsFirst: false })
    .limit(3)

  const conversations = (conversationsData ?? []) as ConversationOverview[]
  const availability = profile?.availability ?? 'available'

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
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

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">
                Benvingut, {profile?.display_name ?? 'usuari'}
              </CardTitle>
              <CardDescription>
                Gestiona el teu perfil, consulta oportunitats i accedeix als
                teus missatges.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Rol</p>
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

                <div className="rounded-lg border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Disponibilitat</p>
                  <span
                    className={`mt-2 inline-flex rounded-full border px-3 py-1 text-sm font-medium ${
                      availabilityClassNames[availability] ?? 'border bg-muted'
                    }`}
                  >
                    {formatAvailability(profile?.availability)}
                  </span>
                </div>

                <div className="rounded-lg border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Ubicació</p>
                  <p className="mt-2 font-medium">
                    {[profile?.city, profile?.province]
                      .filter(Boolean)
                      .join(', ') || 'No indicada'}
                  </p>
                </div>
              </div>

              {profile?.bio ? (
                <div className="rounded-lg border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Biografia</p>
                  <p className="mt-2 text-sm">{profile.bio}</p>
                </div>
              ) : (
                <div className="rounded-lg border bg-background p-4">
                  <p className="font-medium">Completa la teva biografia</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Una descripció breu ajuda altres usuaris a entendre millor
                    el teu perfil.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/profile/edit">Editar perfil</Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href="/search">Cercar perfils</Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href="/conversations">Veure missatges</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accions ràpides</CardTitle>
              <CardDescription>
                Accessos principals per continuar utilitzant FUTCON.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/search">Explorar perfils disponibles</Link>
              </Button>

              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/profile/edit">Actualitzar disponibilitat</Link>
              </Button>

              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/conversations">Consultar converses</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Últimes converses</CardTitle>
              <CardDescription>
                Converses recents iniciades amb altres perfils.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {conversations.length > 0 ? (
                <div className="space-y-3">
                  {conversations.map((conversation) => (
                    <Link
                      key={conversation.conversation_id}
                      href={`/conversations/${conversation.conversation_id}`}
                      className="block rounded-lg border bg-background p-4 transition hover:bg-accent"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">
                            {conversation.other_display_name}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {conversation.other_role
                              ? roleLabels[conversation.other_role] ??
                                conversation.other_role
                              : 'Rol no indicat'}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                        {conversation.last_message_content ??
                          'Conversa creada, encara sense missatges.'}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border bg-background p-6 text-center">
                  <p className="font-medium">Encara no tens converses</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Ves al cercador, obre un perfil i inicia una conversa.
                  </p>

                  <Button asChild className="mt-4" variant="secondary">
                    <Link href="/search">Cercar perfils</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estat del Sprint actual</CardTitle>
              <CardDescription>
                Resum funcional del prototip implementat.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Registre, login i rols implementats.</p>
              <p>Cercador, filtres i perfils públics disponibles.</p>
              <p>Xat intern amb actualització en temps real operatiu.</p>
              <p>Valoracions i puntuació mitjana visibles.</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}