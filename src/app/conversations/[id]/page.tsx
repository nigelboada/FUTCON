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
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
import { resolveFeedbackMessage } from '@/lib/i18n/feedback'

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
  const locale = await getLocale()
  const m = getMessages(locale)
  const error = resolveFeedbackMessage(query.error, m.feedback)

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
            <Link href="/conversations">{m.conversations.backToMessages}</Link>
          </Button>

          <Button asChild variant="secondary">
            <Link href="/search">{m.common.searchProfiles}</Link>
          </Button>
        </div>

        <Card className="overflow-hidden border-2">
          <CardHeader className="border-b bg-background">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {m.conversations.conversationWith}
                </p>
                <CardTitle className="text-2xl">
                  {otherProfile?.display_name ?? m.conversations.profileFallback}
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  {[otherProfile?.city, otherProfile?.province]
                    .filter(Boolean)
                    .join(', ') || m.common.locationNotSpecified}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {otherParticipant ? (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/profile/${otherParticipant.profile_id}`}>
                      {m.common.viewProfile}
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-0">
            <div className="space-y-3 px-4 pt-4">
              <FeedbackMessage error={error} />

              {messagesError ? (
                <FeedbackMessage error={messagesError.message} />
              ) : null}
            </div>

            <div className="mx-4 max-h-[58vh] overflow-y-auto rounded-xl border bg-muted/40 p-4">
              <ConversationMessages
                conversationId={id}
                currentProfileId={user.id}
                initialMessages={messages}
                localeTag={m.localeTag}
                labels={{ emptyThread: m.conversations.emptyThread }}
              />
            </div>

            <form action={sendMessage} className="border-t bg-background p-4">
              <input type="hidden" name="conversationId" value={id} />

              <div className="space-y-3">
                <Textarea
                  name="content"
                  placeholder={m.conversations.messagePlaceholder}
                  rows={3}
                  required
                  className="resize-none"
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    {m.conversations.realtimeNote}
                  </p>

                  <Button type="submit">{m.conversations.sendMessage}</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
