'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Message = {
  id: string
  conversation_id: string
  sender_profile_id: string
  content: string
  created_at: string
}

type ConversationMessagesProps = {
  conversationId: string
  currentProfileId: string
  initialMessages: Message[]
  hiddenAt: string | null
  localeTag: string
  labels: {
    emptyThread: string
  }
}

function formatDate(value: string, localeTag: string) {
  return new Intl.DateTimeFormat(localeTag, {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(value))
}

export function ConversationMessages({
  conversationId,
  currentProfileId,
  initialMessages,
  hiddenAt,
  localeTag,
  labels,
}: ConversationMessagesProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [messages])

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const incomingMessage = payload.new as Message

          setMessages((currentMessages) => {
            const alreadyExists = currentMessages.some(
              (message) => message.id === incomingMessage.id
            )

            if (alreadyExists) {
              return currentMessages
            }

            return [...currentMessages, incomingMessage]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId])

  if (messages.length === 0) {
    return (
      <div className="rounded-md border bg-background p-6 text-center text-sm text-muted-foreground">
        {labels.emptyThread}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => {
        const isOwnMessage = message.sender_profile_id === currentProfileId
        const isBeforeHidden =
          hiddenAt !== null &&
          new Date(message.created_at).getTime() <= new Date(hiddenAt).getTime()

        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg border px-4 py-3 ${
                isBeforeHidden
                  ? 'bg-muted text-muted-foreground opacity-60'
                  : isOwnMessage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background'
              }`}
            >
              <p className="whitespace-pre-line text-sm">{message.content}</p>
              <p
                className={`mt-2 text-xs ${
                  isOwnMessage
                    ? 'text-primary-foreground/70'
                    : 'text-muted-foreground'
                }`}
              >
                {formatDate(message.created_at, localeTag)}
              </p>
            </div>
          </div>
        )
      })}

      <div ref={messagesEndRef} />
    </div>
  )
}
