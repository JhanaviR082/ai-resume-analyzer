'use client';

import { useEffect, useState } from 'react';

function ProgressBar({ value, color, delay = 0 }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div style={{
      height: '6px',
      background: 'var(--bg-overlay)',
      borderRadius: '100px',
      overflow: 'hidden',
    }}>
      <div style={{
        height: '100%',
        width: `${width}%`,
        background: color,
        borderRadius: '100px',
        transition: 'width 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: `0 0 10px ${color}44`,
      }} />
    </div>
  );
}

function ScoreRing({ score }) {
  const [animated, setAnimated] = useState(false);
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated ? score / 100 : 0) * circumference;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  const color = score >= 75 ? 'var(--score-high)' : score >= 50 ? 'var(--score-mid)' : 'var(--score-low)';
  const label = score >= 75 ? 'Strong' : score >= 50 ? 'Average' : 'Weak';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--bg-overlay)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              filter: `drop-shadow(0 0 6px ${color}88)`,
            }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 800,
            color,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}>
            {score}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            /100
          </span>
        </div>
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        fontWeight: 500,
        color,
        background: `${color}18`,
        border: `1px solid ${color}30`,
        padding: '4px 14px',
        borderRadius: '100px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {label} Match
      </span>
    </div>
  );
}

const categoryIcons = {
  Languages: '⟨/⟩',
  Frameworks: '◈',
  Databases: '◎',
  Cloud: '◬',
  Tools: '⚙',
  Concepts: '◇',
};

export default function ScoreCard({ result }) {
  const { score, matchedCount, missingCount, totalSkills, insight } = result;

  const color = score >= 75 ? 'var(--score-high)' : score >= 50 ? 'var(--score-mid)' : 'var(--score-low)';

  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      animation: 'fade-up 0.4s ease',
    }}>
      {/* Score ring */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px 0 4px',
      }}>
        <ScoreRing score={score || 0} />
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
      }}>
        {[
          { label: 'Matched', value: matchedCount || 0, color: 'var(--accent-cyan)' },
          { label: 'Missing', value: missingCount || 0, color: 'var(--accent-orange)' },
          { label: 'Total Skills', value: totalSkills || 0, color: 'var(--text-secondary)' },
          { label: 'Coverage', value: `${score || 0}%`, color },
        ].map(({ label, value, color: c }) => (
          <div key={label} style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            textAlign: 'center',
          }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: c, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div style={{
        padding: '14px',
        background: score >= 70 ? 'var(--accent-green-dim)' : score >= 40 ? 'rgba(227,179,65,0.08)' : 'rgba(248,81,73,0.08)',
        border: `1px solid ${score >= 70 ? 'rgba(57,211,83,0.2)' : score >= 40 ? 'rgba(227,179,65,0.2)' : 'rgba(248,81,73,0.2)'}`,
        borderRadius: 'var(--radius-md)',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
          AI Insight
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          {insight || 'Upload your resume to get insights.'}
        </p>
      </div>
    </div>
  );
}