import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET (): Promise<NextResponse> {
  try {
    const { rows } = await sql`SELECT * from member`
    return NextResponse.json({ rows }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
