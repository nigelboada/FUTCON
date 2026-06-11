import Link from 'next/link'
import { signUp } from '../actions'
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

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const params = await searchParams

  return (
    <main className="futcon-hero-bg min-h-[calc(100vh-4rem)] bg-muted/50 px-4 py-10">
      <div className="futcon-hero-content futcon-fade-up mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section className="space-y-4">
          <p className="w-fit rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
            Crea el teu perfil
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Uneix-te a FUTCON i fes visible el teu perfil.
          </h1>

          <p className="max-w-xl text-muted-foreground">
            Registra’t per crear un perfil adaptat al teu rol, aparèixer al
            cercador i contactar amb altres usuaris de la plataforma.
          </p>
        </section>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Crear compte</CardTitle>
            <CardDescription>
              Aquest compte et permetrà configurar el perfil i seleccionar el
              teu rol dins de FUTCON.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FeedbackMessage error={params.error} />

            <form action={signUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Nom visible</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  placeholder="Ex: Marc Garcia"
                  required
                />
              </div>

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
                  minLength={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Crear compte
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Ja tens compte?{' '}
              <Link href="/login" className="font-medium underline">
                Inicia sessió
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}