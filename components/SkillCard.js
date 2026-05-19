'use client';

const categoryColors = {
  Languages: { color: 'var(--accent-cyan)', bg: 'var(--accent-cyan-dim)', border: 'rgba(0,212,255,0.15)' },
  Frameworks: { color: 'var(--accent-purple)', bg: 'var(--accent-purple-dim)', border: 'rgba(163,113,247,0.15)' },
  Databases: { color: 'var(--accent-orange)', bg: 'var(--accent-orange-dim)', border: 'rgba(247,129,102,0.15)' },
  Cloud: { color: '#58a6ff', bg: 'rgba(88,166,255,0.1)', border: 'rgba(88,166,255,0.15)' },
  Tools: { color: 'var(--accent-green)', bg: 'var(--accent-green-dim)', border: 'rgba(57,211,83,0.15)' },
  Concepts: { color: '#e3b341', bg: 'rgba(227,179,65,0.1)', border: 'rgba(227,179,65,0.15)' },
  default: { color: 'var(--text-secondary)', bg: 'var(--bg-elevated)', border: 'var(--border-default)' },
};

export default function SkillCard({ skill, matched }) {
  const theme = matched
    ? (categoryColors[skill.category] || categoryColors.default)
    : { color: 'var(--text-muted)', bg: 'rgba(255,255,255,0.02)', border: 'var(--border-subtle)' };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        padding: '8px 12px',
        borderRadius: 'var(--radius-sm)',
        background: theme.bg,
        border: `1px solid ${theme.border}`,
        transition: 'all 0.18s ease',
        cursor: 'default',
        animation: 'fade-up 0.3s ease',
      }}
      onMouseEnter={e => {
        if (matched) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = `0 4px 20px ${theme.border}`;
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {matched ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={theme.color} strokeWidth="2.5" style={{ flexShrink: 0 }}>
          <polyline points="20,6 9,17 4,12" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ flexShrink: 0 }}>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        color: matched ? theme.color : 'var(--text-muted)',
        fontWeight: 500,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {skill.name}
      </span>
    </div>
  );
}