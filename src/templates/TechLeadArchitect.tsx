import React from 'react';
import { ResumeData, ResumeUpdateHandlers } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass, formatUrlForDisplay } from './TemplateHelpers';
import { InlineEditable } from '../components/common/InlineEditable';
import { Mail, Phone, MapPin, Globe, Terminal, Cpu } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/icons/SocialIcons';

interface Props {
  data: ResumeData;
  handlers?: ResumeUpdateHandlers;
  isEditable?: boolean;
}

export const TechLeadArchitect: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#0284c7';

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all`}>
      {/* Tech Lead Header */}
      <header className="pb-3.5 mb-4 border-b-2" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`${size.name} font-black tracking-tight text-slate-950`}>
                <InlineEditable
                  value={personalInfo.fullName}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('fullName', val)}
                  isEditable={isEditable}
                  placeholder="Full Name"
                />
              </h1>
            </div>
            {personalInfo.jobTitle && (
              <p className={`${size.title} font-bold tracking-wide mt-0.5 flex items-center gap-1.5`} style={{ color: accentColor }}>
                <Terminal className="w-3.5 h-3.5 inline" />
                <InlineEditable
                  value={personalInfo.jobTitle}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
                  isEditable={isEditable}
                  placeholder="Staff Engineer / Solutions Architect"
                />
              </p>
            )}
          </div>

          {/* Contact & Links Strip */}
          <div className={`flex flex-wrap items-center sm:justify-end gap-x-3 gap-y-1 ${size.meta} text-slate-700 font-mono`}>
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <Mail className="w-3 h-3 text-slate-500" />}
                <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <Phone className="w-3 h-3 text-slate-500" />}
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <MapPin className="w-3 h-3 text-slate-500" />}
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <GithubIcon className="w-3 h-3 text-slate-600" />}
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
                  GitHub
                </a>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <LinkedinIcon className="w-3 h-3 text-sky-700" />}
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                {customization.showIcons && <Globe className="w-3 h-3 text-slate-500" />}
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                  {formatUrlForDisplay(personalInfo.website)}
                </a>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <div className={spacingClass}>
        {/* Architectural Profile & Summary */}
        {personalInfo.summary && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5 flex items-center gap-1.5`} style={{ color: accentColor }}>
              <Cpu className="w-3.5 h-3.5 inline" />
              <span>Technical Profile & Core Architecture</span>
            </h2>
            <div className={`${size.body} text-slate-800 leading-relaxed text-justify bg-slate-50/60 p-2.5 rounded border border-slate-200/80`}>
              <InlineEditable
                value={personalInfo.summary}
                onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                isEditable={isEditable}
                multiline
                placeholder="High-level engineering overview, distributed system scale, cloud platforms, and architecture focus..."
              />
            </div>
          </section>
        )}

        {/* Technical Skills Matrix */}
        {skills.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
              Technical Skills & Tech Stack Matrix
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {skills.map((cat) => (
                <div key={cat.id} className="p-2 rounded bg-slate-50 border border-slate-200/90 text-xs">
                  <div className="font-bold text-slate-950 font-mono mb-1 text-[11px] flex items-center justify-between">
                    <InlineEditable
                      value={cat.category}
                      onSave={(val) => handlers?.onUpdateSkillCategory(cat.id, val)}
                      isEditable={isEditable}
                      placeholder="Category"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-white border border-slate-300 text-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono shadow-xs inline-flex items-center gap-1"
                      >
                        <InlineEditable
                          value={skill}
                          onSave={(val) => handlers?.onUpdateSkill(cat.id, sIdx, val)}
                          isEditable={isEditable}
                        />
                        {isEditable && handlers && (
                          <button
                            type="button"
                            onClick={() => handlers.onDeleteSkill(cat.id, sIdx)}
                            className="no-print text-rose-500 hover:text-rose-700 ml-0.5"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Engineering Experience */}
        {experiences.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
              Engineering Leadership & Experience
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-3 border-slate-300">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className={`${size.subHeader} font-bold text-slate-950`}>
                      <InlineEditable
                        value={exp.jobTitle}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'jobTitle', val)}
                        isEditable={isEditable}
                        placeholder="Staff / Principal Engineer"
                      />
                    </span>
                    <span className={`${size.meta} text-slate-500 font-mono font-medium`}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1.5">
                    <span className={`${size.meta} font-semibold text-slate-700`}>
                      <InlineEditable
                        value={exp.company}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'company', val)}
                        isEditable={isEditable}
                        placeholder="Company / Org"
                      />
                      {exp.location && ` • ${exp.location}`}
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
                            placeholder="Engineered microservices scaling to X QPS; led team of N engineers..."
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
                        className="text-[10.5px] text-sky-600 hover:text-sky-800 font-medium"
                      >
                        + Add technical accomplishment
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Scaled Projects & Architecture Repositories */}
        {projects.length > 0 && (
          <section className="resume-section">
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
              Architectural Systems & Open Source Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 pl-3 border-slate-300">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className={`${size.subHeader} font-bold text-slate-950 flex items-center gap-1.5`}>
                      <InlineEditable
                        value={proj.title}
                        onSave={(val) => handlers?.onUpdateProject(proj.id, 'title', val)}
                        isEditable={isEditable}
                        placeholder="System or Tool Name"
                      />
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-sky-600 text-[10px] font-mono hover:underline">
                          [View Live]
                        </a>
                      )}
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noreferrer" className="text-slate-600 text-[10px] font-mono hover:underline">
                          [Code]
                        </a>
                      )}
                    </span>
                    {(proj.startDate || proj.endDate) && (
                      <span className={`${size.meta} text-slate-500 font-mono`}>
                        {proj.startDate} {proj.endDate && `– ${proj.endDate}`}
                      </span>
                    )}
                  </div>
                  {proj.subtitle && (
                    <p className={`${size.meta} text-slate-600 mb-1`}>
                      <InlineEditable
                        value={proj.subtitle}
                        onSave={(val) => handlers?.onUpdateProject(proj.id, 'subtitle', val)}
                        isEditable={isEditable}
                        placeholder="Cloud Architecture / High-Throughput Engine"
                      />
                    </p>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {proj.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-[9.5px] font-mono px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
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

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {education.length > 0 && (
            <section className="resume-section">
              <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-950 text-xs">
                      <InlineEditable
                        value={edu.degree}
                        onSave={(val) => handlers?.onUpdateEducation(edu.id, 'degree', val)}
                        isEditable={isEditable}
                        placeholder="Degree"
                      />
                      {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                    </div>
                    <div className="text-[11px] text-slate-600 flex justify-between">
                      <span>{edu.institution}</span>
                      <span className="font-mono">{edu.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="resume-section">
              <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
                Cloud & Security Certifications
              </h2>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs flex justify-between">
                    <span className="font-semibold text-slate-900">{cert.name}</span>
                    <span className="text-slate-500 font-mono text-[10.5px]">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Custom Sections */}
        {customSections.map((sec) => (
          <section key={sec.id} className="resume-section">
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5 mb-2`} style={{ color: accentColor }}>
              {sec.title}
            </h2>
            <div className="space-y-2">
              {sec.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between font-bold text-slate-950 text-xs">
                    <span>{item.title}</span>
                    {item.date && <span className="font-mono text-slate-500 text-[10.5px]">{item.date}</span>}
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
