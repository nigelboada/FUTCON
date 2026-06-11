import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
  },
  {
    href: '/search',
    label: 'Cercar perfils',
  },
  {
    href: '/conversations',
    label: 'Missatges',
  },
  {
    href: '/profile/edit',
    label: 'Editar perfil',
  },
]

export async function AppHeader() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .maybeSingle()
    : { data: null }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
              FC
            </span>

            <div>
              <p className="text-lg font-bold leading-none">FUTCON</p>
              <p className="text-xs text-muted-foreground">
                Futbol amateur connectat
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {user ? (
            <>
              {navItems.map((item) => (
                <Button key={item.href} asChild variant="ghost" size="sm">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}

              <div className="hidden h-6 w-px bg-border md:block" />

              <span className="max-w-40 truncate text-sm text-muted-foreground">
                {profile?.display_name ?? user.email}
              </span>

              <form action={signOut}>
                <Button type="submit" variant="outline" size="sm">
                  Tancar sessió
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Iniciar sessió</Link>
              </Button>

              <Button asChild size="sm">
                <Link href="/register">Crear compte</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}