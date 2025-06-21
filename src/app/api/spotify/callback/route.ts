// /app/api/spotify/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'Authorization code missing' }, { status: 400 });
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!);

    const authHeader = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });

    const data = await response.json();

    if (data.access_token) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/spotify-success?access_token=${data.access_token}`);
    }

    return NextResponse.json({ error: 'Token exchange failed', details: data }, { status: 400 });
}
