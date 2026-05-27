import { Clock, FileCheck2, LockKeyhole } from 'lucide-react';

/**
 * OnboardingFooter Component
 * 
 * Displays platform security standards, regulatory timelines, and audit expectations.
 */
const OnboardingFooter = () => {
  return (
    <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 mt-8 text-[9px] text-slate-400 font-medium">
      <div className="space-y-0.5">
        <span className="font-extrabold text-slate-800 flex items-center gap-1">
          <Clock className="h-3 w-3 text-primary-500" /> TIMELINES
        </span>
        <p>Completed in 10-15m. Instant NIBSS verify. Review takes &lt; 1hr.</p>
      </div>
      <div className="space-y-0.5 border-l border-slate-100 pl-3">
        <span className="font-extrabold text-slate-800 flex items-center gap-1">
          <FileCheck2 className="h-3 w-3 text-primary-500" /> CBN RULES
        </span>
        <p>UBO registration mandatory. Compliance logs preserved 5 years.</p>
      </div>
      <div className="space-y-0.5 border-l border-slate-100 pl-3">
        <span className="font-extrabold text-slate-800 flex items-center gap-1">
          <LockKeyhole className="h-3 w-3 text-primary-500" /> SECURE SHIELD
        </span>
        <p>NDPR registered databases. Advanced AES-256 data lock.</p>
      </div>
    </div>
  );
};

export default OnboardingFooter;
