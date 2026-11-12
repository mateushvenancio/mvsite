'use client';

import { CSSProperties, useCallback, useEffect, useState } from 'react';
import type { NowPlaying, Track } from '@/lib/spotify';

type MusicData = { nowPlaying: NowPlaying | null; topTracks: Track[] };

const POLL_INTERVAL = 30_000;

export default function Music({ initial }: { initial: MusicData }) {
    const [music, setMusic] = useState(initial);

    const refresh = useCallback(async () => {
        try {
            const response = await fetch('/api/music', { cache: 'no-store' });
            if (response.ok) setMusic(await response.json());
        } catch {
            // keep showing what we already have
        }
    }, []);

    useEffect(() => {
        const id = setInterval(refresh, POLL_INTERVAL);
        return () => clearInterval(id);
    }, [refresh]);

    const { nowPlaying, topTracks } = music;

    return (
        <section className="music reveal" style={{ ['--d' as string]: '200ms' }} aria-label="Música">
            <span className="label">{'// ouvindo'}</span>
            <NowPlayingCard nowPlaying={nowPlaying} onTrackEnd={refresh} />

            <span className="label">{'// top 6 · últimas 4 semanas'}</span>
            {topTracks.length > 0 ? (
                <ol className="catalog">
                    {topTracks.map((track, i) => (
                        <li key={track.id}>
                            <a
                                href={track.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="track"
                            >
                                <span className="track-cover" style={cover(track.image)} aria-hidden="true">
                                    <span className="track-rank">{i + 1}</span>
                                </span>
                                <span className="track-text">
                                    <b>{track.name}</b>
                                    <small>{track.artists}</small>
                                </span>
                            </a>
                        </li>
                    ))}
                </ol>
            ) : (
                <p className="catalog-empty">{'> sem sinal do Spotify no momento.'}</p>
            )}
        </section>
    );
}

function NowPlayingCard({
    nowPlaying,
    onTrackEnd,
}: {
    nowPlaying: NowPlaying | null;
    onTrackEnd: () => void;
}) {
    const [now, setNow] = useState<number | null>(null);
    const [receivedAt, setReceivedAt] = useState(() => Date.now());

    useEffect(() => {
        setReceivedAt(Date.now());
    }, [nowPlaying]);

    useEffect(() => {
        setNow(Date.now());
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const track = nowPlaying?.track;
    const elapsed =
        nowPlaying && now !== null
            ? Math.min(
                  track!.duration,
                  nowPlaying.progress + (nowPlaying.isPlaying ? Math.max(0, now - receivedAt) : 0)
              )
            : nowPlaying?.progress ?? 0;

    const ended = !!nowPlaying?.isPlaying && !!track && elapsed >= track.duration;
    useEffect(() => {
        if (ended) onTrackEnd();
    }, [ended, onTrackEnd]);

    if (!nowPlaying || !track) {
        return (
            <div className="now">
                <span className="now-cover is-empty" aria-hidden="true" />
                <div className="now-info">
                    <span className="now-status">
                        <i className="now-dot" /> em silêncio
                    </span>
                    <p className="now-title">Nenhuma música no momento</p>
                </div>
            </div>
        );
    }

    const status = nowPlaying.isPlaying
        ? 'tocando agora'
        : nowPlaying.playedAt
          ? `ouvi ${relative(nowPlaying.playedAt, now)}`
          : 'pausado';

    return (
        <div className={`now ${nowPlaying.isPlaying ? 'is-playing' : ''}`}>
            <a
                className="now-cover"
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                style={cover(track.image)}
                aria-label={`${track.name} — ${track.artists}`}
            />
            <div className="now-info">
                <span className="now-status">
                    {nowPlaying.isPlaying ? (
                        <span className="eq" aria-hidden="true">
                            <i />
                            <i />
                            <i />
                            <i />
                        </span>
                    ) : (
                        <i className="now-dot" />
                    )}
                    {status}
                </span>
                <a className="now-title" href={track.url} target="_blank" rel="noopener noreferrer">
                    {track.name}
                </a>
                <span className="now-artist">
                    {track.artists} · <em>{track.album}</em>
                </span>
                {!nowPlaying.playedAt && (
                    <span className="now-progress">
                        <span>{clock(elapsed)}</span>
                        <span className="now-bar">
                            <span style={{ width: `${(elapsed / track.duration) * 100}%` }} />
                        </span>
                        <span>{clock(track.duration)}</span>
                    </span>
                )}
            </div>
        </div>
    );
}

function cover(image: string | null): CSSProperties | undefined {
    return image ? { backgroundImage: `url("${image}")` } : undefined;
}

function clock(ms: number) {
    const total = Math.floor(ms / 1000);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function relative(iso: string, now: number | null) {
    if (now === null) return 'há pouco';
    const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
    const seconds = Math.round((new Date(iso).getTime() - now) / 1000);
    const units: [Intl.RelativeTimeFormatUnit, number][] = [
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
    ];
    for (const [unit, size] of units) {
        if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
    }
    return 'agora há pouco';
}
