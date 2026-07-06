import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FeedbackMessage } from '@/components/layout/feedback-message'
import { ProfileAvatar } from '@/components/profiles/profile-avatar'
import { requireActiveUser } from '@/lib/auth/guards'
import { resolveFeedbackMessage } from '@/lib/i18n/feedback'
import { getMessages } from '@/lib/i18n/messages'
import { getLocale } from '@/lib/i18n/server'
import { calculateProfileCompleteness } from '@/lib/profiles/completeness'

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

const availabilityClassNames: Record<string, string> = {
  available: 'border-green-500 bg-green-500/10 text-green-700',
  open_to_offers: 'border-yellow-500 bg-yellow-500/10 text-yellow-700',
  unavailable: 'border-red-500 bg-red-500/10 text-red-700',
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams
  const { supabase, user } = await requireActiveUser()
  const locale = await getLocale()
  const m = getMessages(locale)
  const message = resolveFeedbackMessage(params.message, m.feedback)
  const error = resolveFeedbackMessage(params.error, m.feedback)

  function formatRole(value: string | null | undefined) {
    if (!value) {
      return m.common.roleNotSpecified
    }

    return value in m.roles ? m.roles[value as keyof typeof m.roles] : value
  }

  function formatAvailability(value: string | null | undefined) {
    if (!value) {
      return m.common.notSpecified
    }

    return value in m.availability
      ? m.availability[value as keyof typeof m.availability]
      : value
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('display_name, bio, city, province, avatar_url, availability, verification')
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

  const primaryRole = roles[0].role

  const { data: playerProfile } =
    primaryRole === 'player'
      ? await supabase
          .from('player_profiles')
          .select('position, category, current_club')
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  const { data: coachProfile } =
    primaryRole === 'coach'
      ? await supabase
          .from('coach_profiles')
          .select('category, current_club, coaching_license')
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  const { data: clubProfile } =
    primaryRole === 'club'
      ? await supabase
          .from('club_profiles')
          .select('club_name, category')
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  const { data: staffProfile } =
    primaryRole === 'staff'
      ? await supabase
          .from('staff_profiles')
          .select('staff_kind, services, price_range')
          .eq('profile_id', user.id)
          .maybeSingle()
      : { data: null }

  const { data: conversationsData } = await supabase
    .from('conversation_overview_view')
    .select(
      'conversation_id, other_display_name, other_role, last_message_content, last_message_at'
    )
    .eq('viewer_profile_id', user.id)
    .order('last_message_at', { ascending: false, nullsFirst: false })
    .limit(3)

  const { data: unreadMessagesCount } = await supabase.rpc(
    'get_unread_message_count'
  )

  const { count: achievementCount } = await supabase
    .from('user_achievements')
    .select('achievement_id', { count: 'exact', head: true })
    .eq('profile_id', user.id)

  const { count: reviewCount } = await supabase
    .from('reviews')
    .select('id', { count: 'exact', head: true })
    .eq('reviewed_profile_id', user.id)

  const { count: unreadWarningsCount } = await supabase
    .from('admin_warnings')
    .select('id', { count: 'exact', head: true })
    .eq('profile_id', user.id)
    .is('read_at', null)

  const conversations = (conversationsData ?? []) as ConversationOverview[]
  const availability = profile?.availability ?? 'available'
  const profileCompleteness = profile
    ? calculateProfileCompleteness({
        ...profile,
        role: primaryRole,
        player_position: playerProfile?.position ?? null,
        player_category: playerProfile?.category ?? null,
        player_current_club: playerProfile?.current_club ?? null,
        coach_category: coachProfile?.category ?? null,
        coach_current_club: coachProfile?.current_club ?? null,
        coaching_license: coachProfile?.coaching_license ?? null,
        club_name: clubProfile?.club_name ?? null,
        club_category: clubProfile?.category ?? null,
        staff_kind: staffProfile?.staff_kind ?? null,
        staff_services: staffProfile?.services ?? null,
        price_range: staffProfile?.price_range ?? null,
      })
    : null

  const completenessPercentage = profileCompleteness?.percentage ?? 0

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-8">
      <div className="futcon-fade-up mx-auto max-w-7xl space-y-6">
        <FeedbackMessage message={message} error={error} />

        <section className="space-y-2">
          <p className="text-sm text-muted-foreground">{m.dashboard.title}</p>
          <h1 className="text-4xl font-bold tracking-tight">
            {m.dashboard.welcome.replace(
              '{name}',
              profile?.display_name ?? m.common.unknownUser
            )}
          </h1>
          <p className="max-w-3xl text-muted-foreground">
            {m.dashboard.description}
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>{completenessPercentage}%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {m.dashboard.profileCompleteness}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{Number(unreadMessagesCount ?? 0)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {m.dashboard.messagesPending}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{achievementCount ?? 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {m.dashboard.achievementsStat}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{reviewCount ?? 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {m.dashboard.reviewsReceived}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>{m.dashboard.sportsProfileTitle}</CardTitle>
              <CardDescription>
                {m.dashboard.sportsProfileDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <ProfileAvatar
                  src={profile?.avatar_url ?? null}
                  name={profile?.display_name ?? m.common.unknownUser}
                  completeness={completenessPercentage}
                  size="lg"
                />

                <div className="space-y-2">
                  <p className="text-lg font-semibold">
                    {profile?.display_name ?? m.common.unknownUser}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((item) => (
                      <span
                        key={item.role}
                        className="rounded-full border px-3 py-1 text-sm"
                      >
                        {formatRole(item.role)}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {[profile?.city, profile?.province]
                      .filter(Boolean)
                      .join(', ') || m.common.notSpecified}
                  </p>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${
                      availabilityClassNames[availability] ?? 'border bg-muted'
                    }`}
                  >
                    {formatAvailability(profile?.availability)}
                  </span>
                </div>
              </div>

              {profile?.bio ? (
                <p className="rounded-lg border bg-background p-4 text-sm text-muted-foreground">
                  {profile.bio}
                </p>
              ) : (
                <div className="rounded-lg border bg-background p-4">
                  <p className="font-medium">{m.dashboard.completeBioTitle}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {m.dashboard.completeBioDescription}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link href="/profile/edit">
                    {m.dashboard.completeProfileCta}
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href="/search">{m.dashboard.searchProfiles}</Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href="/achievements">
                    {m.dashboard.viewAchievements}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{m.dashboard.profileCompleteness}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{completenessPercentage}%</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${completenessPercentage}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {m.dashboard.profileCompletenessHint}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{m.dashboard.nextActionTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {m.dashboard.nextActionCompleteProfile}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{m.dashboard.importantAlerts}</CardTitle>
            </CardHeader>
            <CardContent>
              {(unreadWarningsCount ?? 0) > 0 ||
              Number(unreadMessagesCount ?? 0) > 0 ? (
                <div className="space-y-3 text-sm text-muted-foreground">
                  {(unreadWarningsCount ?? 0) > 0 ? (
                    <p>{m.admin.warningLabel}: {unreadWarningsCount}</p>
                  ) : null}
                  {Number(unreadMessagesCount ?? 0) > 0 ? (
                    <p>
                      {m.dashboard.messagesPending}: {Number(unreadMessagesCount)}
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {m.dashboard.noImportantAlerts}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{m.dashboard.recentActivity}</CardTitle>
              <CardDescription>
                {m.dashboard.latestConversationsDescription}
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
                      <p className="font-medium">
                        {conversation.other_display_name}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatRole(conversation.other_role)}
                      </p>
                      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                        {conversation.last_message_content ??
                          m.dashboard.conversationCreated}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border bg-background p-6 text-center">
                  <p className="font-medium">
                    {m.dashboard.emptyConversationsTitle}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {m.dashboard.emptyConversationsDescription}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
