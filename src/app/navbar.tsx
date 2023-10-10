'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavBarLinkType = { label: string; link: string };

export default function NavBar() {
    return (
        <div className="w-full px-6 py-2 my-4 backdrop-blur-sm text-primary border border-primary rounded-full sticky top-4 cursor-default">
            <div className="flex justify-end gap-4 align-baseline">
                <NavBarLink label="Home" link="/" />
                <NavBarLink label="About" link="/about" />
            </div>
        </div>
    );
}

export function NavBarLink({ label, link }: NavBarLinkType) {
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
