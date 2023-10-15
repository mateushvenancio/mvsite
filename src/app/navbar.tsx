'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
    return (
        <div className="z-10 w-full py-4 mb-4 text-primary border border-b-primary/25 border-t-transparent border-x-transparent cursor-default">
            <div className="flex justify-between">
                <div>
                    <span className="text-primary font-bold">://</span>
                    mateusvenancio
                </div>
                <div className="flex justify-end gap-4 align-baseline">
                    <NavBarLink label="Home" link="/" />
                    <NavBarLink label="Shelf" link="/shelf" />
                    <NavBarLink label="About" link="/about" />
                </div>
            </div>
        </div>
    );
}

export function NavBarLink({ label, link }: { label: string; link: string }) {
    const pathname = usePathname();
    let classes = 'cursor-default hover:underline';
    if (pathname === link) {
        classes += ' font-bold';
    }
    return (
        <Link className={classes} href={link}>
            {label}
        </Link>
    );
}
