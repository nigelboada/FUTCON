import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLocale } from '@/lib/i18n/server'
import { getFooterContent } from '@/lib/footer/content'
import { Button } from '@/components/ui/button'

type StaticInfoPageProps = {
  pageKey: 'privacy' | 'cookies' | 'legal' | 'terms' | 'help' | 'faq'
}

const friendlyPages = ['help', 'faq'] as const
const legalPages = ['privacy', 'cookies', 'legal', 'terms'] as const

function isFriendlyPage(pageKey: string) {
  return friendlyPages.includes(pageKey as (typeof friendlyPages)[number])
}

function isLegalPage(pageKey: string) {
  return legalPages.includes(pageKey as (typeof legalPages)[number])
}

export async function StaticInfoPage({ pageKey }: StaticInfoPageProps) {
  const locale = await getLocale()
  const content = getFooterContent(locale)
  const page = content.pages[pageKey]
  const helpMore = content.helpMore
  const sectionTitles = 'sectionTitles' in page ? page.sectionTitles : undefined
  const additionalInfo = 'additionalInfo' in page ? page.additionalInfo : undefined

  if (!page) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-3xl border bg-background p-8 shadow-sm">
          <h1 className="text-4xl font-bold tracking-tight">{page.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            {page.description}
          </p>
        </section>

        {isFriendlyPage(pageKey) ? (
          <section className="space-y-5">
            {page.paragraphs.map((paragraph) => (
              <div
                key={paragraph}
                className="rounded-2xl border bg-background p-6 shadow-sm"
              >
                <p className="text-lg leading-8 text-foreground [text-indent:-0.8rem] pl-6">
                  {paragraph}
                </p>
              </div>
            ))}

            <section className="rounded-3xl border bg-background p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">{helpMore.title}</h2>
              <p className="mt-3 text-lg leading-8 text-muted-foreground">
                {helpMore.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact-us">{helpMore.contactUs}</Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href="/contact">{helpMore.contactDetails}</Link>
                </Button>
              </div>
            </section>
          </section>
        ) : null}

        {isLegalPage(pageKey) ? (
          <section className="space-y-6">
            {page.paragraphs.map((paragraph, index) => (
              <div
                key={paragraph}
                className="rounded-2xl border bg-background p-7 shadow-sm"
              >
                <h2 className="text-2xl font-semibold tracking-tight">
                  {sectionTitles?.[index] ??
                    (index === 4
                      ? content.legalInformativeSection
                      : `${content.legalFallbackSection} ${index + 1}`)}
                </h2>

                <p className="mt-4 text-base leading-8 text-foreground -indent-4 pl-8">
                  {paragraph}
                </p>
              </div>
            ))}

            {additionalInfo ? (
              <section className="rounded-2xl border bg-background p-7 shadow-sm">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {additionalInfo.title}
                </h2>

                <div className="mt-4 space-y-4 text-base leading-8">
                  {additionalInfo.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="-indent-4 pl-8">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ) : null}
          </section>
        ) : null}
      </div>
    </main>
  )
}
