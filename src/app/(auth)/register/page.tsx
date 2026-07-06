import Link from 'next/link'
import { signInWithGoogle, signUp } from '../actions'
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

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const params = await searchParams
  const locale = await getLocale()
  const m = getMessages(locale)
  const error = resolveFeedbackMessage(params.error, m.feedback)

  return (
    <main className="futcon-hero-bg min-h-[calc(100vh-4rem)] bg-muted/50 px-4 py-10">
      <div className="futcon-hero-content futcon-fade-up mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section className="space-y-4">
          <p className="w-fit rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
            {m.auth.register.eyebrow}
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {m.auth.register.title}
          </h1>

          <p className="max-w-xl text-muted-foreground">
            {m.auth.register.description}
          </p>
        </section>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>{m.auth.register.cardTitle}</CardTitle>
            <CardDescription>
              {m.auth.register.cardDescription}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FeedbackMessage error={error} />

            <form action={signInWithGoogle}>
              <Button type="submit" variant="outline" className="w-full">
                {m.auth.register.continueWithGoogle}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {m.auth.register.orContinueWithEmail}
                </span>
              </div>
            </div>

            <form action={signUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">
                  {m.auth.register.displayName}
                </Label>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  placeholder={m.auth.register.displayNamePlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{m.auth.register.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={m.auth.register.emailPlaceholder}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{m.auth.register.password}</Label>
                <PasswordInput
                  id="password"
                  name="password"
                  required
                  autoComplete="new-password"
                />
              </div>

              <Button type="submit" className="w-full">
                {m.auth.register.submit}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              {m.auth.register.hasAccount}{' '}
              <Link href="/login" className="font-medium underline">
                {m.auth.register.signIn}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
