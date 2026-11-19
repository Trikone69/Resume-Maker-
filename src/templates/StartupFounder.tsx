import React from 'react';
import { ResumeData, ResumeUpdateHandlers } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass, formatUrlForDisplay } from './TemplateHelpers';
import { InlineEditable } from '../components/common/InlineEditable';
import { Rocket, TrendingUp, Target, Award } from 'lucide-react';

interface Props {
  data: ResumeData;
  handlers?: ResumeUpdateHandlers;
  isEditable?: boolean;
}

export const StartupFounder: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#4f46e5'; // Indigo founder accent

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all`}>
      {/* Founder / PM Header */}
      <header className="pb-3.5 mb-4 border-b-2" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
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
              <p className={`${size.title} font-extrabold uppercase tracking-wide mt-0.5 flex items-center gap-1.5`} style={{ color: accentColor }}>
                <Rocket className="w-3.5 h-3.5 inline" />
                <InlineEditable
                  value={personalInfo.jobTitle}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
                  isEditable={isEditable}
                  placeholder="Founder & Head of Product / VP of Growth"
                />
              </p>
            )}
          </div>

          {/* Quick Contact Chips */}
          <div className={`flex flex-wrap items-center sm:justify-end gap-x-3 gap-y-1 ${size.meta} text-slate-600 font-medium`}>
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
            )}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                • LinkedIn
              </a>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="text-slate-700 hover:underline">
                • {formatUrlForDisplay(personalInfo.website)}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <div className={spacingClass}>
        {/* Executive Product & Growth Summary */}
        {personalInfo.summary && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5 flex items-center gap-1.5`} style={{ color: accentColor }}>
              <TrendingUp className="w-3.5 h-3.5 inline" />
              <span>Executive Summary & Traction</span>
            </h2>
            <div className={`${size.body} text-slate-800 leading-relaxed text-justify bg-indigo-50/40 p-3 rounded-lg border border-indigo-100`}>
              <InlineEditable
                value={personalInfo.summary}
                onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                isEditable={isEditable}
                multiline
                placeholder="Product vision, $ARR revenue scale, user growth numbers, M&A/fundraising track record..."
              />
            </div>
          </section>
        )}

        {/* Core Competencies & Strategy Matrix */}
        {skills.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
              Strategic Competencies & Growth Toolkit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skills.map((cat) => (
                <div key={cat.id} className="p-2 rounded bg-slate-50 border border-slate-200 text-xs">
                  <div className="font-bold text-slate-950 mb-1 flex items-center gap-1">
                    <Target className="w-3 h-3 text-indigo-500" />
                    <InlineEditable
                      value={cat.category}
                      onSave={(val) => handlers?.onUpdateSkillCategory(cat.id, val)}
                      isEditable={isEditable}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="bg-white border border-slate-300 text-slate-800 px-1.5 py-0.5 rounded text-[10px] font-medium shadow-xs">
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
          </section>
        )}

        {/* Leadership & Track Record Experience */}
        {experiences.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
              Venture Leadership & Career Track Record
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: accentColor }}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className={`${size.subHeader} font-black text-slate-950`}>
                      <InlineEditable
                        value={exp.jobTitle}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'jobTitle', val)}
                        isEditable={isEditable}
                        placeholder="Founder / Head of Product"
                      />
                    </span>
                    <span className={`${size.meta} font-bold text-indigo-700`}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1.5">
                    <span className={`${size.meta} font-semibold text-slate-700`}>
                      <InlineEditable
                        value={exp.company}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'company', val)}
                        isEditable={isEditable}
                        placeholder="Startup / Company"
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
                            placeholder="Spearheaded product from zero to $2M ARR with 42% MoM growth..."
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
                        className="text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        + Add outcome / metric
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ventures, Launches & Key Initiatives */}
        {projects.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
              Key Product Launches & Strategic Initiatives
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 pl-3 border-slate-300">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className={`${size.subHeader} font-bold text-slate-950 flex items-center gap-1.5`}>
                      <InlineEditable
                        value={proj.title}
                        onSave={(val) => handlers?.onUpdateProject(proj.id, 'title', val)}
                        isEditable={isEditable}
                        placeholder="Product Name / Initiative"
                      />
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-600 text-[10.5px] font-semibold hover:underline">
                          [Link]
                        </a>
                      )}
                    </span>
                    {(proj.startDate || proj.endDate) && (
                      <span className={`${size.meta} text-slate-500 font-medium`}>
                        {proj.startDate} {proj.endDate && `– ${proj.endDate}`}
                      </span>
                    )}
                  </div>
                  {proj.subtitle && (
                    <p className={`${size.meta} text-slate-600 mb-1 font-medium`}>
                      <InlineEditable
                        value={proj.subtitle}
                        onSave={(val) => handlers?.onUpdateProject(proj.id, 'subtitle', val)}
                        isEditable={isEditable}
                        placeholder="0-to-1 Marketplace / Series A Milestone"
                      />
                    </p>
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

        {/* Education & Advisory Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {education.length > 0 && (
            <section className="resume-section">
              <h2 className={`${size.sectionHeader} font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-950 text-xs">
                      <InlineEditable
                        value={edu.degree}
                        onSave={(val) => handlers?.onUpdateEducation(edu.id, 'degree', val)}
                        isEditable={isEditable}
                        placeholder="Degree"
                      />
                      {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                    </div>
                    <div className="text-[11px] text-slate-600 flex justify-between">
                      <span>{edu.institution}</span>
                      <span>{edu.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="resume-section">
              <h2 className={`${size.sectionHeader} font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
                Awards & Advisory Roles
              </h2>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs flex justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Award className="w-3 h-3 text-indigo-500" />
                      {cert.name}
                    </span>
                    <span className="text-slate-500 text-[10.5px]">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Custom Sections */}
        {customSections.map((sec) => (
          <section key={sec.id} className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
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
  );
};
