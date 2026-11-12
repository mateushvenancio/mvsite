// Generates a new SPOTIFY_REFRESH_TOKEN.
//
// 1. In the Spotify Developer Dashboard, add this Redirect URI to the app:
//    http://127.0.0.1:8888/callback
// 2. Run: node --env-file=.env scripts/spotify-token.mjs
// 3. Open the printed link, authorize, and copy the token into .env

import { createServer } from 'node:http';

const clientId = process.env.SPOTIFY_PUBLIC_KEY;
const clientSecret = process.env.SPOTIFY_PRIVATE_KEY;
const redirectUri = 'http://127.0.0.1:8888/callback';
const scopes = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-top-read',
];

if (!clientId || !clientSecret) {
    console.error('SPOTIFY_PUBLIC_KEY e SPOTIFY_PRIVATE_KEY precisam estar no .env');
    process.exit(1);
}

const authorizeUrl =
    'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: scopes.join(' '),
    });

const server = createServer(async (req, res) => {
    const url = new URL(req.url, redirectUri);
    if (url.pathname !== '/callback') return res.end();

    const code = url.searchParams.get('code');
    if (!code) {
        res.end(`Erro: ${url.searchParams.get('error')}`);
        return;
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
        }),
    });
    const json = await response.json();

    if (!json.refresh_token) {
        console.error('Falha ao trocar o código:', json);
        res.end('Falha, veja o terminal.');
    } else {
        console.log(`\nSPOTIFY_REFRESH_TOKEN=${json.refresh_token}\n`);
        res.end('Pronto! O token foi impresso no terminal, pode fechar esta aba.');
    }
    server.close();
});

server.listen(8888, '127.0.0.1', () => {
    console.log('Abra este link no navegador e autorize:\n');
    console.log(authorizeUrl + '\n');
});
