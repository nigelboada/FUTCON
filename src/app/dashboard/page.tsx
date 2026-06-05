import { redirect } from 'next/navigation'
import { signOut } from '@/app/(auth)/actions'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('display_name, city, province, availability, verification')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error(error)
  }

  return (
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Panell principal</CardTitle>
            <CardDescription>
              Has iniciat sessió correctament a FUTCON.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-md border bg-background p-4">
              <p className="text-sm text-muted-foreground">Usuari autenticat</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div className="rounded-md border bg-background p-4">
              <p className="text-sm text-muted-foreground">Perfil associat</p>
              <p className="font-medium">
                {profile?.display_name ?? 'Perfil pendent de carregar'}
              </p>

              <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                <p>Ciutat: {profile?.city ?? 'No indicada'}</p>
                <p>Província: {profile?.province ?? 'No indicada'}</p>
                <p>Disponibilitat: {profile?.availability ?? 'No indicada'}</p>
              </div>
            </div>

            <form action={signOut}>
              <Button type="submit" variant="outline">
                Tancar sessió
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}