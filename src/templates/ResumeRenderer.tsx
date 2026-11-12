import React from 'react';
import { ResumeData, ResumeUpdateHandlers } from '../types/resume';
import { ATSClassic } from './ATSClassic';
import { ModernClean } from './ModernClean';
import { Executive } from './Executive';
import { TechnicalGrid } from './TechnicalGrid';
import { ElegantCompact } from './ElegantCompact';
import { FinanceCorporate } from './FinanceCorporate';
import { CreativeMinimal } from './CreativeMinimal';
import { MedicalClinical } from './MedicalClinical';
import { LegalConsulting } from './LegalConsulting';
import { NordicClean } from './NordicClean';

interface Props {
  data: ResumeData;
  scale?: number;
  handlers?: ResumeUpdateHandlers;
  isEditable?: boolean;
}

export const ResumeRenderer: React.FC<Props> = ({ data, scale = 1, handlers, isEditable = true }) => {
  const { template, paperSize } = data.customization;

  const renderTemplate = () => {
    switch (template) {
      case 'finance-corporate':
        return <FinanceCorporate data={data} handlers={handlers} isEditable={isEditable} />;
      case 'creative-minimal':
        return <CreativeMinimal data={data} handlers={handlers} isEditable={isEditable} />;
      case 'medical-clinical':
        return <MedicalClinical data={data} handlers={handlers} isEditable={isEditable} />;
      case 'legal-consulting':
        return <LegalConsulting data={data} handlers={handlers} isEditable={isEditable} />;
      case 'nordic-clean':
        return <NordicClean data={data} handlers={handlers} isEditable={isEditable} />;
      case 'modern-clean':
        return <ModernClean data={data} />;
      case 'executive':
        return <Executive data={data} />;
      case 'technical-grid':
        return <TechnicalGrid data={data} />;
      case 'elegant-compact':
        return <ElegantCompact data={data} />;
      case 'ats-classic':
      default:
        return <ATSClassic data={data} handlers={handlers} isEditable={isEditable} />;
    }
  };

  const isLetter = paperSize === 'letter';
  const widthPx = isLetter ? 816 : 794;
  const minHeightPx = isLetter ? 1056 : 1123;

  return (
    <div className="flex justify-center items-start print:block print:w-full print:m-0">
      <div 
        id="resume-document"
        style={{
          width: `${widthPx}px`,
          minHeight: `${minHeightPx}px`,
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
        }}
        className="bg-white text-slate-900 shadow-2xl rounded-sm print:shadow-none print:rounded-none print:w-full print:transform-none print:min-h-0 print:m-0 overflow-hidden"
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
