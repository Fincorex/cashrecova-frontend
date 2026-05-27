/**
 * Step 3: Legal & Settlement KYC Verification (Step3KycVerification.tsx)
 * 
 * ? Coordinates corporate document uploads (DocumentVault) and NIBSS-linked
 * ? settlement account validations (BankVerification) under a unified view.
 * 
 * NOTE:
 * Both document uploads and account verification parameters are prerequisites
 * before transitioning to Step 4.
 */

import DocumentVault from '../components/DocumentVault';
import BankVerification from '../components/BankVerification';
import { OnboardingFormData, OnboardingFormErrors } from '@/types';

interface Step3KycVerificationProps {
  formData: OnboardingFormData;
  errors: OnboardingFormErrors;
  touched?: Record<string, boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  bankError: string;
  isVerifyingBank: boolean;
  isBankVerified: boolean;
  verifyBankAndBvn: () => void;
}

const Step3KycVerification = ({
  formData,
  errors,
  touched,
  handleInputChange,
  handleBlur,
  onFileUpload,
  bankError,
  isVerifyingBank,
  isBankVerified,
  verifyBankAndBvn
}: Step3KycVerificationProps) => {
  return (
    <div className="space-y-5">
      {/* 
        * Document Upload Section 
        * 
        * ? Manages file selections and updates upload indicators.
        */}
      <DocumentVault 
        formData={formData} 
        errors={errors} 
        onFileUpload={onFileUpload} 
      />

      {/* 
        * Account Resolution Section
        * 
        * ? Manages Bank, NUBAN and signatory BVN verification state panels.
        */}
      <BankVerification 
        formData={formData} 
        errors={errors} 
        touched={touched}
        bankError={bankError} 
        isVerifyingBank={isVerifyingBank} 
        isBankVerified={isBankVerified} 
        verifyBankAndBvn={verifyBankAndBvn} 
        handleInputChange={handleInputChange} 
        handleBlur={handleBlur} 
      />
    </div>
  );
};

export default Step3KycVerification;
