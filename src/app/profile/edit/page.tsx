import { redirect } from 'next/navigation'
import Link from 'next/link'
import { updateCommonProfile } from './actions'
import { createClient } from '@/lib/supabase/server'
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
import { Textarea } from '@/components/ui/textarea'

type ProfileEditPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

const availabilityOptions = [
  {
    value: 'available',
    label: 'Disponible',
    description: 'Busco equip, club o oportunitats professionals.',
  },
  {
    value: 'open_to_offers',
    label: 'Escolto ofertes',
    description: 'Actualment tinc vinculació, però estic obert a propostes.',
  },
  {
    value: 'unavailable',
    label: 'No disponible',
    description: 'No busco noves oportunitats en aquest moment.',
  },
]

const roleLabels: Record<string, string> = {
  player: 'Jugador',
  coach: 'Entrenador / cos tècnic',
  club: 'Club o responsable',
  staff: 'Professional de l’staff',
}

export default async function ProfileEditPage({
  searchParams,
}: ProfileEditPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: roles } = await supabase
    .from('profile_roles')
    .select('role')
    .eq('profile_id', user.id)

  if (!roles || roles.length === 0) {
    redirect('/onboarding')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('display_name, bio, city, province, availability')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    redirect('/dashboard?error=No s’ha pogut carregar el perfil.')
  }

  return (
    <main className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground underline"
          >
            Tornar al panell
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Editar perfil</CardTitle>
            <CardDescription>
              Actualitza la informació comuna del teu perfil a FUTCON.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {params.error ? (
              <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {params.error}
              </div>
            ) : null}

            <div className="mb-6 rounded-md border bg-background p-4">
              <p className="text-sm text-muted-foreground">Rol assignat</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {roles.map((item) => (
                  <span
                    key={item.role}
                    className="rounded-full border px-3 py-1 text-sm"
                  >
                    {roleLabels[item.role] ?? item.role}
                  </span>
                ))}
              </div>
            </div>

            <form action={updateCommonProfile} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="displayName">Nom visible</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  defaultValue={profile.display_name ?? ''}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia breu</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  defaultValue={profile.bio ?? ''}
                  placeholder="Explica breument qui ets, què busques o quina experiència tens."
                  rows={5}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciutat</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    defaultValue={profile.city ?? ''}
                    placeholder="Ex: Girona"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">Província</Label>
                  <Input
                    id="province"
                    name="province"
                    type="text"
                    defaultValue={profile.province ?? ''}
                    placeholder="Ex: Girona"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="availability">Disponibilitat</Label>

                <select
                  id="availability"
                  name="availability"
                  defaultValue={profile.availability ?? 'available'}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {availabilityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="space-y-2">
                  {availabilityOptions.map((option) => (
                    <p key={option.value} className="text-sm text-muted-foreground">
                      <strong>{option.label}:</strong> {option.description}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit">Guardar canvis</Button>

                <Button asChild variant="outline">
                  <Link href="/dashboard">Cancel·lar</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}