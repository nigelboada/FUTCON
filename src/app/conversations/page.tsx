import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type ConversationOverview = {
  conversation_id: string
  other_profile_id: string
  other_display_name: string
  other_city: string | null
  other_province: string | null
  other_role: string | null
  last_message_content: string | null
  last_message_at: string | null
  updated_at: string
}

const roleLabels: Record<string, string> = {
  player: 'Jugador',
  coach: 'Entrenador / cos tècnic',
  club: 'Club o responsable',
  staff: 'Professional de l’staff',
}

function formatDate(value: string | null) {
  if (!value) {
    return 'Sense missatges'
  }

  return new Intl.DateTimeFormat('ca-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export default async function ConversationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data, error } = await supabase
    .from('conversation_overview_view')
    .select('*')
    .eq('viewer_profile_id', user.id)
    .order('updated_at', { ascending: false })

  const conversations = (data ?? []) as ConversationOverview[]

  return (
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Missatges</h1>
            <p className="mt-2 text-muted-foreground">
              Converses iniciades amb altres perfils de FUTCON.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/search">Cercar perfils</Link>
          </Button>
        </div>

        {error ? (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error.message}
          </div>
        ) : null}

        {conversations.length > 0 ? (
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <Card key={conversation.conversation_id}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {conversation.other_display_name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {conversation.other_role
                      ? roleLabels[conversation.other_role] ?? conversation.other_role
                      : 'Rol no indicat'}
                    {' · '}
                    {[conversation.other_city, conversation.other_province]
                      .filter(Boolean)
                      .join(', ') || 'Ubicació no indicada'}
                  </p>

                  <p className="text-sm">
                    {conversation.last_message_content ??
                      'Encara no hi ha missatges en aquesta conversa.'}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {formatDate(conversation.last_message_at)}
                  </p>

                  <Button asChild>
                    <Link href={`/conversations/${conversation.conversation_id}`}>
                      Obrir conversa
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Encara no tens converses. Ves al cercador i contacta amb un perfil
              per iniciar-ne una.
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}