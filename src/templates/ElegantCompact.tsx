import React from 'react';
import { ResumeData } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, formatUrlForDisplay } from './TemplateHelpers';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/icons/SocialIcons';

interface Props {
  data: ResumeData;
}

export const ElegantCompact: React.FC<Props> = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const accentColor = customization.accentColor || '#7c3aed';

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all`}>
      {/* Top Banner / Full Width Header */}
      <header className="border-b pb-3 mb-4" style={{ borderColor: accentColor }}>
        <h1 className={`${size.name} font-extrabold text-slate-950 tracking-tight`}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className={`${size.title} font-semibold uppercase tracking-wider mt-0.5`} style={{ color: accentColor }}>
            {personalInfo.jobTitle}
          </p>
        )}
      </header>

      {/* Two Column Layout: 35% Sidebar + 65% Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Column (Metadata, Contact, Skills, Education) - 4 cols */}
        <div className="md:col-span-4 space-y-4 border-r-0 md:border-r md:pr-4 border-slate-200">
          {/* Contact Details */}
          <section>
            <h2 className={`${size.sectionHeader} font-bold tracking-wider mb-2`} style={{ color: accentColor }}>
              Contact
            </h2>
            <div className={`space-y-1.5 ${size.meta} text-slate-700`}>
              {personalInfo.email && (
                <div className="flex items-center gap-1.5 break-all">
                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1.5 break-all">
                  <LinkedinIcon className="w-3 h-3 text-slate-400 shrink-0" />
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                    {formatUrlForDisplay(personalInfo.linkedin)}
                  </a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1.5 break-all">
                  <GithubIcon className="w-3 h-3 text-slate-400 shrink-0" />
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
                    {formatUrlForDisplay(personalInfo.github)}
                  </a>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1.5 break-all">
                  <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                  <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                    {formatUrlForDisplay(personalInfo.website)}
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {skills.length > 0 && skills.some(s => s.skills.length > 0) && (
            <section>
              <h2 className={`${size.sectionHeader} font-bold tracking-wider mb-2`} style={{ color: accentColor }}>
                Skills & Tech
              </h2>
              <div className="space-y-2">
                {skills.filter(s => s.skills.length > 0).map((cat) => (
                  <div key={cat.id}>
                    <div className={`${size.subHeader} text-slate-900 font-semibold mb-1`}>{cat.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((skill, idx) => (
                        <span key={idx} className="text-[9.5px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className={`${size.sectionHeader} font-bold tracking-wider mb-2`} style={{ color: accentColor }}>
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className={size.body}>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-700">{edu.fieldOfStudy}</div>
                    <div className="text-slate-600 italic text-[10px]">{edu.institution}</div>
                    <div className={`${size.meta} text-slate-500`}>
                      {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                    </div>
                    {edu.gpa && <div className={`${size.meta} text-slate-600 font-medium`}>GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className={`${size.sectionHeader} font-bold tracking-wider mb-2`} style={{ color: accentColor }}>
                Certifications
              </h2>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className={size.body}>
                    <div className="font-bold text-slate-900 leading-tight">{cert.name}</div>
                    <div className="text-slate-600 text-[10px]">{cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ''}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Summary, Experience, Projects) - 8 cols */}
        <div className="md:col-span-8 space-y-4">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className={`${size.sectionHeader} font-bold tracking-wider mb-1.5 pb-0.5 border-b border-slate-200`} style={{ color: accentColor }}>
                Profile Overview
              </h2>
              <p className={`${size.body} text-slate-700 leading-relaxed text-justify`}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <section>
              <h2 className={`${size.sectionHeader} font-bold tracking-wider mb-2 pb-0.5 border-b border-slate-200`} style={{ color: accentColor }}>
                Experience
              </h2>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline flex-wrap">
                      <span className={`${size.subHeader} text-slate-900 font-bold`}>
                        {exp.jobTitle} <span className="text-slate-600 font-normal">| {exp.company}</span>
                      </span>
                      <span className={`${size.meta} text-slate-500 font-medium`}>
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

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className={`${size.sectionHeader} font-bold tracking-wider mb-2 pb-0.5 border-b border-slate-200`} style={{ color: accentColor }}>
                Featured Projects
              </h2>
              <div className="space-y-2.5">
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
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-purple-700 hover:underline">
                            Demo: {formatUrlForDisplay(proj.link)}
                          </a>
                        )}
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noreferrer" className="text-purple-700 hover:underline">
                            GitHub: {formatUrlForDisplay(proj.github)}
                          </a>
                        )}
                      </div>
                    )}
                    {proj.techStack && proj.techStack.length > 0 && (
                      <div className="text-[9.5px] text-slate-600 mt-0.5">
                        <strong className="text-slate-800">Stack:</strong> {proj.techStack.join(', ')}
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

          {/* Custom Sections */}
          {customSections.length > 0 && customSections.map((section) => (
            <section key={section.id}>
              <h2 className={`${size.sectionHeader} font-bold tracking-wider mb-1.5 pb-0.5 border-b border-slate-200`} style={{ color: accentColor }}>
                {section.title}
              </h2>
              <div className="space-y-1.5">
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
    </div>
  );
};
