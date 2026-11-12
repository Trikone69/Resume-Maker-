import React, { useState } from 'react';
import { SAMPLE_PROFILES } from '../../data/sampleProfiles';
import { TemplateId } from '../../types/resume';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  FileText,
  FileCheck,
  Palette,
  Target,
  Sliders,
  Briefcase,
  Users,
  Search,
  Zap,
  Printer
} from 'lucide-react';

interface Props {
  onStartBuilding: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  onSelectProfile: (profileId: string) => void;
}

const TEMPLATE_SHOWCASE = [
  { id: 'ats-classic', name: 'ATS Classic', cat: 'Standard', score: '99% ATS Friendly', desc: 'Standard single-column format, high contrast, universally parsed by all ATS platforms.' },
  { id: 'finance-corporate', name: 'Corporate & Finance', cat: 'Finance', score: '99% ATS Friendly', desc: 'Sharp borders, high data density, structured financial metrics and deals alignment.' },
  { id: 'legal-consulting', name: 'Legal & Consulting', cat: 'Legal', score: '99% ATS Friendly', desc: 'Prestigious Garamond serif, formal case representations and bar admissions.' },
  { id: 'medical-clinical', name: 'Medical & Healthcare', cat: 'Healthcare', score: '98% ATS Friendly', desc: 'Prominent board certifications, state licensure, unit telemetry, and patient ratios.' },
  { id: 'technical-grid', name: 'Technical / Developer', cat: 'Tech', score: '98% ATS Friendly', desc: 'Monospace code accents with structured skills matrix and highlighted project repositories.' },
  { id: 'nordic-clean', name: 'Nordic Minimalist', cat: 'Minimalist', score: '97% ATS Friendly', desc: 'Spacious high-legibility layout, clean divider accents, and modern typography hierarchy.' },
  { id: 'executive', name: 'Executive Leadership', cat: 'Corporate', score: '97% ATS Friendly', desc: 'Refined serif typography with double-line dividers and centered prestige styling.' },
  { id: 'modern-clean', name: 'Modern Clean', cat: 'Tech', score: '96% ATS Friendly', desc: 'Clean modern look with subtle colored side borders, pill tags, and sleek section dividers.' },
  { id: 'creative-minimal', name: 'Creative & Growth', cat: 'Creative', score: '95% ATS Friendly', desc: 'Stylish left accent bar, portfolio link badges, and modern project showcases.' },
  { id: 'elegant-compact', name: 'Elegant Compact', cat: 'Dense', score: '92% ATS Friendly', desc: 'Two-column semantic layout designed to maximize space with linear ATS reading order.' }
];

