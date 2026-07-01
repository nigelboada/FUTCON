import Link from 'next/link'
import { signOut } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import type { Locale } from '@/lib/i18n/config'
import type { Theme } from '@/lib/theme/config'

type UserMenuProps = {
  displayName: string
  isAdmin: boolean
  currentLocale: Locale
  currentTheme: Theme
  labels: {
    account: string
    language: string
    admin: string
    editProfile: string
    signOut: string
    theme: {
      light: string
      dark: string
      toggle: string
    }
  }
}

export function UserMenu({
  displayName,
  isAdmin,
  currentLocale,
  currentTheme,
  labels,
}: UserMenuProps) {
  return (
    <details className="relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent">
        <span className="max-w-36 truncate">{displayName}</span>
        <span className="text-muted-foreground">▾</span>
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border bg-background p-3 shadow-lg">
        <div className="border-b pb-3">
          <p className="text-xs text-muted-foreground">{labels.account}</p>
          <p className="mt-1 truncate text-sm font-medium">{displayName}</p>
        </div>

        <div className="mt-3 space-y-3">
          <LanguageSwitcher
            currentLocale={currentLocale}
            label={labels.language}
          />

          <ThemeToggle currentTheme={currentTheme} labels={labels.theme} />

          <Button asChild variant="outline" size="sm" className="w-full justify-start">
            <Link href="/profile/edit">{labels.editProfile}</Link>
          </Button>

          {isAdmin ? (
            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <Link href="/admin">{labels.admin}</Link>
            </Button>
          ) : null}

          <form action={signOut}>
            <Button type="submit" variant="outline" size="sm" className="w-full justify-start">
              {labels.signOut}
            </Button>
          </form>
        </div>
      </div>
    </details>
  )
}