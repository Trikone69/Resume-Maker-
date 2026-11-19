import React from 'react';
import { ResumeData, ResumeUpdateHandlers } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass, formatUrlForDisplay } from './TemplateHelpers';
import { InlineEditable } from '../components/common/InlineEditable';

interface Props {
  data: ResumeData;
  handlers?: ResumeUpdateHandlers;
  isEditable?: boolean;
}

export const MinimalistBold: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#000000'; // Pure stark black or deep tone

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all`}>
      {/* Bold Minimalist Header */}
      <header className="border-b-4 border-slate-950 pb-4 mb-4">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 uppercase tracking-tight mb-1">
          <InlineEditable
            value={personalInfo.fullName}
            onSave={(val) => handlers?.onUpdatePersonalInfo('fullName', val)}
            isEditable={isEditable}
            placeholder="FULL NAME"
          />
        </h1>
        {personalInfo.jobTitle && (
          <p className={`${size.title} font-bold tracking-widest uppercase text-slate-700 mb-3`} style={{ color: accentColor !== '#000000' ? accentColor : undefined }}>
            <InlineEditable
              value={personalInfo.jobTitle}
              onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
              isEditable={isEditable}
              placeholder="TITLE / SPECIALIZATION"
            />
          </p>
        )}

        {/* Minimal Contact Row */}
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${size.meta} text-slate-700 font-medium`}>
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
          )}
          {personalInfo.phone && <span>/ {personalInfo.phone}</span>}
          {personalInfo.location && <span>/ {personalInfo.location}</span>}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
              / {formatUrlForDisplay(personalInfo.website)}
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
              / LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
              / GitHub
            </a>
          )}
        </div>
      </header>

      {/* Main Body */}
      <div className={spacingClass}>
        {/* Summary */}
        {personalInfo.summary && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-2`}>
              Profile
            </h2>
            <div className={`${size.body} text-slate-800 leading-relaxed text-justify`}>
              <InlineEditable
                value={personalInfo.summary}
                onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                isEditable={isEditable}
                multiline
                placeholder="Brief profile statement..."
              />
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-2`}>
              Experience
            </h2>
            <div className="space-y-4">
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
                    <span className={`${size.meta} font-mono font-bold text-slate-800`}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1.5 text-slate-700">
                    <span className={`${size.meta} font-medium`}>
                      <InlineEditable
                        value={exp.company}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'company', val)}
                        isEditable={isEditable}
                        placeholder="Company"
                      />
                      {exp.location && ` / ${exp.location}`}
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
                        className="text-[10px] text-slate-950 hover:underline font-bold uppercase"
                      >
                        + Add bullet point
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-2`}>
              Skills
            </h2>
            <div className="space-y-1.5">
              {skills.map((cat) => (
                <div key={cat.id} className={`${size.body} text-slate-800`}>
                  <span className="font-bold text-slate-950 uppercase text-[10.5px]">{cat.category}: </span>
                  <span>{cat.skills.join(' / ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-2`}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className={`${size.subHeader} font-bold text-slate-950`}>
                      <InlineEditable
                        value={edu.degree}
                        onSave={(val) => handlers?.onUpdateEducation(edu.id, 'degree', val)}
                        isEditable={isEditable}
                      />
                      {edu.fieldOfStudy && <span>, {edu.fieldOfStudy}</span>}
                    </span>
                    <span className={`${size.meta} font-mono font-bold text-slate-800`}>
                      {edu.startDate} {edu.endDate && `– ${edu.endDate}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className={`${size.meta}`}>{edu.institution} {edu.location && `/ ${edu.location}`}</span>
                    {(edu.gpa || edu.honors) && (
                      <span className={`${size.meta} font-medium`}>
                        {edu.gpa && `GPA: ${edu.gpa} `}
                        {edu.honors}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-2`}>
              Projects
            </h2>
            <div className="space-y-2.5">
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
                      <span className={`${size.meta} font-mono text-slate-700`}>
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-2`}>
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between text-xs text-slate-800">
                  <span className="font-bold text-slate-950">{cert.name} — {cert.issuer}</span>
                  {cert.issueDate && <span className="font-mono text-slate-600">{cert.issueDate}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.map((sec) => (
          <section key={sec.id} className="resume-section">
            <h2 className={`${size.sectionHeader} font-black uppercase tracking-widest text-slate-950 border-b-2 border-slate-950 pb-0.5 mb-2`}>
              {sec.title}
            </h2>
            <div className="space-y-2">
              {sec.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between font-bold text-slate-950 text-xs">
                    <span>{item.title}</span>
                    {item.date && <span className="font-mono text-slate-600">{item.date}</span>}
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
