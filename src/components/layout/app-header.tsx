import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'

import { getLocale } from '@/lib/i18n/server'
import { getMessages } from '@/lib/i18n/messages'
import { getTheme } from '@/lib/theme/server'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { ThemeToggle } from '@/components/layout/theme-toggle'

import { UserMenu } from '@/components/layout/user-menu'

import Image from 'next/image'
import { signOut } from '@/app/(auth)/actions'
import { calculateProfileCompleteness } from '@/lib/profiles/completeness'

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
        .select('display_name, avatar_url')
        .eq('id', user.id)
        .maybeSingle()
    : { data: null }

  const { data: ownSearchProfiles } = user
    ? await supabase
        .from('profile_search_view')
        .select('*')
        .eq('profile_id', user.id)
        .limit(1)
    : { data: null }

  const profileCompleteness = ownSearchProfiles?.[0]
    ? calculateProfileCompleteness(ownSearchProfiles[0]).percentage
    : null

  const { data: isAdmin } = user
    ? await supabase.rpc('is_app_admin')
    : { data: false }

  const { count: unreadWarningsCount } = user
    ? await supabase
        .from('admin_warnings')
        .select('id', { count: 'exact', head: true })
        .eq('profile_id', user.id)
        .is('read_at', null)
    : { count: 0 }

  const displayName = profile?.display_name ?? user?.email ?? m.common.unknownUser

  const publicNavItems = [
    { href: '/', label: m.nav.home },
    { href: '/about', label: m.nav.about },
    { href: '/services', label: m.nav.services },
    { href: '/contact', label: m.nav.contact },
  ]

  const privateNavItems = [
    { href: '/dashboard', label: m.nav.dashboard },
    { href: '/search', label: m.nav.search },
    { href: '/conversations', label: m.nav.conversations },
    { href: '/profile/edit', label: m.nav.editProfile },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border bg-background">
              <Image
                src="/icons/icon-192.png"
                alt="FUTCON"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
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
              {privateNavItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant="outline"
                  size="sm"
                  className="relative transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-sm"
                >
                  <Link href={item.href}>
                    {item.label}

                    {item.href === '/conversations' && unreadWarningsCount ? (
                      <span className="ml-2 text-destructive">⚠️</span>
                    ) : null}
                  </Link>
                </Button>
              ))}

              <UserMenu
                displayName={displayName}
                avatarUrl={profile?.avatar_url ?? null}
                completeness={profileCompleteness}
                isAdmin={Boolean(isAdmin)}
                currentLocale={locale}
                currentTheme={theme}
                signOutAction={signOut}
                labels={{
                  account: m.nav.account,
                  language: m.language.label,
                  admin: m.nav.admin,
                  achievements: m.achievements.menu,
                  editProfile: m.nav.editProfile,
                  signOut: m.nav.signOut,
                  theme: m.theme,
                }}
              />
            </>
          ) : (
            <>
              {publicNavItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant="outline"
                  size="sm"
                  className="transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-sm"
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}

              <LanguageSwitcher currentLocale={locale} label={m.language.label} />
              <ThemeToggle currentTheme={theme} labels={m.theme} />

              <Button
                asChild
                variant="outline"
                size="sm"
                className="transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-sm"
              >
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
