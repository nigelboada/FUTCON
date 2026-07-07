'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CenteredConfirmDialog } from '@/components/layout/centered-confirm-dialog'

type DeleteConversationButtonProps = {
  conversationId: string
  action: (formData: FormData) => void | Promise<void>
  labels: {
    trigger: string
    title: string
    description: string
    cancel: string
    confirm: string
  }
}

export function DeleteConversationButton({
  conversationId,
  action,
  labels,
}: DeleteConversationButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="w-full text-destructive hover:bg-destructive/10 lg:w-40"
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
        hiddenFields={{ conversationId }}
        icon={<Trash2 className="h-7 w-7" />}
        onCancel={() => setIsOpen(false)}
      />
    </>
  )
}
