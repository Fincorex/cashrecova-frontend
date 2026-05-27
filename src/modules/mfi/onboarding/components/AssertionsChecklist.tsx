import { ShieldAlert } from 'lucide-react';
import { OnboardingFormData } from '@/types';

interface AssertionsChecklistProps {
  formData: OnboardingFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitError?: string;
}

/**
 * AssertionsChecklist Component
 * 
 * Renders legally binding CBN guidelines and privacy rules checkboxes required for final sign-off.
 */
const AssertionsChecklist = ({ formData, handleInputChange, submitError }: AssertionsChecklistProps) => {
  const assertionsList: { key: keyof OnboardingFormData; label: string }[] = [
    { key: 'infoAccurate', label: 'All entered corporate information, RC records and beneficial owner data are accurate and legally representative.' },
    { key: 'amlObligations', label: 'Our organization agrees to fully comply with all CBN AML/CFT regulations and NFIU audit report expectations.' },
    { key: 'consentVerification', label: 'We consent to real-time verification inquiries on state and federal identity databases (CAC, NIBSS, NIMC).' },
    { key: 'acceptTerms', label: 'I accept Cashrecova enterprise platform guidelines, NDPR privacy rules, and terms of service.' }
  ];

  return (
    <div className="space-y-2">
      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
        Compliance Assertions
      </span>
      
      {submitError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3 text-xs flex gap-2.5 items-start">
          <ShieldAlert className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold">Submission Error:</span>
            <p className="mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {assertionsList.map((item) => (
          <label 
            key={item.key} 
            className="flex items-start gap-3 bg-slate-50 hover:bg-slate-100/50 p-3 rounded-xl border border-slate-150 cursor-pointer text-xs transition-all duration-200"
          >
            <input 
              type="checkbox" 
              name={item.key} 
              checked={formData[item.key] as boolean || false}
              onChange={handleInputChange}
              className="mt-0.5 h-4 w-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500" 
            />
            <span className="text-slate-650 font-bold leading-tight">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AssertionsChecklist;
