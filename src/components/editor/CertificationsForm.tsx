import React from 'react';
import { Certification } from '../../types/resume';
import { Plus, Trash2, Award } from 'lucide-react';

interface Props {
  certifications: Certification[];
  onChange: (updated: Certification[]) => void;
}

export const CertificationsForm: React.FC<Props> = ({ certifications, onChange }) => {
  const addCert = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    };
    onChange([...certifications, newCert]);
  };

  const removeCert = (id: string) => {
    onChange(certifications.filter(c => c.id !== id));
  };

  const updateCert = (id: string, field: keyof Certification, value: string) => {
    onChange(
      certifications.map(c => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Add industry certifications, licenses, and verified credentials (AWS, CKA, PMP, etc.).
        </p>
        <button
          type="button"
          onClick={addCert}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-700 rounded-xl text-slate-400">
          <p className="text-sm font-medium">No certifications listed.</p>
          <p className="text-xs text-slate-500 mt-1">Add relevant credentials to strengthen your ATS score.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> {cert.name || 'Certification'}
                </span>
                <button
                  type="button"
                  onClick={() => removeCert(cert.id)}
                  className="text-slate-400 hover:text-rose-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Certification Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCert(cert.id, 'name', e.target.value)}
                    placeholder="e.g. AWS Solutions Architect Associate"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Issuing Organization <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services / CNCF"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Issue Date & Expiry
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cert.issueDate}
                      onChange={(e) => updateCert(cert.id, 'issueDate', e.target.value)}
                      placeholder="Issue (e.g. 2023-04)"
                      className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input
                      type="text"
                      value={cert.expiryDate}
                      onChange={(e) => updateCert(cert.id, 'expiryDate', e.target.value)}
                      placeholder="Expires (e.g. 2026-04)"
                      className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Credential ID / Verification URL
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cert.credentialId}
                      onChange={(e) => updateCert(cert.id, 'credentialId', e.target.value)}
                      placeholder="ID (e.g. AWS-1234)"
                      className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <input
                      type="url"
                      value={cert.url}
                      onChange={(e) => updateCert(cert.id, 'url', e.target.value)}
                      placeholder="Verify Link"
                      className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