export const LandingPage: React.FC<Props> = ({
  onStartBuilding,
  onSelectTemplate,
  onSelectProfile
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Tech', 'Finance', 'Healthcare', 'Legal', 'Creative'];

  const filteredTemplates = selectedCategory === 'All'
    ? TEMPLATE_SHOWCASE
    : TEMPLATE_SHOWCASE.filter(t => t.cat === selectedCategory || (selectedCategory === 'Tech' && t.id.includes('tech')));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-900/40">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white">ResumeForge</span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-2 hidden sm:inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> ATS 100% Compliant
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href="#templates" className="text-xs font-semibold text-slate-300 hover:text-white hidden md:block transition">
            Templates
          </a>
          <a href="#jobs" className="text-xs font-semibold text-slate-300 hover:text-white hidden md:block transition">
            Job Presets
          </a>
          <a href="#how-it-works" className="text-xs font-semibold text-slate-300 hover:text-white hidden md:block transition">
            ATS Science
          </a>
          <button
            type="button"
            onClick={onStartBuilding}
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-sky-900/30 transition hover:scale-105"
          >
            Open Resume Studio <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-300 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>75%+ of resumes are discarded by ATS algorithms before humans read them.</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl">
          Build <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">ATS-Optimized Resumes</span> That Actually Land Interviews.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          Designed specifically for Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever). Live compliance scoring, on-page inline editing, keyword gap analysis, and true vector PDF exports.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
          <button
            type="button"
            onClick={onStartBuilding}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-sky-900/40 transition hover:scale-105"
          >
            Start Building Free <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#templates"
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2"
          >
            <Palette className="w-4 h-4 text-sky-400" /> Browse 10 ATS Templates
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 w-full flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">
            Pre-tested and 100% parseable across top enterprise ATS platforms
          </span>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-slate-400 font-bold text-sm tracking-wide opacity-80">
            <span>Workday</span>
            <span>Greenhouse</span>
            <span>Taleo / Oracle</span>
            <span>Lever</span>
            <span>iCIMS</span>
            <span>BambooHR</span>
            <span>Ashby</span>
          </div>
        </div>
      </section>

      {/* TEMPLATES SHOWCASE SECTION */}
      <section id="templates" className="px-6 py-16 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                10 Curated Resume Designs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Choose an ATS-Verified Template
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Every template is structured with semantic HTML headings, readable typography, and strict linear reading orders so automated bots never skip your achievements.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                    selectedCategory === cat
                      ? 'bg-sky-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between hover:border-sky-500/60 hover:shadow-xl hover:shadow-sky-950/40 transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-base text-slate-100 group-hover:text-sky-300 transition">
                      {tmpl.name}
                    </span>
                    <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {tmpl.score}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700/80 inline-block mb-2">
                    {tmpl.cat}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {tmpl.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTemplate(tmpl.id as TemplateId)}
                  className="w-full py-2.5 bg-slate-700/80 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition group-hover:bg-sky-600"
                >
                  Use This Template <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB PROFILES SECTION */}
      <section id="jobs" className="px-6 py-16 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Pre-Loaded Industry Presets
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Select Your Role to Get Started Instantly
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Each profile includes real-world, high-impact quantifiable bullet points, industry-specific skills, and certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SAMPLE_PROFILES.map((profile) => (
              <div
                key={profile.id}
                className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
                    {profile.category}
                  </div>
                  <div className="font-bold text-sm text-slate-100 mb-1">
                    {profile.label}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                    {profile.data.personalInfo.summary}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProfile(profile.id)}
                  className="w-full py-1.5 bg-slate-800 hover:bg-sky-600 text-slate-200 hover:text-white font-medium text-xs rounded-lg transition text-center"
                >
                  Load & Customize
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW ATS WORKS INTERACTIVE EXPLAINER */}
      <section id="how-it-works" className="px-6 py-16 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              The Science Behind Parseability
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Why Traditional Graphic Resumes Fail ATS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Bad Way */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/50 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
                <XCircle className="w-5 h-5" /> What Breaks Applicant Tracking Systems
              </div>
              <ul className="space-y-3 text-xs text-rose-200/90">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Flattened Canvas / Images:</strong> Many graphic tools output images inside PDFs. ATS parsers find zero text to extract and reject the candidate automatically.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Non-Standard Headings:</strong> Using "My Journey" or "What I Do" confuses OCR engines searching for "Work Experience" and "Education".</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Nested Complex Tables:</strong> Taleo and Workday linear parsers jumble multi-column nested table cells out of chronological order.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Missing Target Keywords:</strong> Failing to mention exact skills listed in the job description leads to ranking at the bottom of candidate search results.</span>
                </li>
              </ul>
            </div>

            {/* The ResumeForge Solution */}
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/50 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5" /> How ResumeForge Guarantees 95%+ Scores
              </div>
              <ul className="space-y-3 text-xs text-emerald-200/90">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>True Vector Text PDF:</strong> Outputs selectable, vector-rendered fonts with pure text streams that ATS OCR engines extract with 100% fidelity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Standard Industry Hierarchy:</strong> Strict semantic HTML (`h1`, `h2`, `ul`, `li`) mapped to recruiter taxonomy expectations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Direct On-Page Editing:</strong> Click anywhere on the resume to type and edit live, with real-time score updates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Job Description Matcher:</strong> Paste any job listing to see exact matched vs missing technical keywords.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="px-6 py-16 text-center border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to Beat the ATS and Land Interviews?
          </h2>
          <p className="text-sm text-slate-300">
            No signup required. No paywalls. Everything is auto-saved directly in your browser.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onStartBuilding}
              className="px-8 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm rounded-xl inline-flex items-center gap-2 shadow-xl shadow-sky-900/40 transition hover:scale-105"
            >
              Open Resume Studio Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 px-6 text-center text-xs text-slate-500">
        ResumeForge — Free & Open Source ATS Resume Builder. Tested on Workday, Taleo, Greenhouse, and Lever.
      </footer>
    </div>
  );
};
