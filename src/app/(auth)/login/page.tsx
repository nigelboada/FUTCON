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

type LoginPageProps = {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams

  return (
    <main className="futcon-hero-bg min-h-[calc(100vh-4rem)] bg-muted/50 px-4 py-10">
      <div className="futcon-hero-content futcon-fade-up mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="space-y-4">
          <p className="w-fit rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
            Accés a FUTCON
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Torna a connectar amb l’ecosistema del futbol amateur.
          </h1>

          <p className="max-w-xl text-muted-foreground">
            Accedeix al teu perfil, consulta missatges, cerca perfils i mantén
            actualitzada la teva disponibilitat.
          </p>
        </section>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Iniciar sessió</CardTitle>
            <CardDescription>
              Introdueix les teves credencials per accedir al compte.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FeedbackMessage message={params.message} error={params.error} />

            <form action={signIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correu electrònic</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contrasenya</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Encara no tens compte?{' '}
              <Link href="/register" className="font-medium underline">
                Crea’n un
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}