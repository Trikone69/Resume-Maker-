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

export const CreativeMinimal: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#7c3aed';

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all`}>
      {/* Creative Header */}
      <header className="mb-4 pb-4 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h1 className={`${size.name} font-black tracking-tight text-slate-900`}>
              <InlineEditable
                value={personalInfo.fullName}
                onSave={(val) => handlers?.onUpdatePersonalInfo('fullName', val)}
                isEditable={isEditable}
                placeholder="Your Full Name"
              />
            </h1>
            <p className={`${size.title} font-bold tracking-wide mt-0.5`} style={{ color: accentColor }}>
              <InlineEditable
                value={personalInfo.jobTitle}
                onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
                isEditable={isEditable}
                placeholder="Target Job Title / Creative Discipline"
              />
            </p>
          </div>

          <div className={`flex flex-wrap gap-x-3 gap-y-1 ${size.meta} text-slate-600 md:text-right`}>
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <MapPin className="w-3 h-3 text-slate-400" />}
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
                {customization.showIcons && <Mail className="w-3 h-3 text-slate-400" />}
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
                {customization.showIcons && <Phone className="w-3 h-3 text-slate-400" />}
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
        {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
          <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 pt-2 border-t border-slate-100 ${size.meta} text-slate-600`}>
            {personalInfo.website && (
              <span className="flex items-center gap-1 text-slate-700 font-medium">
                <Globe className="w-3 h-3 text-slate-400" />
                <InlineEditable
                  value={personalInfo.website}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('website', val)}
                  isEditable={isEditable}
                  placeholder="Portfolio URL"
                />
              </span>
            )}
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
          </div>
        )}
      </header>

      {/* Sections */}
      <div className={spacingClass}>
        {/* Profile Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className={`${size.sectionHeader} font-black text-slate-900 mb-1 flex items-center gap-2`}>
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accentColor }}></span>
              Profile
            </h2>
            <div className={`${size.body} text-slate-700 leading-relaxed text-justify pl-4 border-l-2`} style={{ borderColor: accentColor }}>
              <InlineEditable
                value={personalInfo.summary}
                onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                isEditable={isEditable}
                multiline
                placeholder="Add professional overview..."
              />
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-black text-slate-900 mb-2 flex items-center gap-2`}>
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accentColor }}></span>
              Experience
            </h2>
            <div className="space-y-3 pl-4 border-l-2 border-slate-200">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold`}>
                      <InlineEditable
                        value={exp.jobTitle}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'jobTitle', val)}
                        isEditable={isEditable}
                        placeholder="Job Title"
                      />
                      {' — '}
                      <span className="font-semibold text-slate-600">
                        <InlineEditable
                          value={exp.company}
                          onSave={(val) => handlers?.onUpdateExperience(exp.id, 'company', val)}
                          isEditable={isEditable}
                          placeholder="Company"
                        />
                      </span>
                    </span>
                    <span className={`${size.meta} font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700`}>
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
                            placeholder="Bullet achievement..."
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

        {/* Skills & Tooling */}
        {skills.length > 0 && skills.some(s => s.skills.length > 0) && (
          <section>
            <h2 className={`${size.sectionHeader} font-black text-slate-900 mb-2 flex items-center gap-2`}>
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accentColor }}></span>
              Skills & Toolkit
            </h2>
            <div className="space-y-2 pl-4 border-l-2 border-slate-200">
              {skills.filter(s => s.skills.length > 0).map((cat) => (
                <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5">
                  <span className={`${size.body} font-bold text-slate-900 min-w-[130px]`}>{cat.category}:</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`${size.meta} px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-medium border border-slate-200`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-black text-slate-900 mb-2 flex items-center gap-2`}>
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accentColor }}></span>
              Projects & Initiatives
            </h2>
            <div className="space-y-2 pl-4 border-l-2 border-slate-200">
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
                            placeholder="Project contribution..."
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
            <h2 className={`${size.sectionHeader} font-black text-slate-900 mb-2 flex items-center gap-2`}>
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accentColor }}></span>
              Education
            </h2>
            <div className="space-y-2 pl-4 border-l-2 border-slate-200">
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
            <h2 className={`${size.sectionHeader} font-black text-slate-900 mb-1 flex items-center gap-2`}>
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: accentColor }}></span>
              Certifications
            </h2>
            <ul className={`list-disc list-outside ml-8 space-y-1 ${size.body} text-slate-700`}>
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
