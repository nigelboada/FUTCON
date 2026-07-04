import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function BannedPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('banned_reason, banned_at')
    .eq('id', user.id)
    .single()

  return (
    <main className="min-h-screen bg-muted/50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-3xl text-destructive">
              Compte restringit
            </CardTitle>
            <CardDescription>
              Aquest perfil ha estat bloquejat per l’equip d’administració.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-xl border bg-background p-4">
              <p className="text-sm text-muted-foreground">Motiu</p>
              <p className="mt-1 font-medium">
                {profile?.banned_reason ?? 'No especificat'}
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              Si creus que es tracta d’un error, contacta amb l’equip de FUTCON
              mitjançant la pàgina de contacte.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}