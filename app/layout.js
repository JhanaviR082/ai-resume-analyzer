import './globals.css';

export const metadata = {
  title: 'ResumeAI — Intelligent Resume Analyzer',
  description: 'AI-powered resume analysis, skill matching, and scoring',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="grid-bg" />
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}