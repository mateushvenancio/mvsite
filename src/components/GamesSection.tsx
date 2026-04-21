import { Game } from '@/types';

const statusLabel: Record<Game['status'], string> = {
    playing: 'Jogando',
    completed: 'Zerado',
    dropped: 'Abandonado',
    wishlist: 'Na fila',
};

const statusColor: Record<Game['status'], string> = {
    playing: '#2563eb',
    completed: 'var(--cosmos-gold)',
    dropped: 'var(--cosmos-muted)',
    wishlist: '#7c3aed',
};

function Stars({ rating }: { rating?: number }) {
    if (!rating) return null;
    return (
        <span className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <span
                    key={i}
                    style={{
                        color:
                            i <= rating
                                ? 'var(--cosmos-gold)'
                                : 'var(--cosmos-border-strong)',
                        fontSize: '11px',
                    }}
                >
                    ★
                </span>
            ))}
        </span>
    );
}

interface Props {
    games: Game[];
}

export function GamesSection({ games }: Props) {
    const playing = games.filter((g) => g.status === 'playing');
    const rest = games.filter((g) => g.status !== 'playing');

    return (
        <section id="jogos" className="relative z-10 py-8">
            <div className="max-w-4xl mx-auto px-6">
                {/* Section header */}
                <div className="mb-4">
                    <p
                        className="font-mono text-xs tracking-[0.2em] text-[var(--cosmos-gold)] uppercase mb-3"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        ✦ mundos explorados
                    </p>
                    <h2
                        className="font-display text-3xl text-[var(--cosmos-ink)] mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Jogos Favoritos
                    </h2>
                    <div className="gold-line" />
                </div>

                {/* Currently playing */}
                {playing.length > 0 && (
                    <div className="mb-8">
                        <p
                            className="font-mono text-xs tracking-widest text-[var(--cosmos-muted)] uppercase mb-4"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            jogando agora
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {playing.map((game) => (
                                <GameCard
                                    key={game.title}
                                    game={game}
                                    featured
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Other games */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rest.map((game) => (
                        <GameCard key={game.title} game={game} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function GameCard({ game, featured }: { game: Game; featured?: boolean }) {
    return (
        <div
            className="card-lift p-5 rounded-lg"
            style={{
                background: 'var(--cosmos-white)',
                border: `1px solid ${featured ? 'var(--cosmos-border-strong)' : 'var(--cosmos-border)'}`,
            }}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-[var(--cosmos-ink)] leading-snug">
                        {game.title}
                    </h3>
                    {game.year && (
                        <span
                            className="font-mono text-xs text-[var(--cosmos-muted)]"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            {game.year}
                        </span>
                    )}
                </div>

                <span
                    className="cosmos-tag flex-shrink-0"
                    style={{ color: statusColor[game.status] }}
                >
                    {statusLabel[game.status]}
                </span>
            </div>

            {game.description && (
                <p className="text-xs text-[var(--cosmos-muted)] leading-relaxed mb-3">
                    {game.description}
                </p>
            )}

            <div className="flex items-center justify-between">
                <Stars rating={game.rating} />
                <div className="flex gap-2">
                    {game.genre && (
                        <span className="cosmos-tag">{game.genre}</span>
                    )}
                    {game.platform && (
                        <span className="cosmos-tag">{game.platform}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
