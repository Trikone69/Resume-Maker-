import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { generatePlainTextResume } from '../../utils/textExporter';
import { X, FileDown, Copy, Check, FileText, Download, Upload, ShieldCheck, Printer } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  onImportData: (data: ResumeData) => void;
  onPrint: () => void;
}

export const ExportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  data,
  onImportData,
  onPrint
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'pdf' | 'text' | 'json'>('pdf');

  if (!isOpen) return null;

  const plainText = generatePlainTextResume(data);

  const handleCopyText = () => {
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadText = () => {
    const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(data.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_ATS_Resume.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(data.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personalInfo) {
          onImportData(parsed);
          onClose();
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileDown className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-bold text-slate-100">
              Export & Download Resume
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6">
          <button
            type="button"
            onClick={() => setActiveTab('pdf')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'pdf'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Printer className="w-4 h-4" /> Vector PDF
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'text'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" /> ATS Plain Text (.txt)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'json'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" /> Backup / Restore JSON
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'pdf' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-800/50 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="text-xs text-sky-200 leading-relaxed space-y-1">
                  <div className="font-bold text-sky-100">True Vector PDF (Gold Standard for ATS)</div>
                  <p>
                    Unlike converters that turn your resume into a flattened image (which breaks ATS text extraction), this downloads a real searchable text document with crisp fonts and zero quality loss.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-slate-100">Recommended Browser Print Settings:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li><strong>Destination:</strong> Save as PDF</li>
                  <li><strong>Margins:</strong> Default or None</li>
                  <li><strong>Options:</strong> Check "Background graphics"</li>
                  <li><strong>Paper size:</strong> {data.customization.paperSize.toUpperCase()}</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  setTimeout(() => onPrint(), 200);
                }}
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Printer className="w-4 h-4" /> Open Print & Save as PDF
              </button>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Raw plain text formatted for legacy ATS text input fields.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadText}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Download .txt
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-[11px] font-mono text-slate-300 leading-relaxed overflow-x-auto max-h-72 whitespace-pre-wrap select-all">
                {plainText}
              </pre>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
                <div className="text-xs font-bold text-slate-100">Save Your Progress</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Export your resume as a JSON backup file. You can load this file anytime to restore your data or create multiple versions for different job applications.
                </p>
                <button
                  type="button"
                  onClick={handleDownloadJSON}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg text-xs font-semibold flex items-center gap-2 transition"
                >
                  <Download className="w-4 h-4" /> Download JSON Backup
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
                <div className="text-xs font-bold text-slate-100">Restore from JSON</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload a previously saved resume JSON file to restore your information.
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition">
                  <Upload className="w-4 h-4" /> Upload JSON File
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-800/90 border-t border-slate-700/80 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
