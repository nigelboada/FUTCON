import { getLocale } from '@/lib/i18n/server'
import { getPublicSiteContent } from '@/lib/public-site/content'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function AboutPage() {
  const locale = await getLocale()
  const content = getPublicSiteContent(locale)

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-12">
      <div className="futcon-fade-up mx-auto max-w-5xl space-y-8">
        <section className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            {content.about.title}
          </h1>
          <p className="max-w-3xl text-muted-foreground">
            {content.about.description}
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          {content.about.sections.map((section) => (
            <Card key={section.title} className="futcon-card-hover">
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{section.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}