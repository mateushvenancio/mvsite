export function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-12 border-t" style={{ borderColor: 'var(--cosmos-border)' }}>
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Mini constellation */}
          <svg width="24" height="24" viewBox="0 0 24 24" style={{ opacity: 0.25 }}>
            <circle cx="4" cy="4" r="1.5" fill="var(--cosmos-navy)" />
            <circle cx="20" cy="8" r="1" fill="var(--cosmos-navy)" />
            <circle cx="12" cy="20" r="1.5" fill="var(--cosmos-navy)" />
            <circle cx="8" cy="14" r="1" fill="var(--cosmos-navy)" />
            <line x1="4" y1="4" x2="8" y2="14" stroke="var(--cosmos-navy)" strokeWidth="0.5" />
            <line x1="8" y1="14" x2="12" y2="20" stroke="var(--cosmos-navy)" strokeWidth="0.5" />
            <line x1="4" y1="4" x2="20" y2="8" stroke="var(--cosmos-navy)" strokeWidth="0.5" />
          </svg>

          <span
            className="font-mono text-xs text-[var(--cosmos-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            © {year} {name}
          </span>
        </div>

        <p
          className="font-mono text-xs text-[var(--cosmos-muted)] opacity-50"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          feito com café e curiosidade cósmica
        </p>
      </div>
    </footer>
  );
}
