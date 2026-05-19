'use client';

import { useState, useEffect } from 'react';

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: '60px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border-subtle)',
    transition: 'background 0.3s',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  logoIcon: {
    width: '28px',
    height: '28px',
    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
    borderRadius: '7px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '16px',
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
  },
  logoSub: {
    color: 'var(--accent-cyan)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--accent-green)',
    background: 'var(--accent-green-dim)',
    border: '1px solid rgba(57,211,83,0.15)',
    borderRadius: '100px',
    padding: '4px 12px',
  },
  statusDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'var(--accent-green)',
    animation: 'glow-pulse 2s infinite',
  },
  githubLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '13px',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    padding: '7px 14px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-default)',
    background: 'var(--bg-elevated)',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav style={{
      ...styles.nav,
      background: scrolled ? 'rgba(8,11,15,0.92)' : 'rgba(8,11,15,0.6)',
    }}>
      <a href="/" style={styles.logo}>
        <div style={styles.logoIcon}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
          </svg>
        </div>
        <span style={styles.logoText}>
          Resume<span style={styles.logoSub}>AI</span>
        </span>
      </a>

      <div style={styles.right}>
        <div style={styles.status}>
          <div style={styles.statusDot} />
          Model Online
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.githubLink}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--border-strong)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-default)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          GitHub
        </a>
      </div>
    </nav>
  );
}