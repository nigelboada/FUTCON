import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'

export default async function AboutPage() {
  const locale = await getLocale()
  const m = getMessages(locale).aboutPage

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-3xl border bg-background p-8 shadow-sm md:p-10">
          <p className="w-fit rounded-full border bg-muted px-3 py-1 text-sm text-muted-foreground">
            {m.eyebrow}
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
            {m.title}
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
            {m.description}
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card className="futcon-card-hover">
            <CardHeader>
              <CardTitle className="text-2xl">{m.originTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              {m.originParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`text-lg leading-8 text-muted-foreground ${
                    index > 0 ? 'mt-4' : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="futcon-card-hover">
            <CardHeader>
              <CardTitle className="text-2xl">{m.motivationTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              {m.motivationParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`text-lg leading-8 text-muted-foreground ${
                    index > 0 ? 'mt-4' : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl border bg-background p-8 shadow-sm md:p-10">
          <h2 className="text-3xl font-bold tracking-tight">{m.solveTitle}</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {m.solveItems.map((item) => (
              <div key={item.title} className="rounded-2xl border bg-muted/40 p-5">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{m.productTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              {m.productParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`text-lg leading-8 text-muted-foreground ${
                    index > 0 ? 'mt-4' : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{m.goalsTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-lg leading-8 text-muted-foreground">
                {m.goals.map((goal) => (
                  <p key={goal}>{goal}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl border bg-background p-8 text-center shadow-sm md:p-10">
          <h2 className="text-3xl font-bold tracking-tight">
            {m.evolutionTitle}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            {m.evolutionDescription}
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/register">{m.registerCta}</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/contact-us">{m.contactCta}</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
