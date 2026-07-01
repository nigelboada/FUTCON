'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

export async function startConversation(formData: FormData) {
  const supabase = await createClient()

  const targetProfileId = getStringValue(formData, 'targetProfileId')

  if (!targetProfileId) {
    redirect('/search')
  }

  const { data, error } = await supabase.rpc('create_or_get_conversation', {
    target_profile_id: targetProfileId,
  })

  if (error || !data) {
    redirect(`/profile/${targetProfileId}?error=${encodeURIComponent(error?.message ?? 'conversation_create_failed')}`)
  }

  revalidatePath('/conversations')
  redirect(`/conversations/${data}`)
}

export async function sendMessage(formData: FormData) {
  const supabase = await createClient()

  const conversationId = getStringValue(formData, 'conversationId')
  const content = getStringValue(formData, 'content')

  if (!conversationId) {
    redirect('/conversations')
  }

  if (!content) {
    redirect(`/conversations/${conversationId}?error=empty_message`)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase.from('messages').insert({
    conversation_id: conversationId,
    sender_profile_id: user.id,
    content,
  })

  if (error) {
    redirect(`/conversations/${conversationId}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/conversations')
  revalidatePath(`/conversations/${conversationId}`)

  redirect(`/conversations/${conversationId}`)
}
