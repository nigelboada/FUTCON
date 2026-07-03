import Link from 'next/link'
import { getLocale } from '@/lib/i18n/server'
import { getPublicSiteContent } from '@/lib/public-site/content'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function ContactPage() {
  const locale = await getLocale()
  const content = getPublicSiteContent(locale)

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-12">
      <div className="futcon-fade-up mx-auto max-w-4xl space-y-8">
        <section className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            {content.contactInfo.title}
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            {content.contactInfo.description}
          </p>
        </section>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>FUTCON</CardTitle>
            <CardDescription>{content.contactInfo.subtitle}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm text-muted-foreground">
                  {content.contactInfo.hoursLabel}
                </p>
                <p className="mt-2 font-medium">9h - 21h</p>
              </div>

              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm text-muted-foreground">
                  {content.contactInfo.phoneLabel}
                </p>
                <p className="mt-2 font-medium">+34 621 05 93 96</p>
                <p className="font-medium">934 675 267</p>
              </div>

              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm text-muted-foreground">
                  {content.contactInfo.emailLabel}
                </p>
                <a
                  href="mailto:nigelboada@gmail.com"
                  className="mt-2 block font-medium underline"
                >
                  nigelboada@gmail.com
                </a>
              </div>

              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm text-muted-foreground">
                  {content.contactInfo.addressLabel}
                </p>
                <p className="mt-2 font-medium">
                  Carrer de l&apos;Església, 39, 1r 1a
                </p>
                <p className="font-medium">Hospitalet de Llobregat, 08901</p>
              </div>
            </div>

            <Button asChild>
              <Link href="/contact-us">{content.contactInfo.formCta}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
