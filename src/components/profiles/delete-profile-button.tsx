'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type DeleteProfileButtonProps = {
  action: () => void | Promise<void>
  labels: {
    trigger: string
    title: string
    description: string
    cancel: string
    confirm: string
  }
}

export function DeleteProfileButton({
  action,
  labels,
}: DeleteProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            setIsOpen(true)
            window.scrollTo({
              top: window.scrollY,
              behavior: 'smooth',
            })
          }}
        >
          {labels.trigger}
        </Button>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border bg-background p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-destructive">
              {labels.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {labels.description}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                {labels.cancel}
              </Button>

              <form action={action}>
                <Button type="submit" variant="destructive">
                  {labels.confirm}
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
