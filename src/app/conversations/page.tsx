import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import {
  hideConversation,
  markConversationAsRead,
  markConversationAsUnread,
} from './conversation-actions'
import { markWarningAsRead } from './warning-actions'
import { FeedbackMessage } from '@/components/layout/feedback-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { requireActiveUser } from '@/lib/auth/guards'
import { resolveFeedbackMessage } from '@/lib/i18n/feedback'
import { getMessages } from '@/lib/i18n/messages'
import { getLocale } from '@/lib/i18n/server'

type ConversationsPageProps = {
  searchParams: Promise<{
    message?: string
    error?: string
  }>
}

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
  viewer_hidden_at: string | null
  viewer_marked_unread: boolean
  unread_count: number
  has_unread: boolean
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

export default async function ConversationsPage({
  searchParams,
}: ConversationsPageProps) {
  const params = await searchParams
  const { supabase, user } = await requireActiveUser()
  const locale = await getLocale()
  const m = getMessages(locale)
  const message = resolveFeedbackMessage(params.message, m.feedback)
  const feedbackError = resolveFeedbackMessage(params.error, m.feedback)

  const { data, error } = await supabase
    .from('conversation_overview_view')
    .select('*')
    .eq('viewer_profile_id', user.id)
    .is('viewer_hidden_at', null)
    .order('updated_at', { ascending: false })

  const { data: adminWarnings } = await supabase
    .from('admin_warnings')
    .select('id, reason, message, created_at, read_at')
    .eq('profile_id', user.id)
    .is('read_at', null)
    .order('created_at', { ascending: false })

  const conversations = (data ?? []) as ConversationOverview[]

  return (
    <main className="min-h-screen bg-transparent px-4 py-8">
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

        <FeedbackMessage message={message} error={feedbackError} />

        {(adminWarnings ?? []).length > 0 ? (
          <section className="space-y-3">
            {(adminWarnings ?? []).map((warning) => {
              const translatedReason =
                m.admin.warningReasons[
                  warning.reason as keyof typeof m.admin.warningReasons
                ] ?? warning.reason

              return (
                <div
                  key={warning.id}
                  className="rounded-xl border border-destructive/40 bg-destructive/10 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-destructive">
                        {m.admin.warningLabel}: {translatedReason}
                      </p>
                      <p className="mt-2 text-sm text-destructive/90">
                        {warning.message}
                      </p>
                    </div>

                    {!warning.read_at ? (
                      <form action={markWarningAsRead}>
                        <input
                          type="hidden"
                          name="warningId"
                          value={warning.id}
                        />
                        <Button type="submit" variant="outline" size="sm">
                          {m.admin.markAsRead}
                        </Button>
                      </form>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </section>
        ) : null}

        {conversations.length > 0 ? (
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <Card
                key={conversation.conversation_id}
                className={
                  conversation.has_unread
                    ? 'border-emerald-700/40 bg-emerald-500/5'
                    : ''
                }
              >
                <CardContent className="p-4">
                  <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="min-w-0 space-y-3">
                      <div>
                        <h2 className="truncate text-xl font-semibold">
                          {conversation.other_display_name}
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {conversation.other_role
                            ? m.roles[
                                conversation.other_role as keyof typeof m.roles
                              ] ?? conversation.other_role
                            : m.common.roleNotSpecified}
                          {' \u00b7 '}
                          {[
                            conversation.other_city,
                            conversation.other_province,
                          ]
                            .filter(Boolean)
                            .join(', ') || m.common.locationNotSpecified}
                        </p>
                      </div>

                      <p className="line-clamp-2 text-sm">
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
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col lg:items-stretch">
                      <Button asChild className="w-full lg:w-40">
                        <Link href={`/conversations/${conversation.conversation_id}`}>
                          {m.conversations.openConversation}
                        </Link>
                      </Button>

                      {conversation.has_unread ? (
                        <form action={markConversationAsRead}>
                          <input
                            type="hidden"
                            name="conversationId"
                            value={conversation.conversation_id}
                          />
                          <Button
                            type="submit"
                            variant="outline"
                            className="w-full lg:w-40"
                          >
                            {m.conversations.markAsRead}
                          </Button>
                        </form>
                      ) : (
                        <form action={markConversationAsUnread}>
                          <input
                            type="hidden"
                            name="conversationId"
                            value={conversation.conversation_id}
                          />
                          <Button
                            type="submit"
                            variant="outline"
                            className="w-full lg:w-40"
                          >
                            {m.conversations.markAsUnread}
                          </Button>
                        </form>
                      )}

                      <form action={hideConversation}>
                        <input
                          type="hidden"
                          name="conversationId"
                          value={conversation.conversation_id}
                        />

                        <Button
                          type="submit"
                          variant="outline"
                          className="w-full text-destructive hover:bg-destructive/10 lg:w-40"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {m.conversations.deleteFromInbox}
                        </Button>
                      </form>
                    </div>
                  </div>
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
