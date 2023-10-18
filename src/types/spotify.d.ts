type SpotifyArtist = {
    id: string;
    name: string;
    images: string[];
    genres: string[];
    url: string;
};

type SpotifySong = {
    id: string;
    name: string;
    duration: number;
    album: {
        id: string;
        name: string;
        images: string[];
        url: string;
    };
    artists: {
        name: string;
        url: string;
    }[];
    url: string;
};
