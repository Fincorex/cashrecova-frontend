/**
 * Bank & BVN Settlement Verification (BankVerification.tsx)
 * 
 * ? Handles collection and resolution of MFI settlement accounts.
 * ? Interfaces with NIBSS (Nigerian Inter-Bank Settlement System) simulations.
 * 
 * NOTE:
 * We force accountName resolution here to match corporate CAC records to comply
 * with AML/CFT regulatory requirements.
 */

import { Check, LockKeyhole } from 'lucide-react';
import { OnboardingFormData, OnboardingFormErrors } from '@/types';

interface BankVerificationProps {
  formData: OnboardingFormData;
  errors: OnboardingFormErrors;
  touched?: Record<string, boolean>;
  bankError: string;
  isVerifyingBank: boolean;
  isBankVerified: boolean;
  verifyBankAndBvn: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const BankVerification = ({
  formData,
  errors,
  touched,
  bankError,
  isVerifyingBank,
  isBankVerified,
  verifyBankAndBvn,
  handleInputChange,
  handleBlur
}: BankVerificationProps) => {
  return (
    <div className="border-t border-slate-100 pt-4 space-y-3">
      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
        NIBSS Settlement Account Verification
      </span>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[9px] text-slate-400 uppercase font-bold mb-0.5">Settlement Bank</label>
          <select 
            name="settlementBank"
            value={formData.settlementBank} 
            onChange={handleInputChange}
            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
          >
            <option value="Access Bank">Access Bank Plc</option>
            <option value="Zenith Bank">Zenith Bank Plc</option>
            <option value="GTBank">Guaranty Trust Bank</option>
            <option value="United Bank for Africa">UBA Plc</option>
          </select>
        </div>

        <div>
          <label className="block text-[9px] text-slate-400 uppercase font-bold mb-0.5">Account Number (NUBAN)</label>
          <input 
            type="text" 
            name="accountNumber"
            maxLength={10}
            value={formData.accountNumber} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-2.5 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.accountNumber && touched?.accountNumber ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200'
            } bg-white`}
          />
          {errors.accountNumber && <p className="text-[9px] text-rose-500 mt-0.5">{errors.accountNumber}</p>}
        </div>

        <div>
          <label className="block text-[9px] text-slate-400 uppercase font-bold mb-0.5">Signatory BVN</label>
          <input 
            type="text" 
            name="bvnSignatory"
            maxLength={11}
            value={formData.bvnSignatory} 
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-2.5 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-100 ${
              errors.bvnSignatory && touched?.bvnSignatory ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200'
            } bg-white`}
          />
          {errors.bvnSignatory && <p className="text-[9px] text-rose-500 mt-0.5">{errors.bvnSignatory}</p>}
        </div>
      </div>

      {errors.bankVerified && <p className="text-xs text-rose-500 font-semibold">{errors.bankVerified}</p>}
      {bankError && <p className="text-xs text-rose-500 font-semibold">{bankError}</p>}

      {/* 
        * Interactive Resolution Panel
        * 
        * Shows verified organization names dynamically linked to current registration.
        */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-150 p-3.5 rounded-xl mt-2 shadow-3xs">
        <div className="flex items-center gap-2">
          {isBankVerified ? (
            <div className="h-5 w-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-3xs">
              <Check className="h-3.5 w-3.5 stroke-[3px]" />
            </div>
          ) : (
            <div className="h-5 w-5 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center flex-shrink-0 border">
              <LockKeyhole className="h-3 w-3" />
            </div>
          )}
          <div className="text-xs">
            <span className="font-bold text-slate-800 block sm:inline">BVN Status:</span>{' '}
            <span className={`font-semibold ${isBankVerified ? 'text-emerald-600' : 'text-slate-555'}`}>
              {isBankVerified ? `${formData.accountName} (Identity Resolved)` : 'Unverified - Please request NIBSS resolve'}
            </span>
          </div>
        </div>
        <button 
          type="button" 
          onClick={verifyBankAndBvn}
          disabled={isVerifyingBank || isBankVerified}
          className={`
            px-4 py-1.5 text-[11px] font-bold rounded-lg shadow-3xs transition-all flex items-center justify-center gap-1.5 active:scale-98
            ${isBankVerified 
              ? 'bg-slate-150 text-slate-400 border border-slate-200 cursor-default' 
              : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-sm'
            }
          `}
        >
          {isVerifyingBank ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4}></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Resolving...</span>
            </>
          ) : isBankVerified ? 'Verified' : 'Verify Details'}
        </button>
      </div>
    </div>
  );
};

export default BankVerification;
