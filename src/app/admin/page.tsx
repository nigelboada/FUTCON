import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  approveVerificationRequest,
  rejectVerificationRequest,
} from './actions'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type AdminPageProps = {
  searchParams: Promise<{
    message?: string
    error?: string
  }>
}

type VerificationRequest = {
  id: string
  profile_id: string
  status: string
  request_message: string | null
  created_at: string
  resolved_at: string | null
  profile_display_name: string
  profile_city: string | null
  profile_province: string | null
  profile_verification: string
  profile_roles: string
}

const statusLabels: Record<string, string> = {
  pending: 'Pendent',
  verified: 'Verificat',
  rejected: 'Rebutjat',
  unverified: 'No verificat',
}

const statusClassNames: Record<string, string> = {
  pending: 'border-yellow-500 bg-yellow-500/10 text-yellow-700',
  verified: 'border-green-500 bg-green-500/10 text-green-700',
  rejected: 'border-red-500 bg-red-500/10 text-red-700',
  unverified: 'border-muted bg-muted text-muted-foreground',
}

function formatDate(value: string | null) {
  if (!value) {
    return 'No resolt'
  }

  return new Intl.DateTimeFormat('ca-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc('is_app_admin')

  if (adminError || !isAdmin) {
    redirect('/dashboard?error=No tens permisos per accedir al panell d’administració.')
  }

  const { data, error } = await supabase
    .from('admin_verification_requests_view')
    .select('*')
    .order('created_at', { ascending: false })

  const requests = (data ?? []) as VerificationRequest[]
  const pendingRequests = requests.filter((request) => request.status === 'pending')
  const resolvedRequests = requests.filter((request) => request.status !== 'pending')

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-8">
      <div className="futcon-fade-up mx-auto max-w-7xl space-y-6">
        <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Administració</p>
            <h1 className="text-3xl font-bold">Panell d’administració</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Revisa i gestiona les sol·licituds de verificació dels perfils de
              FUTCON.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/dashboard">Tornar al dashboard</Link>
          </Button>
        </section>

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

        {error ? (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error.message}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{requests.length}</CardTitle>
              <CardDescription>Sol·licituds totals</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{pendingRequests.length}</CardTitle>
              <CardDescription>Pendents de revisió</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{resolvedRequests.length}</CardTitle>
              <CardDescription>Resoltes</CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Sol·licituds pendents</h2>
            <p className="text-sm text-muted-foreground">
              Revisa els perfils que han demanat verificació.
            </p>
          </div>

          {pendingRequests.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {pendingRequests.map((request) => {
                const isOwnVerificationRequest = request.profile_id === user.id

                return (
                    <Card key={request.id} className="futcon-card-hover">
                            
                            

                    
                    
                    <CardHeader>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <CardTitle>{request.profile_display_name}</CardTitle>
                            <CardDescription>
                            {request.profile_roles}
                            {' · '}
                            {[request.profile_city, request.profile_province]
                                .filter(Boolean)
                                .join(', ') || 'Ubicació no indicada'}
                            </CardDescription>
                        </div>

                        <span
                            className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${
                            statusClassNames[request.status]
                            }`}
                        >
                            {statusLabels[request.status] ?? request.status}
                        </span>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="rounded-md border bg-background p-4">
                        <p className="text-sm text-muted-foreground">
                            Missatge de la sol·licitud
                        </p>
                        <p className="mt-2 text-sm">
                            {request.request_message ||
                            'L’usuari no ha afegit cap missatge.'}
                        </p>
                        </div>

                        <p className="text-sm text-muted-foreground">
                        Sol·licitada el {formatDate(request.created_at)}
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                        <Button asChild variant="outline">
                            <Link href={`/profile/${request.profile_id}`}>
                            Veure perfil
                            </Link>
                        </Button>

                        
                        {isOwnVerificationRequest ? (
                            <div className="rounded-md border bg-muted p-3 text-sm text-muted-foreground">
                                Aquesta sol·licitud ha de ser resolta per un altre administrador.
                            </div>
                            ) : (
                            <>
                                <form action={approveVerificationRequest}>
                                <input
                                    type="hidden"
                                    name="requestId"
                                    value={request.id}
                                />
                                <Button type="submit">Aprovar</Button>
                                </form>

                                <form action={rejectVerificationRequest}>
                                <input
                                    type="hidden"
                                    name="requestId"
                                    value={request.id}
                                />
                                <Button type="submit" variant="destructive">
                                    Rebutjar
                                </Button>
                                </form>
                            </>
                        )}




                        </div>
                    </CardContent>
                    </Card>
                )
              })}

            </div>

          ) : (
            <Card>
              <CardContent className="p-10 text-center">
                <p className="text-lg font-semibold">
                  No hi ha sol·licituds pendents
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Quan un usuari sol·liciti la verificació del seu perfil,
                  apareixerà en aquesta secció.
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Historial recent</h2>
            <p className="text-sm text-muted-foreground">
              Sol·licituds verificades o rebutjades.
            </p>
          </div>

          {resolvedRequests.length > 0 ? (
            <div className="space-y-3">
              {resolvedRequests.slice(0, 8).map((request) => (
                <Card key={request.id}>
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">
                        {request.profile_display_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {request.profile_roles} · Resolució:{' '}
                        {formatDate(request.resolved_at)}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${
                        statusClassNames[request.status]
                      }`}
                    >
                      {statusLabels[request.status] ?? request.status}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                Encara no hi ha sol·licituds resoltes.
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  )
}
