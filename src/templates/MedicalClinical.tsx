import React from 'react';
import { ResumeData, ResumeUpdateHandlers } from '../types/resume';
import { getFontFamilyClass, getFontSizeClasses, getMarginClass, getLineSpacingClass } from './TemplateHelpers';
import { Mail, Phone, MapPin, Award, Activity } from 'lucide-react';
import { InlineEditable } from '../components/common/InlineEditable';

interface Props {
  data: ResumeData;
  handlers?: ResumeUpdateHandlers;
  isEditable?: boolean;
}

export const MedicalClinical: React.FC<Props> = ({ data, handlers, isEditable = true }) => {
  const { personalInfo, experiences, education, skills, certifications, customSections, customization } = data;
  const fontClass = getFontFamilyClass(customization.fontFamily);
  const size = getFontSizeClasses(customization.fontSize);
  const marginClass = getMarginClass(customization.marginSize);
  const spacingClass = getLineSpacingClass(customization.lineSpacing);
  const accentColor = customization.accentColor || '#0284c7';

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} ${marginClass} shadow-sm print:shadow-none print:p-0 transition-all`}>
      {/* Clinical Header */}
      <header className="border-b-2 pb-3 mb-4" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h1 className={`${size.name} font-bold text-slate-950 tracking-tight flex items-center gap-2`}>
              <InlineEditable
                value={personalInfo.fullName}
                onSave={(val) => handlers?.onUpdatePersonalInfo('fullName', val)}
                isEditable={isEditable}
                placeholder="Full Name, Credentials (e.g. BSN, RN)"
              />
            </h1>
            <p className={`${size.title} font-bold tracking-wide flex items-center gap-1.5`} style={{ color: accentColor }}>
              <Activity className="w-3.5 h-3.5" />
              <InlineEditable
                value={personalInfo.jobTitle}
                onSave={(val) => handlers?.onUpdatePersonalInfo('jobTitle', val)}
                isEditable={isEditable}
                placeholder="Clinical Title / Specialty"
              />
            </p>
          </div>
          <div className={`${size.meta} text-slate-600 sm:text-right space-y-0.5`}>
            {personalInfo.location && (
              <div className="flex items-center sm:justify-end gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <InlineEditable
                  value={personalInfo.location}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('location', val)}
                  isEditable={isEditable}
                  placeholder="Location"
                />
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center sm:justify-end gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <InlineEditable
                  value={personalInfo.phone}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('phone', val)}
                  isEditable={isEditable}
                  placeholder="Phone"
                />
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center sm:justify-end gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <InlineEditable
                  value={personalInfo.email}
                  onSave={(val) => handlers?.onUpdatePersonalInfo('email', val)}
                  isEditable={isEditable}
                  placeholder="Email"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sections */}
      <div className={spacingClass}>
        {/* Clinical Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5`} style={{ color: accentColor }}>
              Clinical Practice Summary
            </h2>
            <div className={`${size.body} text-slate-800 leading-relaxed text-justify`}>
              <InlineEditable
                value={personalInfo.summary}
                onSave={(val) => handlers?.onUpdatePersonalInfo('summary', val)}
                isEditable={isEditable}
                multiline
                placeholder="Clinical summary emphasizing patient acuity, certifications, and clinical outcomes..."
              />
            </div>
          </section>
        )}

        {/* State Licensure & Board Certifications (Prominent for Healthcare ATS) */}
        {certifications.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5`} style={{ color: accentColor }}>
              Licensure & Board Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-[11px] flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-sky-600 shrink-0" />
                    <span>{cert.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    {cert.issuer} {cert.credentialId && `• ID: ${cert.credentialId}`}
                    {cert.expiryDate && ` (Expires: ${cert.expiryDate})`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Clinical Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2`} style={{ color: accentColor }}>
              Clinical Experience & Hospital Appointments
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold`}>
                      <InlineEditable
                        value={exp.jobTitle}
                        onSave={(val) => handlers?.onUpdateExperience(exp.id, 'jobTitle', val)}
                        isEditable={isEditable}
                        placeholder="Clinical Role"
                      />
                      {' — '}
                      <span className="font-semibold text-slate-700">
                        <InlineEditable
                          value={exp.company}
                          onSave={(val) => handlers?.onUpdateExperience(exp.id, 'company', val)}
                          isEditable={isEditable}
                          placeholder="Hospital / Health System"
                        />
                      </span>
                    </span>
                    <span className={`${size.meta} font-semibold text-slate-600`}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div className={`${size.meta} text-slate-500 italic mb-1`}>
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
                            placeholder="Clinical contribution / patient outcome..."
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

        {/* Clinical Competencies & Skills */}
        {skills.length > 0 && skills.some(s => s.skills.length > 0) && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5`} style={{ color: accentColor }}>
              Clinical Competencies & Technical Skills
            </h2>
            <div className="space-y-1">
              {skills.filter(s => s.skills.length > 0).map((cat) => (
                <div key={cat.id} className={`${size.body} text-slate-800`}>
                  <strong className="text-slate-950 font-bold">{cat.category}:</strong>{' '}
                  <span>{cat.skills.join(' • ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2`} style={{ color: accentColor }}>
              Education & Academic Degrees
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <span className={`${size.subHeader} text-slate-900 font-bold`}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className={`${size.meta} text-slate-500 font-semibold`}>
                      {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-700">
                    <span className={size.body}>{edu.institution}</span>
                    <span className={`${size.meta} text-slate-500`}>{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections / Committees */}
        {customSections.length > 0 && customSections.map((section) => (
          <section key={section.id}>
            <h2 className={`${size.sectionHeader} font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5`} style={{ color: accentColor }}>
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
