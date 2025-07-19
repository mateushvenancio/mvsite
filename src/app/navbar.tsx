'use client';

import Link from 'next/link';
import { headers } from 'next/headers';
import { usePathname } from 'next/navigation';

export default function NavBar() {
    const currentPath = usePathname();

    return (
        <div className="z-10 w-full py-4 mb-4 text-primary cursor-default">
            {currentPath !== '/' ? (
                <Link href="/">&larr; Voltar</Link>
            ) : (
                <div>{''}</div>
            )}
        </div>
    );
}
