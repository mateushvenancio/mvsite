'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
    return <PersonalSite />;
}

function PersonalSite() {
    return (
        <>
            <div className="grid-bg" />
            <div className="scan-h" />
            <div className="scan-v" />

            <CornerBracket pos="corner-tl" />
            <CornerBracket pos="corner-tr" />
            <CornerBracket pos="corner-bl" />
            <CornerBracket pos="corner-br" />

            <span className="sys-label sys-label-tl">SYS // INITIALIZED</span>
            <span className="sys-label sys-label-tr">V2.4.1 // ACTIVE</span>
            <span className="sys-label sys-label-bl">
                LAT: -18.97° // LON: -49.46°
            </span>
            <span className="sys-label sys-label-br">SIGNAL: NOMINAL</span>

            <DotField />

            <div className="page">
                <div className="card">
                    <div className="card-header">
                        <div className="ch-left">
                            <div className="status-dot" />
                            <span className="ch-label">
                                Operator Profile // Online
                            </span>
                        </div>
                        <span className="ch-id">UID-2401 · SOL-III</span>
                    </div>

                    <div className="card-body">
                        <div className="mission-tag">Software Engineer</div>

                        <div>
                            <span className="name-main">MATEUS</span>
                            <span className="name-ghost">Venâncio</span>
                        </div>

                        <div className="divider-row">
                            <div className="div-line" />
                            <div className="div-tag">
                                <span className="div-diamond" />
                                transmission log
                                <span className="div-diamond" />
                            </div>
                            <div className="div-line" />
                        </div>

                        <div className="quote-block">
                            <p className="quote-text">
                                &quot;The cosmos is within us. We are made of
                                star-stuff.&quot;
                            </p>
                            <p className="quote-src">
                                {'// Carl Sagan · Cosmos, 1980'}
                            </p>
                        </div>

                        <div className="links-row">
                            <a
                                href="https://linkedin.com/in/mateushvenancio"
                                className="link-item"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <LinkedInIcon />
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/mateushvenancio"
                                className="link-item"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GitHubIcon />
                                GitHub
                            </a>
                            <a
                                href="mailto:mateushvenancio@gmail.com"
                                className="link-item"
                            >
                                <EmailIcon />
                                Email
                            </a>
                        </div>
                    </div>

                    <div className="card-footer">
                        <span className="cf-coords">
                            RA 05h 34m · Dec +22° 00&apos; · MWG-001
                        </span>
                        <div className="signal-bars">
                            {[4, 7, 10, 13, 13].map((h, i) => (
                                <div
                                    key={i}
                                    className="sig-bar"
                                    style={{
                                        height: h,
                                        opacity: 0.2 + i * 0.18,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function CornerBracket({ pos }: { pos: string }) {
    return (
        <div className={`corner ${pos}`}>
            <svg
                width="36"
                height="36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1 18V1h17"
                    stroke="rgba(60,80,120,.38)"
                    strokeWidth="1"
                />
                <circle cx="1" cy="1" r="2" fill="rgba(60,80,120,.28)" />
            </svg>
        </div>
    );
}

type Dot = {
    id: number;
    x: number;
    y: number;
    size: number;
    lo: number;
    hi: number;
    dur: number;
    delay: number;
};

function DotField() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const container = ref.current;
        container.innerHTML = '';

        const dots: Dot[] = Array.from({ length: 32 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() < 0.6 ? 1.5 : 2.5,
            lo: parseFloat((0.03 + Math.random() * 0.08).toFixed(2)),
            hi: parseFloat((0.1 + Math.random() * 0.18).toFixed(2)),
            dur: parseFloat((2 + Math.random() * 4).toFixed(1)),
            delay: parseFloat((Math.random() * 5).toFixed(1)),
        }));

        dots.forEach((d) => {
            const el = document.createElement('div');
            el.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: #3c5078;
        width: ${d.size}px;
        height: ${d.size}px;
        left: ${d.x.toFixed(1)}%;
        top: ${d.y.toFixed(1)}%;
        animation: dp-pulse ${d.dur}s ease-in-out infinite ${d.delay}s;
        --lo: ${d.lo};
        --hi: ${d.hi};
      `;
            container.appendChild(el);
        });
    }, []);

    return <div ref={ref} className="dot-field" aria-hidden="true" />;
}

function LinkedInIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4V9h4v2a6 6 0 014-3z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );
}
