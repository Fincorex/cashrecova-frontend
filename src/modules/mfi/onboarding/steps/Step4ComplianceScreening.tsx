import ComplianceScreenings from '../components/ComplianceScreenings';
import { OnboardingFormData, OnboardingFormErrors } from '@/types';

interface Step4ComplianceScreeningProps {
  formData: OnboardingFormData;
  errors: OnboardingFormErrors;
  touched: Record<string, boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Step4ComplianceScreening Component
 * 
 * Handles operational source parameters and displays PEP/Sanction check statuses.
 */
const Step4ComplianceScreening = ({
  formData,
  errors,
  touched,
  handleInputChange,
  handleBlur
}: Step4ComplianceScreeningProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      
      {/* Source parameters */}
      <div className="space-y-3.5">
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Operational Parameters</span>
        
        <div>
          <label className="block text-[10px] text-slate-405 font-bold uppercase mb-0.5">Primary Source of Funds</label>
          <input 
            type="text" 
            name="sourceOfFunds"
            placeholder="e.g. Equity Investments & Debt"
            value={formData.sourceOfFunds} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-2.5 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.sourceOfFunds && touched.sourceOfFunds ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.sourceOfFunds && touched.sourceOfFunds && <p className="text-[10px] text-rose-500 mt-1">{errors.sourceOfFunds}</p>}
        </div>

        <div>
          <label className="block text-[10px] text-slate-405 font-bold uppercase mb-0.5">Primary Source of Wealth</label>
          <input 
            type="text" 
            name="sourceOfWealth"
            placeholder="e.g. Accumulated Corporate Earnings"
            value={formData.sourceOfWealth} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-2.5 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.sourceOfWealth && touched.sourceOfWealth ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.sourceOfWealth && touched.sourceOfWealth && <p className="text-[10px] text-rose-500 mt-1">{errors.sourceOfWealth}</p>}
        </div>

        <div>
          <label className="block text-[10px] text-slate-405 font-bold uppercase mb-0.5">Estimated Monthly Inflow</label>
          <input 
            type="text" 
            name="estimatedInflow"
            placeholder="e.g. 35,000,000 NGN"
            value={formData.estimatedInflow} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-2.5 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.estimatedInflow && touched.estimatedInflow ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.estimatedInflow && touched.estimatedInflow && <p className="text-[10px] text-rose-500 mt-1">{errors.estimatedInflow}</p>}
        </div>

        <div>
          <label className="block text-[10px] text-slate-405 font-bold uppercase mb-0.5">Purpose of Account</label>
          <input 
            type="text" 
            name="purposeOfAccount"
            placeholder="e.g. Operational Settlement"
            value={formData.purposeOfAccount} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-2.5 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.purposeOfAccount && touched.purposeOfAccount ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.purposeOfAccount && touched.purposeOfAccount && <p className="text-[10px] text-rose-500 mt-1">{errors.purposeOfAccount}</p>}
        </div>

        <div>
          <label className="block text-[10px] text-slate-450 font-bold uppercase mb-0.5">Expected Volume</label>
          <select 
            name="expectedVolume"
            value={formData.expectedVolume} 
            onChange={handleInputChange}
            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
          >
            <option value="Under 1,000 Tx/Month">Under 1,000 Tx/Month</option>
            <option value="1,000 - 5,000 Tx/Month">1,000 - 5,000 Tx/Month</option>
            <option value="5,000 - 15,000 Tx/Month">5,000 - 15,000 Tx/Month</option>
            <option value="Over 15,000 Tx/Month">Over 15,000 Tx/Month</option>
          </select>
        </div>
      </div>

      {/* Screenings list */}
      <ComplianceScreenings />

    </div>
  );
};

export default Step4ComplianceScreening;
