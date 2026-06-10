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
        .select('display_name')
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
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/conversations"
            className="text-sm text-muted-foreground underline"
          >
            Tornar als missatges
          </Link>

          <Button asChild variant="outline">
            <Link href="/search">Cercar perfils</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Conversa amb {otherProfile?.display_name ?? 'perfil'}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {query.error ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {query.error}
              </div>
            ) : null}

            {messagesError ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {messagesError.message}
              </div>
            ) : null}

            <ConversationMessages
              conversationId={id}
              currentProfileId={user.id}
              initialMessages={messages}
            />

            <form action={sendMessage} className="space-y-3 border-t pt-4">
              <input type="hidden" name="conversationId" value={id} />

              <Textarea
                name="content"
                placeholder="Escriu un missatge..."
                rows={4}
                required
              />

              <Button type="submit">Enviar missatge</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}