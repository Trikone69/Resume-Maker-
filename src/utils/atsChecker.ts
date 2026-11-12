import { ResumeData, ATSCheckResult } from '../types/resume';
import { ALL_ACTION_VERBS } from '../data/actionVerbs';

// Common technical and professional keywords for extraction
const TECH_KEYWORDS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'golang', 'go',
  'rust', 'php', 'swift', 'kotlin', 'sql', 'nosql', 'html', 'css', 'react', 'next.js',
  'vue', 'angular', 'svelte', 'node.js', 'express', 'django', 'fastapi', 'flask',
  'spring', 'spring boot', 'graphql', 'rest', 'restful', 'aws', 'azure', 'gcp',
  'cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'git', 'github', 'terraform',
  'linux', 'unix', 'agile', 'scrum', 'jira', 'confluence', 'microservices', 'serverless',
  'redis', 'postgresql', 'postgres', 'mysql', 'mongodb', 'kafka', 'rabbitmq',
  'machine learning', 'deep learning', 'ai', 'data science', 'analytics', 'tableau',
  'power bi', 'looker', 'snowflake', 'spark', 'hadoop', 'pandas', 'numpy', 'scikit-learn',
  'pytorch', 'tensorflow', 'product management', 'roadmapping', 'okrs', 'kpis',
  'user research', 'a/b testing', 'wireframing', 'figma', 'ui/ux', 'design system',
  'cybersecurity', 'security', 'oauth', 'jwt', 'compliance', 'soc2', 'hipaa', 'gdpr'
];

