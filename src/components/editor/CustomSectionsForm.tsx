import React from 'react';
import { CustomSection, CustomItem } from '../../types/resume';
import { Plus, Trash2, Layers } from 'lucide-react';

interface Props {
  sections: CustomSection[];
  onChange: (updated: CustomSection[]) => void;
}

export const CustomSectionsForm: React.FC<Props> = ({ sections, onChange }) => {
  const addSection = () => {
    const newSec: CustomSection = {
      id: `custom-${Date.now()}`,
      title: 'Awards & Honors',
      items: [
        {
          id: `citem-${Date.now()}`,
          title: '',
          subtitle: '',
          date: '',
          description: ''
        }
      ]
    };
    onChange([...sections, newSec]);
  };

  const removeSection = (id: string) => {
    onChange(sections.filter(s => s.id !== id));
  };

  const updateSectionTitle = (id: string, title: string) => {
    onChange(
      sections.map(s => (s.id === id ? { ...s, title } : s))
    );
  };

  const addItemToSection = (sectionId: string) => {
    const newItem: CustomItem = {
      id: `citem-${Date.now()}`,
      title: '',
      subtitle: '',
      date: '',
      description: ''
    };
    onChange(
      sections.map(s => (s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s))
    );
  };

  const updateItem = (sectionId: string, itemId: string, field: keyof CustomItem, val: string) => {
    onChange(
      sections.map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            items: s.items.map(it => (it.id === itemId ? { ...it, [field]: val } : it))
          };
        }
        return s;
      })
    );
  };

  const removeItem = (sectionId: string, itemId: string) => {
    onChange(
      sections.map(s => {
        if (s.id === sectionId) {
          return { ...s, items: s.items.filter(it => it.id !== itemId) };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Add custom sections such as Publications, Honors, Volunteer Work, or Languages.
        </p>
        <button
          type="button"
          onClick={addSection}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Add Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-700 rounded-xl text-slate-400">
          <p className="text-sm font-medium">No custom sections added.</p>
          <p className="text-xs text-slate-500 mt-1">Optional: Add publications, speaking engagements, or awards.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-xl space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    placeholder="Section Title (e.g. Publications, Volunteer Work)"
                    className="bg-transparent border-b border-slate-600 font-bold text-sm uppercase tracking-wider text-slate-200 focus:outline-none focus:border-sky-400 px-1 py-0.5 w-full max-w-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSection(section.id)}
                  className="text-slate-400 hover:text-rose-400 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Items in custom section */}
              <div className="space-y-3 pt-2">
                {section.items.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-900 border border-slate-700 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">Entry</span>
                      <button
                        type="button"
                        onClick={() => removeItem(section.id, item.id)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)}
                        placeholder="Entry Title / Award Name"
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) => updateItem(section.id, item.id, 'subtitle', e.target.value)}
                        placeholder="Subtitle / Organization"
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) => updateItem(section.id, item.id, 'date', e.target.value)}
                        placeholder="Year / Date (e.g. 2023)"
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                        placeholder="Brief description or outcome"
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItemToSection(section.id)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Entry to {section.title || 'Section'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
