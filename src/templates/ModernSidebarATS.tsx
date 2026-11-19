import React from 'react';
import { ResumeData, ResumeUpdateHandlers } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass, formatUrlForDisplay } from './TemplateHelpers';
import { InlineEditable } from '../components/common/InlineEditable';
import { Mail, Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/icons/SocialIcons';

interface Props {
  data: ResumeData;
  handlers?: ResumeUpdateHandlers;
  isEditable?: boolean;
}

export const ModernSidebarATS: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#0f766e'; // Teal modern accent

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all`}>
      {/* Full Width Top Header */}
      <header className="border-b-2 pb-4 mb-4" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className={`${size.name} font-black tracking-tight text-slate-950`}>
              <InlineEditable
                value={personalInfo.fullName}
                onSave={(val) => handlers?.onUpdatePersonalInfo('fullName', val)}
                isEditable={isEditable}
                placeholder="Full Name"
              />
            </h1>
            {personalInfo.jobTitle && (
              <p className={`${size.title} font-bold tracking-wider uppercase mt-0.5`} style={{ color: accentColor }}>
                <InlineEditable
                  value={personalInfo.jobTitle}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
                  isEditable={isEditable}
                  placeholder="Professional Title"
                />
              </p>
            )}
          </div>
          <div className={`flex flex-wrap items-center sm:justify-end gap-x-3 gap-y-1 ${size.meta} text-slate-600`}>
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <Mail className="w-3 h-3 text-slate-400" />}
                <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <Phone className="w-3 h-3 text-slate-400" />}
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <MapPin className="w-3 h-3 text-slate-400" />}
                <span>{personalInfo.location}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 2-Column Responsive Layout (Sequential in DOM for Perfect ATS Parsing) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Meta, Skills, Education, Certifications (4 cols) */}
        <div className="md:col-span-4 space-y-4 border-r-0 md:border-r md:pr-4 border-slate-200">
          {/* Social Links */}
          {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
            <div className="space-y-1.5 pb-3 border-b border-slate-100">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Profiles & Links</span>
              <div className="flex flex-col gap-1 text-[11px] text-slate-700">
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline" style={{ color: accentColor }}>
                    <LinkedinIcon className="w-3 h-3" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline text-slate-700">
                    <GithubIcon className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                )}
                {personalInfo.website && (
                  <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline text-slate-700">
                    <Globe className="w-3 h-3" />
                    <span className="truncate max-w-[150px]">{formatUrlForDisplay(personalInfo.website)}</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Skills Breakdown */}
          {skills.length > 0 && (
            <div className="space-y-3">
              <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider pb-1 border-b border-slate-200`} style={{ color: accentColor }}>
                Skills & Tools
              </h2>
              <div className="space-y-2">
                {skills.map((cat) => (
                  <div key={cat.id} className="text-xs">
                    <span className="font-bold text-slate-900 block mb-1 text-[11px]">
                      <InlineEditable
                        value={cat.category}
                        onSave={(val) => handlers?.onUpdateSkillCategory(cat.id, val)}
                        isEditable={isEditable}
                      />
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[9.5px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">
                          <InlineEditable
                            value={skill}
                            onSave={(val) => handlers?.onUpdateSkill(cat.id, sIdx, val)}
                            isEditable={isEditable}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-2.5">
              <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider pb-1 border-b border-slate-200`} style={{ color: accentColor }}>
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">
                      <InlineEditable
                        value={edu.degree}
                        onSave={(val) => handlers?.onUpdateEducation(edu.id, 'degree', val)}
                        isEditable={isEditable}
                        placeholder="Degree"
                      />
                      {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                    </div>
                    <div className="text-[11px] text-slate-600">{edu.institution}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {edu.startDate} {edu.endDate && `– ${edu.endDate}`}
                    </div>
                    {(edu.gpa || edu.honors) && (
                      <div className="text-[10px] text-slate-600 mt-0.5">
                        {edu.gpa && `GPA: ${edu.gpa} `}
                        {edu.honors}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="space-y-2">
              <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider pb-1 border-b border-slate-200`} style={{ color: accentColor }}>
                Certifications
              </h2>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-semibold text-slate-900">{cert.name}</div>
                    <div className="text-[10px] text-slate-500">{cert.issuer} {cert.issueDate && `• ${cert.issueDate}`}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Summary, Experience, Projects (8 cols) */}
        <div className="md:col-span-8 space-y-4">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="resume-section">
              <h2 className={`${size.sectionHeader} font-bold tracking-wider uppercase mb-1.5 pb-0.5 border-b border-slate-200`} style={{ color: accentColor }}>
                Professional Profile
              </h2>
              <div className={`${size.body} text-slate-800 leading-relaxed text-justify`}>
                <InlineEditable
                  value={personalInfo.summary}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                  isEditable={isEditable}
                  multiline
                  placeholder="Professional background and career highlights..."
                />
              </div>
            </section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <section className="resume-section">
              <h2 className={`${size.sectionHeader} font-bold tracking-wider uppercase mb-2 pb-0.5 border-b border-slate-200`} style={{ color: accentColor }}>
                Experience
              </h2>
              <div className="space-y-3.5">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <span className={`${size.subHeader} font-bold text-slate-950`}>
                        <InlineEditable
                          value={exp.jobTitle}
                          onSave={(val) => handlers?.onUpdateExperience(exp.id, 'jobTitle', val)}
                          isEditable={isEditable}
                          placeholder="Job Title"
                        />
                      </span>
                      <span className={`${size.meta} text-slate-500 font-medium`}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1.5">
                      <span className={`${size.meta} font-semibold text-slate-700`}>
                        <InlineEditable
                          value={exp.company}
                          onSave={(val) => handlers?.onUpdateExperience(exp.id, 'company', val)}
                          isEditable={isEditable}
                          placeholder="Company"
                        />
                        {exp.location && ` • ${exp.location}`}
                      </span>
                    </div>
                    {exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-1 text-slate-800">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className={`${size.bullet} leading-relaxed group/bullet relative`}>
                            <InlineEditable
                              value={bullet}
                              onSave={(val) => handlers?.onUpdateBullet(exp.id, idx, val)}
                              isEditable={isEditable}
                            />
                            {isEditable && handlers && (
                              <span className="no-print opacity-0 group-hover/bullet:opacity-100 transition-opacity ml-1 inline-flex gap-1 text-[10px] text-slate-400">
                                <button
                                  type="button"
                                  onClick={() => handlers.onDeleteBullet(exp.id, idx)}
                                  className="text-rose-500 hover:text-rose-700"
                                >
                                  ×
                                </button>
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    {isEditable && handlers && (
                      <div className="no-print mt-1">
                        <button
                          type="button"
                          onClick={() => handlers.onAddBullet(exp.id)}
                          className="text-[10px] text-sky-700 hover:text-sky-900 font-medium"
                        >
                          + Add bullet
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="resume-section">
              <h2 className={`${size.sectionHeader} font-bold tracking-wider uppercase mb-2 pb-0.5 border-b border-slate-200`} style={{ color: accentColor }}>
                Key Projects & Initiatives
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <span className={`${size.subHeader} font-bold text-slate-950`}>
                        <InlineEditable
                          value={proj.title}
                          onSave={(val) => handlers?.onUpdateProject(proj.id, 'title', val)}
                          isEditable={isEditable}
                        />
                      </span>
                      {(proj.startDate || proj.endDate) && (
                        <span className={`${size.meta} text-slate-500`}>
                          {proj.startDate} {proj.endDate && `– ${proj.endDate}`}
                        </span>
                      )}
                    </div>
                    {proj.subtitle && (
                      <p className={`${size.meta} text-slate-600 mb-1`}>{proj.subtitle}</p>
                    )}
                    {proj.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-800">
                        {proj.bullets.map((bullet, idx) => (
                          <li key={idx} className={`${size.bullet} leading-relaxed`}>
                            <InlineEditable
                              value={bullet}
                              onSave={(val) => handlers?.onUpdateProjectBullet(proj.id, idx, val)}
                              isEditable={isEditable}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {customSections.map((sec) => (
            <section key={sec.id} className="resume-section">
              <h2 className={`${size.sectionHeader} font-bold tracking-wider uppercase mb-1.5 pb-0.5 border-b border-slate-200`} style={{ color: accentColor }}>
                {sec.title}
              </h2>
              <div className="space-y-2">
                {sec.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between font-bold text-slate-950 text-xs">
                      <span>{item.title}</span>
                      {item.date && <span className="text-slate-500 text-[10.5px]">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-[11px] text-slate-600">{item.subtitle}</p>}
                    {item.description && <p className={`${size.bullet} text-slate-800 mt-0.5`}>{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
