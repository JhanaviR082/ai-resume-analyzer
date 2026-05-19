'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ResumeUpload from '@/components/ResumeUpload';
import SkillCard from '@/components/SkillCard';
import ScoreCard from '@/components/ScoreCard';
import { analyzeResume } from '@/utils/skillMatcher';

const styles = {
  main: {
    position: 'relative',
    zIndex: 1,
    minHeight: '100vh',
    paddingBottom: '80px',
  },
  hero: {
    textAlign: 'center',
    padding: '80px 24px 48px',
    maxWidth: '760px',
    margin: '0 auto',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--accent-cyan-dim)',
    border: '1px solid rgba(0,212,255,0.2)',
    borderRadius: '100px',
    padding: '6px 16px',
    marginBottom: '28px',
    fontSize: '12px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-cyan)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--accent-cyan)',
    animation: 'glow-pulse 2s ease-in-out infinite',
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(36px, 6vw, 72px)',
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    marginBottom: '20px',
    color: 'var(--text-primary)',
  },
  h1Accent: {
    background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '17px',
    color: 'var(--text-secondary)',
    lineHeight: 1.65,
    fontWeight: 400,
    maxWidth: '520px',
    margin: '0 auto',
  },
  content: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 24px',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: '340px 1fr',
    gap: '24px',
    marginTop: '32px',
    alignItems: 'start',
  },
  skillsSection: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  countBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--accent-cyan)',
    background: 'var(--accent-cyan-dim)',
    padding: '3px 10px',
    borderRadius: '100px',
    border: '1px solid rgba(0,212,255,0.15)',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '10px',
  },
  divider: {
    height: '1px',
    background: 'var(--border-subtle)',
    margin: '20px 0',
  },
  categoryLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '10px',
  },
  missingSection: {
    marginTop: '16px',
  },
  uploadWrapper: {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '0 24px',
  },
};

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleTextExtracted = async (text, fileName) => {
    setIsAnalyzing(true);
    // Simulate processing delay for UX
    await new Promise(r => setTimeout(r, 800));
    const result = analyzeResume(text);
    result.fileName = fileName;
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <main style={styles.main}>
      <Navbar />

      {!analysisResult && (
        <div style={styles.hero}>
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            AI-Powered Analysis
          </div>
          <h1 style={styles.h1}>
            Decode your resume<br />
            <span style={styles.h1Accent}>before anyone else does</span>
          </h1>
          <p style={styles.subtitle}>
            Upload your PDF resume and instantly get skill extraction,
            match scoring, and gap analysis against top job roles.
          </p>
        </div>
      )}

      {!analysisResult ? (
        <div style={styles.uploadWrapper}>
          <ResumeUpload
            onTextExtracted={handleTextExtracted}
            isAnalyzing={isAnalyzing}
          />
        </div>
      ) : (
        <div style={styles.content}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                ANALYZING
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {analysisResult.fileName}
              </h2>
            </div>
            <button
              onClick={handleReset}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                padding: '10px 18px',
                fontSize: '13px',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-strong)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              New Analysis
            </button>
          </div>

          <div style={styles.resultsGrid}>
            {/* Left: Score */}
            <ScoreCard result={analysisResult} />

            {/* Right: Skills */}
            <div style={styles.skillsSection}>
              <div style={styles.sectionHeader}>
                <span style={styles.sectionTitle}>Detected Skills</span>
                <span style={styles.countBadge}>{(analysisResult.matchedSkills?.length || 0)} found</span>
              </div>

              {analysisResult.matchedSkills && analysisResult.matchedSkills.length > 0 ? (
                <div style={styles.skillsGrid}>
                  {analysisResult.matchedSkills.map(skill => (
                    <SkillCard key={skill} skill={{ name: skill }} matched={true} />
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No skills detected</p>
              )}

              {(analysisResult.missingSkills?.length || 0) > 0 && (
                <div style={styles.missingSection}>
                  <div style={styles.divider} />
                  <div style={styles.sectionHeader}>
                    <span style={styles.sectionTitle}>Skill Gaps</span>
                    <span style={{
                      ...styles.countBadge,
                      color: 'var(--accent-orange)',
                      background: 'var(--accent-orange-dim)',
                      border: '1px solid rgba(247,129,102,0.15)',
                    }}>
                      {analysisResult.missingSkills?.length || 0} missing
                    </span>
                  </div>
                  <div style={styles.skillsGrid}>
                    {(analysisResult.missingSkills || []).slice(0, 12).map(skill => (
                      <SkillCard key={skill} skill={{ name: skill }} matched={false} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}