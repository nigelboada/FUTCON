import { getLocale } from '@/lib/i18n/server'
import { getPublicSiteContent } from '@/lib/public-site/content'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function ServicesPage() {
  const locale = await getLocale()
  const content = getPublicSiteContent(locale)

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-12">
      <div className="futcon-fade-up mx-auto max-w-5xl space-y-8">
        <section className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            {content.services.title}
          </h1>
          <p className="max-w-3xl text-muted-foreground">
            {content.services.description}
          </p>
        </section>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>FUTCON</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {content.services.items.map((item) => (
                <div key={item} className="rounded-xl border bg-background p-4">
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}