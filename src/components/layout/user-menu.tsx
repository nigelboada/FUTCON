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
    editProfile: string
    signOut: string
    signOutConfirm: string
    cancel: string
    achievements: string
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
  const [isSignOutOpen, setIsSignOutOpen] = useState(false)
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
        <div className="fixed left-3 right-3 top-24 z-50 rounded-3xl border bg-background p-4 shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-88">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-muted/50 p-3">
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
                <p className="truncate text-sm font-semibold">
                  {displayName}
                </p>
              </div>
            </div>

            <ThemeToggle currentTheme={currentTheme} labels={labels.theme} />
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border bg-background p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                {labels.language}
              </p>
              <LanguageSwitcher
                currentLocale={currentLocale}
                label={labels.language}
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button asChild variant="outline" size="sm" className="justify-center">
                <Link href="/profile/edit" onClick={() => setIsOpen(false)}>
                  {labels.editProfile}
                </Link>
              </Button>

              <Button asChild variant="outline" size="sm" className="justify-center">
                <Link href="/achievements" onClick={() => setIsOpen(false)}>
                  {labels.achievements}
                </Link>
              </Button>

              {isAdmin ? (
                <Button asChild variant="outline" size="sm" className="justify-center">
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    {labels.admin}
                  </Link>
                </Button>
              ) : null}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`w-full justify-center ${
                  isAdmin ? '' : 'sm:col-span-2'
                }`}
                onClick={() => setIsSignOutOpen(true)}
              >
                {labels.signOut}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {isSignOutOpen ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border bg-background p-6 text-center shadow-2xl">
            <h2 className="text-2xl font-bold">{labels.signOut}</h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {labels.signOutConfirm}
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSignOutOpen(false)}
              >
                {labels.cancel}
              </Button>

              <form action={signOutAction}>
                <Button type="submit">{labels.signOut}</Button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
