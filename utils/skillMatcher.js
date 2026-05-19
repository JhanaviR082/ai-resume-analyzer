import { SKILLS } from "@/data/skills";

function getInsight(score) {
  if (score > 70) return "Strong match for most job roles.";
  if (score > 40) return "Moderate match. Improve missing core skills.";
  return "Weak match. Major skill gaps found.";
}

export function analyzeResume(text) {
  const normalized = text.toLowerCase();

  const matchedSkills = [];
  const missingSkills = [];

  let totalScore = 0;
  let maxScore = SKILLS.length;

  SKILLS.forEach((skill) => {
    const s = skill.toLowerCase();

    let score = 0;

    // EXACT MATCH
    if (normalized.includes(s)) {
      score = 1;
    }
    // PARTIAL MATCH (React.js vs React)
    else if (normalized.includes(s.split(" ")[0])) {
      score = 0.5;
    }

    if (score > 0) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }

    totalScore += score;
  });

  const finalScore = Math.round((totalScore / maxScore) * 100);

  return {
    matchedSkills,
    missingSkills,
    score: finalScore,
    matchedCount: matchedSkills.length,
    missingCount: missingSkills.length,
    totalSkills: maxScore,
    insight: getInsight(finalScore),
  };
}
