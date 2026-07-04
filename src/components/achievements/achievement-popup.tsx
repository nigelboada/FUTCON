'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { markAchievementSeen } from '@/app/achievements/actions'

type AchievementPopupProps = {
  userAchievementId: number
  title: string
  description: string
  icon: string
}

export function AchievementPopup({
  userAchievementId,
  title,
  description,
  icon,
}: AchievementPopupProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [isClosing, setIsClosing] = useState(false)

  async function handleContinue() {
    setIsClosing(true)
    await markAchievementSeen(userAchievementId)
    setIsOpen(false)
    router.refresh()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border bg-background p-8 text-center shadow-2xl">
        <div className="pointer-events-none absolute left-0 top-0 h-32 w-32 bg-yellow-300/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 bg-cyan-300/25 blur-3xl" />

        <div className="pointer-events-none absolute left-6 top-4 text-3xl">
          🎉
        </div>
        <div className="pointer-events-none absolute right-6 top-4 text-3xl">
          🎉
        </div>

        <div className="mx-auto mb-5 flex h-28 w-28 animate-[futcon-achievement-pop_1.2s_ease-in-out] items-center justify-center rounded-full border-4 border-emerald-200 bg-emerald-50 text-5xl shadow-lg">
          <span>{icon}</span>
        </div>

        <h2 className="mx-auto max-w-xs text-2xl font-extrabold tracking-wide text-green-600 [text-shadow:0_1px_0_white]">
          Felicitats, has desbloquejat un nou assoliment!
        </h2>

        <p className="mt-5 text-lg font-semibold">{title}</p>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>

        <div className="mt-8">
          <Button onClick={handleContinue} disabled={isClosing} size="lg">
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
