/**
 * Step 1: Corporate Identity & Authentication (Step1CorporateIdentity.tsx)
 * 
 * ? Collects core corporate credentials and validation requirements (e.g. CAC registration number).
 * ? Leverages an inline PasswordStrengthMeter component to enforce secure credentials.
 */

import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { OnboardingFormData, OnboardingFormErrors } from '@/types';

interface Step1CorporateIdentityProps {
  formData: OnboardingFormData;
  errors: OnboardingFormErrors;
  touched: Record<string, boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Step1CorporateIdentity = ({
  formData,
  errors,
  touched,
  handleInputChange,
  handleBlur
}: Step1CorporateIdentityProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Compliance Administrator Identity email field */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Compliance Admin Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.email && touched.email ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-50' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.email && touched.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
        </div>

        {/* Security Credential with interactive strength analyzer */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Admin Password</label>
          <input 
            type="password" 
            name="password"
            value={formData.password || ''} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.password && touched.password ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-50' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {/* Password Strength Indicator */}
          <PasswordStrengthMeter password={formData.password} />
          {errors.password && touched.password && <p className="text-[10px] text-rose-500 mt-1">{errors.password}</p>}
        </div>

        {/* Corporate details linked directly to regulatory registration registries */}
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Corporate Registered Name</label>
          <input 
            type="text" 
            name="orgName"
            value={formData.orgName} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.orgName && touched.orgName ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-50' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.orgName && touched.orgName && <p className="text-[10px] text-rose-500 mt-1">{errors.orgName}</p>}
        </div>

        {/* CAC Registration number (RC-xxxxxx) to verify organization status */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">CAC Registration (RC Number)</label>
          <input 
            type="text" 
            name="rcNumber"
            placeholder="e.g. RC-1849204"
            value={formData.rcNumber} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.rcNumber && touched.rcNumber ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-50' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.rcNumber && touched.rcNumber && <p className="text-[10px] text-rose-500 mt-1">{errors.rcNumber}</p>}
        </div>

        {/* Date of official incorporation to compute corporate age metrics */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Date of Incorporation</label>
          <input 
            type="date" 
            name="incorporationDate"
            value={formData.incorporationDate} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.incorporationDate && touched.incorporationDate ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-50' : 'border-slate-200 focus:border-primary-500'
            } bg-white`}
          />
          {errors.incorporationDate && touched.incorporationDate && <p className="text-[10px] text-rose-500 mt-1">{errors.incorporationDate}</p>}
        </div>

        {/* Geographical jurisdiction parameters */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Country</label>
          <select 
            name="country"
            value={formData.country} 
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
          >
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Kenya">Kenya</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">State</label>
          <select 
            name="state"
            value={formData.state} 
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
          >
            <option value="Lagos">Lagos</option>
            <option value="FCT Abuja">FCT Abuja</option>
            <option value="Rivers">Rivers</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step1CorporateIdentity;
