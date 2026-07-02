import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getLocale } from '@/lib/i18n/server'
import { getPublicSiteContent } from '@/lib/public-site/content'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function HomePage() {
  const locale = await getLocale()
  const content = getPublicSiteContent(locale)
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="futcon-hero-bg min-h-screen bg-muted/50">
      <section className="futcon-hero-content futcon-fade-up mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="w-fit rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
              {content.home.eyebrow}
            </p>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {content.home.title}
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              {content.home.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={user ? '/dashboard' : '/register'}>
                {user ? 'Dashboard' : content.home.primaryCta}
              </Link>
            </Button>

            {!user ? (
              <Button asChild size="lg" variant="outline">
                <Link href="/login">{content.home.secondaryCta}</Link>
              </Button>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {content.home.highlights.map((item) => (
              <div
                key={item}
                className="rounded-xl border bg-background/80 p-4 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <Card className="futcon-card-hover border-2">
          <CardHeader>
            <CardTitle>{content.home.howTitle}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {content.home.steps.map((step, index) => (
              <div key={step.title} className="rounded-xl border bg-background p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>

                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="futcon-hero-content mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {content.home.stats.map((stat) => (
            <Card key={stat.label} className="futcon-card-hover text-center">
              <CardHeader>
                <CardTitle className="text-4xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}