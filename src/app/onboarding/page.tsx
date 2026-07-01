import { redirect } from 'next/navigation'
import { selectInitialRole } from './actions'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { FeedbackMessage } from '@/components/layout/feedback-message'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
import { resolveFeedbackMessage } from '@/lib/i18n/feedback'

type OnboardingPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function OnboardingPage({
  searchParams,
}: OnboardingPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const locale = await getLocale()
  const m = getMessages(locale)
  const error = resolveFeedbackMessage(params.error, m.feedback)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: existingRoles } = await supabase
    .from('profile_roles')
    .select('role')
    .eq('profile_id', user.id)
    .limit(1)

  if (existingRoles && existingRoles.length > 0) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-8">
      <div className="futcon-fade-up mx-auto max-w-6xl space-y-8">
        <section className="space-y-3">
          <p className="w-fit rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
            {m.onboarding.eyebrow}
          </p>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            {m.onboarding.title}
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            {m.onboarding.description}
          </p>
        </section>

        <FeedbackMessage error={error} />

        <form action={selectInitialRole} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {m.onboarding.roles.map((role) => (
              <label
                key={role.value}
                className="futcon-card-hover cursor-pointer rounded-xl border bg-background p-5"
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    className="mt-1"
                    required
                  />

                  <div className="space-y-3">
                    <div>
                      <p className="text-lg font-semibold">{role.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {role.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-xl border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{m.onboarding.initialRoleTitle}</p>
              <p className="text-sm text-muted-foreground">
                {m.onboarding.initialRoleDescription}
              </p>
            </div>

            <Button type="submit" size="lg">
              {m.onboarding.continue}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
