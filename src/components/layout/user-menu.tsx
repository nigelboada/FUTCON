'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { ProfileAvatar } from '@/components/profiles/profile-avatar'
import type { Locale } from '@/lib/i18n/config'
import type { Theme } from '@/lib/theme/config'

type UserMenuProps = {
  displayName: string
  avatarUrl: string | null
  completeness: number | null
  isAdmin: boolean
  currentLocale: Locale
  currentTheme: Theme
  signOutAction: (formData: FormData) => void | Promise<void>
  labels: {
    account: string
    language: string
    admin: string
    achievements: string
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
  avatarUrl,
  completeness,
  isAdmin,
  currentLocale,
  currentTheme,
  signOutAction,
  labels,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current) return

      if (!menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="rounded-full outline-none ring-offset-background transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={labels.account}
      >
        <ProfileAvatar
          src={avatarUrl}
          name={displayName}
          completeness={completeness}
          size="sm"
        />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border bg-background p-4 shadow-xl">
          <div className="flex items-start justify-between gap-3 border-b pb-4">
            <div className="flex min-w-0 items-center gap-3">
              <ProfileAvatar
                src={avatarUrl}
                name={displayName}
                completeness={completeness}
                size="md"
              />

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  {labels.account}
                </p>
                <p className="truncate text-sm font-semibold">{displayName}</p>
              </div>
            </div>

            <ThemeToggle currentTheme={currentTheme} labels={labels.theme} />
          </div>

          <div className="mt-4 space-y-3">
            <LanguageSwitcher
              currentLocale={currentLocale}
              label={labels.language}
            />

            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/profile/edit" onClick={() => setIsOpen(false)}>
                  {labels.editProfile}
                </Link>
              </Button>

              <Button asChild variant="outline" size="sm">
                <Link href="/achievements" onClick={() => setIsOpen(false)}>
                  {labels.achievements}
                </Link>
              </Button>

              {isAdmin ? (
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    {labels.admin}
                  </Link>
                </Button>
              ) : null}

              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm">
                  {labels.signOut}
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
