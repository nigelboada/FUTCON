'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type ProfileCompletenessBannerProps = {
  userId: string
  percentage: number
  label: string
  description: string
  closeLabel: string
}

const cookieName = 'futcon-completeness-dismissed'

export function ProfileCompletenessBanner({
  userId,
  percentage,
  label,
  description,
  closeLabel,
}: ProfileCompletenessBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  function closeBanner() {
    document.cookie = `${cookieName}=${userId}; path=/; SameSite=Lax`
    setIsVisible(false)
  }

  if (!isVisible || percentage >= 100) {
    return null
  }

  return (
    <div className="sticky top-16 z-40 flex justify-center px-4 py-2">
      <div className="w-full max-w-[20cm] rounded-full border bg-background/95 px-4 py-2 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-sm font-medium">
                {label}: {percentage}%
              </p>

              <button
                type="button"
                onClick={closeBanner}
                className="text-muted-foreground/40 transition hover:text-muted-foreground"
                aria-label={closeLabel}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}