'use client'

import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'

type CenteredConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  cancelLabel: string
  confirmLabel: string
  variant?: 'default' | 'destructive'
  icon?: ReactNode
  onCancel: () => void
  confirmAction: (formData: FormData) => void | Promise<void>
  hiddenFields?: Record<string, string>
}

export function CenteredConfirmDialog({
  open,
  title,
  description,
  cancelLabel,
  confirmLabel,
  variant = 'default',
  icon,
  onCancel,
  confirmAction,
  hiddenFields,
}: CenteredConfirmDialogProps) {
  const portalRoot = typeof document === 'undefined' ? null : document.body

  if (!portalRoot || !open) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border bg-background p-6 text-center shadow-2xl">
        {icon ? (
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-foreground">
            {icon}
          </div>
        ) : null}

        <h2
          className={`text-2xl font-bold ${
            variant === 'destructive' ? 'text-destructive' : ''
          }`}
        >
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>

          <form action={confirmAction}>
            {hiddenFields
              ? Object.entries(hiddenFields).map(([name, value]) => (
                  <input key={name} type="hidden" name={name} value={value} />
                ))
              : null}

            <Button
              type="submit"
              variant={variant === 'destructive' ? 'destructive' : 'default'}
            >
              {confirmLabel}
            </Button>
          </form>
        </div>
      </div>
    </div>,
    portalRoot
  )
}
