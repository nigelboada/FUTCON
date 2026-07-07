'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CenteredConfirmDialog } from '@/components/layout/centered-confirm-dialog'

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
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        {labels.trigger}
      </Button>

      <CenteredConfirmDialog
        open={isOpen}
        title={labels.title}
        description={labels.description}
        cancelLabel={labels.cancel}
        confirmLabel={labels.confirm}
        confirmAction={action}
        variant="destructive"
        icon={<Trash2 className="h-7 w-7 text-destructive" />}
        onCancel={() => setIsOpen(false)}
      />
    </>
  )
}
