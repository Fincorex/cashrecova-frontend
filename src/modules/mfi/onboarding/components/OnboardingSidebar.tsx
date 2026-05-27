import { Check, Lock } from 'lucide-react';
import { OnboardingFormErrors } from '@/types';

interface OnboardingSidebarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  validateStep: (step: number) => OnboardingFormErrors;
}

/**
 * OnboardingSidebar Component
 * 
 * Renders the vertical step indicators and security standard certifications.
 */
const OnboardingSidebar = ({ currentStep, setCurrentStep, validateStep }: OnboardingSidebarProps) => {
  const steps = [
    { number: 1, title: 'Corporate Identity', desc: 'Email, RC and address' },
    { number: 2, title: 'Business Profile', desc: 'Sector, products and UBO' },
    { number: 3, title: 'KYC & Verification', desc: 'Files and settlement bank' },
    { number: 4, title: 'AML Risk screening', desc: 'PEP, watchlists & source' },
    { number: 5, title: 'Review & Activation', desc: 'Declaration & dashboard' }
  ];

  const handleStepClick = (targetStep: number) => {
    // Allow going backwards freely
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      return;
    }
    
    // Validate all intervening steps before allowing jump forward
    let checkValid = true;
    for (let stepIdx = currentStep; stepIdx < targetStep; stepIdx++) {
      if (Object.keys(validateStep(stepIdx)).length > 0) {
        checkValid = false;
        break;
      }
    }
    
    if (checkValid) {
      setCurrentStep(targetStep);
    }
  };

  return (
    <aside className="lg:w-80 w-full bg-slate-50 border-r border-slate-100 flex flex-col justify-between py-8 px-6 lg:h-screen lg:sticky lg:top-0 flex-shrink-0 z-40">
      
      {/* Brand details */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-7 w-7 rounded-lg bg-primary-500 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
            CR
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">CashRecova</span>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          CBN AML/CFT Compliant
        </div>

        {/* Vertical Stepper */}
        <nav className="mt-10 space-y-6 relative">
          {/* Visual vertical stepper connector line */}
          <div className="absolute left-[13px] top-2 bottom-2 w-[1.5px] bg-slate-200 -z-0"></div>

          {steps.map((s) => {
            const isActive = currentStep === s.number;
            const isCompleted = currentStep > s.number;
            return (
              <div key={s.number} className="relative z-10 flex items-start gap-3">
                <button 
                  type="button"
                  onClick={() => handleStepClick(s.number)}
                  className={`
                    h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border flex-shrink-0
                    ${isActive 
                      ? 'bg-primary-500 border-primary-500 text-white shadow-sm ring-2 ring-primary-100' 
                      : isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-white border-slate-200 text-slate-450'
                    }
                  `}
                >
                  {isCompleted ? <Check className="h-4 w-4 stroke-[2.5px]" /> : s.number}
                </button>
                <div>
                  <div className={`text-xs font-bold leading-none ${isActive ? 'text-slate-900' : isCompleted ? 'text-slate-650' : 'text-slate-400'}`}>
                    {s.title}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-medium leading-tight">
                    {s.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200/60 space-y-3.5 text-[10px] leading-tight text-slate-400 font-medium">
        <div className="flex items-center gap-1.5 bg-white border border-slate-200/50 p-2 rounded-lg text-slate-505 shadow-3xs">
          <Lock className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
          <span>Bank-Grade AES-256 Shield</span>
        </div>

        <div className="space-y-1.5 pl-1 text-slate-500">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>NDPR Privacy Compliant</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>NFIU Reporting Aligned</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>BOFIA 2020 Registered</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] uppercase font-bold tracking-wider pt-2 border-t border-slate-200/40">
          <span>Overall Progress</span>
          <span className="text-primary-600 font-extrabold">{currentStep * 20}%</span>
        </div>
      </div>

    </aside>
  );
};

export default OnboardingSidebar;
