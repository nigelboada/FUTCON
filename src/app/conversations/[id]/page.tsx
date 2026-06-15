import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { sendMessage } from '../actions'
import { ConversationMessages } from '@/components/conversations/conversation-messages'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FeedbackMessage } from '@/components/layout/feedback-message'

type ConversationPageProps = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    error?: string
  }>
}

type Message = {
  id: string
  conversation_id: string
  sender_profile_id: string
  content: string
  created_at: string
}

export default async function ConversationPage({
  params,
  searchParams,
}: ConversationPageProps) {
  const { id } = await params
  const query = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: participants } = await supabase
    .from('conversation_participants')
    .select('profile_id')
    .eq('conversation_id', id)

  if (!participants || participants.length === 0) {
    notFound()
  }

  const isParticipant = participants.some(
    (participant) => participant.profile_id === user.id
  )

  if (!isParticipant) {
    notFound()
  }

  const otherParticipant = participants.find(
    (participant) => participant.profile_id !== user.id
  )

  const { data: otherProfile } = otherParticipant
    ? await supabase
        .from('profiles')
        .select('display_name, city, province, verification')
        .eq('id', otherParticipant.profile_id)
        .single()
    : { data: null }

  const { data: messageData, error: messagesError } = await supabase
    .from('messages')
    .select('id, conversation_id, sender_profile_id, content, created_at')
    .eq('conversation_id', id)
    .order('created_at', { ascending: true })

  const messages = (messageData ?? []) as Message[]

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-8">
      <div className="futcon-fade-up mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="outline">
            <Link href="/conversations">Tornar als missatges</Link>
          </Button>

          <Button asChild variant="secondary">
            <Link href="/search">Cercar perfils</Link>
          </Button>
        </div>

        <Card className="overflow-hidden border-2">
          <CardHeader className="border-b bg-background">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversa amb</p>
                <CardTitle className="text-2xl">
                  {otherProfile?.display_name ?? 'Perfil'}
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  {[otherProfile?.city, otherProfile?.province]
                    .filter(Boolean)
                    .join(', ') || 'Ubicació no indicada'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {otherParticipant ? (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/profile/${otherParticipant.profile_id}`}>
                      Veure perfil
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-0">
            <div className="space-y-3 px-4 pt-4">
              <FeedbackMessage error={query.error} />

              {messagesError ? (
                <FeedbackMessage error={messagesError.message} />
              ) : null}
            </div>

            <div className="mx-4 max-h-[58vh] overflow-y-auto rounded-xl border bg-muted/40 p-4">
              <ConversationMessages
                conversationId={id}
                currentProfileId={user.id}
                initialMessages={messages}
              />
            </div>

            <form
              action={sendMessage}
              className="border-t bg-background p-4"
            >
              <input type="hidden" name="conversationId" value={id} />

              <div className="space-y-3">
                <Textarea
                  name="content"
                  placeholder="Escriu un missatge..."
                  rows={3}
                  required
                  className="resize-none"
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Els missatges s’actualitzen en temps real dins de la
                    conversa.
                  </p>

                  <Button type="submit">Enviar missatge</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}