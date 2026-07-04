'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function markWarningAsRead(formData: FormData) {
  const supabase = await createClient()

  const warningId = formData.get('warningId')

  if (typeof warningId !== 'string') {
    return
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return
  }

  await supabase
    .from('admin_warnings')
    .update({
      read_at: new Date().toISOString(),
    })
    .eq('id', warningId)
    .eq('profile_id', user.id)

  revalidatePath('/conversations')
}