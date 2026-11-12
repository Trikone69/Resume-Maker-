import React from 'react';
import { ResumeData, ResumeUpdateHandlers } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass } from './TemplateHelpers';
import { InlineEditable } from '../components/common/InlineEditable';

interface Props {
  data: ResumeData;
  handlers?: ResumeUpdateHandlers;
  isEditable?: boolean;
}

export const LegalConsulting: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass('garamond'); // Garamond default for legal
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all font-serif`}>
      {/* Formal Legal Header */}
      <header className="border-b-2 border-slate-900 pb-3 mb-4 text-center">
        <h1 className={`${size.name} font-bold text-slate-950 uppercase tracking-widest mb-1`}>
          <InlineEditable
            value={personalInfo.fullName}
            onSave={(val) => handlers?.onUpdatePersonalInfo('fullName', val)}
            isEditable={isEditable}
            placeholder="FULL NAME, ESQ."
          />
        </h1>
        {personalInfo.jobTitle && (
          <p className={`${size.title} font-medium tracking-widest text-slate-700 uppercase mb-2`}>
            <InlineEditable
              value={personalInfo.jobTitle}
              onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
              isEditable={isEditable}
              placeholder="LEGAL SPECIALTY / COUNSEL"
            />
          </p>
        )}

        <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 ${size.meta} text-slate-700`}>
          <InlineEditable
            value={personalInfo.location}
            onSave={(val) => handlers?.onUpdatePersonalInfo('location', val)}
            isEditable={isEditable}
            placeholder="City, State"
          />
          <span>•</span>
          <InlineEditable
            value={personalInfo.phone}
            onSave={(val) => handlers?.onUpdatePersonalInfo('phone', val)}
            isEditable={isEditable}
            placeholder="Phone Number"
          />
          <span>•</span>
          <InlineEditable
            value={personalInfo.email}
            onSave={(val) => handlers?.onUpdatePersonalInfo('email', val)}
            isEditable={isEditable}
            placeholder="email@firm.com"
          />
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <InlineEditable
                value={personalInfo.linkedin}
                onSave={(val) => handlers?.onUpdatePersonalInfo('linkedin', val)}
                isEditable={isEditable}
                placeholder="LinkedIn"
              />
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <div className={spacingClass}>
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-1.5`}>
              Professional Overview
            </h2>
            <div className={`${size.body} text-slate-800 leading-relaxed text-justify`}>
              <InlineEditable
                value={personalInfo.summary}
                onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                isEditable={isEditable}
                multiline
                placeholder="Legal summary outlining practice areas, regulatory experience, and client counsel..."
              />
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-2`}>
              Legal & Professional Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-950 font-bold uppercase`}>
                      <InlineEditable
                        value={exp.company}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'company', val)}
                        isEditable={isEditable}
                        placeholder="Organization / Law Firm"
                      />
                      {' — '}
                      <span className="font-semibold text-slate-800 capitalize italic">
                        <InlineEditable
                          value={exp.jobTitle}
                          onSave={(val) => handlers?.onUpdateExperience(exp.id, 'jobTitle', val)}
                          isEditable={isEditable}
                          placeholder="Title"
                        />
                      </span>
                    </span>
                    <span className={`${size.meta} font-semibold text-slate-700`}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div className={`${size.meta} text-slate-600 italic mb-1`}>
                      {exp.location}
                    </div>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className={`list-disc list-outside ml-4 mt-1 space-y-1 ${size.bullet} text-slate-800`}>
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-snug">
                          <InlineEditable
                            value={bullet}
                            onSave={(val) => handlers?.onUpdateBullet(exp.id, idx, val)}
                            isEditable={isEditable}
                            multiline
                            placeholder="Add case / transaction contribution..."
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

        {/* Education & Academic Honors */}
        {education.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-2`}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold uppercase`}>
                      <InlineEditable
                        value={edu.institution}
                        onSave={(val) => handlers?.onUpdateEducation(edu.id, 'institution', val)}
                        isEditable={isEditable}
                        placeholder="Law School / University"
                      />
                    </span>
                    <span className={`${size.meta} text-slate-600 font-semibold`}>
                      {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-800">
                    <span className={size.body}>
                      {edu.degree} in {edu.fieldOfStudy}
                      {edu.gpa && <span> — GPA: {edu.gpa}</span>}
                    </span>
                    <span className={`${size.meta} text-slate-600`}>{edu.location}</span>
                  </div>
                  {edu.honors && <div className={`${size.meta} text-slate-700 italic`}>{edu.honors}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practice Areas & Skills */}
        {skills.length > 0 && skills.some(s => s.skills.length > 0) && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-1.5`}>
              Practice Areas & Core Competencies
            </h2>
            <div className="space-y-1">
              {skills.filter(s => s.skills.length > 0).map((cat) => (
                <div key={cat.id} className={`${size.body} text-slate-900`}>
                  <strong className="uppercase">{cat.category}:</strong>{' '}
                  <span className="text-slate-800">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bar Admissions & Judicial Affiliations */}
        {customSections.length > 0 && customSections.map((section) => (
          <section key={section.id}>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-1.5`}>
              {section.title}
            </h2>
            <div className="space-y-1.5">
              {section.items.map((item) => (
                <div key={item.id} className={size.body}>
                  <div className="flex justify-between items-baseline">
                    <strong className="text-slate-900">{item.title}</strong>
                    {item.date && <span className={`${size.meta} text-slate-600 font-semibold`}>{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-slate-700 italic text-[10.5px]">{item.subtitle}</p>}
                  {item.description && <p className="text-slate-800 mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-widest text-slate-950 border-b border-slate-400 pb-0.5 mb-1.5`}>
              Certifications & Credentials
            </h2>
            <ul className={`list-disc list-outside ml-4 space-y-0.5 ${size.body} text-slate-800`}>
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <strong>{cert.name}</strong> — {cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ''}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
