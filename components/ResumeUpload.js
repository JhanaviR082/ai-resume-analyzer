'use client';

import { useState, useRef, useCallback } from 'react';
import { extractTextFromPDF } from '@/utils/pdfParser';

const styles = {
  wrapper: {
    marginTop: '8px',
    marginBottom: '40px',
  },
  dropzone: {
    position: 'relative',
    border: '1.5px dashed var(--border-default)',
    borderRadius: 'var(--radius-xl)',
    padding: '60px 40px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    background: 'var(--bg-surface)',
    overflow: 'hidden',
  },
  dropzoneActive: {
    borderColor: 'var(--accent-cyan)',
    background: 'rgba(0,212,255,0.04)',
    transform: 'scale(1.005)',
  },
  dropzoneGlow: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  iconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: 'var(--radius-lg)',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-default)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    transition: 'all 0.25s',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '24px',
    lineHeight: 1.6,
  },
  orDivider: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    margin: '24px auto',
    maxWidth: '300px',
  },
  orLine: {
    flex: 1,
    height: '1px',
    background: 'var(--border-subtle)',
  },
  orText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  browseBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, var(--accent-cyan), rgba(0,180,220,0.9))',
    color: '#000',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: '12px 28px',
    fontSize: '14px',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s',
    letterSpacing: '-0.01em',
  },
  hint: {
    marginTop: '16px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em',
  },
  progressWrapper: {
    marginTop: '24px',
    padding: '24px',
    background: 'var(--bg-elevated)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-default)',
  },
  progressHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  progressLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  progressPct: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--accent-cyan)',
  },
  progressTrack: {
    height: '4px',
    background: 'var(--bg-overlay)',
    borderRadius: '100px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
    borderRadius: '100px',
    transition: 'width 0.3s ease',
    boxShadow: '0 0 12px var(--accent-cyan-glow)',
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: 'var(--bg-elevated)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-default)',
    marginTop: '16px',
    animation: 'fade-up 0.3s ease',
  },
  fileIcon: {
    width: '36px',
    height: '36px',
    borderRadius: 'var(--radius-sm)',
    background: 'rgba(247,129,102,0.15)',
    border: '1px solid rgba(247,129,102,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  fileName: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)',
  },
  fileSize: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    marginTop: '2px',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid var(--border-default)',
    borderTopColor: 'var(--accent-cyan)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    marginLeft: 'auto',
    flexShrink: 0,
  },
  error: {
    marginTop: '16px',
    padding: '14px 16px',
    background: 'rgba(248,81,73,0.08)',
    border: '1px solid rgba(248,81,73,0.2)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--score-low)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};

const STEPS = [
  'Reading PDF structure...',
  'Extracting text layers...',
  'Tokenizing content...',
  'Matching skill patterns...',
  'Computing scores...',
];

export default function ResumeUpload({ onTextExtracted, isAnalyzing }) {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const processFile = useCallback(async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported. Please upload a .pdf file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10MB.');
      return;
    }

    setError('');
    setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(1) + ' KB' });
    setIsLoading(true);
    setProgress(0);

    try {
      // Simulate progressive steps
      for (let i = 0; i < STEPS.length; i++) {
        setStep(STEPS[i]);
        setProgress(((i + 1) / (STEPS.length + 1)) * 85);
        await new Promise(r => setTimeout(r, 300 + Math.random() * 200));
      }

      const text = await extractTextFromPDF(file);
      setProgress(100);
      setStep('Analysis complete!');
      await new Promise(r => setTimeout(r, 400));

      onTextExtracted(text, file.name);
    } catch (err) {
      setError('Failed to parse PDF. Make sure the file is not password-protected.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [onTextExtracted]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleInputChange = (e) => {
    processFile(e.target.files[0]);
    e.target.value = '';
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.dropzone,
          ...(isDragging ? styles.dropzoneActive : {}),
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isLoading && inputRef.current?.click()}
      >
        <div style={styles.dropzoneGlow} />

        <div style={{
          ...styles.iconWrapper,
          ...(isDragging ? { borderColor: 'var(--accent-cyan)', background: 'var(--accent-cyan-dim)' } : {}),
        }}>
          {isDragging ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
              <path d="M12 2v14M5 9l7-7 7 7" />
              <path d="M5 20h14" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="12" y1="12" x2="12" y2="18" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          )}
        </div>

        <p style={styles.title}>
          {isDragging ? 'Drop it here' : 'Drop your resume'}
        </p>
        <p style={styles.subtitle}>
          Drag & drop your PDF resume for instant<br />AI-powered skill analysis and scoring
        </p>

        <div style={styles.orDivider}>
          <div style={styles.orLine} />
          <span style={styles.orText}>or</span>
          <div style={styles.orLine} />
        </div>

        <button
          style={styles.browseBtn}
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17,8 12,3 7,8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Browse Files
        </button>

        <p style={styles.hint}>PDF only · Max 10MB · Scanned or digital</p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />
      </div>

      {error && (
        <div style={styles.error}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      {fileInfo && (isLoading || isAnalyzing) && (
        <>
          <div style={styles.fileInfo}>
            <div style={styles.fileIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-orange)" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
            </div>
            <div>
              <p style={styles.fileName}>{fileInfo.name}</p>
              <p style={styles.fileSize}>{fileInfo.size}</p>
            </div>
            <div style={styles.spinner} />
          </div>

          <div style={styles.progressWrapper}>
            <div style={styles.progressHeader}>
              <span style={styles.progressLabel}>{step}</span>
              <span style={styles.progressPct}>{Math.round(progress)}%</span>
            </div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressBar, width: `${progress}%` }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}