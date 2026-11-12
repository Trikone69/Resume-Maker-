import React, { useState } from 'react';
import { PersonalInfo } from '../../types/resume';
import { User, Briefcase, Mail, Phone, MapPin, Globe, FileText, Sparkles } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../icons/SocialIcons';

interface Props {
  info: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

const SUMMARY_TEMPLATES = [
  "Results-driven [Job Title] with [X]+ years of proven track record in [Core Competency]. Spearheaded projects that increased [Metric/Revenue] by [X]%. Adept in [Skill 1], [Skill 2], and cross-functional leadership.",
  "Innovative and detail-oriented [Job Title] experienced in building scalable solutions and driving user-centric outcomes. Passionate about leveraging [Key Technology] to solve complex business challenges.",
  "High-performing [Job Title] with demonstrated expertise in operational efficiency, agile product delivery, and team mentorship. Successfully delivered [X]+ high-impact initiatives on schedule and within budget."
];

export const PersonalInfoForm: React.FC<Props> = ({ info, onChange }) => {
  const [showSummaryHelper, setShowSummaryHelper] = useState(false);

  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...info, [field]: value });
  };

  const wordCount = info.summary.trim() ? info.summary.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-sky-400" /> Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={info.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="e.g. Alex Vance"
            className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-sky-400" /> Target Job Title
          </label>
          <input
            type="text"
            value={info.jobTitle}
            onChange={(e) => updateField('jobTitle', e.target.value)}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-sky-400" /> Email Address <span className="text-rose-400">*</span>
          </label>
          <input
            type="email"
            value={info.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="e.g. alex.vance@example.com"
            className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-sky-400" /> Phone Number
          </label>
          <input
            type="tel"
            value={info.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="e.g. +1 (555) 234-5678"
            className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sky-400" /> Location (City, State / Country)
          </label>
          <input
            type="text"
            value={info.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="e.g. San Francisco, CA"
            className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" /> LinkedIn Profile URL
          </label>
          <input
            type="url"
            value={info.linkedin}
            onChange={(e) => updateField('linkedin', e.target.value)}
            placeholder="e.g. https://linkedin.com/in/alexvance"
            className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <GithubIcon className="w-3.5 h-3.5 text-sky-400" /> GitHub / Portfolio URL
          </label>
          <input
            type="url"
            value={info.github}
            onChange={(e) => updateField('github', e.target.value)}
            placeholder="e.g. https://github.com/alexvance"
            className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-400" /> Personal Website / Portfolio
          </label>
          <input
            type="url"
            value={info.website}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="e.g. https://alexvance.dev"
            className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-sky-400" /> Professional Summary
          </label>
          <div className="flex items-center gap-3">
            <span className={`text-xs ${wordCount >= 30 && wordCount <= 80 ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}>
              {wordCount} words {wordCount >= 30 && wordCount <= 80 && '✓ (Ideal)'}
            </span>
            <button
              type="button"
              onClick={() => setShowSummaryHelper(!showSummaryHelper)}
              className="text-xs flex items-center gap-1 text-sky-400 hover:text-sky-300 transition"
            >
              <Sparkles className="w-3 h-3" />
              {showSummaryHelper ? 'Hide Templates' : 'Templates'}
            </button>
          </div>
        </div>

        {showSummaryHelper && (
          <div className="mb-2 p-3 bg-sky-950/40 border border-sky-800/60 rounded-lg space-y-2">
            <div className="text-xs font-medium text-sky-300">Click a template below to insert:</div>
            {SUMMARY_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => updateField('summary', tmpl.replace('[Job Title]', info.jobTitle || 'Professional'))}
                className="w-full text-left text-xs p-2 rounded bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 transition"
              >
                {tmpl}
              </button>
            ))}
          </div>
        )}

        <textarea
          rows={4}
          value={info.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          placeholder="Brief 2-4 sentence summary highlighting your years of experience, core technical strengths, and top quantifiable achievements..."
          className="w-full bg-slate-800/90 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition leading-relaxed"
        />
        <p className="text-[11px] text-slate-400 mt-1">
          💡 ATS Tip: An ideal summary is 40–80 words. Avoid generic phrases like "hard worker" and focus on quantifiable achievements and key technical skills.
        </p>
      </div>
    </div>
  );
};
