import Link from 'next/link'
import { signIn } from '../actions'
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
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'

type LoginPageProps = {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const locale = await getLocale()
  const m = getMessages(locale)

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
            <FeedbackMessage message={params.message} error={params.error} />

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
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
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
