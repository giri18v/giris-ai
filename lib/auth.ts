import { getServerSession } from 'next-auth'
import { supabase } from './supabaseClient'
import { authOptions } from '@/app/api/auth/[...nextauth]/config'  // Updated import

export async function getUserFromSession() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return null
  }

  const { data: userData } = await supabase
    .from('users')
    .select('id')
    .eq('email', session.user.email)
    .single()

  return userData
}
