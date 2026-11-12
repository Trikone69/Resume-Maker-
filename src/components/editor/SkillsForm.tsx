import React, { useState } from 'react';
import { SkillCategory } from '../../types/resume';
import { Plus, Trash2, X, Tag, Sparkles } from 'lucide-react';

interface Props {
  skills: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
}

const POPULAR_SKILL_SUGGESTIONS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Go', 'SQL',
  'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Git', 'GraphQL',
  'Next.js', 'Tailwind CSS', 'Redis', 'CI/CD', 'REST APIs', 'Agile/Scrum'
];

export const SkillsForm: React.FC<Props> = ({ skills, onChange }) => {
  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});

  const addCategory = () => {
    const newCat: SkillCategory = {
      id: `skill-${Date.now()}`,
      category: 'New Category',
      skills: []
    };
    onChange([...skills, newCat]);
  };

  const removeCategory = (id: string) => {
    onChange(skills.filter(cat => cat.id !== id));
  };

  const updateCategoryName = (id: string, name: string) => {
    onChange(
      skills.map(cat => (cat.id === id ? { ...cat, category: name } : cat))
    );
  };

  const addSkillToCategory = (catId: string, skillName: string) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;
    onChange(
      skills.map(cat => {
        if (cat.id === catId) {
          if (cat.skills.includes(trimmed)) return cat;
          return { ...cat, skills: [...cat.skills, trimmed] };
        }
        return cat;
      })
    );
    setNewSkillInput({ ...newSkillInput, [catId]: '' });
  };

  const removeSkillFromCategory = (catId: string, skillIdx: number) => {
    onChange(
      skills.map(cat => {
        if (cat.id === catId) {
          return { ...cat, skills: cat.skills.filter((_, idx) => idx !== skillIdx) };
        }
        return cat;
      })
    );
  };

  const handleKeyDown = (catId: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkillToCategory(catId, newSkillInput[catId] || '');
    }
  };

  const totalSkillCount = skills.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs text-slate-400">
            Organize skills by category for optimal ATS keyword parsing.
          </p>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-sky-400 font-medium border border-slate-700">
            {totalSkillCount} total skills
          </span>
        </div>
        <button
          type="button"
          onClick={addCategory}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Add Category
        </button>
      </div>

      {/* Quick Add Pill Suggestions */}
      <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-1.5">
        <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Quick Add Popular Skills:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SKILL_SUGGESTIONS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => {
                const targetCat = skills[0] || null;
                if (targetCat) {
                  addSkillToCategory(targetCat.id, skill);
                }
              }}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-sky-700 text-slate-300 hover:text-white border border-slate-700 transition"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {skills.map((cat) => (
          <div key={cat.id} className="p-3.5 bg-slate-800/80 border border-slate-700/80 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={cat.category}
                onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                placeholder="Category Name (e.g. Languages & Frameworks)"
                className="bg-transparent border-b border-slate-600 font-bold text-xs uppercase tracking-wider text-slate-200 focus:outline-none focus:border-sky-400 px-1 py-0.5 w-full max-w-xs"
              />
              <button
                type="button"
                onClick={() => removeCategory(cat.id)}
                className="text-slate-400 hover:text-rose-400 p-1 transition"
                title="Remove Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-slate-900 text-sky-300 border border-slate-700"
                >
                  <Tag className="w-2.5 h-2.5 text-sky-400" />
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkillFromCategory(cat.id, sIdx)}
                    className="text-slate-400 hover:text-rose-400 ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Input to add skill */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkillInput[cat.id] || ''}
                onChange={(e) => setNewSkillInput({ ...newSkillInput, [cat.id]: e.target.value })}
                onKeyDown={(e) => handleKeyDown(cat.id, e)}
                placeholder="Type skill and press Enter (or comma)..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => addSkillToCategory(cat.id, newSkillInput[cat.id] || '')}
                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-lg transition"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
