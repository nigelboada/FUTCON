import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'

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

function formatDate(value: string | null, localeTag: string, fallback: string) {
  if (!value) {
    return fallback
  }

  return new Intl.DateTimeFormat(localeTag, {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export default async function ConversationsPage() {
  const supabase = await createClient()
  const locale = await getLocale()
  const m = getMessages(locale)

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
            <h1 className="text-3xl font-bold">{m.conversations.title}</h1>
            <p className="mt-2 text-muted-foreground">
              {m.conversations.description}
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/search">{m.common.searchProfiles}</Link>
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
                      ? m.roles[
                          conversation.other_role as keyof typeof m.roles
                        ] ?? conversation.other_role
                      : m.common.roleNotSpecified}
                    {' · '}
                    {[conversation.other_city, conversation.other_province]
                      .filter(Boolean)
                      .join(', ') || m.common.locationNotSpecified}
                  </p>

                  <p className="text-sm">
                    {conversation.last_message_content ??
                      m.conversations.noConversationMessages}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {formatDate(
                      conversation.last_message_at,
                      m.localeTag,
                      m.common.noMessages
                    )}
                  </p>

                  <Button asChild>
                    <Link href={`/conversations/${conversation.conversation_id}`}>
                      {m.conversations.openConversation}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-10 text-center">
              <p className="text-lg font-semibold">
                {m.conversations.emptyTitle}
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                {m.conversations.emptyDescription}
              </p>

              <Button asChild className="mt-4" variant="secondary">
                <Link href="/search">{m.common.searchProfiles}</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
