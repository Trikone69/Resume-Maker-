import React from 'react';
import { ResumeData } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass, formatUrlForDisplay } from './TemplateHelpers';
import { Mail, Phone, MapPin, Globe, Code2, Terminal } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/icons/SocialIcons';

interface Props {
  data: ResumeData;
}

export const TechnicalGrid: React.FC<Props> = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#059669';

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all font-mono`}>
      {/* Tech Header */}
      <header className="border-b-2 border-slate-800 pb-3 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h1 className={`${size.name} font-bold text-slate-950 tracking-tight font-sans`}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p className={`${size.title} font-bold tracking-wide flex items-center gap-1.5`} style={{ color: accentColor }}>
                <Terminal className="w-3.5 h-3.5 inline" /> {personalInfo.jobTitle}
              </p>
            )}
          </div>
          <div className={`${size.meta} text-slate-600 space-y-0.5 sm:text-right font-mono`}>
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.email && (
              <div>
                <a href={`mailto:${personalInfo.email}`} className="text-slate-800 hover:underline">{personalInfo.email}</a>
              </div>
            )}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
          </div>
        </div>

        {/* Links row */}
        {(personalInfo.github || personalInfo.linkedin || personalInfo.website) && (
          <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-2 pt-2 border-t border-slate-200 ${size.meta} text-slate-600 font-mono`}>
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900 underline">
                <GithubIcon className="w-3 h-3" /> github.com/{formatUrlForDisplay(personalInfo.github).replace('github.com/', '')}
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900 underline">
                <LinkedinIcon className="w-3 h-3" /> {formatUrlForDisplay(personalInfo.linkedin)}
              </a>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900 underline">
                <Globe className="w-3 h-3" /> {formatUrlForDisplay(personalInfo.website)}
              </a>
            )}
          </div>
        )}
      </header>

      {/* Sections */}
      <div className={spacingClass}>
        {/* Technical Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-1 flex items-center gap-1`}>
              <span style={{ color: accentColor }}>//</span> SUMMARY
            </h2>
            <p className={`${size.body} text-slate-700 leading-relaxed font-sans`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Technical Skills Matrix */}
        {skills.length > 0 && skills.some(s => s.skills.length > 0) && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-1.5 flex items-center gap-1`}>
              <span style={{ color: accentColor }}>//</span> TECHNICAL_SKILLS
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded p-2.5 space-y-1.5">
              {skills.filter(s => s.skills.length > 0).map((cat) => (
                <div key={cat.id} className={`${size.body} flex flex-col sm:flex-row sm:items-baseline gap-1`}>
                  <span className="font-bold text-slate-900 min-w-[130px] font-mono">[{cat.category}]</span>
                  <div className="flex flex-wrap gap-1 font-sans">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="bg-white border border-slate-300 text-slate-800 px-1.5 py-0.5 rounded text-[10px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-2 flex items-center gap-1`}>
              <span style={{ color: accentColor }}>//</span> WORK_EXPERIENCE
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-3 border-slate-300">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-950 font-bold font-sans`}>
                      {exp.jobTitle} <span className="font-normal text-slate-600">@ {exp.company}</span>
                    </span>
                    <span className={`${size.meta} font-mono text-slate-500`}>
                      [{exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}]
                    </span>
                  </div>
                  {exp.location && (
                    <div className={`${size.meta} text-slate-500 font-mono mb-1`}>
                      loc: {exp.location}
                    </div>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className={`list-disc list-outside ml-4 mt-1 space-y-1 ${size.bullet} text-slate-700 font-sans`}>
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

        {/* Engineering Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-2 flex items-center gap-1`}>
              <span style={{ color: accentColor }}>//</span> PROJECTS & REPOSITORIES
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 pl-3 border-slate-300">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold font-sans`}>
                      {proj.title} {proj.subtitle && <span className="text-slate-600 font-normal">:: {proj.subtitle}</span>}
                    </span>
                    {(proj.startDate || proj.endDate) && (
                      <span className={`${size.meta} font-mono text-slate-500`}>
                        [{proj.startDate} {proj.endDate ? `- ${proj.endDate}` : ''}]
                      </span>
                    )}
                  </div>
                  {(proj.link || proj.github) && (
                    <div className={`${size.meta} font-mono text-slate-500 space-x-3`}>
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">
                          src: {formatUrlForDisplay(proj.github)}
                        </a>
                      )}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">
                          live: {formatUrlForDisplay(proj.link)}
                        </a>
                      )}
                    </div>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="text-[10px] text-slate-600 font-mono mt-0.5">
                      stack: [ {proj.techStack.join(', ')} ]
                    </div>
                  )}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className={`list-disc list-outside ml-4 mt-1 space-y-0.5 ${size.bullet} text-slate-700 font-sans`}>
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
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-1.5 flex items-center gap-1`}>
              <span style={{ color: accentColor }}>//</span> EDUCATION
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 pl-3 border-slate-300">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold font-sans`}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className={`${size.meta} font-mono text-slate-500`}>
                      [{edu.startDate} - {edu.current ? 'PRESENT' : edu.endDate}]
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-600 font-sans">
                    <span className={size.body}>{edu.institution}</span>
                    <span className={`${size.meta} font-mono text-slate-500`}>{edu.location}</span>
                  </div>
                  {(edu.gpa || edu.honors) && (
                    <div className={`${size.meta} text-slate-600 font-mono mt-0.5`}>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      {edu.gpa && edu.honors && <span> | </span>}
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
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-1.5 flex items-center gap-1`}>
              <span style={{ color: accentColor }}>//</span> CERTIFICATIONS
            </h2>
            <ul className={`list-disc list-outside ml-4 space-y-1 ${size.body} text-slate-700 font-sans`}>
              {certifications.map((cert) => (
                <li key={cert.id} className="leading-snug">
                  <strong>{cert.name}</strong> — {cert.issuer}
                  {cert.issueDate && <span className="text-slate-500 font-mono"> [{cert.issueDate}]</span>}
                  {cert.credentialId && <span className="text-slate-500 font-mono"> id:{cert.credentialId}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 && customSections.map((section) => (
          <section key={section.id}>
            <h2 className={`${size.sectionHeader} font-bold text-slate-900 mb-1.5 flex items-center gap-1`}>
              <span style={{ color: accentColor }}>//</span> {section.title.toUpperCase()}
            </h2>
            <div className="space-y-1.5 border-l-2 pl-3 border-slate-300">
              {section.items.map((item) => (
                <div key={item.id} className={size.body}>
                  <div className="flex justify-between items-baseline">
                    <strong className="text-slate-900 font-sans">{item.title}</strong>
                    {item.date && <span className={`${size.meta} font-mono text-slate-500`}>[{item.date}]</span>}
                  </div>
                  {item.subtitle && <p className="text-slate-600 italic text-[10.5px] font-sans">{item.subtitle}</p>}
                  {item.description && <p className="text-slate-700 mt-0.5 font-sans">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