export function analyzeResumeATS(data: ResumeData, jobDescription?: string): ATSCheckResult {
  const criticalIssues: string[] = [];
  const recommendations: string[] = [];
  const strengths: string[] = [];

  // 1. Contact Info Scoring (Max 20 pts)
  let contactScore = 0;
  if (data.personalInfo.fullName.trim().length > 2) {
    contactScore += 5;
  } else {
    criticalIssues.push("Full Name is missing or too short.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(data.personalInfo.email.trim())) {
    contactScore += 5;
  } else {
    criticalIssues.push("A valid email address is required for ATS parsing.");
  }

  if (data.personalInfo.phone.trim().length >= 7) {
    contactScore += 4;
  } else {
    recommendations.push("Add a reliable phone number with area/country code.");
  }

  if (data.personalInfo.location.trim().length > 2) {
    contactScore += 3;
  } else {
    recommendations.push("Add location (City, State/Country) so ATS geographic filters match you.");
  }

  if (data.personalInfo.linkedin.trim() || data.personalInfo.website.trim() || data.personalInfo.github.trim()) {
    contactScore += 3;
    strengths.push("Professional online profile links (LinkedIn/GitHub/Portfolio) included.");
  } else {
    recommendations.push("Include your LinkedIn or personal website link for recruiters.");
  }

  // 2. Structure & Sections Scoring (Max 20 pts)
  let structureScore = 0;
  if (data.experiences.length > 0) {
    structureScore += 7;
    strengths.push(`Work Experience section contains ${data.experiences.length} positions.`);
  } else {
    criticalIssues.push("No Work Experience entries found. This is a primary ATS anchor.");
  }

  if (data.education.length > 0) {
    structureScore += 5;
  } else {
    recommendations.push("Education section is empty. Most ATS filters verify degree level.");
  }

  const totalSkills = data.skills.flatMap(s => s.skills).filter(s => s.trim().length > 0);
  if (totalSkills.length >= 6) {
    structureScore += 5;
    strengths.push(`Good skills breadth (${totalSkills.length} listed skills).`);
  } else if (totalSkills.length > 0) {
    structureScore += 3;
    recommendations.push("Add at least 8-10 skills to improve keyword matching.");
  } else {
    criticalIssues.push("Skills section is empty. ATS keyword matching relies heavily on skills.");
  }

  if (data.personalInfo.summary.trim().length > 0) {
    structureScore += 3;
  } else {
    recommendations.push("Add a 2-4 sentence Professional Summary at the top of your resume.");
  }

  // 3. Impact & Metrics Scoring (Max 25 pts)
  let impactScore = 0;
  const allBullets = data.experiences.flatMap(e => e.bullets).filter(b => b.trim().length > 0);
  
  // Metric regex looks for numbers, percentages, dollar values, multipliers (e.g. 50%, $100k, 10x, 20M, 400+)
  const metricRegex = /(\d+[\d,.]*|\$\d+|\d+%\s*|\b\d+x\b|\b\d+[kKmMbB]\b|\b\d+\+\b)/i;
  const bulletsWithMetrics = allBullets.filter(b => metricRegex.test(b));
  
  if (allBullets.length > 0) {
    const metricRatio = bulletsWithMetrics.length / allBullets.length;
    if (metricRatio >= 0.5) {
      impactScore = 25;
      strengths.push(`Outstanding quantifiable impact: ${Math.round(metricRatio * 100)}% of experience bullets have measurable metrics!`);
    } else if (metricRatio >= 0.3) {
      impactScore = 18;
      recommendations.push(`Good metrics (${Math.round(metricRatio * 100)}% of bullets), try aiming for 50%+ with numbers, dollars, or percentages.`);
    } else if (metricRatio > 0) {
      impactScore = 10;
      recommendations.push("Only a few bullets have numbers. Quantify your results (e.g. 'boosted by 30%', 'saved $50k').");
    } else {
      impactScore = 4;
      criticalIssues.push("No quantifiable numbers or metrics found in experience bullets. Recruiters prioritize measurable achievements.");
    }
  } else {
    impactScore = 0;
  }

  // 4. Action Verbs Scoring (Max 20 pts)
  let verbsScore = 0;
  const weakStarters = ['responsible for', 'duties included', 'worked on', 'helped with', 'assisted in', 'handled'];
  let bulletsStartingWithActionVerb = 0;
  let bulletsWithWeakStarters = 0;

  allBullets.forEach(bullet => {
    const lower = bullet.trim().toLowerCase();
    const firstWord = lower.split(/\s+/)[0]?.replace(/[^a-z]/g, '') || '';
    
    if (weakStarters.some(weak => lower.startsWith(weak))) {
      bulletsWithWeakStarters++;
    } else if (ALL_ACTION_VERBS.includes(firstWord)) {
      bulletsStartingWithActionVerb++;
    }
  });

  if (allBullets.length > 0) {
    const verbRatio = bulletsStartingWithActionVerb / allBullets.length;
    if (verbRatio >= 0.7) {
      verbsScore = 20;
      strengths.push(`Strong active voice: ${Math.round(verbRatio * 100)}% of bullets start with power action verbs.`);
    } else if (verbRatio >= 0.4) {
      verbsScore = 14;
      recommendations.push("Start more bullet points with strong verbs (e.g., 'Spearheaded', 'Engineered', 'Optimized').");
    } else {
      verbsScore = 8;
      recommendations.push("Avoid passive phrasing like 'Responsible for'. Use active verbs instead.");
    }

    if (bulletsWithWeakStarters > 0) {
      recommendations.push(`Detected ${bulletsWithWeakStarters} bullet(s) using passive phrases like 'Responsible for' or 'Worked on'.`);
    }
  }

  // 5. Length & Readability (Max 15 pts)
  let lengthScore = 0;
  const summaryWords = data.personalInfo.summary.trim().split(/\s+/).filter(Boolean).length;
  if (summaryWords >= 25 && summaryWords <= 90) {
    lengthScore += 5;
    strengths.push("Professional summary has an ideal length (25-90 words).");
  } else if (summaryWords > 90) {
    lengthScore += 2;
    recommendations.push("Professional summary is somewhat long. Keep it under 80 words for fast parsing.");
  } else if (summaryWords > 0) {
    lengthScore += 3;
    recommendations.push("Professional summary is very brief. Expand it to 2-3 impact-focused sentences.");
  }

  // Bullet point length check (ideal: 10 - 35 words per bullet)
  const tooLongBullets = allBullets.filter(b => b.split(/\s+/).length > 40);
  const tooShortBullets = allBullets.filter(b => b.split(/\s+/).length < 5);
  
  if (tooLongBullets.length === 0 && tooShortBullets.length === 0 && allBullets.length > 0) {
    lengthScore += 5;
    strengths.push("Bullet points have optimal length (10-35 words per bullet).");
  } else {
    lengthScore += 3;
    if (tooLongBullets.length > 0) {
      recommendations.push(`${tooLongBullets.length} bullet point(s) are too long (over 40 words). Break them up.`);
    }
  }

  // Projects check
  if (data.projects.length > 0) {
    lengthScore += 5;
    strengths.push("Notable projects section included.");
  } else {
    lengthScore += 2;
  }

  // 6. Job Description Keyword Matching (Optional)
  let jobMatchScore: number | undefined;
  let matchedKeywords: string[] = [];
  let missingKeywords: string[] = [];

  if (jobDescription && jobDescription.trim().length > 20) {
    const jdLower = jobDescription.toLowerCase();
    
    // Combine full resume text
    const resumeFullText = [
      data.personalInfo.jobTitle,
      data.personalInfo.summary,
      ...allBullets,
      ...totalSkills,
      ...data.projects.map(p => `${p.title} ${p.subtitle} ${p.bullets.join(' ')} ${p.techStack.join(' ')}`),
      ...data.education.map(e => `${e.degree} ${e.fieldOfStudy}`)
    ].join(' ').toLowerCase();

    // Find keywords in JD
    const targetKeywords = TECH_KEYWORDS.filter(kw => {
      const regex = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      return regex.test(jdLower);
    });

    targetKeywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (regex.test(resumeFullText)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    if (targetKeywords.length > 0) {
      jobMatchScore = Math.round((matchedKeywords.length / targetKeywords.length) * 100);
      if (jobMatchScore >= 80) {
        strengths.push(`High keyword alignment with target job description (${jobMatchScore}% match)!`);
      } else if (jobMatchScore >= 50) {
        recommendations.push(`Moderate job match (${jobMatchScore}%). Consider incorporating missing keywords into skills and experience.`);
      } else {
        recommendations.push(`Low job keyword match (${jobMatchScore}%). Add matching technical keywords from the job description.`);
      }
    }
  }

  // Calculate Overall ATS Score (0 - 100)
  const baseScore = contactScore + structureScore + impactScore + verbsScore + lengthScore;
  const overallScore = Math.min(100, Math.max(0, Math.round(baseScore)));

  return {
    overallScore,
    contactScore,
    structureScore,
    impactScore,
    verbsScore,
    lengthScore,
    jobMatchScore,
    matchedKeywords,
    missingKeywords,
    criticalIssues,
    recommendations,
    strengths
  };
}
