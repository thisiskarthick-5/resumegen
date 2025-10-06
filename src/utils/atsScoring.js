// ATS Scoring Engine
export const calculateATSScore = (resumeData, jobDescription = '') => {
  let score = 0;
  const issues = [];
  const suggestions = [];

  // 1. Contact Information (15 points)
  const { personalInfo } = resumeData;
  if (personalInfo.fullName && personalInfo.email && personalInfo.phone) {
    score += 15;
  } else {
    issues.push('Missing essential contact information');
  }

  // 2. Professional Summary (10 points)
  if (resumeData.summary && resumeData.summary.length > 50) {
    score += 10;
  } else {
    issues.push('Professional summary too short or missing');
  }

  // 3. Skills Section (20 points)
  if (resumeData.skills && resumeData.skills.length >= 5) {
    score += 20;
  } else {
    issues.push('Need at least 5 relevant skills');
  }

  // 4. Work Experience (25 points)
  if (resumeData.experience && resumeData.experience.length > 0) {
    score += 15;
    // Check for action verbs and metrics
    const hasActionVerbs = resumeData.experience.some(exp => 
      exp.description && /\b(developed|implemented|managed|created|improved|increased|reduced|led|designed|built)\b/i.test(exp.description)
    );
    if (hasActionVerbs) score += 5;
    
    const hasMetrics = resumeData.experience.some(exp => 
      exp.description && /\d+%|\d+\+|increased|improved|reduced|saved/i.test(exp.description)
    );
    if (hasMetrics) score += 5;
  } else {
    issues.push('Missing work experience section');
  }

  // 5. Education (10 points)
  if (resumeData.education && resumeData.education.length > 0) {
    score += 10;
  } else {
    issues.push('Missing education section');
  }

  // 6. Projects (10 points)
  if (resumeData.projects && resumeData.projects.length > 0) {
    score += 10;
  } else {
    suggestions.push('Add relevant projects to strengthen your profile');
  }

  // 7. Keyword Matching (10 points)
  if (jobDescription) {
    const keywordMatch = calculateKeywordMatch(resumeData, jobDescription);
    score += Math.floor(keywordMatch * 10);
    if (keywordMatch < 0.7) {
      suggestions.push(`Keyword match: ${Math.round(keywordMatch * 100)}%. Aim for 70%+`);
    }
  }

  // Format checks
  const formatIssues = checkFormatting(resumeData);
  if (formatIssues.length === 0) {
    score += 5; // Bonus for good formatting
  } else {
    issues.push(...formatIssues);
  }

  return {
    score: Math.min(score, 100),
    issues,
    suggestions,
    keywordMatch: jobDescription ? calculateKeywordMatch(resumeData, jobDescription) : 0
  };
};

const calculateKeywordMatch = (resumeData, jobDescription) => {
  if (!jobDescription) return 0;

  const jdWords = extractKeywords(jobDescription.toLowerCase());
  const resumeText = [
    resumeData.summary,
    ...resumeData.skills,
    ...resumeData.experience.map(exp => `${exp.title} ${exp.company} ${exp.description}`),
    ...resumeData.projects.map(proj => `${proj.name} ${proj.description}`)
  ].join(' ').toLowerCase();

  const resumeWords = extractKeywords(resumeText);
  const matches = jdWords.filter(word => resumeWords.includes(word));
  
  return jdWords.length > 0 ? matches.length / jdWords.length : 0;
};

const extractKeywords = (text) => {
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'shall', 'a', 'an'];
  
  return text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .filter((word, index, arr) => arr.indexOf(word) === index);
};

const checkFormatting = (resumeData) => {
  const issues = [];
  
  // Check for consistent date formats
  const dateRegex = /\d{2}\/\d{4}|\w+ \d{4}/;
  const allDates = [
    ...resumeData.experience.map(exp => `${exp.startDate} ${exp.endDate}`),
    ...resumeData.education.map(edu => edu.graduationDate || ''),
    ...resumeData.projects.map(proj => proj.date || '')
  ].join(' ');
  
  if (allDates && !dateRegex.test(allDates)) {
    issues.push('Use consistent date format (MM/YYYY or Month YYYY)');
  }

  return issues;
};

export const getActionVerbs = () => [
  'Achieved', 'Administered', 'Analyzed', 'Built', 'Created', 'Delivered', 'Developed',
  'Designed', 'Enhanced', 'Established', 'Executed', 'Generated', 'Implemented',
  'Improved', 'Increased', 'Led', 'Managed', 'Optimized', 'Organized', 'Reduced',
  'Resolved', 'Streamlined', 'Supervised', 'Transformed'
];