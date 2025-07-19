import Image from 'next/image';
import SpotifyService from '@/services/spotify-service';
import Link from 'next/link';
import { faSpotify } from '@fortawesome/free-brands-svg-icons/faSpotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MillisecondsConvert } from '@/util/date-convert';

export default async function Music() {
    const [current, tracks] = await Promise.all([
        SpotifyService.getCurrentPlaying(),
        SpotifyService.getTracks(),
    ]);

    return (
        <div>
            <ListeningNow song={current} />
            <div className="h-4" />
            <div className="flex flex-col gap-2">
                {tracks.map((e, i) => {
                    return <SongTile key={i} song={e} index={i + 1} />;
                })}
            </div>
        </div>
    );
}

function ListeningNow({ song }: { song: SpotifySong | null }) {
    if (!song) return null;

    return (
        <div className="card bg-indigo-50 p-6 border border-indigo-200 !scale-100">
            <h3 className="text-lg font-semibold text-indigo-800 mb-4">
                OUVINDO AGORA
            </h3>
            <div className="flex items-center">
                <Image
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-lg object-cover shadow-md"
                    src={song?.album.images.at(0) ?? '/spotify_icon.png'}
                    alt="Current Album Art"
                />
                <div className="ml-6">
                    <p className="font-bold text-2xl text-gray-800">
                        {song?.name}
                    </p>
                    <p className="text-lg text-gray-600">
                        {!song
                            ? ''
                            : song.artists.map((e, i) => {
                                  return e.name;
                              })}
                    </p>
                    <div className="inline-flex items-center mt-2 text-green-600 hover:text-green-800 transition-colors duration-300 font-semibold">
                        <FontAwesomeIcon
                            fill="currentColor"
                            icon={faSpotify}
                            className="w-8 h-8"
                            size="xl"
                            aria-hidden="true"
                        />
                        <Link href={song?.url ?? '#'} target="_blank">
                            Ouvir no Spotify
                        </Link>
                    </div>
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
                    <div className="font-semibold text-gray-800 hover:underline">
                        {song.name}
                    </div>
                </Link>
                <div className="text-sm text-gray-500">
                    <Artists artists={song.artists} />
                </div>
            </div>
            <p>{MillisecondsConvert(song.duration)}</p>
        </div>
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
