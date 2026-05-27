export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  textClass: string;
}

/**
 * Calculates password strength based on length, casing, numbers, and special characters.
 * 
 * @param {string} pass - The password string to evaluate.
 * @returns {PasswordStrength} Strength evaluation metrics (score, label, color, textClass).
 */
export const getPasswordStrength = (pass: string): PasswordStrength => {
  if (!pass) return { score: 0, label: 'Not Entered', color: 'bg-slate-200', textClass: 'text-slate-400' };
  let score = 0;
  if (pass.length >= 8) score += 1;
  if (/[A-Z]/.test(pass)) score += 1;
  if (/[a-z]/.test(pass)) score += 1;
  if (/[0-9]/.test(pass)) score += 1;
  if (/[^A-Za-z0-9]/.test(pass)) score += 1;

  const levels: PasswordStrength[] = [
    { score: 0, label: 'Very Weak', color: 'bg-rose-500', textClass: 'text-rose-500' },
    { score: 1, label: 'Weak', color: 'bg-rose-400', textClass: 'text-rose-400' },
    { score: 2, label: 'Weak', color: 'bg-rose-400', textClass: 'text-rose-400' },
    { score: 3, label: 'Fair Progress', color: 'bg-amber-400', textClass: 'text-amber-500' },
    { score: 4, label: 'Good & Safe', color: 'bg-indigo-400', textClass: 'text-indigo-500' },
    { score: 5, label: 'Excellent & Strong', color: 'bg-emerald-500', textClass: 'text-emerald-600' }
  ];
  return (levels[score] ?? levels[0]) as PasswordStrength;
};

interface PasswordStrengthMeterProps {
  password?: string;
}

/**
 * PasswordStrengthMeter Component
 * 
 * Displays password strength indicator bars and dynamic evaluation text labels.
 */
const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  if (!password) return null;
  
  const strength = getPasswordStrength(password);

  return (
    <div className="mt-1.5 space-y-1">
      <div className="flex justify-between items-center text-[9px] font-bold">
        <span className="text-slate-400">Password Strength:</span>
        <span className={strength.textClass}>
          {strength.label}
        </span>
      </div>
      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
        <div className={`h-full flex-1 rounded-full ${strength.score >= 1 ? strength.color : 'bg-slate-200'}`}></div>
        <div className={`h-full flex-1 rounded-full ${strength.score >= 3 ? strength.color : 'bg-slate-200'}`}></div>
        <div className={`h-full flex-1 rounded-full ${strength.score >= 5 ? strength.color : 'bg-slate-200'}`}></div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
