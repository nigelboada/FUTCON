import Link from 'next/link'
import { signUp } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear compte</CardTitle>
          <CardDescription>
            Registra’t a FUTCON per crear el teu perfil esportiu o professional.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {params.error ? (
            <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {params.error}
            </div>
          ) : null}

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

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Ja tens compte?{' '}
            <Link href="/login" className="font-medium underline">
              Inicia sessió
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}