import { SpotifyTrack } from '@/types';

function SpotifyBars() {
    return (
        <span className="inline-flex items-end gap-[2px] h-3" aria-hidden>
            {[1, 2, 3].map((i) => (
                <span
                    key={i}
                    className="bar block w-[2px] bg-[#1DB954]"
                    style={{ height: '100%', borderRadius: '1px' }}
                />
            ))}
        </span>
    );
}

interface Props {
    tracks: SpotifyTrack[];
}

export function SpotifySection({ tracks }: Props) {
    return (
        <section id="musicas" className="relative z-10 py-8">
            <div className="max-w-4xl mx-auto px-6">
                {/* Section header */}
                <div className="mb-4">
                    <p
                        className="font-mono text-xs tracking-[0.2em] text-[var(--cosmos-gold)] uppercase mb-3"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        ✦ frequências favoritas
                    </p>
                    <h2
                        className="font-display text-3xl text-[var(--cosmos-ink)] mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Top Músicas
                    </h2>
                    <div className="gold-line" />
                </div>

                {/* Tracks list */}
                <div
                    className="divide-y"
                    style={{ borderColor: 'var(--cosmos-border)' }}
                >
                    {tracks.map((track, idx) => (
                        <a
                            key={track.rank}
                            href={track.spotifyUrl ?? '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 py-4 group hover:bg-[var(--cosmos-dust)] -mx-4 px-4 rounded transition-colors"
                        >
                            {/* Rank */}
                            <span
                                className="font-mono text-xs text-[var(--cosmos-muted)] w-5 text-right flex-shrink-0"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                {String(track.rank).padStart(2, '0')}
                            </span>

                            {/* Playing indicator on hover */}
                            <span className="w-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <SpotifyBars />
                            </span>

                            {/* Track info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[var(--cosmos-ink)] truncate">
                                    {track.title}
                                </p>
                                <p className="text-xs text-[var(--cosmos-muted)] truncate mt-0.5">
                                    {track.artist}
                                    {track.album && ` · ${track.album}`}
                                </p>
                            </div>

                            {/* Spotify icon */}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="#1DB954"
                                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                            </svg>
                        </a>
                    ))}
                </div>

                {/* Footer note */}
                <p
                    className="mt-6 font-mono text-xs text-[var(--cosmos-muted)] opacity-60"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    via Spotify
                </p>
            </div>
        </section>
    );
}

export default SpotifySection;
