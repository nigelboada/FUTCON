import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLocale } from '@/lib/i18n/server'
import { getFooterContent } from '@/lib/footer/content'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type StaticInfoPageProps = {
  pageKey: 'privacy' | 'cookies' | 'legal' | 'terms' | 'help' | 'faq'
}

export async function StaticInfoPage({ pageKey }: StaticInfoPageProps) {
  const locale = await getLocale()
  const content = getFooterContent(locale)
  const page = content.pages[pageKey]

  if (!page) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-12">
      <div className="futcon-fade-up mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border bg-background p-8">
          <p className="w-fit rounded-full border bg-muted px-3 py-1 text-sm text-muted-foreground">
            FUTCON
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            {page.title}
          </h1>

          <p className="mt-3 max-w-3xl text-muted-foreground">
            {page.description}
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {page.paragraphs.map((paragraph, index) => (
            <Card key={paragraph} className="futcon-card-hover">
              <CardHeader>
                <CardTitle className="text-lg">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">
                  {paragraph}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="rounded-3xl border bg-background p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">FUTCON</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Plataforma web per connectar l’ecosistema del futbol amateur.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/contact">Contacte</Link>
              </Button>

              <Button asChild>
                <Link href="/contact-us">Contacta amb nosaltres</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}