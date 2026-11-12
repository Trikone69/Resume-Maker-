import React from 'react';
import { ResumeData, ResumeUpdateHandlers } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass } from './TemplateHelpers';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/icons/SocialIcons';
import { InlineEditable } from '../components/common/InlineEditable';

interface Props {
  data: ResumeData;
  handlers?: ResumeUpdateHandlers;
  isEditable?: boolean;
}

export const NordicClean: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#059669';

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all tracking-tight`}>
      {/* Nordic Header */}
      <header className="mb-4 pb-4 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <h1 className={`${size.name} font-extrabold text-slate-900`}>
              <InlineEditable
                value={personalInfo.fullName}
                onSave={(val) => handlers?.onUpdatePersonalInfo('fullName', val)}
                isEditable={isEditable}
                placeholder="Full Name"
              />
            </h1>
            <p className={`${size.title} font-medium tracking-wider text-slate-500 uppercase mt-0.5`}>
              <InlineEditable
                value={personalInfo.jobTitle}
                onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
                isEditable={isEditable}
                placeholder="Job Title"
              />
            </p>
          </div>

          <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${size.meta} text-slate-600`}>
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <InlineEditable
                  value={personalInfo.location}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('location', val)}
                  isEditable={isEditable}
                  placeholder="Location"
                />
              </span>
            )}
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <InlineEditable
                  value={personalInfo.email}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('email', val)}
                  isEditable={isEditable}
                  placeholder="Email"
                />
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <InlineEditable
                  value={personalInfo.phone}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('phone', val)}
                  isEditable={isEditable}
                  placeholder="Phone"
                />
              </span>
            )}
          </div>
        </div>

        {/* Links row */}
        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 pt-2 border-t border-slate-100 ${size.meta} text-slate-600`}>
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3 text-slate-400" />
                <InlineEditable
                  value={personalInfo.linkedin}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('linkedin', val)}
                  isEditable={isEditable}
                  placeholder="LinkedIn"
                />
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <GithubIcon className="w-3 h-3 text-slate-400" />
                <InlineEditable
                  value={personalInfo.github}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('github', val)}
                  isEditable={isEditable}
                  placeholder="GitHub"
                />
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400" />
                <InlineEditable
                  value={personalInfo.website}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('website', val)}
                  isEditable={isEditable}
                  placeholder="Website"
                />
              </span>
            )}
          </div>
        )}
      </header>

      {/* Content */}
      <div className={spacingClass}>
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-1 flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
              About
            </h2>
            <div className={`${size.body} text-slate-700 leading-relaxed text-justify`}>
              <InlineEditable
                value={personalInfo.summary}
                onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                isEditable={isEditable}
                multiline
                placeholder="Professional summary..."
              />
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-2 flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="group">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold`}>
                      <InlineEditable
                        value={exp.jobTitle}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'jobTitle', val)}
                        isEditable={isEditable}
                        placeholder="Job Title"
                      />
                      {' · '}
                      <span className="font-medium text-slate-600">
                        <InlineEditable
                          value={exp.company}
                          onSave={(val) => handlers?.onUpdateExperience(exp.id, 'company', val)}
                          isEditable={isEditable}
                          placeholder="Company"
                        />
                      </span>
                    </span>
                    <span className={`${size.meta} text-slate-500 font-mono`}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div className={`${size.meta} text-slate-500 italic mb-1`}>
                      {exp.location}
                    </div>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className={`list-disc list-outside ml-4 mt-1 space-y-1 ${size.bullet} text-slate-700`}>
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-snug">
                          <InlineEditable
                            value={bullet}
                            onSave={(val) => handlers?.onUpdateBullet(exp.id, idx, val)}
                            isEditable={isEditable}
                            multiline
                            placeholder="Add bullet achievement..."
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

        {/* Skills */}
        {skills.length > 0 && skills.some(s => s.skills.length > 0) && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-1.5 flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Expertise & Competencies
            </h2>
            <div className="space-y-1.5">
              {skills.filter(s => s.skills.length > 0).map((cat) => (
                <div key={cat.id} className={`${size.body} text-slate-800`}>
                  <strong className="text-slate-900">{cat.category}:</strong>{' '}
                  <span className="text-slate-600">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-2 flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold`}>
                      <InlineEditable
                        value={proj.title}
                        onSave={(val) => handlers?.onUpdateProject(proj.id, 'title', val)}
                        isEditable={isEditable}
                        placeholder="Project Title"
                      />
                      {proj.subtitle && <span className="font-normal text-slate-600"> — {proj.subtitle}</span>}
                    </span>
                    {(proj.startDate || proj.endDate) && (
                      <span className={`${size.meta} text-slate-500`}>
                        {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                      </span>
                    )}
                  </div>
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className={`list-disc list-outside ml-4 mt-1 space-y-0.5 ${size.bullet} text-slate-700`}>
                      {proj.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-snug">
                          <InlineEditable
                            value={bullet}
                            onSave={(val) => handlers?.onUpdateProjectBullet(proj.id, idx, val)}
                            isEditable={isEditable}
                            multiline
                            placeholder="Project detail..."
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

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-2 flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold`}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className={`${size.meta} text-slate-500`}>
                      {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-600">
                    <span className={size.body}>{edu.institution}</span>
                    <span className={`${size.meta} text-slate-500`}>{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-1 flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
              Certifications
            </h2>
            <ul className={`list-disc list-outside ml-4 space-y-1 ${size.body} text-slate-700`}>
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
