import Link from 'next/link'
import { redirect } from 'next/navigation'
import { banUser, sendAdminWarning, unbanUser } from './actions'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
import { resolveFeedbackMessage } from '@/lib/i18n/feedback'
import { FeedbackMessage } from '@/components/layout/feedback-message'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { requireActiveUser } from '@/lib/auth/guards'

type AdminPageProps = {
  searchParams: Promise<{
    message?: string
    error?: string
  }>
}

type AdminWarning = {
  id: string
  profile_id: string
  reason: string
  message: string
  read_at: string | null
  created_at: string
  profile:
    | {
        display_name: string | null
      }
    | {
        display_name: string | null
      }[]
    | null
}

const moderationReasons = [
  'Nom inapropiat',
  'Activitat sospitosa',
  'Ús abusiu de missatges',
  'Contingut ofensiu',
  'Possible perfil fals',
  'Falta d’activitat',
  'Incompliment de condicions d’ús',
  'Altres',
]

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams
  const { supabase } = await requireActiveUser()
  const locale = await getLocale()
  const m = getMessages(locale)

  const { data: isAdmin } = await supabase.rpc('is_app_admin')

  if (!isAdmin) {
    redirect('/dashboard?error=no_admin_permission')
  }

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name, city, province, is_banned, banned_reason, banned_at')
    .order('created_at', { ascending: false })
    .limit(100)

  const { data: warnings } = await supabase
    .from('admin_warnings')
    .select(`
      id,
      profile_id,
      reason,
      message,
      read_at,
      created_at,
      profile:profiles (
        display_name
      )
    `)
    .order('created_at', { ascending: false })
    .limit(20)

  const adminWarnings = (warnings ?? []) as AdminWarning[]

  const message = resolveFeedbackMessage(params.message, m.feedback)
  const error = resolveFeedbackMessage(params.error, m.feedback)

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="space-y-2">
          <p className="text-sm text-muted-foreground">Administració</p>
          <h1 className="text-3xl font-bold tracking-tight">
            Panell de moderació
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Gestiona usuaris, bloquejos i advertències de la plataforma.
          </p>
        </section>

        <FeedbackMessage message={message} error={error} />

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{profiles?.length ?? 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Perfils revisats</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {profiles?.filter((profile) => profile.is_banned).length ?? 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Usuaris bloquejats</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{adminWarnings.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Advertències recents</p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Gestió d’usuaris</h2>

          <div className="space-y-4">
            {(profiles ?? []).map((profile) => (
              <Card key={profile.id}>
                <CardHeader>
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <CardTitle>{profile.display_name}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {[profile.city, profile.province].filter(Boolean).join(', ') ||
                          'Ubicació no indicada'}
                      </p>

                      {profile.is_banned ? (
                        <p className="mt-2 text-sm font-medium text-destructive">
                          Bloquejat: {profile.banned_reason}
                        </p>
                      ) : null}
                    </div>

                    <Button asChild variant="outline" size="sm">
                      <Link href={`/profile/${profile.id}`}>
                        Veure perfil
                      </Link>
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="grid gap-4 lg:grid-cols-2">
                  <form action={sendAdminWarning} className="space-y-3 rounded-xl border p-4">
                    <input type="hidden" name="profileId" value={profile.id} />

                    <div className="space-y-2">
                      <Label>Motiu de l’advertència</Label>
                      <select
                        name="reason"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      >
                        <option value="">Selecciona un motiu</option>
                        {moderationReasons.map((reason) => (
                          <option key={reason} value={reason}>
                            {reason}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Missatge</Label>
                      <Textarea
                        name="message"
                        rows={3}
                        placeholder="Explica el motiu de l’advertència..."
                        required
                      />
                    </div>

                    <Button type="submit" variant="outline">
                      Enviar advertència
                    </Button>
                  </form>

                  <form
                    action={profile.is_banned ? unbanUser : banUser}
                    className="space-y-3 rounded-xl border p-4"
                  >
                    <input type="hidden" name="profileId" value={profile.id} />

                    {!profile.is_banned ? (
                      <>
                        <div className="space-y-2">
                          <Label>Motiu del bloqueig</Label>
                          <select
                            name="reason"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                          >
                            <option value="">Selecciona un motiu</option>
                            {moderationReasons.map((reason) => (
                              <option key={reason} value={reason}>
                                {reason}
                              </option>
                            ))}
                          </select>
                        </div>

                        <Button type="submit" variant="destructive">
                          Banejar usuari
                        </Button>
                      </>
                    ) : (
                      <Button type="submit" variant="outline">
                        Desbloquejar usuari
                      </Button>
                    )}
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Advertències recents</h2>

          {adminWarnings.length > 0 ? (
            <div className="space-y-3">
              {adminWarnings.map((warning) => (
                <Card key={warning.id} className="border-destructive/30">
                  <CardContent className="p-4">
                    <p className="font-medium">
                      {Array.isArray(warning.profile)
                        ? warning.profile[0]?.display_name
                        : warning.profile?.display_name}
                    </p>
                    <p className="mt-1 text-sm text-destructive">
                      {warning.reason}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {warning.message}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">
                Encara no hi ha advertències registrades.
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  )
}
