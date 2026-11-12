import React from 'react';
import { ResumeCustomization, TemplateId, FontFamily, FontSize, MarginSize, PaperSize } from '../../types/resume';
import { Palette, Type, Layout, Sliders, Check, FileCheck } from 'lucide-react';

interface Props {
  customization: ResumeCustomization;
  onChange: (updated: ResumeCustomization) => void;
}

const TEMPLATES: { id: TemplateId; name: string; tag: string; description: string; score: string }[] = [
  {
    id: 'ats-classic',
    name: 'ATS Classic',
    tag: 'Highest ATS Compatibility',
    description: 'Traditional single-column layout. High contrast, standard headers, universally parsed by all ATS platforms.',
    score: '99% ATS Friendly'
  },
  {
    id: 'finance-corporate',
    name: 'Corporate & Finance',
    tag: 'Banking & Investment',
    description: 'Crisp borders, high data density, structured deals and financial metrics alignment.',
    score: '99% ATS Friendly'
  },
  {
    id: 'legal-consulting',
    name: 'Legal & Consulting',
    tag: 'Attorneys & Counsel',
    description: 'Prestigious Garamond serif, formal case representations, bar admissions, and litigation history.',
    score: '99% ATS Friendly'
  },
  {
    id: 'medical-clinical',
    name: 'Medical & Healthcare',
    tag: 'Nursing & Clinical',
    description: 'Prominent board certifications, state licensure, unit telemetry, and patient ratio indicators.',
    score: '98% ATS Friendly'
  },
  {
    id: 'technical-grid',
    name: 'Technical / Developer',
    tag: 'Engineers & DevOps',
    description: 'Monospace code accents with structured skills matrix and highlighted project repositories.',
    score: '98% ATS Friendly'
  },
  {
    id: 'nordic-clean',
    name: 'Nordic Minimalist',
    tag: 'Modern Scandinavian',
    description: 'Spacious high-legibility layout, clean divider accents, and modern typography hierarchy.',
    score: '97% ATS Friendly'
  },
  {
    id: 'executive',
    name: 'Executive Leadership',
    tag: 'Directors & VP Level',
    description: 'Refined serif typography with double-line dividers and centered prestige styling.',
    score: '97% ATS Friendly'
  },
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    tag: 'Tech & Startup Favorite',
    description: 'Clean modern look with subtle colored side borders, pill tags, and sleek section dividers.',
    score: '96% ATS Friendly'
  },
  {
    id: 'creative-minimal',
    name: 'Creative & Growth',
    tag: 'Marketing & Design',
    description: 'Stylish left accent bar, portfolio link badges, and modern project showcases.',
    score: '95% ATS Friendly'
  },
  {
    id: 'elegant-compact',
    name: 'Elegant Compact',
    tag: 'Dense 1-Page Layout',
    description: 'Clean two-column semantic layout designed to maximize space while preserving linear ATS reading order.',
    score: '92% ATS Friendly'
  }
];

const FONTS: { id: FontFamily; name: string; preview: string; fontClass: string }[] = [
  { id: 'inter', name: 'Inter', preview: 'Clean modern sans-serif', fontClass: 'font-sans' },
  { id: 'roboto', name: 'Roboto', preview: 'Universal high legibility', fontClass: 'font-roboto' },
  { id: 'merriweather', name: 'Merriweather', preview: 'Distinguished serif font', fontClass: 'font-serif' },
  { id: 'garamond', name: 'EB Garamond', preview: 'Academic classical serif', fontClass: 'font-garamond' },
  { id: 'mono', name: 'JetBrains Mono', preview: 'Tech engineer monospace', fontClass: 'font-mono' }
];

const COLOR_PRESETS = [
  { hex: '#0f172a', name: 'Slate Dark' },
  { hex: '#0284c7', name: 'Ocean Sky' },
  { hex: '#1e3a8a', name: 'Royal Navy' },
  { hex: '#059669', name: 'Emerald' },
  { hex: '#7c3aed', name: 'Deep Violet' },
  { hex: '#be123c', name: 'Burgundy' },
  { hex: '#b45309', name: 'Warm Amber' }
];

