import type { Metadata } from 'next';
import { Space_Mono, Syne } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-space-mono',
});

const syne = Syne({
    weight: ['700', '800'],
    subsets: ['latin'],
    variable: '--font-syne',
});

export const metadata: Metadata = {
    title: 'Mateus Venâncio — Software Engineer',
    description: 'Software engineer. Sol III. MWG-001.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${spaceMono.variable} ${syne.variable}`}>
            <body>{children}</body>
        </html>
    );
}
