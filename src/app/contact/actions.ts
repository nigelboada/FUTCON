'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function submitContactMessage(formData: FormData) {
  const supabase = await createClient()

  const name = getStringValue(formData, 'name')
  const email = getStringValue(formData, 'email')
  const subject = getStringValue(formData, 'subject')
  const message = getStringValue(formData, 'message')

  if (!name || !email || !message) {
    redirect('/contact?error=contact_required_fields')
  }

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    subject: subject || null,
    message,
  })

  if (error) {
    redirect(`/contact?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/contact?message=contact_sent')
}