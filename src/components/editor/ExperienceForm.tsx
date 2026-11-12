import React, { useState } from 'react';
import { Experience } from '../../types/resume';
import { ACTION_VERB_CATEGORIES, PRESET_BULLET_SUGGESTIONS } from '../../data/actionVerbs';
import { Plus, Trash2, ChevronUp, ChevronDown, Sparkles, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

interface Props {
  experiences: Experience[];
  onChange: (updated: Experience[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ experiences, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);
  const [activeVerbCategory, setActiveVerbCategory] = useState<string>(ACTION_VERB_CATEGORIES[0].category);
  const [showVerbHelperFor, setShowVerbHelperFor] = useState<{ expId: string; bulletIdx: number } | null>(null);
  const [showPresetsFor, setShowPresetsFor] = useState<string | null>(null);

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['']
    };
    onChange([newExp, ...experiences]);
    setExpandedId(newExp.id);
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= experiences.length) return;
    const list = [...experiences];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    onChange(list);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      experiences.map(exp => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const addBullet = (expId: string) => {
    onChange(
      experiences.map(exp => {
        if (exp.id === expId) {
          return { ...exp, bullets: [...exp.bullets, ''] };
        }
        return exp;
      })
    );
  };

  const updateBullet = (expId: string, bulletIdx: number, value: string) => {
    onChange(
      experiences.map(exp => {
        if (exp.id === expId) {
          const updated = [...exp.bullets];
          updated[bulletIdx] = value;
          return { ...exp, bullets: updated };
        }
        return exp;
      })
    );
  };

  const removeBullet = (expId: string, bulletIdx: number) => {
    onChange(
      experiences.map(exp => {
        if (exp.id === expId) {
          const updated = exp.bullets.filter((_, idx) => idx !== bulletIdx);
          return { ...exp, bullets: updated.length > 0 ? updated : [''] };
        }
        return exp;
      })
    );
  };

  const insertActionVerb = (expId: string, bulletIdx: number, verb: string) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    const current = exp.bullets[bulletIdx] || '';
    const updated = current ? `${verb} ${current.replace(/^[A-Za-z]+\s*/, '')}` : `${verb} `;
    updateBullet(expId, bulletIdx, updated);
    setShowVerbHelperFor(null);
  };

  const metricRegex = /(\d+[\d,.]*|\$\d+|\d+%\s*|\b\d+x\b|\b\d+[kKmMbB]\b|\b\d+\+\b)/i;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Add your employment history in reverse chronological order. Highlight quantifiable achievements.
        </p>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Add Position
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-700 rounded-xl text-slate-400">
          <p className="text-sm font-medium">No work experience entries yet.</p>
          <p className="text-xs text-slate-500 mt-1">Click "Add Position" above or load a sample profile to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div 
                key={exp.id}
                className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden transition"
              >
                {/* Position Item Header */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-700/50 transition select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 hover:text-slate-200">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>
                    <div>
                      <span className="text-sm font-bold text-slate-100">
                        {exp.jobTitle || 'New Job Title'}
                      </span>
                      {exp.company && (
                        <span className="text-xs text-slate-400 ml-2">
                          @ {exp.company}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveExperience(index, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-400 transition"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === experiences.length - 1}
                      onClick={() => moveExperience(index, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-400 transition"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="p-1 text-rose-400 hover:text-rose-300 ml-1 transition"
                      title="Delete Position"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Position Form Fields (Collapsible) */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-700/60 bg-slate-900/50 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Job Title */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                          Job Title <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                          Company Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Google / Microsoft / Acme Corp"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          placeholder="e.g. New York, NY (or Remote)"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      {/* Dates */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                            Dates of Employment
                          </label>
                          <label className="flex items-center gap-1.5 text-xs text-sky-400 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              className="rounded border-slate-700 text-sky-500 focus:ring-0"
                            />
                            I currently work here
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="Start (e.g. 2021-03)"
                            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <input
                            type="text"
                            disabled={exp.current}
                            value={exp.current ? 'Present' : exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder="End (e.g. 2023-08)"
                            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bullet Points Section */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-400" /> Key Achievements & Responsibilities
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowPresetsFor(showPresetsFor === exp.id ? null : exp.id)}
                          className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition"
                        >
                          <Sparkles className="w-3 h-3" />
                          {showPresetsFor === exp.id ? 'Hide Suggestions' : 'Impact Suggestions'}
                        </button>
                      </div>

                      {/* Preset Bullet Suggestions Drawer */}
                      {showPresetsFor === exp.id && (
                        <div className="p-3 bg-slate-950/60 border border-sky-800/60 rounded-lg space-y-2 mb-2">
                          <div className="text-xs font-semibold text-sky-300">
                            Click to append high-impact achievement bullet:
                          </div>
                          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {PRESET_BULLET_SUGGESTIONS.map((preset, pIdx) => (
                              <button
                                key={pIdx}
                                type="button"
                                onClick={() => {
                                  updateExperience(exp.id, 'bullets', [...exp.bullets.filter(Boolean), preset]);
                                  setShowPresetsFor(null);
                                }}
                                className="w-full text-left text-xs p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                              >
                                {preset}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bullets List */}
                      <div className="space-y-2.5">
                        {exp.bullets.map((bullet, bIdx) => {
                          const hasMetric = metricRegex.test(bullet);
                          const isVerbHelperOpen = showVerbHelperFor?.expId === exp.id && showVerbHelperFor?.bulletIdx === bIdx;

                          return (
                            <div key={bIdx} className="space-y-1">
                              <div className="flex items-start gap-2">
                                <span className="text-slate-500 text-xs mt-2.5 font-mono select-none">•</span>
                                <div className="flex-1 relative">
                                  <textarea
                                    rows={2}
                                    value={bullet}
                                    onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                                    placeholder="Accomplished [X] as measured by [Y] by doing [Z] (e.g. Spearheaded migration to microservices, reducing AWS spend by $85k)..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
                                  />
                                  <div className="flex items-center justify-between mt-0.5">
                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => setShowVerbHelperFor(isVerbHelperOpen ? null : { expId: exp.id, bulletIdx: bIdx })}
                                        className="text-[10px] text-sky-400 hover:text-sky-300 font-medium underline flex items-center gap-0.5"
                                      >
                                        <Zap className="w-2.5 h-2.5 text-amber-400" /> Power Action Verbs
                                      </button>
                                      {hasMetric && (
                                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.2 rounded flex items-center gap-1 font-medium">
                                          <CheckCircle2 className="w-2.5 h-2.5" /> Quantified metric detected
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-slate-500">
                                      {bullet.trim() ? `${bullet.trim().split(/\s+/).length} words` : ''}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeBullet(exp.id, bIdx)}
                                  className="p-1 text-slate-400 hover:text-rose-400 mt-2 transition"
                                  title="Delete bullet"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Power Verb Picker Popover */}
                              {isVerbHelperOpen && (
                                <div className="ml-5 p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs space-y-2">
                                  <div className="flex flex-wrap gap-1 border-b border-slate-800 pb-1.5">
                                    {ACTION_VERB_CATEGORIES.map(cat => (
                                      <button
                                        key={cat.category}
                                        type="button"
                                        onClick={() => setActiveVerbCategory(cat.category)}
                                        className={`px-2 py-0.5 text-[10px] rounded transition ${
                                          activeVerbCategory === cat.category
                                            ? 'bg-sky-600 text-white font-medium'
                                            : 'text-slate-400 hover:bg-slate-800'
                                        }`}
                                      >
                                        {cat.category}
                                      </button>
                                    ))}
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                                    {ACTION_VERB_CATEGORIES.find(c => c.category === activeVerbCategory)?.verbs.map(verb => (
                                      <button
                                        key={verb}
                                        type="button"
                                        onClick={() => insertActionVerb(exp.id, bIdx, verb)}
                                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-sky-700 text-slate-200 border border-slate-700 transition"
                                      >
                                        + {verb}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => addBullet(exp.id)}
                        className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold mt-1 transition"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Another Bullet Point
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
