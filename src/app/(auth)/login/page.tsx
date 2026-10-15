import Link from 'next/link'
import { redirect } from 'next/navigation'
import { signIn, signInWithGoogle } from '../actions'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FeedbackMessage } from '@/components/layout/feedback-message'
import { PasswordInput } from '@/components/forms/password-input'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
import { resolveFeedbackMessage } from '@/lib/i18n/feedback'

type LoginPageProps = {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Errors like profile_load_failed are sent here with an active session, so only
  // skip the form when there is nothing to show.
  if (user && !params.error) {
    redirect('/dashboard')
  }

  const locale = await getLocale()
  const m = getMessages(locale)
  const message = resolveFeedbackMessage(params.message, m.feedback)
  const error = resolveFeedbackMessage(params.error, m.feedback)

  return (
    <main className="futcon-hero-bg min-h-[calc(100vh-4rem)] bg-muted/50 px-4 py-10">
      <div className="futcon-hero-content futcon-fade-up mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="space-y-4">
          <p className="w-fit rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
            {m.auth.login.eyebrow}
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {m.auth.login.title}
          </h1>

          <p className="max-w-xl text-muted-foreground">
            {m.auth.login.description}
          </p>
        </section>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>{m.auth.login.cardTitle}</CardTitle>
            <CardDescription>{m.auth.login.cardDescription}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FeedbackMessage message={message} error={error} />

            <form action={signInWithGoogle}>
              <Button type="submit" variant="outline" className="w-full">
                {m.auth.login.continueWithGoogle}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {m.auth.login.orContinueWithEmail}
                </span>
              </div>
            </div>

            <form action={signIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{m.auth.login.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={m.auth.login.emailPlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{m.auth.login.password}</Label>
                <PasswordInput
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" className="w-full">
                {m.auth.login.submit}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              {m.auth.login.noAccount}{' '}
              <Link href="/register" className="font-medium underline">
                {m.auth.login.createOne}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
