import React from 'react';
import { ResumeData, ResumeUpdateHandlers } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass, formatUrlForDisplay } from './TemplateHelpers';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/icons/SocialIcons';
import { InlineEditable } from '../components/common/InlineEditable';

interface Props {
  data: ResumeData;
  handlers?: ResumeUpdateHandlers;
  isEditable?: boolean;
}

export const FinanceCorporate: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#1e3a8a';

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all border-t-8`} style={{ borderTopColor: accentColor }}>
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-3 mb-4 text-center">
        <h1 className={`${size.name} font-bold text-slate-950 uppercase tracking-wider mb-1`}>
          <InlineEditable
            value={personalInfo.fullName}
            onSave={(val) => handlers?.onUpdatePersonalInfo('fullName', val)}
            isEditable={isEditable}
            placeholder="YOUR FULL NAME"
          />
        </h1>
        {personalInfo.jobTitle && (
          <p className={`${size.title} font-semibold tracking-widest text-slate-700 uppercase mb-2`}>
            <InlineEditable
              value={personalInfo.jobTitle}
              onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
              isEditable={isEditable}
              placeholder="TARGET JOB TITLE"
            />
          </p>
        )}

        <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 ${size.meta} text-slate-700 border-t border-slate-200 pt-2`}>
          <span className="flex items-center gap-1">
            {customization.showIcons && <MapPin className="w-3 h-3 text-slate-500" />}
            <InlineEditable
              value={personalInfo.location}
              onSave={(val) => handlers?.onUpdatePersonalInfo('location', val)}
              isEditable={isEditable}
              placeholder="City, State"
            />
          </span>
          <span className="flex items-center gap-1">
            {customization.showIcons && <Phone className="w-3 h-3 text-slate-500" />}
            <InlineEditable
              value={personalInfo.phone}
              onSave={(val) => handlers?.onUpdatePersonalInfo('phone', val)}
              isEditable={isEditable}
              placeholder="Phone Number"
            />
          </span>
          <span className="flex items-center gap-1">
            {customization.showIcons && <Mail className="w-3 h-3 text-slate-500" />}
            <InlineEditable
              value={personalInfo.email}
              onSave={(val) => handlers?.onUpdatePersonalInfo('email', val)}
              isEditable={isEditable}
              placeholder="email@example.com"
            />
          </span>
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              {customization.showIcons && <LinkedinIcon className="w-3 h-3 text-slate-500" />}
              <InlineEditable
                value={personalInfo.linkedin}
                onSave={(val) => handlers?.onUpdatePersonalInfo('linkedin', val)}
                isEditable={isEditable}
                placeholder="LinkedIn URL"
              />
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <div className={spacingClass}>
        {/* Executive Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5 uppercase tracking-wider`}>
              Executive Summary
            </h2>
            <div className={`${size.body} text-slate-800 leading-relaxed text-justify`}>
              <InlineEditable
                value={personalInfo.summary}
                onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                isEditable={isEditable}
                multiline
                placeholder="Professional summary highlighting financial analysis, deal volume, and key strengths..."
              />
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 border-b border-slate-900 pb-0.5 mb-2 uppercase tracking-wider`}>
              Professional Experience
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
                        placeholder="Company Name"
                      />
                      {' — '}
                      <span className="font-semibold text-slate-800">
                        <InlineEditable
                          value={exp.jobTitle}
                          onSave={(val) => handlers?.onUpdateExperience(exp.id, 'jobTitle', val)}
                          isEditable={isEditable}
                          placeholder="Job Title"
                        />
                      </span>
                    </span>
                    <span className={`${size.meta} font-semibold text-slate-700`}>
                      <InlineEditable
                        value={exp.startDate}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'startDate', val)}
                        isEditable={isEditable}
                        placeholder="Start"
                      />
                      {' – '}
                      <InlineEditable
                        value={exp.current ? 'Present' : exp.endDate}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'endDate', val)}
                        isEditable={isEditable}
                        placeholder="End"
                      />
                    </span>
                  </div>
                  {exp.location && (
                    <div className={`${size.meta} text-slate-600 italic mb-1`}>
                      <InlineEditable
                        value={exp.location}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'location', val)}
                        isEditable={isEditable}
                        placeholder="Location"
                      />
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
                            placeholder="Add achievement with quantifiable metrics (e.g. Generated $14M in savings)..."
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

        {/* Core Financial & Technical Skills */}
        {skills.length > 0 && skills.some(s => s.skills.length > 0) && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5 uppercase tracking-wider`}>
              Financial Modeling & Analytical Skills
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

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 border-b border-slate-900 pb-0.5 mb-2 uppercase tracking-wider`}>
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
                        placeholder="University"
                      />
                    </span>
                    <span className={`${size.meta} font-semibold text-slate-700`}>
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5 uppercase tracking-wider`}>
              Certifications & Professional Designations
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

        {/* Custom Sections / Transactions */}
        {customSections.length > 0 && customSections.map((section) => (
          <section key={section.id}>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 border-b border-slate-900 pb-0.5 mb-1.5 uppercase tracking-wider`}>
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
      </div>
    </div>
  );
};
