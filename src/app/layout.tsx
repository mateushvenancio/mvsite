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
    description: 'Generated by create next app',
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
                <HomeFooter />
            </body>
        </html>
    );
}

function HomeFooter() {
    return (
        <div className="py-8 text-center border border-t-primary/25 border-b-transparent border-x-transparent py-4 mt-8">
            Made with ❤️ using Tailwind & NextJs.
        </div>
    );
}
