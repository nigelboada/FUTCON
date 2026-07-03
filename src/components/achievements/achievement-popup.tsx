'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

type AchievementPopupProps = {
  title: string
  description: string
  icon: string
}

export function AchievementPopup({
  title,
  description,
  icon,
}: AchievementPopupProps) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    document.cookie =
      'futcon_achievement_popup=; Max-Age=0; path=/; SameSite=Lax'
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/45 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border bg-background p-8 text-center shadow-2xl">
        <div className="pointer-events-none absolute left-0 top-0 h-28 w-28 bg-yellow-300/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 bg-cyan-300/20 blur-3xl" />

        <div className="pointer-events-none absolute left-6 top-4 text-2xl">🎉</div>
        <div className="pointer-events-none absolute right-6 top-4 text-2xl">🎉</div>

        <div className="mx-auto mb-5 flex h-28 w-28 animate-[pulse_1.6s_ease-in-out_infinite] items-center justify-center rounded-full border-4 border-emerald-200 bg-emerald-50 text-5xl shadow-lg">
          <span>{icon}</span>
        </div>

        <div className="mx-auto max-w-xs">
          <h2 className="text-2xl font-extrabold tracking-wide text-green-600 [text-shadow:0_1px_0_white]">
            Felicitats, has desbloquejat un nou assoliment!
          </h2>

          <p className="mt-4 text-lg font-semibold">{title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="mt-8">
          <Button onClick={() => setIsOpen(false)} size="lg">
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
