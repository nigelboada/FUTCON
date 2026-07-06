'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function hideConversation(formData: FormData) {
  const supabase = await createClient()
  const conversationId = getStringValue(formData, 'conversationId')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !conversationId) {
    redirect('/conversations?error=invalid_request')
  }

  const hiddenAt = new Date().toISOString()

  const { error } = await supabase
    .from('conversation_participants')
    .update({
      hidden_at: hiddenAt,
      last_hidden_at: hiddenAt,
      marked_unread: false,
    })
    .eq('conversation_id', conversationId)
    .eq('profile_id', user.id)

  if (error) {
    redirect(`/conversations?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/conversations')
  redirect('/conversations?message=conversation_hidden')
}

export async function markConversationAsRead(formData: FormData) {
  const supabase = await createClient()
  const conversationId = getStringValue(formData, 'conversationId')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !conversationId) {
    redirect('/conversations?error=invalid_request')
  }

  const { error: messagesError } = await supabase
    .from('messages')
    .update({
      read_at: new Date().toISOString(),
    })
    .eq('conversation_id', conversationId)
    .neq('sender_profile_id', user.id)
    .is('read_at', null)

  if (messagesError) {
    redirect(`/conversations?error=${encodeURIComponent(messagesError.message)}`)
  }

  const { error: participantError } = await supabase
    .from('conversation_participants')
    .update({
      marked_unread: false,
    })
    .eq('conversation_id', conversationId)
    .eq('profile_id', user.id)

  if (participantError) {
    redirect(`/conversations?error=${encodeURIComponent(participantError.message)}`)
  }

  revalidatePath('/conversations')
  redirect('/conversations?message=conversation_marked_read')
}

export async function markConversationAsUnread(formData: FormData) {
  const supabase = await createClient()
  const conversationId = getStringValue(formData, 'conversationId')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !conversationId) {
    redirect('/conversations?error=invalid_request')
  }

  const { error } = await supabase
    .from('conversation_participants')
    .update({
      marked_unread: true,
    })
    .eq('conversation_id', conversationId)
    .eq('profile_id', user.id)

  if (error) {
    redirect(`/conversations?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/conversations')
  redirect('/conversations?message=conversation_marked_unread')
}
