import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'

const featureCards = [
  {
    title: 'Perfils diferenciats',
    description:
      'Jugadors, entrenadors, clubs i professionals de l’staff disposen d’una fitxa adaptada al seu rol.',
  },
  {
    title: 'Cerca amb filtres',
    description:
      'Permet localitzar perfils per rol, ubicació i disponibilitat dins de l’ecosistema del futbol amateur.',
  },
  {
    title: 'Comunicació interna',
    description:
      'Els usuaris poden iniciar converses i contactar directament amb altres perfils de la plataforma.',
  },
  {
    title: 'Confiança i valoracions',
    description:
      'Les valoracions i la disponibilitat visible ajuden a reforçar la credibilitat dels perfils.',
  },
]

const userTypes = [
  'Jugadors que busquen oportunitats',
  'Entrenadors i cos tècnic',
  'Clubs i responsables esportius',
  'Fisioterapeutes, nutricionistes i preparadors físics',
]

export default async function HomePage() {
  const supabase = await createClient()

  const locale = await getLocale()
  const m = getMessages(locale)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="futcon-hero-bg min-h-screen bg-muted/50">
      <section className="futcon-hero-content futcon-fade-up mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="w-fit rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
              {m.home.eyebrow}
            </p>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {m.home.title}
            </h1>

            <p className="max-w-2xl text-lg text-muted-foreground">
              {m.home.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {user ? (
              <Button asChild size="lg">
                <Link href="/dashboard">{m.home.dashboardCta}</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link href="/register">{m.home.registerCta}</Link>
                </Button>

                <Button asChild size="lg" variant="outline">
                  <Link href="/login">{m.home.loginCta}</Link>
                </Button>
              </>
            )}

            <Button asChild size="lg" variant="secondary">
              <Link href="/search">{m.home.exploreCta}</Link>
            </Button>
          </div>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>{m.home.targetTitle}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {userTypes.map((item) => (
              <div key={item} className="rounded-lg border bg-background p-4">
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="futcon-hero-content mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {m.home.features.map((feature) => (
            <Card key={feature.title} className="futcon-card-hover">
              <CardHeader>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}