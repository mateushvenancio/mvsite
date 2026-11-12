const clientId = process.env.SPOTIFY_PUBLIC_KEY;
const clientSecret = process.env.SPOTIFY_PRIVATE_KEY;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

export type Track = {
    id: string;
    name: string;
    artists: string;
    album: string;
    image: string | null;
    url: string;
    duration: number;
};

export type NowPlaying = {
    track: Track;
    isPlaying: boolean;
    progress: number;
    /** ISO date of when it was last played, if not playing right now */
    playedAt: string | null;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getToken(): Promise<string | null> {
    if (!clientId || !clientSecret || !refreshToken) {
        console.error('[spotify] variáveis SPOTIFY_* ausentes no .env');
        return null;
    }
    if (cachedToken && cachedToken.expiresAt > Date.now()) {
        return cachedToken.value;
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
        cache: 'no-store',
    });

    const json = await response.json();
    if (!response.ok || !json.access_token) {
        console.error('[spotify] falha ao renovar o token:', response.status, json);
        return null;
    }

    // keep a one minute margin before the real expiration
    const expiresIn = ((json.expires_in ?? 3600) - 60) * 1000;
    cachedToken = {
        value: json.access_token,
        expiresAt: Date.now() + expiresIn,
    };
    return cachedToken.value;
}

async function api(token: string, path: string) {
    const response = await fetch(`https://api.spotify.com/v1${path}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
    });
    // 204 = nothing playing right now, not an error
    if (response.status !== 200) {
        if (response.status !== 204) {
            console.error(`[spotify] ${path} respondeu ${response.status}:`, await response.text());
        }
        return null;
    }
    return response.json();
}

function convertTrack(track: any): Track {
    return {
        id: track.id,
        name: track.name,
        artists: track.artists.map((a: any) => a.name).join(', '),
        album: track.album.name,
        // images come sorted from largest to smallest; pick a medium one
        image:
            track.album.images.at(1)?.url ??
            track.album.images.at(0)?.url ??
            null,
        url: track.external_urls.spotify,
        duration: track.duration_ms,
    };
}

async function getNowPlaying(token: string): Promise<NowPlaying | null> {
    const current = await api(token, '/me/player/currently-playing');
    if (current?.item?.id && current.item.type === 'track') {
        return {
            track: convertTrack(current.item),
            isPlaying: current.is_playing,
            progress: current.progress_ms ?? 0,
            playedAt: null,
        };
    }

    // nothing playing: fall back to the last played track
    // (requires the user-read-recently-played scope)
    const recent = await api(token, '/me/player/recently-played?limit=1');
    const last = recent?.items?.at(0);
    if (!last) return null;

    return {
        track: convertTrack(last.track),
        isPlaying: false,
        progress: 0,
        playedAt: last.played_at,
    };
}

async function getTopTracks(token: string): Promise<Track[]> {
    const json = await api(
        token,
        '/me/top/tracks?time_range=short_term&limit=6',
    );
    return json?.items?.map(convertTrack) ?? [];
}

export async function getMusic(): Promise<{
    nowPlaying: NowPlaying | null;
    topTracks: Track[];
}> {
    try {
        const token = await getToken();
        if (!token) return { nowPlaying: null, topTracks: [] };

        const [nowPlaying, topTracks] = await Promise.all([
            getNowPlaying(token),
            getTopTracks(token),
        ]);
        return { nowPlaying, topTracks };
    } catch (e) {
        console.error('[spotify] erro inesperado:', e);
        return { nowPlaying: null, topTracks: [] };
    }
}
