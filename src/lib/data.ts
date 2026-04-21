import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
    name: 'Mateus Venâncio',
    title: 'Desenvolvedor & Explorador',
    tagline: 'O universo é grande demais para ignorar.',
    bio: 'Apaixonado por tecnologia, espaço e música. Construo coisas na web e fico olhando para o céu nas horas vagas.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/38964103?v=4', // coloque sua foto em public/avatar.jpg
    location: 'Brasil',
    socialLinks: [
        {
            label: 'GitHub',
            href: 'https://github.com/seuusuario',
            icon: 'github',
        },
        {
            label: 'LinkedIn',
            href: 'https://linkedin.com/in/seuusuario',
            icon: 'linkedin',
        },
        {
            label: 'Email',
            href: 'mailto:seu@email.com',
            icon: 'email',
        },
    ],
    topTracks: [
        {
            rank: 1,
            title: 'Nome da Música',
            artist: 'Nome do Artista',
            spotifyUrl: '#',
        },
        {
            rank: 2,
            title: 'Nome da Música',
            artist: 'Nome do Artista',
            spotifyUrl: '#',
        },
        {
            rank: 3,
            title: 'Nome da Música',
            artist: 'Nome do Artista',
            spotifyUrl: '#',
        },
        {
            rank: 4,
            title: 'Nome da Música',
            artist: 'Nome do Artista',
            spotifyUrl: '#',
        },
        {
            rank: 5,
            title: 'Nome da Música',
            artist: 'Nome do Artista',
            spotifyUrl: '#',
        },
        {
            rank: 6,
            title: 'Nome da Música',
            artist: 'Nome do Artista',
            spotifyUrl: '#',
        },
        {
            rank: 7,
            title: 'Nome da Música',
            artist: 'Nome do Artista',
            spotifyUrl: '#',
        },
        {
            rank: 8,
            title: 'Nome da Música',
            artist: 'Nome do Artista',
            spotifyUrl: '#',
        },
        {
            rank: 9,
            title: 'Nome da Música',
            artist: 'Nome do Artista',
            spotifyUrl: '#',
        },
        {
            rank: 10,
            title: 'Nome da Música',
            artist: 'Nome do Artista',
            spotifyUrl: '#',
        },
    ],
    games: [
        {
            title: 'Nome do Jogo',
            genre: 'RPG',
            year: 2023,
            description: 'Uma breve descrição do porquê você ama este jogo.',
            status: 'completed',
            platform: 'PC',
            rating: 5,
        },
        {
            title: 'Nome do Jogo',
            genre: 'Strategy',
            year: 2022,
            description: 'Uma breve descrição do porquê você ama este jogo.',
            status: 'completed',
            platform: 'PC',
            rating: 4,
        },
        {
            title: 'Nome do Jogo',
            genre: 'Adventure',
            year: 2024,
            description: 'Uma breve descrição do porquê você ama este jogo.',
            status: 'playing',
            platform: 'PS5',
            rating: 4,
        },
    ],
    articles: [
        {
            slug: 'meu-primeiro-artigo',
            title: 'Título do Artigo',
            description:
                'Uma breve descrição do que este artigo cobre e por que é interessante.',
            publishedAt: '2024-01-15',
            tags: ['tecnologia', 'web'],
            readingTimeMinutes: 5,
        },
    ],
};
