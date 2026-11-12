import React, { useState } from 'react';
import { Project } from '../../types/resume';
import { Plus, Trash2, FolderGit2, X, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  projects: Project[];
  onChange: (updated: Project[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ projects, onChange }) => {
  const [techInput, setTechInput] = useState<{ [projId: string]: string }>({});

  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: '',
      subtitle: '',
      link: '',
      github: '',
      startDate: '',
      endDate: '',
      bullets: [''],
      techStack: []
    };
    onChange([...projects, newProj]);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(
      projects.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addTech = (projId: string) => {
    const text = (techInput[projId] || '').trim();
    if (!text) return;
    const project = projects.find(p => p.id === projId);
    if (!project) return;
    if (!project.techStack.includes(text)) {
      updateProject(projId, 'techStack', [...project.techStack, text]);
    }
    setTechInput({ ...techInput, [projId]: '' });
  };

  const removeTech = (projId: string, techIdx: number) => {
    const project = projects.find(p => p.id === projId);
    if (!project) return;
    updateProject(projId, 'techStack', project.techStack.filter((_, idx) => idx !== techIdx));
  };

  const addBullet = (projId: string) => {
    const project = projects.find(p => p.id === projId);
    if (!project) return;
    updateProject(projId, 'bullets', [...project.bullets, '']);
  };

  const updateBullet = (projId: string, bIdx: number, val: string) => {
    const project = projects.find(p => p.id === projId);
    if (!project) return;
    const updated = [...project.bullets];
    updated[bIdx] = val;
    updateProject(projId, 'bullets', updated);
  };

  const removeBullet = (projId: string, bIdx: number) => {
    const project = projects.find(p => p.id === projId);
    if (!project) return;
    updateProject(projId, 'bullets', project.bullets.filter((_, idx) => idx !== bIdx));
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;
    const list = [...projects];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    onChange(list);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Showcase standout open-source contributions, web apps, tools, or research projects.
        </p>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-700 rounded-xl text-slate-400">
          <p className="text-sm font-medium">No projects added yet.</p>
          <p className="text-xs text-slate-500 mt-1">Add portfolio projects to demonstrate practical skills.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((proj, index) => (
            <div key={proj.id} className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderGit2 className="w-4 h-4" /> Project #{index + 1}: {proj.title || 'Untitled'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveProject(index, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 transition"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === projects.length - 1}
                    onClick={() => moveProject(index, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 transition"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="p-1 text-rose-400 hover:text-rose-300 ml-1 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Project Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                    placeholder="e.g. Distributed Task Queue"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Subtitle / Role */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Role / Subtitle
                  </label>
                  <input
                    type="text"
                    value={proj.subtitle}
                    onChange={(e) => updateProject(proj.id, 'subtitle', e.target.value)}
                    placeholder="e.g. Creator & Lead Developer"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Live Link */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={proj.link}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                    placeholder="e.g. https://myproject.app"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* GitHub Link */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Source Code / Repository URL
                  </label>
                  <input
                    type="url"
                    value={proj.github}
                    onChange={(e) => updateProject(proj.id, 'github', e.target.value)}
                    placeholder="e.g. https://github.com/user/project"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="pt-2 border-t border-slate-700/60 space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Technologies Used
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {proj.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-slate-700">
                      {tech}
                      <button type="button" onClick={() => removeTech(proj.id, tIdx)} className="hover:text-rose-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput[proj.id] || ''}
                    onChange={(e) => setTechInput({ ...techInput, [proj.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTech(proj.id);
                      }
                    }}
                    placeholder="Add technology (e.g. React, Go, Docker) and press Enter..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => addTech(proj.id)}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Project Bullets */}
              <div className="pt-2 border-t border-slate-700/60 space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Bullet Points / Key Contributions
                </label>
                {proj.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => updateBullet(proj.id, bIdx, e.target.value)}
                      placeholder="Built X using Y, achieving Z (e.g. Gained 1,500+ GitHub stars and 20k active downloads)..."
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(proj.id, bIdx)}
                      className="p-1 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addBullet(proj.id)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project Bullet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
