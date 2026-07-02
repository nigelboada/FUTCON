import { notFound } from 'next/navigation'
import { getLocale } from '@/lib/i18n/server'
import { getFooterContent } from '@/lib/footer/content'
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
      <div className="futcon-fade-up mx-auto max-w-4xl">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-3xl">{page.title}</CardTitle>
            <CardDescription>{page.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}