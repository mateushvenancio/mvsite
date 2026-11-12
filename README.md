# Mateus Venâncio Site

## .env variables

##### SPOTIFY_PUBLIC_KEY / SPOTIFY_PRIVATE_KEY

-   Client ID and Client Secret from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

##### SPOTIFY_REFRESH_TOKEN

-   Refresh token generated with the scopes `user-read-currently-playing`, `user-top-read` and `user-read-recently-played`
-   Without `user-read-recently-played` the site still works, but shows nothing when no song is playing
