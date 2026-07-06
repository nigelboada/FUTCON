'use server'

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

  if (!user || !conversationId) return

  await supabase
    .from('conversation_participants')
    .update({
      hidden_at: new Date().toISOString(),
      marked_unread: false,
    })
    .eq('conversation_id', conversationId)
    .eq('profile_id', user.id)

  revalidatePath('/conversations')
}

export async function markConversationAsRead(formData: FormData) {
  const supabase = await createClient()

  const conversationId = getStringValue(formData, 'conversationId')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !conversationId) return

  await supabase
    .from('messages')
    .update({
      read_at: new Date().toISOString(),
    })
    .eq('conversation_id', conversationId)
    .neq('sender_profile_id', user.id)
    .is('read_at', null)

  await supabase
    .from('conversation_participants')
    .update({
      marked_unread: false,
    })
    .eq('conversation_id', conversationId)
    .eq('profile_id', user.id)

  revalidatePath('/conversations')
}

export async function markConversationAsUnread(formData: FormData) {
  const supabase = await createClient()

  const conversationId = getStringValue(formData, 'conversationId')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !conversationId) return

  await supabase
    .from('conversation_participants')
    .update({
      marked_unread: true,
    })
    .eq('conversation_id', conversationId)
    .eq('profile_id', user.id)

  revalidatePath('/conversations')
}