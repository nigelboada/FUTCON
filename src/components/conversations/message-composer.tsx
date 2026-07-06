'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

type MessageComposerProps = {
  conversationId: string
  action: (formData: FormData) => void | Promise<void>
  placeholder: string
  submitLabel: string
  shortcutLabel?: string
}

export function MessageComposer({
  conversationId,
  action,
  placeholder,
  submitLabel,
  shortcutLabel,
}: MessageComposerProps) {
  const formRef = useRef<HTMLFormElement | null>(null)

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
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

      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}
