import { ResumeData } from '../types/resume';

export function generatePlainTextResume(data: ResumeData): string {
  const lines: string[] = [];
  const divider = '='.repeat(60);
  const subDivider = '-'.repeat(60);

  // Header / Contact Info
  lines.push(data.personalInfo.fullName.toUpperCase());
  if (data.personalInfo.jobTitle) {
    lines.push(data.personalInfo.jobTitle);
  }
  
  const contactParts: string[] = [];
  if (data.personalInfo.email) contactParts.push(data.personalInfo.email);
  if (data.personalInfo.phone) contactParts.push(data.personalInfo.phone);
  if (data.personalInfo.location) contactParts.push(data.personalInfo.location);
  if (contactParts.length > 0) {
    lines.push(contactParts.join(' | '));
  }

  const linkParts: string[] = [];
  if (data.personalInfo.linkedin) linkParts.push(`LinkedIn: ${data.personalInfo.linkedin}`);
  if (data.personalInfo.github) linkParts.push(`GitHub: ${data.personalInfo.github}`);
  if (data.personalInfo.website) linkParts.push(`Portfolio: ${data.personalInfo.website}`);
  if (linkParts.length > 0) {
    lines.push(linkParts.join(' | '));
  }

  lines.push('');

  // Professional Summary
  if (data.personalInfo.summary) {
    lines.push(divider);
    lines.push('PROFESSIONAL SUMMARY');
    lines.push(divider);
    lines.push(data.personalInfo.summary);
    lines.push('');
  }

  // Work Experience
  if (data.experiences.length > 0) {
    lines.push(divider);
    lines.push('WORK EXPERIENCE');
    lines.push(divider);
    data.experiences.forEach(exp => {
      const dates = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
      lines.push(`${exp.jobTitle.toUpperCase()} | ${exp.company} | ${exp.location}`);
      lines.push(`Period: ${dates}`);
      exp.bullets.filter(b => b.trim().length > 0).forEach(b => {
        lines.push(`• ${b.trim()}`);
      });
      lines.push('');
    });
  }

  // Skills
  if (data.skills.length > 0) {
    lines.push(divider);
    lines.push('CORE SKILLS & EXPERTISE');
    lines.push(divider);
    data.skills.forEach(cat => {
      if (cat.skills.length > 0) {
        lines.push(`${cat.category}: ${cat.skills.join(', ')}`);
      }
    });
    lines.push('');
  }

  // Projects
  if (data.projects.length > 0) {
    lines.push(divider);
    lines.push('KEY PROJECTS');
    lines.push(divider);
    data.projects.forEach(proj => {
      const dates = proj.startDate ? ` (${proj.startDate}${proj.endDate ? ` - ${proj.endDate}` : ''})` : '';
      lines.push(`${proj.title.toUpperCase()}${dates}`);
      if (proj.subtitle) lines.push(`Role / Focus: ${proj.subtitle}`);
      if (proj.link || proj.github) {
        const links = [proj.link, proj.github].filter(Boolean).join(' | ');
        lines.push(`Links: ${links}`);
      }
      if (proj.techStack && proj.techStack.length > 0) {
        lines.push(`Technologies: ${proj.techStack.join(', ')}`);
      }
      proj.bullets.filter(b => b.trim().length > 0).forEach(b => {
        lines.push(`• ${b.trim()}`);
      });
      lines.push('');
    });
  }

  // Education
  if (data.education.length > 0) {
    lines.push(divider);
    lines.push('EDUCATION');
    lines.push(divider);
    data.education.forEach(edu => {
      const dates = `${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`;
      lines.push(`${edu.degree} in ${edu.fieldOfStudy}`);
      lines.push(`${edu.institution} | ${edu.location} | ${dates}`);
      if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
      if (edu.honors) lines.push(`Honors: ${edu.honors}`);
      lines.push('');
    });
  }

  // Certifications
  if (data.certifications.length > 0) {
    lines.push(divider);
    lines.push('CERTIFICATIONS & LICENSES');
    lines.push(divider);
    data.certifications.forEach(cert => {
      const dateStr = cert.issueDate ? ` (${cert.issueDate}${cert.expiryDate ? ` - ${cert.expiryDate}` : ''})` : '';
      let line = `• ${cert.name} - ${cert.issuer}${dateStr}`;
      if (cert.credentialId) line += ` [ID: ${cert.credentialId}]`;
      lines.push(line);
      if (cert.url) lines.push(`  Verification: ${cert.url}`);
    });
    lines.push('');
  }

  // Custom Sections
  if (data.customSections.length > 0) {
    data.customSections.forEach(section => {
      lines.push(divider);
      lines.push(section.title.toUpperCase());
      lines.push(divider);
      section.items.forEach(item => {
        lines.push(`${item.title} ${item.date ? `(${item.date})` : ''}`);
        if (item.subtitle) lines.push(`  ${item.subtitle}`);
        if (item.description) lines.push(`  ${item.description}`);
      });
      lines.push('');
    });
  }

  return lines.join('\n');
}
