'use client'

import { useRef, type KeyboardEvent } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

type MessageComposerProps = {
  conversationId: string
  action: (formData: FormData) => void | Promise<void>
  placeholder: string
  submitLabel: string
  sendingLabel: string
  shortcutLabel?: string
}

function SubmitButton({
  label,
  sendingLabel,
}: {
  label: string
  sendingLabel: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {sendingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  )
}

export function MessageComposer({
  conversationId,
  action,
  placeholder,
  submitLabel,
  sendingLabel,
  shortcutLabel,
}: MessageComposerProps) {
  const formRef = useRef<HTMLFormElement | null>(null)

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  return (
    <form
      ref={formRef}
      action={action}
      data-no-loading="true"
      className="space-y-3 border-t pt-4"
    >
      <input type="hidden" name="conversationId" value={conversationId} />

      <Textarea
        name="content"
        placeholder={placeholder}
        rows={4}
        required
        onKeyDown={handleKeyDown}
      />

      {shortcutLabel ? (
        <p className="text-xs text-muted-foreground">{shortcutLabel}</p>
      ) : null}

      <SubmitButton label={submitLabel} sendingLabel={sendingLabel} />
    </form>
  )
}
