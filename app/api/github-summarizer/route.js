import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { summarizeRepository } from '../../utils/langchainSummarizer'

async function validateApiKey(key) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase configuration is missing')
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key', key)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return false // Invalid API Key
    }
    throw error
  }

  return !!data // Valid API Key if data exists
}

async function fetchGitHubReadme(url) {
  const repoRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
  const match = url.match(repoRegex);
  
  if (!match) {
    throw new Error('Invalid GitHub URL');
  }
  
  const [, owner, repo] = match;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
  
  const response = await fetch(apiUrl, {
    headers: {
      'Accept': 'application/vnd.github.v3.raw',
      'User-Agent': 'GirisAI-App'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch README: ${response.statusText}`);
  }
  
  return await response.text();
}

export async function POST(request) {
  console.log('GitHub Summarizer API route called')

  const { githubUrl } = await request.json()
  const key = request.headers.get('x-api-key')

  console.log('Received key:', key)
  console.log('Received GitHub URL:', githubUrl)

  try {
    const isValidKey = await validateApiKey(key)

    if (!isValidKey) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 401 })
    }
    
    // Fetch README content
    const readmeContent = await fetchGitHubReadme(githubUrl);

    // Use the LangChain summarizer
    const summary = await summarizeRepository(readmeContent);

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error details:', error)
    return NextResponse.json({ error: 'Error processing request', details: error.message }, { status: 500 })
  }
}
