import React from 'react';
import { ResumeData } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass, formatUrlForDisplay } from './TemplateHelpers';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/icons/SocialIcons';

interface Props {
  data: ResumeData;
}

export const ModernClean: React.FC<Props> = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#0284c7';

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all`}>
      {/* Header */}
      <header className="pb-4 mb-4 border-b-2" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className={`${size.name} font-extrabold tracking-tight text-slate-900`}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p className={`${size.title} font-semibold mt-0.5`} style={{ color: accentColor }}>
                {personalInfo.jobTitle}
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

        {/* Links row */}
        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 pt-2 border-t border-slate-100 ${size.meta} text-slate-600`}>
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <LinkedinIcon className="w-3 h-3 text-slate-400" />}
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  {formatUrlForDisplay(personalInfo.linkedin)}
                </a>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <GithubIcon className="w-3 h-3 text-slate-400" />}
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
                  {formatUrlForDisplay(personalInfo.github)}
                </a>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <Globe className="w-3 h-3 text-slate-400" />}
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                  {formatUrlForDisplay(personalInfo.website)}
                </a>
              </span>
            )}
          </div>
        )}
      </header>

      {/* Sections */}
      <div className={spacingClass}>
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className={`${size.sectionHeader} font-bold tracking-wider text-slate-900`}>
                Professional Summary
              </h2>
            </div>
            <p className={`${size.body} text-slate-700 leading-relaxed pl-4 border-l-2 border-slate-200`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className={`${size.sectionHeader} font-bold tracking-wider text-slate-900`}>
                Work Experience
              </h2>
            </div>
            <div className="space-y-3 pl-4 border-l-2 border-slate-200">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold`}>
                      {exp.jobTitle} <span className="font-medium text-slate-600">at {exp.company}</span>
                    </span>
                    <span className={`${size.meta} font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700`}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div className={`${size.meta} text-slate-500 font-medium mb-1`}>
                      {exp.location}
                    </div>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className={`list-disc list-outside ml-4 mt-1 space-y-1 ${size.bullet} text-slate-700`}>
                      {exp.bullets.filter(b => b.trim().length > 0).map((bullet, idx) => (
                        <li key={idx} className="leading-snug">{bullet}</li>
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
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className={`${size.sectionHeader} font-bold tracking-wider text-slate-900`}>
                Core Competencies & Skills
              </h2>
            </div>
            <div className="space-y-2 pl-4 border-l-2 border-slate-200">
              {skills.filter(s => s.skills.length > 0).map((cat) => (
                <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className={`${size.body} font-bold text-slate-900 min-w-[140px]`}>{cat.category}:</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className={`${size.meta} px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium border border-slate-200`}
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
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className={`${size.sectionHeader} font-bold tracking-wider text-slate-900`}>
                Key Projects
              </h2>
            </div>
            <div className="space-y-2.5 pl-4 border-l-2 border-slate-200">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold`}>
                      {proj.title}
                      {proj.subtitle && <span className="font-normal text-slate-600"> — {proj.subtitle}</span>}
                    </span>
                    {(proj.startDate || proj.endDate) && (
                      <span className={`${size.meta} text-slate-500`}>
                        {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                      </span>
                    )}
                  </div>
                  {(proj.link || proj.github) && (
                    <div className={`${size.meta} text-slate-500 space-x-2`}>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">
                          Link: {formatUrlForDisplay(proj.link)}
                        </a>
                      )}
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">
                          Code: {formatUrlForDisplay(proj.github)}
                        </a>
                      )}
                    </div>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {proj.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-[9px] px-1.5 py-0.2 rounded bg-sky-50 text-sky-800 border border-sky-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className={`list-disc list-outside ml-4 mt-1 space-y-0.5 ${size.bullet} text-slate-700`}>
                      {proj.bullets.filter(b => b.trim().length > 0).map((bullet, idx) => (
                        <li key={idx} className="leading-snug">{bullet}</li>
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
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className={`${size.sectionHeader} font-bold tracking-wider text-slate-900`}>
                Education
              </h2>
            </div>
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
                  {(edu.gpa || edu.honors) && (
                    <div className={`${size.meta} text-slate-600 mt-0.5`}>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      {edu.gpa && edu.honors && <span> • </span>}
                      {edu.honors && <span>{edu.honors}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className={`${size.sectionHeader} font-bold tracking-wider text-slate-900`}>
                Certifications
              </h2>
            </div>
            <ul className={`list-disc list-outside ml-8 space-y-1 ${size.body} text-slate-700`}>
              {certifications.map((cert) => (
                <li key={cert.id} className="leading-snug">
                  <strong>{cert.name}</strong> — {cert.issuer}
                  {cert.issueDate && <span className="text-slate-500"> ({cert.issueDate})</span>}
                  {cert.credentialId && <span className="text-slate-500"> [ID: {cert.credentialId}]</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 && customSections.map((section) => (
          <section key={section.id}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
              <h2 className={`${size.sectionHeader} font-bold tracking-wider text-slate-900`}>
                {section.title}
              </h2>
            </div>
            <div className="space-y-1.5 pl-4 border-l-2 border-slate-200">
              {section.items.map((item) => (
                <div key={item.id} className={size.body}>
                  <div className="flex justify-between items-baseline">
                    <strong className="text-slate-900">{item.title}</strong>
                    {item.date && <span className={`${size.meta} text-slate-500`}>{item.date}</span>}
                  </div>
                  {item.subtitle && <p className="text-slate-600 italic text-[10.5px]">{item.subtitle}</p>}
                  {item.description && <p className="text-slate-700 mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
