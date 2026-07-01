import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'

import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
import { getTheme } from '@/lib/theme/server'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { ThemeToggle } from '@/components/layout/theme-toggle'

import { UserMenu } from '@/components/layout/user-menu'


export async function AppHeader() {
  const supabase = await createClient()

  const locale = await getLocale()
  const theme = await getTheme()
  const m = getMessages(locale)

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

  const { data: isAdmin } = user
    ? await supabase.rpc('is_app_admin')
    : { data: false }

  const displayName = profile?.display_name ?? user?.email ?? m.common.unknownUser

  const navItems = [
    {
      href: '/dashboard',
      label: m.nav.dashboard,
    },
    {
      href: '/search',
      label: m.nav.search,
    },
    {
      href: '/conversations',
      label: m.nav.conversations,
    },
    {
      href: '/profile/edit',
      label: m.nav.editProfile,
    },
  ]

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
                {m.nav.subtitle}
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

              <UserMenu
                displayName={displayName}
                isAdmin={Boolean(isAdmin)}
                currentLocale={locale}
                currentTheme={theme}
                labels={{
                  account: m.nav.account,
                  language: m.language.label,
                  admin: m.nav.admin,
                  editProfile: m.nav.editProfile,
                  signOut: m.nav.signOut,
                  theme: m.theme,
                }}
              />

            </>
          ) : (
            <>

              <LanguageSwitcher currentLocale={locale} label={m.language.label} />

              <ThemeToggle currentTheme={theme} labels={m.theme} />



              <Button asChild variant="ghost" size="sm">
                <Link href="/login">{m.nav.login}</Link>
              </Button>

              <Button asChild size="sm">
                <Link href="/register">{m.nav.register}</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
