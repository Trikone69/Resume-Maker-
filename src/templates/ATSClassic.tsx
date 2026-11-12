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

export const ATSClassic: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#1e293b';

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all`}>
      {/* Header */}
      <header className="border-b border-slate-300 pb-3 mb-4 text-center">
        <h1 className={`${size.name} text-slate-950 font-bold tracking-tight mb-1`}>
          <InlineEditable
            value={personalInfo.fullName}
            onSave={(val) => handlers?.onUpdatePersonalInfo('fullName', val)}
            isEditable={isEditable}
            placeholder="Your Full Name"
          />
        </h1>
        {personalInfo.jobTitle && (
          <p className={`${size.title} font-medium text-slate-700 mb-2`}>
            <InlineEditable
              value={personalInfo.jobTitle}
              onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
              isEditable={isEditable}
              placeholder="Target Job Title"
            />
          </p>
        )}

        <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 ${size.meta} text-slate-600`}>
          <span className="flex items-center gap-1">
            {customization.showIcons && <Mail className="w-3 h-3 text-slate-400" />}
            <InlineEditable
              value={personalInfo.email}
              onSave={(val) => handlers?.onUpdatePersonalInfo('email', val)}
              isEditable={isEditable}
              placeholder="email@example.com"
            />
          </span>
          <span className="flex items-center gap-1">
            {customization.showIcons && <Phone className="w-3 h-3 text-slate-400" />}
            <InlineEditable
              value={personalInfo.phone}
              onSave={(val) => handlers?.onUpdatePersonalInfo('phone', val)}
              isEditable={isEditable}
              placeholder="Phone number"
            />
          </span>
          <span className="flex items-center gap-1">
            {customization.showIcons && <MapPin className="w-3 h-3 text-slate-400" />}
            <InlineEditable
              value={personalInfo.location}
              onSave={(val) => handlers?.onUpdatePersonalInfo('location', val)}
              isEditable={isEditable}
              placeholder="City, State"
            />
          </span>
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              {customization.showIcons && <LinkedinIcon className="w-3 h-3 text-slate-400" />}
              <InlineEditable
                value={personalInfo.linkedin}
                onSave={(val) => handlers?.onUpdatePersonalInfo('linkedin', val)}
                isEditable={isEditable}
                placeholder="LinkedIn Profile URL"
              />
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              {customization.showIcons && <GithubIcon className="w-3 h-3 text-slate-400" />}
              <InlineEditable
                value={personalInfo.github}
                onSave={(val) => handlers?.onUpdatePersonalInfo('github', val)}
                isEditable={isEditable}
                placeholder="GitHub Profile URL"
              />
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              {customization.showIcons && <Globe className="w-3 h-3 text-slate-400" />}
              <InlineEditable
                value={personalInfo.website}
                onSave={(val) => handlers?.onUpdatePersonalInfo('website', val)}
                isEditable={isEditable}
                placeholder="Personal Website URL"
              />
            </span>
          )}
        </div>
      </header>

      {/* Sections based on sectionOrder */}
      <div className={spacingClass}>
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section>
            <h2 
              className={`${size.sectionHeader} border-b border-slate-300 pb-0.5 mb-1.5 font-bold`}
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
            <div className={`${size.body} text-slate-700 leading-relaxed text-justify`}>
              <InlineEditable
                value={personalInfo.summary}
                onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                isEditable={isEditable}
                multiline
                placeholder="Brief professional summary..."
              />
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 
              className={`${size.sectionHeader} border-b border-slate-300 pb-0.5 mb-2 font-bold`}
              style={{ color: accentColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900`}>
                      <strong>
                        <InlineEditable
                          value={exp.jobTitle}
                          onSave={(val) => handlers?.onUpdateExperience(exp.id, 'jobTitle', val)}
                          isEditable={isEditable}
                          placeholder="Job Title"
                        />
                      </strong>
                      {' — '}
                      <span className="font-normal text-slate-700">
                        <InlineEditable
                          value={exp.company}
                          onSave={(val) => handlers?.onUpdateExperience(exp.id, 'company', val)}
                          isEditable={isEditable}
                          placeholder="Company"
                        />
                      </span>
                    </span>
                    <span className={`${size.meta} text-slate-500 font-medium`}>
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
                    <div className={`${size.meta} text-slate-500 italic mb-1`}>
                      <InlineEditable
                        value={exp.location}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'location', val)}
                        isEditable={isEditable}
                        placeholder="Location"
                      />
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
                            placeholder="Add achievement with action verb and metric..."
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
            <h2 
              className={`${size.sectionHeader} border-b border-slate-300 pb-0.5 mb-1.5 font-bold`}
              style={{ color: accentColor }}
            >
              Skills & Expertise
            </h2>
            <div className="space-y-1">
              {skills.filter(s => s.skills.length > 0).map((cat) => (
                <div key={cat.id} className={`${size.body} text-slate-800`}>
                  <strong className="text-slate-950 font-semibold">{cat.category}:</strong>{' '}
                  <span className="text-slate-700">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 
              className={`${size.sectionHeader} border-b border-slate-300 pb-0.5 mb-2 font-bold`}
              style={{ color: accentColor }}
            >
              Key Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900`}>
                      <strong>
                        <InlineEditable
                          value={proj.title}
                          onSave={(val) => handlers?.onUpdateProject(proj.id, 'title', val)}
                          isEditable={isEditable}
                          placeholder="Project Title"
                        />
                      </strong>
                      {proj.subtitle && <span className="font-normal text-slate-600"> | {proj.subtitle}</span>}
                    </span>
                    {(proj.startDate || proj.endDate) && (
                      <span className={`${size.meta} text-slate-500`}>
                        {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                      </span>
                    )}
                  </div>
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className={`${size.meta} text-slate-600 mt-0.5`}>
                      <strong>Technologies:</strong> {proj.techStack.join(', ')}
                    </div>
                  )}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className={`list-disc list-outside ml-4 mt-1 space-y-0.5 ${size.bullet} text-slate-700`}>
                      {proj.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-snug">
                          <InlineEditable
                            value={bullet}
                            onSave={(val) => handlers?.onUpdateProjectBullet(proj.id, idx, val)}
                            isEditable={isEditable}
                            multiline
                            placeholder="Project impact..."
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
            <h2 
              className={`${size.sectionHeader} border-b border-slate-300 pb-0.5 mb-2 font-bold`}
              style={{ color: accentColor }}
            >
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900`}>
                      <strong>{edu.degree}</strong> in {edu.fieldOfStudy}
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
            <h2 
              className={`${size.sectionHeader} border-b border-slate-300 pb-0.5 mb-1.5 font-bold`}
              style={{ color: accentColor }}
            >
              Certifications & Credentials
            </h2>
            <ul className={`list-disc list-outside ml-4 space-y-1 ${size.body} text-slate-700`}>
              {certifications.map((cert) => (
                <li key={cert.id} className="leading-snug">
                  <strong>{cert.name}</strong> — {cert.issuer}
                  {cert.issueDate && <span className="text-slate-500"> ({cert.issueDate}{cert.expiryDate ? ` – ${cert.expiryDate}` : ''})</span>}
                  {cert.credentialId && <span className="text-slate-500"> [ID: {cert.credentialId}]</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 && customSections.map((section) => (
          <section key={section.id}>
            <h2 
              className={`${size.sectionHeader} border-b border-slate-300 pb-0.5 mb-1.5 font-bold`}
              style={{ color: accentColor }}
            >
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
  );
};
