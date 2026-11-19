import React from 'react';
import { ResumeData, ResumeUpdateHandlers } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass, formatUrlForDisplay } from './TemplateHelpers';
import { InlineEditable } from '../components/common/InlineEditable';

interface Props {
  data: ResumeData;
  handlers?: ResumeUpdateHandlers;
  isEditable?: boolean;
}

export const IvyLeagueAcademic: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily || 'garamond');
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#78350f'; // Warm bronze/burgundy academic tone

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all font-serif`}>
      {/* Formal Academic Header */}
      <header className="border-b-2 border-slate-900 pb-4 mb-4 text-center">
        <h1 className={`${size.name} font-serif font-bold text-slate-950 uppercase tracking-widest mb-1.5`}>
          <InlineEditable
            value={personalInfo.fullName}
            onSave={(val) => handlers?.onUpdatePersonalInfo('fullName', val)}
            isEditable={isEditable}
            placeholder="FULL NAME, PH.D."
          />
        </h1>
        {personalInfo.jobTitle && (
          <p className={`${size.title} font-serif italic text-slate-700 tracking-wide mb-2.5`}>
            <InlineEditable
              value={personalInfo.jobTitle}
              onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
              isEditable={isEditable}
              placeholder="Academic Rank / Department / Focus Area"
            />
          </p>
        )}

        {/* Contact Strip with Middots */}
        <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 ${size.meta} text-slate-700 font-serif border-t border-slate-300 pt-2`}>
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
            </span>
          )}
          {personalInfo.phone && (
            <>
              <span className="text-slate-400 select-none">•</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.location && (
            <>
              <span className="text-slate-400 select-none">•</span>
              <span>{personalInfo.location}</span>
            </>
          )}
          {personalInfo.website && (
            <>
              <span className="text-slate-400 select-none">•</span>
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                {formatUrlForDisplay(personalInfo.website)}
              </a>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span className="text-slate-400 select-none">•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </>
          )}
        </div>
      </header>

      {/* Main Content Body */}
      <div className={spacingClass}>
        {/* Education (Placed First for Academic / Ivy Standard) */}
        {education.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-2.5 text-center`}>
              Education & Academic Credentials
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className={`${size.subHeader} font-serif font-bold text-slate-950`}>
                      <InlineEditable
                        value={edu.degree}
                        onSave={(val) => handlers?.onUpdateEducation(edu.id, 'degree', val)}
                        isEditable={isEditable}
                        placeholder="Degree Awarded"
                      />
                      {edu.fieldOfStudy && (
                        <span> in {edu.fieldOfStudy}</span>
                      )}
                    </span>
                    <span className={`${size.meta} text-slate-600 font-serif italic`}>
                      {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-slate-700">
                    <span className={`${size.meta} font-serif italic`}>
                      <InlineEditable
                        value={edu.institution}
                        onSave={(val) => handlers?.onUpdateEducation(edu.id, 'institution', val)}
                        isEditable={isEditable}
                        placeholder="University / College Name"
                      />
                      {edu.location && `, ${edu.location}`}
                    </span>
                    {(edu.gpa || edu.honors) && (
                      <span className={`${size.meta} text-slate-700 font-medium`}>
                        {edu.gpa && `GPA: ${edu.gpa}`}
                        {edu.gpa && edu.honors && ' | '}
                        {edu.honors}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Academic / Research Summary */}
        {personalInfo.summary && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-2 text-center`}>
              Research Profile & Overview
            </h2>
            <div className={`${size.body} text-slate-800 leading-relaxed text-justify font-serif`}>
              <InlineEditable
                value={personalInfo.summary}
                onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                isEditable={isEditable}
                multiline
                placeholder="Brief summary of research focus, academic honors, or professional background..."
              />
            </div>
          </section>
        )}

        {/* Professional & Academic Experience */}
        {experiences.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-2.5 text-center`}>
              Academic & Professional Appointments
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className={`${size.subHeader} font-serif font-bold text-slate-950`}>
                      <InlineEditable
                        value={exp.jobTitle}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'jobTitle', val)}
                        isEditable={isEditable}
                        placeholder="Appointment / Title"
                      />
                    </span>
                    <span className={`${size.meta} text-slate-600 font-serif italic`}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1.5">
                    <span className={`${size.meta} font-serif italic text-slate-700`}>
                      <InlineEditable
                        value={exp.company}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'company', val)}
                        isEditable={isEditable}
                        placeholder="Institution / Organization"
                      />
                      {exp.location && `, ${exp.location}`}
                    </span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-800 font-serif">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className={`${size.bullet} leading-relaxed text-justify group/bullet relative`}>
                          <InlineEditable
                            value={bullet}
                            onSave={(val) => handlers?.onUpdateBullet(exp.id, idx, val)}
                            isEditable={isEditable}
                            placeholder="Detail research findings, courses taught, leadership, or quantitative impact..."
                          />
                          {isEditable && handlers && (
                            <span className="no-print opacity-0 group-hover/bullet:opacity-100 transition-opacity ml-1 inline-flex gap-1 text-[10px] text-slate-400">
                              <button
                                type="button"
                                onClick={() => handlers.onDeleteBullet(exp.id, idx)}
                                className="text-rose-500 hover:text-rose-700"
                                title="Remove bullet"
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
                        className="text-[10px] text-sky-700 hover:text-sky-900 font-serif italic"
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

        {/* Publications, Research Projects & Grants */}
        {projects.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-2.5 text-center`}>
              Selected Publications, Grants & Research
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className={`${size.subHeader} font-serif font-bold text-slate-950`}>
                      <InlineEditable
                        value={proj.title}
                        onSave={(val) => handlers?.onUpdateProject(proj.id, 'title', val)}
                        isEditable={isEditable}
                        placeholder="Publication Title or Grant"
                      />
                    </span>
                    {(proj.startDate || proj.endDate) && (
                      <span className={`${size.meta} text-slate-600 font-serif italic`}>
                        {proj.startDate} {proj.endDate && `– ${proj.endDate}`}
                      </span>
                    )}
                  </div>
                  {proj.subtitle && (
                    <p className={`${size.meta} font-serif italic text-slate-700 mb-1`}>
                      <InlineEditable
                        value={proj.subtitle}
                        onSave={(val) => handlers?.onUpdateProject(proj.id, 'subtitle', val)}
                        isEditable={isEditable}
                        placeholder="Journal, Conference, or Funding Agency"
                      />
                    </p>
                  )}
                  {proj.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-800 font-serif">
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

        {/* Expertise & Skills */}
        {skills.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-2 text-center`}>
              Areas of Specialization & Methodologies
            </h2>
            <div className="space-y-1.5 font-serif">
              {skills.map((cat) => (
                <div key={cat.id} className={`${size.body} text-slate-800`}>
                  <span className="font-bold text-slate-950">{cat.category}: </span>
                  <span>{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Licensure */}
        {certifications.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-2 text-center`}>
              Fellowships, Honors & Certifications
            </h2>
            <div className="space-y-1 font-serif">
              {certifications.map((cert) => (
                <div key={cert.id} className={`flex justify-between ${size.body} text-slate-800`}>
                  <span>
                    <span className="font-bold text-slate-950">{cert.name}</span>
                    {cert.issuer && ` — ${cert.issuer}`}
                  </span>
                  {cert.issueDate && (
                    <span className={`${size.meta} text-slate-600 italic`}>{cert.issueDate}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.map((sec) => (
          <section key={sec.id} className="resume-section">
            <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-2 text-center`}>
              {sec.title}
            </h2>
            <div className="space-y-2 font-serif">
              {sec.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between">
                    <span className={`${size.subHeader} font-bold text-slate-950`}>{item.title}</span>
                    {item.date && <span className={`${size.meta} text-slate-600 italic`}>{item.date}</span>}
                  </div>
                  {item.subtitle && <p className={`${size.meta} italic text-slate-700`}>{item.subtitle}</p>}
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
