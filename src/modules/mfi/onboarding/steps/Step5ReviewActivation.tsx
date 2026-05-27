/**
 * Step 5: Review & Compliance Activation (Step5ReviewActivation.tsx)
 * 
 * ? Presents the final assertions checklist (legal terms, AML consents) and 
 * ? handles full wizard submission triggers.
 * ? Shows post-submission guidelines while background reviews take place.
 */

import { Check } from 'lucide-react';
import AssertionsChecklist from '../components/AssertionsChecklist';
import { OnboardingFormData, OnboardingFormErrors } from '@/types';

interface Step5ReviewActivationProps {
  formData: OnboardingFormData;
  errors: OnboardingFormErrors;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitError?: string;
  isSubmitted: boolean;
  isSubmitting: boolean;
  submitOnboarding: (e: React.FormEvent) => void;
  onGoToDashboard: () => void;
}

const Step5ReviewActivation = ({
  formData,
  handleInputChange,
  submitError,
  isSubmitted,
  isSubmitting,
  submitOnboarding,
  onGoToDashboard
}: Step5ReviewActivationProps) => {
  // ! Enforces checking all checkboxes in assertions list before letting user submit
  const isFormValidToSubmit = 
    formData.infoAccurate && 
    formData.amlObligations && 
    formData.consentVerification && 
    formData.acceptTerms;

  return (
    <div className="space-y-4">
      {/* checklist layout of legal requirements */}
      <AssertionsChecklist 
        formData={formData} 
        handleInputChange={handleInputChange} 
        submitError={submitError} 
      />

      {/* Submissions action area panel updates */}
      <div className="pt-3 flex flex-col items-center justify-center text-center">
        {isSubmitted ? (
          // Success State view panel
          <div className="space-y-4 py-4 max-w-sm mx-auto animate-in zoom-in duration-300">
            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 border-2 border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Check className="h-6 w-6 stroke-[3px]" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">Compliance Profile Submitted</h4>
              <p className="text-xs text-slate-405 mt-1 leading-relaxed">
                Your CBN AML compliance submission has been safely fast-tracked. Our operations review team will review and approve live API access within 1 hour.
              </p>
            </div>
            <button 
              type="button"
              onClick={onGoToDashboard}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg text-xs transition-colors shadow-md active:scale-98 w-full"
            >
              Go to Admin Dashboard
            </button>
          </div>
        ) : (
          // Unsubmitted Active Call-to-action Button
          <button 
            onClick={submitOnboarding}
            disabled={isSubmitting || !isFormValidToSubmit}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-500 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4}></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting Compliance Profile...</span>
              </>
            ) : (
              'Submit Onboarding Profile'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Step5ReviewActivation;
