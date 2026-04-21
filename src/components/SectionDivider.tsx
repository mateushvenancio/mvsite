export function SectionDivider() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6">
      <div className="star-divider">
        <span
          className="font-mono text-xs text-[var(--cosmos-muted)] opacity-40 select-none"
          style={{ fontFamily: 'var(--font-mono)' }}
          aria-hidden
        >
          ✦
        </span>
      </div>
    </div>
  );
}
