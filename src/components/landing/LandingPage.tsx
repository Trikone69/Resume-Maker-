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
  Printer,
  ChevronDown,
  Check,
  Layout,
  Edit3,
  Lock,
  Cpu,
  GraduationCap,
  Layers,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface Props {
  onStartBuilding: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  onSelectProfile: (profileId: string) => void;
}

interface TemplateCard {
  id: TemplateId;
  name: string;
  cat: string;
  score: string;
  desc: string;
  color: string;
  badge: string;
  features: string[];
}

const TEMPLATE_SHOWCASE: TemplateCard[] = [
  {
    id: 'ats-classic',
    name: 'ATS Classic',
    cat: 'Standard',
    score: '99% ATS Friendly',
    desc: 'The gold-standard single-column layout. High contrast, standard headers, universally parsed by all ATS platforms.',
    color: '#0f172a',
    badge: 'Universal #1',
    features: ['Single-column sequential DOM', 'High contrast headings', 'Workday & Taleo tested']
  },
  {
    id: 'ivy-league',
    name: 'Ivy League & Academic',
    cat: 'Academic',
    score: '99% ATS Friendly',
    desc: 'Prestigious Harvard & Oxford style. Classic serif typography with research, publications, grants, and honors hierarchy.',
    color: '#78350f',
    badge: 'Higher Ed & PhD',
    features: ['Distinguished serif font', 'Formal grants & research', 'Education-first layout']
  },
  {
    id: 'tech-lead',
    name: 'Tech Lead & Architect',
    cat: 'Tech',
    score: '99% ATS Friendly',
    desc: 'Engineered for senior engineers, cloud architects, and tech leads. Highlights system architecture, tech stacks, and scale.',
    color: '#0284c7',
    badge: 'Senior & Staff Dev',
    features: ['Tech stack matrix', 'Architecture callouts', 'GitHub & project links']
  },
  {
    id: 'startup-founder',
    name: 'Startup Founder & PM',
    cat: 'Executive',
    score: '98% ATS Friendly',
    desc: 'High-impact product leader format emphasizing business traction, ARR revenue growth, and strategic roadmap launches.',
    color: '#4f46e5',
    badge: 'Product & Growth',
    features: ['Revenue & metric highlights', 'Product launches', 'Strategic competencies']
  },
  {
    id: 'modern-sidebar',
    name: 'Modern Sidebar Hybrid',
    cat: 'Design',
    score: '97% ATS Friendly',
    desc: 'Sleek left meta rail for skills & education with linear ATS DOM reading order to ensure 100% crawler compatibility.',
    color: '#0f766e',
    badge: 'Contemporary',
    features: ['Two-tone balanced layout', 'Linear crawler stream', 'Skills & contact rail']
  },
  {
    id: 'minimalist-bold',
    name: 'Minimalist Bold',
    cat: 'Design',
    score: '99% ATS Friendly',
    desc: 'Swiss-inspired high-contrast black typography, strong geometric dividers, and spacious distraction-free layout.',
    color: '#000000',
    badge: 'Swiss Typographic',
    features: ['Bold uppercase headers', 'Generous whitespace', 'Maximum legibility']
  },
  {
    id: 'finance-corporate',
    name: 'Corporate & Finance',
    cat: 'Finance',
    score: '99% ATS Friendly',
    desc: 'Crisp borders, high data density, structured financial deals alignment, and rigorous corporate hierarchy.',
    color: '#1e3a8a',
    badge: 'Wall Street Standard',
    features: ['High data density', 'Deal transaction format', 'Garamond / Serif option']
  },
  {
    id: 'legal-consulting',
    name: 'Legal & Consulting',
    cat: 'Legal',
    score: '99% ATS Friendly',
    desc: 'Prestigious Garamond serif, formal case representations, bar admissions, court admissions, and advisory records.',
    color: '#334155',
    badge: 'Counsel & Advisory',
    features: ['Formal legal taxonomy', 'Bar admissions section', 'Litigation & casework']
  },
  {
    id: 'medical-clinical',
    name: 'Medical & Healthcare',
    cat: 'Healthcare',
    score: '98% ATS Friendly',
    desc: 'Prominent board certifications, state licensure, unit telemetry, and patient ratio indicators.',
    color: '#0284c7',
    badge: 'Nursing & Clinical',
    features: ['Licensure & board certs', 'Clinical unit indicators', 'HIPAA compliant structure']
  },
  {
    id: 'technical-grid',
    name: 'Technical / Developer',
    cat: 'Tech',
    score: '98% ATS Friendly',
    desc: 'Monospace code accents with structured skills matrix and highlighted project repositories.',
    color: '#334155',
    badge: 'Engineers & DevOps',
    features: ['Monospace accents', 'Categorized skills matrix', 'Direct code links']
  },
  {
    id: 'nordic-clean',
    name: 'Nordic Minimalist',
    cat: 'Standard',
    score: '97% ATS Friendly',
    desc: 'Spacious high-legibility layout, clean divider accents, and modern typography hierarchy.',
    color: '#059669',
    badge: 'Scandinavian',
    features: ['Relaxed breathing room', 'Subtle dividers', 'Modern sans-serif']
  },
  {
    id: 'executive',
    name: 'Executive Leadership',
    cat: 'Executive',
    score: '97% ATS Friendly',
    desc: 'Refined serif typography with double-line dividers and centered prestige styling for VPs and Directors.',
    color: '#1e293b',
    badge: 'Director & C-Suite',
    features: ['Prestige centered header', 'Double hairline rules', 'Board credentials']
  },
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    cat: 'Tech',
    score: '96% ATS Friendly',
    desc: 'Clean modern look with subtle colored side borders, pill tags, and sleek section dividers.',
    color: '#0284c7',
    badge: 'Tech Favorite',
    features: ['Subtle accent bars', 'Skill pill tags', 'Clean modern flow']
  },
  {
    id: 'creative-minimal',
    name: 'Creative & Growth',
    cat: 'Creative',
    score: '95% ATS Friendly',
    desc: 'Stylish left accent bar, portfolio link badges, and modern project showcases for marketing & design.',
    color: '#7c3aed',
    badge: 'Growth & Creative',
    features: ['Left accent bar', 'Portfolio link badges', 'Project gallery highlights']
  },
  {
    id: 'elegant-compact',
    name: 'Elegant Compact',
    cat: 'Standard',
    score: '92% ATS Friendly',
    desc: 'Two-column semantic layout designed to maximize space while preserving linear ATS reading order.',
    color: '#475569',
    badge: 'Dense 1-Page',
    features: ['Maximum space utilization', 'Linear ATS reading order', 'Dual column display']
  }
];

