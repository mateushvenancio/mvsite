const clientId: string = process.env.SPOTIFY_PUBLIC_KEY!;
const clientSecret: string = process.env.SPOTIFY_PRIVATE_KEY!; // rotated, since I commited it by mistake
const refreshToken: string = process.env.SPOTIFY_REFRESH_TOKEN!;

class SpotifyService {
    constructor() {}

    private async getToken(): Promise<string> {
        const base64 = Buffer.from(clientId + ':' + clientSecret).toString(
            'base64'
        );

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${base64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: [
                'grant_type=refresh_token',
                'refresh_token=' + refreshToken,
            ].join('&'),
            cache: 'no-store',
        });
        const json = await response.json();

        return json.access_token;
    }

    async getArtists(): Promise<SpotifyArtist[]> {
        const token = await this.getToken();

        const response = await fetch(
            'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=48',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const json = await response.json();

        console.log('RESULT', json);

        return json.items.map((e) => this.convertArtist(e));
    }

    async getTracks(): Promise<SpotifySong[]> {
        const token = await this.getToken();

        const response = await fetch(
            'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const json = await response.json();

        return json.items.map((e) => this.convertTrack(e));
    }

    async getCurrentPlaying(): Promise<SpotifySong | null> {
        const token = await this.getToken();

        const response = await fetch(
            'https://api.spotify.com/v1/me/player/currently-playing',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status !== 200) {
            return null;
        }

        const json = await response.json();

        return this.convertTrack(json.item);
    }

    private convertTrack(track): SpotifySong {
        return {
            id: track.id,
            name: track.name,
            duration: track.duration_ms,
            artists: track.artists.map((e) => {
                return {
                    name: e.name,
                    url: e.href,
                };
            }),
            album: {
                id: track.album.id,
                name: track.album.name,
                images: track.album.images.map((e) => {
                    return e.url;
                }),
                url: track.album.href,
            },
            url: track.href,
        };
    }

    private convertArtist(artist): SpotifyArtist {
        return {
            id: artist.id,
            name: artist.name,
            genres: artist.genres,
            images: artist.images.map((e) => e.url),
            url: artist.href,
        };
    }
}

const Spotify = new SpotifyService();

export default Spotify;
