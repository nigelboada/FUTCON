import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    nodeEnv: process.env.NODE_ENV,
    vercelUrl: process.env.VERCEL_URL ?? null,
    nextPublicVercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL ?? null,
  })
}