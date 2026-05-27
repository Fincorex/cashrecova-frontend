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

/**
 * Step3KycVerification Component
 * 
 * Handles document uploads and settlement bank resolution checks.
 */
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
      {/* Document Upload section */}
      <DocumentVault 
        formData={formData} 
        errors={errors} 
        onFileUpload={onFileUpload} 
      />

      {/* Account resolution section */}
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
