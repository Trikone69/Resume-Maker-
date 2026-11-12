import React, { useState, useEffect } from 'react';
import { ResumeData, TemplateId, ResumeUpdateHandlers } from './types/resume';
import { SAMPLE_PROFILES, EMPTY_RESUME_DATA } from './data/sampleProfiles';
import { analyzeResumeATS } from './utils/atsChecker';
import { PersonalInfoForm } from './components/editor/PersonalInfoForm';
import { ExperienceForm } from './components/editor/ExperienceForm';
import { SkillsForm } from './components/editor/SkillsForm';
import { EducationForm } from './components/editor/EducationForm';
import { ProjectsForm } from './components/editor/ProjectsForm';
import { CertificationsForm } from './components/editor/CertificationsForm';
import { CustomSectionsForm } from './components/editor/CustomSectionsForm';
import { TemplateSettingsForm } from './components/editor/TemplateSettingsForm';
import { ResumeRenderer } from './templates/ResumeRenderer';
import { ATSScoreModal } from './components/ats/ATSScoreModal';
import { ExportModal } from './components/export/ExportModal';
import { LandingPage } from './components/landing/LandingPage';

import {
  FileText,
  User,
  Briefcase,
  Wrench,
  GraduationCap,
  FolderGit2,
  Award,
  Layers,
  Palette,
  ShieldCheck,
  Printer,
  Download,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit3,
  Home,
  Check
} from 'lucide-react';

type EditorTab = 
  | 'personal'
  | 'experience'
  | 'skills'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'custom'
  | 'design';

