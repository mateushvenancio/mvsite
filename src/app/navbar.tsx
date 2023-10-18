'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="z-10 w-full py-4 mb-4 text-primary border border-b-primary/25 border-t-transparent border-x-transparent cursor-default">
                <div className="flex justify-between">
                    <div>
                        <span className="text-primary font-bold">://</span>
                        mateusvenancio
                    </div>
                    <div className="justify-end gap-4 align-baseline hidden md:flex">
                        <NavBarLink label="Home" link="/" />
                        <NavBarLink label="Blog" link="/blog" />
                        <NavBarLink label="Shelf" link="/shelf" />
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
                    <NavBarLink label="Home" link="/" />
                    <NavBarLink label="Blog" link="/blog" />
                    <NavBarLink label="Shelf" link="/shelf" />
                    <NavBarLink label="Music" link="/music" />
                    <NavBarLink label="About" link="/about" />
                </div>
            </div>
            {/* <div className="absolute right-0 left-0 h-full top-0 backdrop-blur">
                <div
                    className={
                        'bg-gray-100 w-[60vw] shadow-xl flex flex-col h-full w-[60vw] gap-6 md:hidden items-end px-6 transition-all'
                    }
                >
                    <div className="flex justify-end pt-4">
                        <Image
                            src="menu_close.svg"
                            alt="Close Menu"
                            height={20}
                            width={20}
                            onClick={() => setOpen(false)}
                        />
                    </div>
                    <NavBarLink label="Home" link="/" />
                    <NavBarLink label="Blog" link="/blog" />
                    <NavBarLink label="Shelf" link="/shelf" />
                    <NavBarLink label="Music" link="/music" />
                    <NavBarLink label="About" link="/about" />
                </div>
            </div> */}
        </>
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
