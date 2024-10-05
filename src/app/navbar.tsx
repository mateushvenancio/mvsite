'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="z-10 w-full py-4 mb-4 text-primary border border-b-primary/25 border-t-transparent border-x-transparent cursor-default">
            <div className="flex justify-center">
                <div className="justify-end gap-4 align-baseline hidden md:flex">
                    <NavBarLink label="Home" link="/" />
                    <NavBarLink label="Blog" link="/blog" />
                    <NavBarLink label="Games" link="/games" />
                    <NavBarLink label="Music" link="/music" />
                    <NavBarLink label="About" link="/about" />
                </div>
                <Image
                    src="/menu_icon.svg"
                    alt="Menu Icon"
                    height={20}
                    width={20}
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                />
            </div>
            <div
                className={`md:hidden transition-all bg-white flex flex-col justify-evenly items-end w-full ${
                    open
                        ? 'h-40 opacity-100 pointer-events-auto'
                        : 'h-0 opacity-0 pointer-events-none'
                }`}
            >
                <NavBarLink
                    click={() => setOpen(false)}
                    label="Home"
                    link="/"
                />
                <NavBarLink
                    click={() => setOpen(false)}
                    label="Blog"
                    link="/blog"
                />
                <NavBarLink
                    click={() => setOpen(false)}
                    label="Games"
                    link="/games"
                />
                <NavBarLink
                    click={() => setOpen(false)}
                    label="Music"
                    link="/music"
                />
                <NavBarLink
                    click={() => setOpen(false)}
                    label="About"
                    link="/about"
                />
            </div>
        </div>
    );
}

export function NavBarLink({
    label,
    link,
    click,
}: {
    label: string;
    link: string;
    click?: () => void;
}) {
    const pathname = usePathname();
    let classes = 'cursor-default hover:underline';
    if (pathname === link) {
        classes += ' font-bold';
    }
    return (
        <Link className={classes} onClick={click} href={link}>
            {label}
        </Link>
    );
}