const LOCAL_STORAGE_KEY = 'ats_resume_data_v3';
const JD_STORAGE_KEY = 'ats_resume_jd_v3';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'studio' | 'landing'>('studio');

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load from localStorage', e);
    }
    return SAMPLE_PROFILES[0].data;
  });

  const [jobDescription, setJobDescription] = useState<string>(() => {
    return localStorage.getItem(JD_STORAGE_KEY) || '';
  });

  const [activeTab, setActiveTab] = useState<EditorTab>('personal');
  const [zoomScale, setZoomScale] = useState<number>(0.85);
  const [isATSModalOpen, setIsATSModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [selectedProfileId, setSelectedProfileId] = useState<string>('software-engineer');
  const [isDirectEditingEnabled, setIsDirectEditingEnabled] = useState<boolean>(true);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem(JD_STORAGE_KEY, jobDescription);
  }, [jobDescription]);

  // Real-time ATS Calculation
  const atsResult = analyzeResumeATS(resumeData, jobDescription);

  const handlePrint = () => {
    window.print();
  };

  const loadSampleProfile = (profileId: string) => {
    const profile = SAMPLE_PROFILES.find(p => p.id === profileId);
    if (profile) {
      setResumeData(profile.data);
      setSelectedProfileId(profileId);
      setCurrentView('studio');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to start a blank resume? All current fields will be cleared.')) {
      setResumeData(EMPTY_RESUME_DATA);
    }
  };

  // Direct Inline Update Handlers
  const handlers: ResumeUpdateHandlers = {
    onUpdatePersonalInfo: (field, value) => {
      setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
    },
    onUpdateExperience: (id, field, value) => {
      setResumeData(prev => ({
        ...prev,
        experiences: prev.experiences.map(e => e.id === id ? { ...e, [field]: value } : e)
      }));
    },
    onUpdateBullet: (expId, idx, value) => {
      setResumeData(prev => ({
        ...prev,
        experiences: prev.experiences.map(e => {
          if (e.id === expId) {
            const bullets = [...e.bullets];
            bullets[idx] = value;
            return { ...e, bullets };
          }
          return e;
        })
      }));
    },
    onAddBullet: (expId) => {
      setResumeData(prev => ({
        ...prev,
        experiences: prev.experiences.map(e => e.id === expId ? { ...e, bullets: [...e.bullets, ''] } : e)
      }));
    },
    onDeleteBullet: (expId, idx) => {
      setResumeData(prev => ({
        ...prev,
        experiences: prev.experiences.map(e => e.id === expId ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e)
      }));
    },
    onUpdateSkillCategory: (catId, name) => {
      setResumeData(prev => ({
        ...prev,
        skills: prev.skills.map(s => s.id === catId ? { ...s, category: name } : s)
      }));
    },
    onUpdateSkill: (catId, idx, value) => {
      setResumeData(prev => ({
        ...prev,
        skills: prev.skills.map(s => {
          if (s.id === catId) {
            const skills = [...s.skills];
            skills[idx] = value;
            return { ...s, skills };
          }
          return s;
        })
      }));
    },
    onAddSkill: (catId, value) => {
      setResumeData(prev => ({
        ...prev,
        skills: prev.skills.map(s => s.id === catId ? { ...s, skills: [...s.skills, value] } : s)
      }));
    },
    onDeleteSkill: (catId, idx) => {
      setResumeData(prev => ({
        ...prev,
        skills: prev.skills.map(s => s.id === catId ? { ...s, skills: s.skills.filter((_, i) => i !== idx) } : s)
      }));
    },
    onUpdateEducation: (id, field, value) => {
      setResumeData(prev => ({
        ...prev,
        education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
      }));
    },
    onUpdateProject: (id, field, value) => {
      setResumeData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
      }));
    },
    onUpdateProjectBullet: (projId, idx, value) => {
      setResumeData(prev => ({
        ...prev,
        projects: prev.projects.map(p => {
          if (p.id === projId) {
            const bullets = [...p.bullets];
            bullets[idx] = value;
            return { ...p, bullets };
          }
          return p;
        })
      }));
    },
    onUpdateCertification: (id, field, value) => {
      setResumeData(prev => ({
        ...prev,
        certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: value } : c)
      }));
    },
    onUpdateCustomItem: (sectionId, itemId, field, value) => {
      setResumeData(prev => ({
        ...prev,
        customSections: prev.customSections.map(s => {
          if (s.id === sectionId) {
            return {
              ...s,
              items: s.items.map(it => it.id === itemId ? { ...it, [field]: value } : it)
            };
          }
          return s;
        })
      }));
    }
  };

  const tabs: { id: EditorTab; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'Contact', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Wrench className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
    { id: 'custom', label: 'Custom', icon: <Layers className="w-4 h-4" /> },
    { id: 'design', label: 'Templates & Style', icon: <Palette className="w-4 h-4" /> },
  ];

  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);

  const getScoreBadgeClass = (score: number) => {
    if (score >= 85) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30';
    if (score >= 70) return 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30';
    return 'bg-rose-500/20 text-rose-400 border-rose-500/40 hover:bg-rose-500/30';
  };

  // If user is on the Landing view:
  if (currentView === 'landing') {
    return (
      <LandingPage
        onStartBuilding={() => setCurrentView('studio')}
        onSelectTemplate={(templateId) => {
          setResumeData(prev => ({
            ...prev,
            customization: { ...prev.customization, template: templateId }
          }));
          setCurrentView('studio');
        }}
        onSelectProfile={(profileId) => loadSampleProfile(profileId)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <nav className="no-print bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        {/* Brand / Logo + View Switcher */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 group text-left"
            title="View Homepage & Template Showcase"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-900/30 group-hover:scale-105 transition">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-sky-300 transition">ResumeForge</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> ATS 100%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1">
                <Home className="w-3 h-3 text-sky-400 inline" /> Home / Landing
              </p>
            </div>
          </button>
        </div>

        {/* Center / Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sample Profiles Dropdown */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 font-medium">Job:</span>
            <select
              value={selectedProfileId}
              onChange={(e) => loadSampleProfile(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer max-w-[190px] truncate"
            >
              {SAMPLE_PROFILES.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Real-time ATS Score Pill Button */}
          <button
            type="button"
            onClick={() => setIsATSModalOpen(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition shadow-sm ${getScoreBadgeClass(atsResult.overallScore)}`}
            title="Click to view full ATS score analysis and job description scanner"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ATS: {atsResult.overallScore}%</span>
            {atsResult.jobMatchScore !== undefined && (
              <span className="hidden md:inline text-[10px] bg-slate-900/60 px-1.5 py-0.5 rounded">
                JD Match: {atsResult.jobMatchScore}%
              </span>
            )}
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
            title="Start Blank Resume"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Export / Download Buttons */}
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-lg text-xs font-bold shadow-md shadow-sky-900/30 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </nav>

      {/* Mobile Toggle Bar */}
      <div className="no-print lg:hidden bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
        <div className="flex rounded-lg bg-slate-800 p-1 w-full border border-slate-700">
          <button
            type="button"
            onClick={() => setMobileView('editor')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition ${
              mobileView === 'editor' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Form Editor
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition ${
              mobileView === 'preview' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Live Resume
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* LEFT PANE: Editor Panel */}
        <section 
          className={`no-print w-full lg:w-[48%] xl:w-[43%] border-r border-slate-800 flex flex-col bg-slate-900/60 overflow-hidden ${
            mobileView === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Editor Category Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/90 overflow-x-auto scrollbar-none px-2 shrink-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                    isActive
                      ? 'border-sky-500 text-sky-400 bg-slate-800/50'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Form Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {activeTab === 'personal' && (
              <PersonalInfoForm
                info={resumeData.personalInfo}
                onChange={(updated) => setResumeData({ ...resumeData, personalInfo: updated })}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceForm
                experiences={resumeData.experiences}
                onChange={(updated) => setResumeData({ ...resumeData, experiences: updated })}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsForm
                skills={resumeData.skills}
                onChange={(updated) => setResumeData({ ...resumeData, skills: updated })}
              />
            )}

            {activeTab === 'education' && (
              <EducationForm
                education={resumeData.education}
                onChange={(updated) => setResumeData({ ...resumeData, education: updated })}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsForm
                projects={resumeData.projects}
                onChange={(updated) => setResumeData({ ...resumeData, projects: updated })}
              />
            )}

            {activeTab === 'certifications' && (
              <CertificationsForm
                certifications={resumeData.certifications}
                onChange={(updated) => setResumeData({ ...resumeData, certifications: updated })}
              />
            )}

            {activeTab === 'custom' && (
              <CustomSectionsForm
                sections={resumeData.customSections}
                onChange={(updated) => setResumeData({ ...resumeData, customSections: updated })}
              />
            )}

            {activeTab === 'design' && (
              <TemplateSettingsForm
                customization={resumeData.customization}
                onChange={(updated) => setResumeData({ ...resumeData, customization: updated })}
              />
            )}
          </div>

          {/* Editor Footer Navigation */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <button
              type="button"
              disabled={currentTabIndex === 0}
              onClick={() => setActiveTab(tabs[currentTabIndex - 1].id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 transition font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>

            <span className="text-[11px] text-slate-500">
              Auto-saved to browser storage
            </span>

            <button
              type="button"
              disabled={currentTabIndex === tabs.length - 1}
              onClick={() => setActiveTab(tabs[currentTabIndex + 1].id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-30 disabled:hover:bg-sky-600 text-white transition font-medium"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* RIGHT PANE: Live Document Preview with Direct On-Page Editing */}
        <section 
          id="resume-preview-container"
          className={`flex-1 flex flex-col bg-slate-950 overflow-hidden ${
            mobileView === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Preview Toolbar */}
          <div className="no-print px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
            {/* Direct Editing Indicator / Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDirectEditingEnabled(!isDirectEditingEnabled)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold text-[11px] transition ${
                  isDirectEditingEnabled
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
                title="Click text anywhere on the resume to edit directly"
              >
                <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                <span>{isDirectEditingEnabled ? 'Click-to-Type: ON' : 'Direct Edit: OFF'}</span>
              </button>

              <span className="text-slate-600">|</span>

              <span className="text-slate-400">Template:</span>
              <span className="font-bold text-sky-400 capitalize">
                {resumeData.customization.template.replace('-', ' ')}
              </span>
              <span className="text-slate-400 uppercase font-mono text-[10px]">
                ({resumeData.customization.paperSize})
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg px-2 py-1">
              <button
                type="button"
                onClick={() => setZoomScale(Math.max(0.5, zoomScale - 0.1))}
                className="p-1 text-slate-400 hover:text-slate-200 transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-300 w-12 text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomScale(Math.min(1.3, zoomScale + 0.1))}
                className="p-1 text-slate-400 hover:text-slate-200 transition"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale(0.85)}
                className="text-[10px] text-sky-400 hover:text-sky-300 ml-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 transition"
              >
                Fit
              </button>
            </div>
          </div>

          {/* Interactive Document Viewport */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-slate-950/80 relative">
            {isDirectEditingEnabled && (
              <div className="no-print absolute top-3 right-5 z-10 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 text-[10.5px] text-slate-400 shadow-md pointer-events-none flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Click anywhere on the resume to type & edit directly
              </div>
            )}
            <ResumeRenderer
              data={resumeData}
              scale={zoomScale}
              handlers={handlers}
              isEditable={isDirectEditingEnabled}
            />
          </div>
        </section>
      </main>

      {/* Modals */}
      <ATSScoreModal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        atsResult={atsResult}
        jobDescription={jobDescription}
        onJobDescriptionChange={setJobDescription}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={resumeData}
        onImportData={(imported) => setResumeData(imported)}
        onPrint={handlePrint}
      />
    </div>
  );
};

export default App;
