import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk, Syne } from 'next/font/google';
import './globals.css';

const mono = JetBrains_Mono({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-mono',
});

const syne = Syne({
    weight: ['600', '700', '800'],
    subsets: ['latin'],
    variable: '--font-display',
});

const spaceGrotesk = Space_Grotesk({
    weight: ['700'],
    subsets: ['latin'],
    variable: '--font-name',
});

export const metadata: Metadata = {
    title: 'Mateus Venâncio — Software Engineer',
    description:
        'Software engineer. Código, cosmos, games e as músicas que eu mais ouço.',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f4f3f0' },
        { media: '(prefers-color-scheme: dark)', color: '#171716' },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR" className={`${mono.variable} ${syne.variable} ${spaceGrotesk.variable}`}>
            <body>{children}</body>
        </html>
    );
}
