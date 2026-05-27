
interface OnboardingHeaderProps {
  currentStep: number;
}

/**
 * OnboardingHeader Component
 * 
 * Renders the top title block inside the wizard body panel.
 */
const OnboardingHeader = ({ currentStep }: OnboardingHeaderProps) => {
  const stepTitles: Record<number, { title: string; desc: string }> = {
    1: {
      title: 'Establish Account & Corporate Identity',
      desc: 'Provide primary administration credentials and incorporation metadata.'
    },
    2: {
      title: 'Business Details & Directors',
      desc: 'Fill out operational indices and register UBO beneficial owners holding >= 5% equity.'
    },
    3: {
      title: 'Document Uploads & Verification',
      desc: 'Upload mandated certificate/identity files and authorize signatory BVN check.'
    },
    4: {
      title: 'Compliance Screening & Operations',
      desc: 'Input source of funds parameters and review real-time screening assessments.'
    },
    5: {
      title: 'Verify Details & Activate',
      desc: 'Approve legally mandated corporate assertions and request live workspace access.'
    }
  };

  const current = stepTitles[currentStep] || { title: '', desc: '' };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-1.5 text-xs text-primary-600 font-bold mb-1">
        <span>Step {currentStep} of 5</span>
      </div>
      <h1 className="text-xl font-bold tracking-tight text-slate-900">
        {current.title}
      </h1>
      <p className="text-xs text-slate-450 mt-1 leading-relaxed">
        {current.desc}
      </p>
    </div>
  );
};

export default OnboardingHeader;
