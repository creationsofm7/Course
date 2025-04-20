import { NextRequest, NextResponse } from 'next/server';
import { generate } from '@/app/actions/actions';

export const runtime = 'nodejs'; // Use nodejs runtime for longer timeouts

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  try {
    const { object } = await generate(prompt);
    return NextResponse.json({ object });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate course' }, { status: 500 });
  }
}