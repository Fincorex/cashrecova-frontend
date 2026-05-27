/**
 * Step 2: Business & Operational Profile (Step2BusinessProfile.tsx)
 * 
 * ? Collects organization operational parameters (e.g. sectors, business models, turnover indicators)
 * ? and interfaces with the Ultimate Beneficial Owner (UBO) declaration manager.
 * 
 * Regulatory Requirement:
 * Financial authorities require mapping of beneficial owners owning > 10% shareholding thresholds.
 */

import UboManager from '../components/UboManager';
import { OnboardingFormData, OnboardingFormErrors, OnboardingNewDirector } from '@/types';

interface Step2BusinessProfileProps {
  formData: OnboardingFormData;
  errors: OnboardingFormErrors;
  touched: Record<string, boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  newDirector: OnboardingNewDirector;
  onDirectorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddDirector: () => void;
  onRemoveDirector: (index: number) => void;
}

const Step2BusinessProfile = ({
  formData,
  errors,
  touched,
  handleInputChange,
  handleBlur,
  newDirector,
  onDirectorChange,
  onAddDirector,
  onRemoveDirector
}: Step2BusinessProfileProps) => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Industry Sector configurations */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Industry Sector</label>
          <select 
            name="industryType"
            value={formData.industryType} 
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
          >
            <option value="Digital Lending & Microfinance">Digital Lending & Microfinance</option>
            <option value="Retail Commercial Banking">Retail Commercial Banking</option>
            <option value="P2P Crowd Lending Platform">P2P Crowd Lending Platform</option>
          </select>
        </div>

        {/* Business Model detail parameter */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Business Model</label>
          <input 
            type="text" 
            name="businessModel"
            placeholder="e.g. B2B2C Consumer Lending"
            value={formData.businessModel} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.businessModel && touched.businessModel ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-50' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.businessModel && touched.businessModel && <p className="text-[10px] text-rose-500 mt-1">{errors.businessModel}</p>}
        </div>

        {/* Service portfolios description */}
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Products & Services Offered</label>
          <input 
            type="text" 
            name="products"
            placeholder="e.g. Personal loans, SME Credits"
            value={formData.products} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.products && touched.products ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-50' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.products && touched.products && <p className="text-[10px] text-rose-500 mt-1">{errors.products}</p>}
        </div>

        {/* Scale metrics for operational validation */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Annual Turnover (NGN)</label>
          <input 
            type="text" 
            name="annualTurnover"
            placeholder="e.g. 450,000,000"
            value={formData.annualTurnover} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.annualTurnover && touched.annualTurnover ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-50' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.annualTurnover && touched.annualTurnover && <p className="text-[10px] text-rose-500 mt-1">{errors.annualTurnover}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Number of Employees</label>
          <input 
            type="number" 
            name="employeeCount"
            placeholder="e.g. 48"
            value={formData.employeeCount} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.employeeCount && touched.employeeCount ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-50' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.employeeCount && touched.employeeCount && <p className="text-[10px] text-rose-500 mt-1">{errors.employeeCount}</p>}
        </div>
      </div>

      {/* 
        * Ultimate Beneficial Ownership (UBO) Registry Panel
        * 
        * ? Enables inline directory creation and ownership percentage validations.
        */}
      <UboManager
        directors={formData.directors}
        newDirector={newDirector}
        onDirectorChange={onDirectorChange}
        onAddDirector={onAddDirector}
        onRemoveDirector={onRemoveDirector}
        error={errors.directors}
      />
    </div>
  );
};

export default Step2BusinessProfile;
