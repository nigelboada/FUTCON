'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
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
        className="transition hover:-translate-y-0.5 hover:shadow-sm"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        {labels.trigger}
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border bg-background p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <Trash2 className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-destructive">
              {labels.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {labels.description}
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
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
