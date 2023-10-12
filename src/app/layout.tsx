import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import NavBar from './navbar';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Mateus Venâncio',
    description: 'Made with NextJs and Tailwind',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} px-4 max-w-[700px] m-auto`}>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
