# 🚀 AI Resume Analyzer

An AI-powered resume analysis tool that extracts skills, calculates job-fit scores, and provides gap analysis against real-world job roles.

Built using **Next.js + Docker + GitHub Actions + Vercel**

---

# 🌐 Live Demo
https://your-vercel-link.vercel.app

---

# 📸 Project Preview

## 🧠 Resume Upload + AI Analysis
Upload a PDF resume and instantly get skill extraction and scoring.

![Upload Screen](screenshots/upload.png)

---

## 📊 Skill Match & Score Dashboard
Shows job-fit percentage, missing skills, and role analysis.

![Score Dashboard](screenshots/score.png)

---

## 🧩 Extracted Skills View
AI extracts and categorizes skills automatically.

![Skills View](screenshots/skills.png)

---

## ⚙️ GitHub Actions CI/CD
Automated build and test pipeline on every push.

![GitHub Actions](screenshots/actions.png)

---

## 🐳 Docker Containerization
Application runs consistently across environments using Docker.

```bash
docker build -t resume-ai .
docker run -p 3000:3000 resume-ai
```

![Docker](screenshots/docker.png)

---

# 🛠️ Tech Stack

- Next.js 14
- React
- Tailwind CSS
- Node.js
- GitHub Actions
- Docker
- Vercel

---

# 🔧 Features

- Upload PDF resumes
- AI-based skill extraction
- Job role matching score
- Skill gap analysis
- Instant processing
- Deployment ready

---

# 🔄 CI/CD Pipeline (GitHub Actions)

Automatically runs on every push to `main`:

```yaml
name: CI Pipeline

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build
```

---

# 🐳 Docker Setup

## Build Image
```bash
docker build -t resume-ai .
```

## Run Container
```bash
docker run -p 3000:3000 resume-ai
```

---

# 🚀 Vercel Deployment

- Push code to GitHub
- Import repo in Vercel
- Auto deploy enabled
- Every commit triggers live update

---

# 📁 Project Structure

```
ai-resume-analyzer/
├── app/
├── components/
├── utils/
├── data/
├── public/
├── .github/workflows/
├── Dockerfile
├── next.config.js
```

---

# ⚠️ Issues Fixed During Development

## Tailwind / Build Errors
Fixed missing dependencies and PostCSS config issues.

## Git Push Conflicts
Resolved using:
```bash
git pull --rebase origin main
```

## Docker Port Issues
```bash
docker run -p 3001:3000 resume-ai
```

---

# 🏁 Final Outcome

A production-ready AI Resume Analyzer with:

✔ GitHub Actions CI/CD  
✔ Docker containerization  
✔ Vercel deployment  
✔ Modern UI with Next.js  

---

# 👨‍💻 Author

Jhanavi Ravishankar
```
