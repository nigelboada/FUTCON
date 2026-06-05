import Link from 'next/link'
import { signIn } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type LoginPageProps = {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar sessió</CardTitle>
          <CardDescription>
            Accedeix al teu compte de FUTCON.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {params.message ? (
            <div className="mb-4 rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-700">
              {params.message}
            </div>
          ) : null}

          {params.error ? (
            <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {params.error}
            </div>
          ) : null}

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

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Encara no tens compte?{' '}
            <Link href="/register" className="font-medium underline">
              Crea’n un
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}