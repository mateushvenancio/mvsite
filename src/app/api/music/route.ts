import { NextResponse } from 'next/server';
import { getMusic } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json(await getMusic());
}
