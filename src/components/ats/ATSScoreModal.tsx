import React, { useState } from 'react';
import { ATSCheckResult } from '../../types/resume';
import { X, ShieldCheck, AlertTriangle, CheckCircle2, Target, Sparkles, ChevronRight, Search } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  atsResult: ATSCheckResult;
  jobDescription: string;
  onJobDescriptionChange: (jd: string) => void;
}

export const ATSScoreModal: React.FC<Props> = ({
  isOpen,
  onClose,
  atsResult,
  jobDescription,
  onJobDescriptionChange
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'checklist'>('overview');

  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500 bg-emerald-950/40';
    if (score >= 70) return 'text-amber-400 border-amber-500 bg-amber-950/40';
    return 'text-rose-400 border-rose-500 bg-rose-950/40';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return { label: 'ATS Ready — High Interview Probability', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    if (score >= 70) return { label: 'Good — Minor Enhancements Recommended', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
    return { label: 'Needs Improvement — High Filter Risk', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
  };

  const badge = getScoreBadge(atsResult.overallScore);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Live ATS Compliance Audit & Keyword Scanner
              </h2>
              <p className="text-xs text-slate-400">
                Simulates enterprise Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800/60 to-slate-900 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-extrabold ${getScoreColor(atsResult.overallScore)} shadow-lg`}>
              <span className="text-3xl leading-none">{atsResult.overallScore}</span>
              <span className="text-[10px] tracking-widest uppercase opacity-80 mt-1">/ 100</span>
            </div>
            <div>
              <div className={`text-xs px-2.5 py-0.5 rounded-full border inline-block font-semibold mb-1 ${badge.color}`}>
                {badge.label}
              </div>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                {atsResult.overallScore >= 85 
                  ? 'Your resume possesses strong keywords, quantifiable metrics, and clean structure formatted for top-tier parseability.' 
                  : 'Review the critical issues and recommendations below to increase your resume parse rate and rank higher in recruiter searches.'}
              </p>
            </div>
          </div>

          {atsResult.overallScore >= 85 && (
            <button
              type="button"
              onClick={triggerCelebration}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow transition shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" /> Celebrate High Score!
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Score Breakdown
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('keywords')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'keywords'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Job Description Matcher
            {atsResult.jobMatchScore !== undefined && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-amber-300">
                {atsResult.jobMatchScore}%
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === 'checklist'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ATS Best Practices
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Category Sub-Scores */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Scoring Criteria Breakdown
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Contact Details</span>
                      <span className="font-bold text-sky-400">{atsResult.contactScore} / 20</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(atsResult.contactScore / 20) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Section Structure</span>
                      <span className="font-bold text-sky-400">{atsResult.structureScore} / 20</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(atsResult.structureScore / 20) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Metrics & Impact</span>
                      <span className="font-bold text-emerald-400">{atsResult.impactScore} / 25</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(atsResult.impactScore / 25) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Power Action Verbs</span>
                      <span className="font-bold text-purple-400">{atsResult.verbsScore} / 20</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(atsResult.verbsScore / 20) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Readability & Length</span>
                      <span className="font-bold text-amber-400">{atsResult.lengthScore} / 15</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(atsResult.lengthScore / 15) * 100}%` }}></div>
                    </div>
                  </div>

                  {atsResult.jobMatchScore !== undefined && (
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-medium">Job Match Rate</span>
                        <span className="font-bold text-amber-300">{atsResult.jobMatchScore}%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${atsResult.jobMatchScore}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Critical Issues */}
              {atsResult.criticalIssues.length > 0 && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/70 space-y-2">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-rose-400" /> Critical Fixes ({atsResult.criticalIssues.length})
                  </div>
                  <ul className="space-y-1.5 text-xs text-rose-200">
                    {atsResult.criticalIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {atsResult.recommendations.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Actionable Recommendations ({atsResult.recommendations.length})
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-200/90">
                    {atsResult.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Strengths */}
              {atsResult.strengths.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Strengths ({atsResult.strengths.length})
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-200/90">
                    {atsResult.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'keywords' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-sky-400" /> Paste Target Job Description
                </label>
                <p className="text-xs text-slate-400 mb-2">
                  Paste the requirements, responsibilities, or qualification section from the job opening to compare keyword density.
                </p>
                <textarea
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => onJobDescriptionChange(e.target.value)}
                  placeholder="Paste job description here (e.g. 'Looking for a Senior Full Stack Engineer with 5+ years experience in React, TypeScript, Node.js, AWS, Kubernetes, Docker, PostgreSQL...')"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed font-mono"
                />
              </div>

              {atsResult.jobMatchScore !== undefined && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-300">Keyword Alignment Score</div>
                      <div className="text-2xl font-extrabold text-amber-400">{atsResult.jobMatchScore}% Match</div>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      <div>{atsResult.matchedKeywords.length} keywords matched</div>
                      <div>{atsResult.missingKeywords.length} keywords missing</div>
                    </div>
                  </div>

                  {/* Matched Keywords */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Matched Keywords ({atsResult.matchedKeywords.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {atsResult.matchedKeywords.length > 0 ? (
                        atsResult.matchedKeywords.map((kw, idx) => (
                          <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-emerald-950/70 text-emerald-300 border border-emerald-800 font-medium">
                            ✓ {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500 italic">No direct keyword matches found.</span>
                      )}
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Missing Keywords in Your Resume ({atsResult.missingKeywords.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {atsResult.missingKeywords.length > 0 ? (
                        atsResult.missingKeywords.map((kw, idx) => (
                          <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-rose-950/70 text-rose-300 border border-rose-800 font-medium">
                            + {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500 italic">No missing critical keywords detected! Great match.</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      💡 Tip: Naturally weave missing keywords into your Skills or Work Experience bullets if you possess the experience. Never keyword-stuff artificially.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Why This Builder Ensures 100% ATS Compliance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Vector Selectable PDF
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Generates true selectable text PDFs rather than flattened canvas images. ATS parsers read real text streams effortlessly.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Standard Section Headings
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Uses industry-recognized headers (Work Experience, Education, Skills) that OCR and semantic ATS algorithms look for.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> No Unparseable Graphics or Tables
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Avoids multi-layered nested tables, floating graphics, and complex text boxes that choke older parsers (Taleo, iCIMS).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Plain Text (.txt) ATS Fallback
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    One-click export of structured plain text formatted specifically for copy-pasting directly into legacy ATS text boxes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-800/90 border-t border-slate-700/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Audit updates live as you edit your resume
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
