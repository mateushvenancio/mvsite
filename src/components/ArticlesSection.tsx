import { Article } from '@/types';

interface Props {
    articles: Article[];
}

function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function ArticlesSection({ articles }: Props) {
    if (articles.length === 0) {
        return (
            <section id="artigos" className="relative z-10 py-8">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="mb-4">
                        <p
                            className="font-mono text-xs tracking-[0.2em] text-[var(--cosmos-gold)] uppercase mb-3"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            ✦ transmissões
                        </p>
                        <h2
                            className="font-display text-3xl text-[var(--cosmos-ink)] mb-2"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Artigos
                        </h2>
                        <div className="gold-line" />
                    </div>

                    <p className="text-sm text-[var(--cosmos-muted)] italic">
                        Em breve — primeiros sinais em preparação.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="artigos" className="relative z-10 py-8">
            <div className="max-w-4xl mx-auto px-6">
                {/* Section header */}
                <div className="mb-4">
                    <p
                        className="font-mono text-xs tracking-[0.2em] text-[var(--cosmos-gold)] uppercase mb-3"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        ✦ transmissões
                    </p>
                    <h2
                        className="font-display text-3xl text-[var(--cosmos-ink)] mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Artigos
                    </h2>
                    <div className="gold-line" />
                </div>

                {/* Articles list */}
                <div className="space-y-px">
                    {articles.map((article) => (
                        <ArticleRow key={article.slug} article={article} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ArticleRow({ article }: { article: Article }) {
    const href = article.url ?? `#artigos/${article.slug}`;

    return (
        <a
            href={href}
            target={article.url ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="group block py-6 border-b hover:bg-[var(--cosmos-dust)] -mx-4 px-4 rounded transition-colors"
            style={{ borderColor: 'var(--cosmos-border)' }}
        >
            <div className="flex items-start gap-6">
                {/* Date column */}
                <div className="flex-shrink-0 w-28 pt-0.5">
                    <time
                        dateTime={article.publishedAt}
                        className="font-mono text-xs text-[var(--cosmos-muted)]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        {formatDate(article.publishedAt)}
                    </time>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-[var(--cosmos-ink)] group-hover:text-[var(--cosmos-blue)] transition-colors mb-1">
                        {article.title}
                        {article.url && (
                            <span className="ml-2 text-xs text-[var(--cosmos-muted)]">
                                ↗
                            </span>
                        )}
                    </h3>

                    <p className="text-sm text-[var(--cosmos-muted)] leading-relaxed mb-3">
                        {article.description}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                        {article.tags.map((tag) => (
                            <span key={tag} className="cosmos-tag">
                                {tag}
                            </span>
                        ))}
                        {article.readingTimeMinutes && (
                            <span
                                className="font-mono text-xs text-[var(--cosmos-muted)] ml-1"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                · {article.readingTimeMinutes} min leitura
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
}
