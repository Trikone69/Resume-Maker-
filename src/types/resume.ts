export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  honors: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  github: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  techStack: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  url: string;
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomItem[];
}

export type TemplateId = 
  | 'ats-classic' 
  | 'modern-clean' 
  | 'executive' 
  | 'technical-grid' 
  | 'elegant-compact'
  | 'finance-corporate'
  | 'creative-minimal'
  | 'medical-clinical'
  | 'legal-consulting'
  | 'nordic-clean';

export type FontFamily = 
  | 'inter' 
  | 'roboto' 
  | 'merriweather' 
  | 'garamond' 
  | 'mono' 
  | 'lato';

export type FontSize = 'compact' | 'normal' | 'spacious';
export type MarginSize = 'compact' | 'normal' | 'spacious';
export type LineSpacing = 'compact' | 'normal' | 'relaxed';
export type PaperSize = 'a4' | 'letter';

export interface ResumeCustomization {
  template: TemplateId;
  fontFamily: FontFamily;
  fontSize: FontSize;
  accentColor: string;
  marginSize: MarginSize;
  lineSpacing: LineSpacing;
  paperSize: PaperSize;
  showIcons: boolean;
  sectionOrder: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  customSections: CustomSection[];
  customization: ResumeCustomization;
}

export interface ATSCheckResult {
  overallScore: number;
  contactScore: number;
  structureScore: number;
  impactScore: number;
  verbsScore: number;
  lengthScore: number;
  jobMatchScore?: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  criticalIssues: string[];
  recommendations: string[];
  strengths: string[];
}

export interface ResumeUpdateHandlers {
  onUpdatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;
  onUpdateExperience: (id: string, field: keyof Experience, value: any) => void;
  onUpdateBullet: (expId: string, idx: number, value: string) => void;
  onAddBullet: (expId: string) => void;
  onDeleteBullet: (expId: string, idx: number) => void;
  onUpdateSkillCategory: (catId: string, name: string) => void;
  onUpdateSkill: (catId: string, idx: number, value: string) => void;
  onAddSkill: (catId: string, value: string) => void;
  onDeleteSkill: (catId: string, idx: number) => void;
  onUpdateEducation: (id: string, field: keyof Education, value: any) => void;
  onUpdateProject: (id: string, field: keyof Project, value: any) => void;
  onUpdateProjectBullet: (projId: string, idx: number, value: string) => void;
  onUpdateCertification: (id: string, field: keyof Certification, value: string) => void;
  onUpdateCustomItem: (sectionId: string, itemId: string, field: keyof CustomItem, value: string) => void;
}
