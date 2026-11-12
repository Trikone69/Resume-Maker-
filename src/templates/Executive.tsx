import React from 'react';
import { ResumeData } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass, formatUrlForDisplay } from './TemplateHelpers';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/icons/SocialIcons';

interface Props {
  data: ResumeData;
}

export const Executive: React.FC<Props> = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#1e3a8a';

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all`}>
      {/* Executive Header Box */}
      <header className="text-center pb-4 mb-4 border-b-2 border-double border-slate-400">
        <h1 
          className={`${size.name} font-serif font-bold tracking-tight text-slate-950 mb-1`}
          style={{ color: accentColor }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className={`${size.title} font-serif uppercase tracking-widest text-slate-600 mb-2 font-medium`}>
            {personalInfo.jobTitle}
          </p>
        )}

        <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 ${size.meta} text-slate-600 border-t border-slate-200 pt-2`}>
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              {customization.showIcons && <MapPin className="w-3 h-3 text-slate-400" />}
              <span>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              {customization.showIcons && <Phone className="w-3 h-3 text-slate-400" />}
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              {customization.showIcons && <Mail className="w-3 h-3 text-slate-400" />}
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              {customization.showIcons && <LinkedinIcon className="w-3 h-3 text-slate-400" />}
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                {formatUrlForDisplay(personalInfo.linkedin)}
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
      </header>

      {/* Sections */}
      <div className={spacingClass}>
        {/* Executive Summary */}
        {personalInfo.summary && (
          <section>
            <div className="flex items-center justify-center gap-3 mb-1.5">
              <div className="h-[1px] flex-1 bg-slate-300"></div>
              <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-center`} style={{ color: accentColor }}>
                Executive Summary
              </h2>
              <div className="h-[1px] flex-1 bg-slate-300"></div>
            </div>
            <p className={`${size.body} text-slate-700 leading-relaxed text-justify italic font-serif px-2`}>
              "{personalInfo.summary}"
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experiences.length > 0 && (
          <section>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-[1px] flex-1 bg-slate-300"></div>
              <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-center`} style={{ color: accentColor }}>
                Professional Experience
              </h2>
              <div className="h-[1px] flex-1 bg-slate-300"></div>
            </div>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-serif font-bold`}>
                      {exp.jobTitle}
                    </span>
                    <span className={`${size.meta} text-slate-500 font-medium`}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-600 mb-1">
                    <span className={`${size.body} font-medium text-slate-800`}>{exp.company}</span>
                    <span className={`${size.meta} text-slate-500`}>{exp.location}</span>
                  </div>
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

        {/* Areas of Expertise / Skills */}
        {skills.length > 0 && skills.some(s => s.skills.length > 0) && (
          <section>
            <div className="flex items-center justify-center gap-3 mb-1.5">
              <div className="h-[1px] flex-1 bg-slate-300"></div>
              <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-center`} style={{ color: accentColor }}>
                Areas of Expertise
              </h2>
              <div className="h-[1px] flex-1 bg-slate-300"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800 px-1">
              {skills.filter(s => s.skills.length > 0).map((cat) => (
                <div key={cat.id} className={`${size.body} p-1.5 bg-slate-50 rounded border border-slate-200`}>
                  <strong className="text-slate-950 font-serif block mb-0.5">{cat.category}</strong>
                  <span className="text-slate-700">{cat.skills.join(' • ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Credentials */}
        {education.length > 0 && (
          <section>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-[1px] flex-1 bg-slate-300"></div>
              <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-center`} style={{ color: accentColor }}>
                Education & Credentials
              </h2>
              <div className="h-[1px] flex-1 bg-slate-300"></div>
            </div>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-serif font-bold`}>
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

        {/* Key Projects */}
        {projects.length > 0 && (
          <section>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-[1px] flex-1 bg-slate-300"></div>
              <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-center`} style={{ color: accentColor }}>
                Key Initiatives & Projects
              </h2>
              <div className="h-[1px] flex-1 bg-slate-300"></div>
            </div>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-serif font-bold`}>
                      {proj.title} {proj.subtitle && <span className="font-normal font-sans text-slate-600">({proj.subtitle})</span>}
                    </span>
                    {(proj.startDate || proj.endDate) && (
                      <span className={`${size.meta} text-slate-500`}>
                        {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                      </span>
                    )}
                  </div>
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <div className="flex items-center justify-center gap-3 mb-1.5">
              <div className="h-[1px] flex-1 bg-slate-300"></div>
              <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-center`} style={{ color: accentColor }}>
                Board & Professional Certifications
              </h2>
              <div className="h-[1px] flex-1 bg-slate-300"></div>
            </div>
            <ul className={`list-disc list-outside ml-4 space-y-1 ${size.body} text-slate-700`}>
              {certifications.map((cert) => (
                <li key={cert.id} className="leading-snug">
                  <strong>{cert.name}</strong> — {cert.issuer}
                  {cert.issueDate && <span className="text-slate-500"> ({cert.issueDate})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 && customSections.map((section) => (
          <section key={section.id}>
            <div className="flex items-center justify-center gap-3 mb-1.5">
              <div className="h-[1px] flex-1 bg-slate-300"></div>
              <h2 className={`${size.sectionHeader} font-serif font-bold uppercase tracking-widest text-center`} style={{ color: accentColor }}>
                {section.title}
              </h2>
              <div className="h-[1px] flex-1 bg-slate-300"></div>
            </div>
            <div className="space-y-1.5">
              {section.items.map((item) => (
                <div key={item.id} className={size.body}>
                  <div className="flex justify-between items-baseline">
                    <strong className="text-slate-900 font-serif">{item.title}</strong>
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
