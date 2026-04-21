import Image from 'next/image';
import { SiteConfig } from '@/types';

const IconGithub = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const IconLinkedin = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const IconEmail = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
    >
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const IconTwitter = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const iconMap = {
    github: IconGithub,
    linkedin: IconLinkedin,
    email: IconEmail,
    twitter: IconTwitter,
    website: IconEmail,
};

interface HeroProps {
    config: Pick<
        SiteConfig,
        | 'name'
        | 'title'
        | 'tagline'
        | 'bio'
        | 'avatarUrl'
        | 'location'
        | 'socialLinks'
    >;
}

export function Hero({ config }: HeroProps) {
    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                zIndex: 10,
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '56px',
            }}
        >
            <div
                style={{
                    maxWidth: '896px',
                    margin: '0 auto',
                    padding: '80px 24px',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: '64px',
                        flexWrap: 'wrap',
                    }}
                >
                    {/* Avatar com anéis orbitais */}
                    <div
                        style={{
                            position: 'relative',
                            width: '108px',
                            height: '108px',
                            flexShrink: 0,
                        }}
                    >
                        {/* Anel 1 */}
                        <div
                            style={{
                                position: 'absolute',
                                width: '140px',
                                height: '140px',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                border: '1px solid #d1cdc0',
                                opacity: 0.5,
                                pointerEvents: 'none',
                            }}
                        />
                        {/* Anel 2 */}
                        <div
                            style={{
                                position: 'absolute',
                                width: '168px',
                                height: '168px',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                border: '1px solid #d1cdc0',
                                opacity: 0.2,
                                pointerEvents: 'none',
                            }}
                        />

                        {/* Foto */}
                        <div
                            style={{
                                width: '108px',
                                height: '108px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '2px solid #d1cdc0',
                                position: 'relative',
                            }}
                        >
                            <Image
                                src={config.avatarUrl}
                                alt={config.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>

                        {/* Badge de localização */}
                        {config.location && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '-24px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    whiteSpace: 'nowrap',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10px',
                                    letterSpacing: '0.08em',
                                    padding: '2px 8px',
                                    borderRadius: '2px',
                                    background: '#f0ece4',
                                    color: '#6b7280',
                                    border: '1px solid #e5e2d8',
                                    textTransform: 'uppercase',
                                }}
                            >
                                ◦ {config.location}
                            </div>
                        )}
                    </div>

                    {/* Texto */}
                    <div
                        style={{
                            flex: 1,
                            minWidth: '280px',
                            paddingTop: '4px',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                letterSpacing: '0.2em',
                                color: '#c49a3c',
                                textTransform: 'uppercase',
                                marginBottom: '12px',
                            }}
                        >
                            ✦ portfólio pessoal
                        </p>

                        <h1
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(36px, 5vw, 56px)',
                                lineHeight: 1.05,
                                color: '#0f1117',
                                marginBottom: '6px',
                                fontWeight: 400,
                            }}
                        >
                            {config.name}
                        </h1>

                        <p
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontStyle: 'italic',
                                fontSize: '18px',
                                color: '#6b7280',
                                marginBottom: '20px',
                            }}
                        >
                            {config.title}
                        </p>

                        <div
                            style={{
                                height: '2px',
                                width: '36px',
                                background: '#c49a3c',
                                borderRadius: '1px',
                                marginBottom: '20px',
                            }}
                        />

                        <blockquote
                            style={{
                                fontSize: '14px',
                                color: '#6b7280',
                                fontStyle: 'italic',
                                borderLeft: '2px solid #d1cdc0',
                                paddingLeft: '14px',
                                marginBottom: '16px',
                                marginLeft: 0,
                            }}
                        >
                            "{config.tagline}"
                        </blockquote>

                        <p
                            style={{
                                fontSize: '15px',
                                color: '#0f1117',
                                lineHeight: 1.7,
                                marginBottom: '32px',
                                maxWidth: '440px',
                                opacity: 0.75,
                            }}
                        >
                            {config.bio}
                        </p>

                        <div
                            style={{
                                display: 'flex',
                                gap: '10px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {config.socialLinks.map((link) => {
                                const Icon = iconMap[link.icon];
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target={
                                            link.icon !== 'email'
                                                ? '_blank'
                                                : undefined
                                        }
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '8px 16px',
                                            borderRadius: '4px',
                                            fontSize: '13px',
                                            color: '#6b7280',
                                            border: '1px solid #e5e2d8',
                                            textDecoration: 'none',
                                            background: 'transparent',
                                            fontFamily: 'var(--font-sans)',
                                        }}
                                    >
                                        {Icon && <Icon />}
                                        <span>{link.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Scroll hint */}
                <div
                    style={{
                        marginTop: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '8px',
                        opacity: 0.35,
                    }}
                >
                    <p
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            letterSpacing: '0.15em',
                            color: '#6b7280',
                        }}
                    >
                        scroll para explorar
                    </p>
                    <div
                        style={{
                            width: '1px',
                            height: '32px',
                            background: '#d1cdc0',
                            marginLeft: '8px',
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