export const LandingPage: React.FC<Props> = ({
  onStartBuilding,
  onSelectTemplate,
  onSelectProfile
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Interactive ATS keyword demo state
  const [demoRole, setDemoRole] = useState<'software' | 'product' | 'finance'>('software');

  const categories = ['All', 'Tech', 'Executive', 'Finance', 'Academic', 'Healthcare', 'Legal', 'Design'];

  const filteredTemplates = selectedCategory === 'All'
    ? TEMPLATE_SHOWCASE
    : TEMPLATE_SHOWCASE.filter(t => t.cat === selectedCategory || (selectedCategory === 'Tech' && (t.cat === 'Tech' || t.id.includes('tech'))));

  const demoScenarios = {
    software: {
      title: 'Senior Software Engineer (Cloud / Distributed Systems)',
      keywords: [
        { word: 'TypeScript / React', match: true },
        { word: 'Distributed Systems', match: true },
        { word: 'Docker / Kubernetes', match: true },
        { word: 'AWS / Cloud Architecture', match: true },
        { word: 'GraphQL', match: false },
        { word: 'CI/CD Pipelines', match: true },
        { word: 'System Scaling (10M+ DAU)', match: true },
      ],
      score: 96,
      critique: 'Outstanding keyword coverage. Action verbs and quantitative metrics detected.'
    },
    product: {
      title: 'Principal Product Manager (Growth / SaaS)',
      keywords: [
        { word: 'Product Strategy & Roadmap', match: true },
        { word: 'Data-driven Experimentation', match: true },
        { word: 'A/B Testing & Funnels', match: true },
        { word: 'Cross-functional Leadership', match: true },
        { word: 'SQL / Product Analytics', match: false },
        { word: 'ARR & Retention Metrics', match: true },
      ],
      score: 92,
      critique: 'High ATS alignment. Strong outcome-based bullet points.'
    },
    finance: {
      title: 'Senior Financial Analyst (M&A / Corporate Finance)',
      keywords: [
        { word: 'Financial Modeling (DCF / LBO)', match: true },
        { word: 'Due Diligence & Valuation', match: true },
        { word: 'SEC / GAAP Compliance', match: true },
        { word: 'Advanced Excel / VBA', match: true },
        { word: 'Bloomberg Terminal', match: false },
        { word: 'Executive Pitch Decks', match: true },
      ],
      score: 94,
      critique: 'Excellent financial taxonomy recognized by corporate scanning filters.'
    }
  };

  const currentDemo = demoScenarios[demoRole];

  const faqs = [
    {
      q: 'Why do ordinary resumes from graphic design tools get rejected by ATS?',
      a: 'Most graphical tools (like Canva, Photoshop, or Word documents exported with multi-layer tables) output flattened canvas graphics or broken bounding boxes. Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever) cannot extract text streams from images or scrambled tables, resulting in an automatic 0% parsing score.'
    },
    {
      q: 'How does ResumeForge ensure my PDF has zero black borders?',
      a: 'We built a specialized vector print stylesheet and dedicated PDF renderer. All background layers and borders reset to clean, pristine white with standard page margins (10-12mm), completely eliminating the unwanted dark borders and margins common in other web tools.'
    },
    {
      q: 'Can I type and edit directly on the resume page?',
      a: 'Yes! ResumeForge features direct Click-to-Type inline editing. Click on any name, title, date, or bullet point directly on the live document and start typing immediately. Changes auto-save to your browser instantly.'
    },
    {
      q: 'Is my data private? Do I need an account?',
      a: 'ResumeForge is 100% client-side, free, and open source. No sign-up, no passwords, and no hidden subscriptions. Your resume data is saved securely in your browser local storage and never transmitted to third-party ad networks.'
    },
    {
      q: 'Can I import and export my resume as JSON or plain text?',
      a: 'Yes! We support 1-click JSON backup/restore so you can save multiple resume versions or share them across devices, as well as clean plain text (.txt) exports for copy-pasting directly into legacy job application forms.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-900/40">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white">ResumeForge</span>
            <span className="text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-2 hidden sm:inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 100% ATS Ready
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <a href="#templates" className="text-xs font-semibold text-slate-300 hover:text-white hidden md:block transition">
            15 Templates
          </a>
          <a href="#jobs" className="text-xs font-semibold text-slate-300 hover:text-white hidden md:block transition">
            Job Presets
          </a>
          <a href="#scanner-demo" className="text-xs font-semibold text-slate-300 hover:text-white hidden lg:block transition">
            Live Scanner
          </a>
          <a href="#how-it-works" className="text-xs font-semibold text-slate-300 hover:text-white hidden md:block transition">
            ATS Science
          </a>
          <a href="#faq" className="text-xs font-semibold text-slate-300 hover:text-white hidden lg:block transition">
            FAQ
          </a>

          <button
            type="button"
            onClick={onStartBuilding}
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-lg shadow-sky-900/30 transition hover:scale-105"
          >
            Open Resume Studio <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-medium text-slate-300 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-white">New:</span>
          <span>15 Curated ATS-Friendly Templates & Clean Borderless PDF Export</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl">
          Build <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">ATS-Optimized Resumes</span> That Actually Get You Hired.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          Engineered for top enterprise hiring platforms (Workday, Taleo, Greenhouse, Lever). Real-time compliance scoring, live click-to-type inline editing, clean borderless vector PDF downloads, and pre-loaded industry presets.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
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
            <Palette className="w-4 h-4 text-sky-400" /> Explore 15 ATS Templates
          </a>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-3 text-xs text-slate-300">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" /> True Vector PDF (Zero Black Border)
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-sky-400" /> Direct Click-to-Type Live Editing
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Client-Side & Private
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Job Description Scanner
          </span>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 w-full flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">
            Tested & 100% Parseable Across Top Enterprise ATS Platforms
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
      <section id="templates" className="px-4 sm:px-6 py-16 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Curated Resume Gallery
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  15 ATS-Optimized Designs
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Choose Your Template & Start Editing
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
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between hover:border-sky-500/60 hover:shadow-xl hover:shadow-sky-950/40 transition group relative overflow-hidden"
              >
                {/* Visual Accent Top Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 opacity-90"
                  style={{ backgroundColor: tmpl.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-2 mt-1">
                    <span className="font-bold text-base text-slate-100 group-hover:text-sky-300 transition">
                      {tmpl.name}
                    </span>
                    <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {tmpl.score}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700/80">
                      {tmpl.cat}
                    </span>
                    <span className="text-[10px] font-semibold text-sky-400">
                      {tmpl.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {tmpl.desc}
                  </p>

                  {/* Template Key Highlights */}
                  <div className="space-y-1 mb-5">
                    {tmpl.features.map((feat, fIdx) => (
                      <div key={fIdx} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTemplate(tmpl.id)}
                  className="w-full py-2.5 bg-slate-700/80 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition group-hover:bg-sky-600 shadow-sm"
                >
                  Use This Template <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE ATS SCANNER DEMO SECTION */}
      <section id="scanner-demo" className="px-4 sm:px-6 py-16 border-t border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Interactive ATS Algorithm Demo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              See How ATS Scanners Parse Your Resume
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a target role below to preview how our real-time keyword matching algorithm benchmarks candidate profiles.
            </p>

            {/* Role Switcher */}
            <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800 mt-5">
              {(['software', 'product', 'finance'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setDemoRole(r)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition ${
                    demoRole === r ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r === 'software' ? 'Software Engineer' : r === 'product' ? 'Product Manager' : 'Financial Analyst'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Target Benchmark</span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{currentDemo.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-semibold">Simulated Match</span>
                  <span className="text-2xl font-black text-emerald-400">{currentDemo.score}%</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Extracted Keyword Tokens:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentDemo.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border ${
                      kw.match
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {kw.match ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span className="text-rose-400 font-bold">!</span>}
                    {kw.word}
                  </span>
                ))}
              </div>

              <p className="text-xs text-slate-400 pt-2 italic">
                Analysis: {currentDemo.critique}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={onStartBuilding}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                Scan My Own Resume & Job Listing <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* JOB PROFILES SECTION */}
      <section id="jobs" className="px-4 sm:px-6 py-16 border-t border-slate-800 bg-slate-900/30">
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
                className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl hover:border-slate-700 transition flex flex-col justify-between"
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

      {/* HOW ATS WORKS COMPARISON */}
      <section id="how-it-works" className="px-4 sm:px-6 py-16 bg-slate-900/40 border-t border-slate-800">
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
                  <span><strong>True Vector Text PDF:</strong> Outputs selectable, vector-rendered fonts with pure text streams and zero dark border artifacts.</span>
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

      {/* FAQ SECTION */}
      <section id="faq" className="px-4 sm:px-6 py-16 border-t border-slate-800 bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-slate-200 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-sky-400' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
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
      <footer className="border-t border-slate-800/80 py-6 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl mx-auto w-full">
        <div>
          ResumeForge — Free & Open Source ATS Resume Builder. Tested on Workday, Taleo, Greenhouse, and Lever.
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <a href="#templates" className="hover:text-white transition">Templates</a>
          <a href="#jobs" className="hover:text-white transition">Presets</a>
          <a href="https://github.com/Trikone69/Resume-Maker-" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">
            GitHub Repo <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>
    </div>
  );
};
