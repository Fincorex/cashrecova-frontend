/**
 * Corporate Document Vault Component (DocumentVault.tsx)
 * 
 * ? Renders the upload actions for compliance documents (CAC Forms, CoI, utilities).
 * ? Interacts directly with the parent onboarding controller to update file references.
 * 
 * NOTE:
 * Files are processed as controlled local references before final base64 stringification
 * or multipart upload dispatch.
 */

import { FileText, Check, Plus } from 'lucide-react';
import { OnboardingFormData, OnboardingFormErrors } from '@/types';

interface DocumentVaultProps {
  formData: OnboardingFormData;
  errors: OnboardingFormErrors;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
}

const DocumentVault = ({ formData, errors, onFileUpload }: DocumentVaultProps) => {
  // Map of local properties to labels for the file collector loop
  const documentList: { key: keyof OnboardingFormData & string; name: string }[] = [
    { key: 'certIncorporation', name: 'Certificate of Incorporation' },
    { key: 'memoArticles', name: 'Memorandum & Articles of Association' },
    { key: 'cacForm7', name: 'Official CAC Form 1.1 / Form 7' },
    { key: 'directorId', name: 'Director Valid Identification' },
    { key: 'utilityBill', name: 'Corporate Utility Bill / Office Proof' }
  ];

  return (
    <div>
      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">
        Corporate Document Vault (PDF/JPG, Max 5MB)
      </span>
      
      <div className="border border-slate-100 rounded-lg divide-y divide-slate-100 overflow-hidden shadow-3xs bg-white">
        {documentList.map((item, idx) => {
          const fileUploaded = formData[item.key] as string;
          const hasError = errors[item.key];

          return (
            <label 
              key={idx} 
              // Utilizing standard invisible file input overlays to maintain sleek aesthetics
              className="flex justify-between items-center p-3 bg-white hover:bg-slate-50/50 text-xs cursor-pointer transition-colors"
            >
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => onFileUpload(e, item.key)}
              />
              <div className="flex items-center gap-2">
                <div className={`h-6 w-6 rounded flex items-center justify-center flex-shrink-0 ${
                  fileUploaded ? 'bg-emerald-50 text-emerald-600' : 'bg-primary-50/70 text-primary-500'
                }`}>
                  <FileText className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block leading-tight">{item.name}</span>
                  {hasError && <span className="text-[9px] text-rose-500 font-semibold">{hasError}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] text-slate-405 font-medium truncate max-w-[140px] text-right">
                  {fileUploaded || 'Click to select...'}
                </span>
                {fileUploaded ? (
                  <span className="h-4.5 w-4.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-3xs animate-in zoom-in duration-200">
                    <Check className="h-3 w-3 stroke-[3px]" />
                  </span>
                ) : (
                  <span className="h-4.5 w-4.5 bg-slate-50 text-slate-400 border border-slate-200 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-slate-100">
                    <Plus className="h-3 w-3 stroke-[2.5px]" />
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentVault;