export const TemplateSettingsForm: React.FC<Props> = ({ customization, onChange }) => {
  const updateCustomization = (field: keyof ResumeCustomization, value: any) => {
    onChange({ ...customization, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-sky-400" /> Choose Resume Template ({TEMPLATES.length} ATS Designs)
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
          {TEMPLATES.map((tmpl) => {
            const isSelected = customization.template === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => updateCustomization('template', tmpl.id)}
                className={`relative p-3.5 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-sky-500 bg-sky-950/40 shadow-md ring-1 ring-sky-500'
                    : 'border-slate-700 bg-slate-800/80 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-100">{tmpl.name}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700 inline-block mb-1.5">
                    {tmpl.tag}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">
                    {tmpl.description}
                  </p>
                </div>
                <div className="text-[10.5px] font-semibold text-emerald-400 flex items-center gap-1 pt-1.5 border-t border-slate-700/50">
                  <FileCheck className="w-3 h-3" /> {tmpl.score}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Typography Selection */}
      <div className="pt-4 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-sky-400" /> Typography & Font Family
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {FONTS.map((font) => {
            const isSelected = customization.fontFamily === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => updateCustomization('fontFamily', font.id)}
                className={`p-2.5 rounded-lg border text-left transition ${
                  isSelected
                    ? 'border-sky-500 bg-sky-950/40 text-slate-100'
                    : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className={`text-sm font-bold ${font.fontClass}`}>
                  {font.name}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {font.preview}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Colors */}
      <div className="pt-4 border-t border-slate-800">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-sky-400" /> Accent Color
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {COLOR_PRESETS.map((color) => {
            const isSelected = customization.accentColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => updateCustomization('accentColor', color.hex)}
                className={`w-9 h-9 rounded-full transition flex items-center justify-center border-2 ${
                  isSelected ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
              </button>
            );
          })}

          <div className="flex items-center gap-1.5 ml-2 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg">
            <span className="text-xs text-slate-400">Custom:</span>
            <input
              type="color"
              value={customization.accentColor}
              onChange={(e) => updateCustomization('accentColor', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
            />
            <span className="text-xs font-mono text-slate-300 uppercase">
              {customization.accentColor}
            </span>
          </div>
        </div>
      </div>

      {/* Sizing & Spacing Adjustments */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-sky-400" /> Document Geometry & Spacing
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Font Size */}
          <div>
            <label className="block text-[11px] text-slate-400 font-medium mb-1">
              Text Size
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
              {(['compact', 'normal', 'spacious'] as FontSize[]).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => updateCustomization('fontSize', sz)}
                  className={`py-1 text-xs capitalize rounded transition ${
                    customization.fontSize === sz
                      ? 'bg-sky-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sz === 'compact' ? 'Small' : sz === 'normal' ? 'Medium' : 'Large'}
                </button>
              ))}
            </div>
          </div>

          {/* Margins */}
          <div>
            <label className="block text-[11px] text-slate-400 font-medium mb-1">
              Page Margins
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
              {(['compact', 'normal', 'spacious'] as MarginSize[]).map((mg) => (
                <button
                  key={mg}
                  type="button"
                  onClick={() => updateCustomization('marginSize', mg)}
                  className={`py-1 text-xs capitalize rounded transition ${
                    customization.marginSize === mg
                      ? 'bg-sky-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mg === 'compact' ? 'Tight' : mg === 'normal' ? 'Normal' : 'Wide'}
                </button>
              ))}
            </div>
          </div>

          {/* Paper Size */}
          <div>
            <label className="block text-[11px] text-slate-400 font-medium mb-1">
              Paper Standard
            </label>
            <div className="grid grid-cols-2 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
              {(['a4', 'letter'] as PaperSize[]).map((ps) => (
                <button
                  key={ps}
                  type="button"
                  onClick={() => updateCustomization('paperSize', ps)}
                  className={`py-1 text-xs uppercase rounded transition ${
                    customization.paperSize === ps
                      ? 'bg-sky-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {ps}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Icons Toggle */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs font-semibold text-slate-200">Show Contact Icons</span>
            <p className="text-[11px] text-slate-400">Include small SVG icons next to email, phone, and links</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={customization.showIcons}
              onChange={(e) => updateCustomization('showIcons', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
