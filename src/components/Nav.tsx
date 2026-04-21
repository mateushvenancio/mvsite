'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Músicas', href: '#musicas' },
  { label: 'Jogos', href: '#jogos' },
  { label: 'Artigos', href: '#artigos' },
];

export function Nav({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-blur border-b border-[var(--cosmos-border)]' : ''
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#hero"
          className="font-mono text-sm tracking-widest text-[var(--cosmos-muted)] hover:text-[var(--cosmos-ink)] transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {name.toLowerCase().replace(' ', '.')}
        </a>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--cosmos-muted)] hover:text-[var(--cosmos-ink)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
