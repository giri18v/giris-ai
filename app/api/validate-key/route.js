import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request) {
  console.log('API route called')
  
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  console.log('Received key:', key)

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase configuration is missing')
    return NextResponse.json({ error: 'Supabase configuration is missing' }, { status: 500 })
  }

  try {
    console.log('Initializing Supabase client')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    console.log('Querying Supabase')
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', key)
      .single()

    console.log('Supabase response:', { data: data ? 'exists' : 'not found', error })

    if (error) {
      if (error.code === 'PGRST116') {
        // This error code means no rows were returned
        return NextResponse.json({ valid: false, message: 'Invalid API Key' })
      }
      throw error
    }

    if (data) {
      return NextResponse.json({ valid: true, message: 'Valid API Key' })
    } else {
      return NextResponse.json({ valid: false, message: 'Invalid API Key' })
    }
  } catch (error) {
    console.error('Error details:', error)
    return NextResponse.json({ error: 'Error validating API Key', details: error.message }, { status: 500 })
  }
}
