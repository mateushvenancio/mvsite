import Image from 'next/image';
import SpotifyService from '@/services/spotify-service';
import Link from 'next/link';
import { MillisecondsConvert } from '@/util/date-convert';

export default async function Music() {
    const [current, tracks, artists] = await Promise.all([
        SpotifyService.getCurrentPlaying(),
        SpotifyService.getTracks(),
        SpotifyService.getArtists(),
    ]);

    return (
        <div>
            <p className="text-lg">What I&apos;m listening right now:</p>
            <ListeningNow song={current} />
            <hr className="my-2" />
            <p className="text-lg pb-2">
                The songs I listened the most in the last month
            </p>
            <div className="flex flex-col gap-2">
                {tracks.map((e, i) => {
                    return <SongTile key={i} song={e} index={i + 1} />;
                })}
            </div>
            <hr className="my-2" />
            <p className="text-lg pb-2">My favorites artists of all time!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {artists.map((e, i) => {
                    return <ArtistTile key={i} artist={e} index={i + 1} />;
                })}
            </div>
        </div>
    );
}

function ListeningNow({ song }: { song: SpotifySong | null }) {
    return (
        <div className="flex gap-2 items-center cursor-default">
            <Image
                src={song?.album.images.at(0) ?? '/spotify_icon.png'}
                alt="Cover"
                height={75}
                width={75}
                className="mt-2"
            />
            <div>
                <div className="text-lg font-semibold">
                    {song ? (
                        <Link href={song.url}>{song.name}</Link>
                    ) : (
                        'Nothing playing right now'
                    )}
                </div>
                <div className="text-sm">
                    {!song
                        ? 'Check it later!'
                        : song.artists.map((e, i) => {
                              return (
                                  <Link key={i} href={e.url} target="_blank">
                                      {e.name}
                                  </Link>
                              );
                          })}
                </div>
            </div>
        </div>
    );
}

function SongTile({ song, index }: { song: SpotifySong; index: number }) {
    return (
        <div className="flex gap-2 items-center cursor-default">
            <p className="w-8 text-center">{index}</p>
            <Image
                src={song.album.images.at(0) ?? '/spotify_icon.png'}
                alt="Cover"
                height={55}
                width={55}
            />
            <div className="grow">
                <Link href={song.url} target="_blank">
                    <div className="font-semibold hover:underline">
                        {song.name}
                    </div>
                </Link>
                <div className="text-sm">
                    <Artists artists={song.artists} />
                </div>
            </div>
            <p>{MillisecondsConvert(song.duration)}</p>
        </div>
    );
}

function ArtistTile({
    artist,
    index,
}: {
    artist: SpotifyArtist;
    index: number;
}) {
    return (
        <Link
            target="_blank"
            href={artist.url}
            className="rounded-full bg-primary text-white px-1 py-1 flex items-center gap-2"
        >
            <Image
                src={artist.images.at(0) ?? '/spotify_icon.png'}
                alt="Cover"
                height={40}
                width={40}
                className="rounded-full aspect-square object-cover"
            />
            <span className="truncate">{artist.name}</span>
        </Link>
    );
}

function Artists({
    artists,
}: {
    artists: {
        name: string;
        url: string;
    }[];
}) {
    return (
        <div className="flex flex-wrap">
            {artists.map((e, i, array) => {
                return (
                    <>
                        <Link
                            target="_blank"
                            key={i}
                            href={e.url}
                            className={'hover:underline'}
                        >
                            {e.name}
                        </Link>
                        {i < array.length - 1 && <span>,&nbsp;</span>}
                    </>
                );
            })}
        </div>
    );
}
