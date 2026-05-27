/**
 * Onboarding Wizard Page Orchestrator (OnboardingPage.tsx)
 * 
 * ? Coordinates the multi-step compliance onboarding wizard for Microfinance Institutions.
 * ? Manages aggregate wizard state, real-time validations, identity verification, 
 * ? and automated local draft synchronization.
 * 
 * Multi-Step Flow:
 * 1. Corporate Identity - Basic registration detail (CAC, incorporation date).
 * 2. Business Profile - Sector details and UBO (Ultimate Beneficial Owner) share declarations.
 * 3. KYC Verification - Document uploads and settlement bank NUBAN/BVN checks.
 * 4. Compliance Screening - Risk scoring, funding sources, expected volumes.
 * 5. Review & Activation - Aggregated state review, legal agreements, and final API dispatch.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import mfiService from '@shared/services/mfiService';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Subcomponents & Stepper Layout
import { getPasswordStrength } from './components/PasswordStrengthMeter';
import OnboardingSidebar from './components/OnboardingSidebar';
import OnboardingHeader from './components/OnboardingHeader';
import OnboardingFooter from './components/OnboardingFooter';

// Wizard Steps
import Step1CorporateIdentity from './steps/Step1CorporateIdentity';
import Step2BusinessProfile from './steps/Step2BusinessProfile';
import Step3KycVerification from './steps/Step3KycVerification';
import Step4ComplianceScreening from './steps/Step4ComplianceScreening';
import Step5ReviewActivation from './steps/Step5ReviewActivation';

// Types
import { OnboardingFormData, OnboardingFormErrors, Director, OnboardingNewDirector } from '@/types';

const OnboardingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ? UI Lifecycle States
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isVerifyingBank, setIsVerifyingBank] = useState<boolean>(false);
  const [isBankVerified, setIsBankVerified] = useState<boolean>(false);
  const [bankError, setBankError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved'>('saved');

  // ? Centralized Wizard Form State
  const [formData, setFormData] = useState<OnboardingFormData>({
    // Step 1: Corporate Identity
    email: '',
    password: '',
    orgName: '',
    rcNumber: '',
    incorporationDate: '',
    country: 'Nigeria',
    state: 'Lagos',

    // Step 2: Business & UBO
    industryType: 'Digital Lending & Microfinance',
    businessModel: '',
    products: '',
    annualTurnover: '',
    employeeCount: '',
    directors: [],

    // Step 3: Documents and Settlement
    certIncorporation: '',
    memoArticles: '',
    cacForm7: '',
    directorId: '',
    utilityBill: '',
    settlementBank: 'Access Bank',
    accountNumber: '',
    accountName: '',
    bvnSignatory: '',

    // Step 4: Compliance
    sourceOfFunds: '',
    sourceOfWealth: '',
    estimatedInflow: '',
    purposeOfAccount: '',
    expectedVolume: '1,000 - 5,000 Tx/Month',

    // Step 5: Assertions
    infoAccurate: false,
    amlObligations: false,
    consentVerification: false,
    acceptTerms: false
  });

  const [newDirector, setNewDirector] = useState<OnboardingNewDirector>({
    fullName: '',
    dob: '',
    nationality: 'Nigerian',
    ownership: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<OnboardingFormErrors>({});

  // ? 1. Restore User-Keyed Draft from localStorage on Mount
  // To optimize developer/user experience, we namespace drafts based on the email
  // of the logged-in portal operator to allow multiple accounts on the same machine.
  useEffect(() => {
    const userKey = user?.email || 'guest';
    const savedDraft = localStorage.getItem(`cashrecova_onboarding_draft_${userKey}`);
    const savedStep = localStorage.getItem(`cashrecova_onboarding_step_${userKey}`);

    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        // Automatically assume bank verified state if fields are filled out in recovery draft
        if (parsedDraft.accountName && parsedDraft.accountNumber && parsedDraft.bvnSignatory) {
          setIsBankVerified(true);
        }
        
        if (savedStep) {
          const stepNum = parseInt(savedStep, 10);
          if (stepNum >= 1 && stepNum <= 5) {
            setCurrentStep(stepNum);
          }
        }
      } catch (err) {
        console.error("Error loading onboarding draft:", err);
      }
    } else if (user) {
      // Pre-seed organization credentials from original sign-up payload
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        orgName: user.institutionName || ''
      }));
    }
  }, [user]);

  // ? 2. User-Keyed Auto-Save debounce effect
  // Debounced auto-saving avoids write thrashing on localStorage during keystrokes.
  useEffect(() => {
    const userKey = user?.email || 'guest';
    // Skip saving defaults to prevent writing empty drafts
    if (!formData.email && !formData.orgName) return;

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      localStorage.setItem(`cashrecova_onboarding_draft_${userKey}`, JSON.stringify(formData));
      localStorage.setItem(`cashrecova_onboarding_step_${userKey}`, currentStep.toString());
      setSaveStatus('saved');
    }, 500);

    return () => clearTimeout(timer);
  }, [formData, currentStep, user]);

  // ? 3. Prevent Navigation / Page Unload with Unsubmitted Progress
  // Intercepts browser tab close / refresh requests to protect unsaved entries.
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitted) {
        e.preventDefault();
        e.returnValue = 'You have unsaved onboarding progress. Are you sure you want to exit?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSubmitted]);

  // Real-time Validation Checker per Step
  const validateStep = (step: number): OnboardingFormErrors => {
    const errs: OnboardingFormErrors = {};
    if (step === 1) {
      if (!formData.email) {
        errs.email = 'Compliance Admin Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errs.email = 'Please enter a valid email address';
      }
      
      if (!formData.password) {
        errs.password = 'Admin Password is required';
      } else {
        const strength = getPasswordStrength(formData.password);
        if (strength.score < 3) {
          errs.password = 'Password must meet at least 3 strength criteria (caps, lower, special character, digit)';
        }
      }

      if (!formData.orgName) errs.orgName = 'Corporate Registered Name is required';
      
      if (!formData.rcNumber) {
        errs.rcNumber = 'CAC Registration (RC Number) is required';
      } else if (formData.rcNumber.length < 5) {
        errs.rcNumber = 'Please enter a valid RC Number (e.g. RC-1849204)';
      }

      if (!formData.incorporationDate) {
        errs.incorporationDate = 'Date of Incorporation is required';
      } else {
        const selectedDate = new Date(formData.incorporationDate);
        if (selectedDate > new Date()) {
          errs.incorporationDate = 'Incorporation date cannot be in the future';
        }
      }

      if (!formData.country) errs.country = 'Country is required';
      if (!formData.state) errs.state = 'State is required';
    }

    if (step === 2) {
      if (!formData.industryType) errs.industryType = 'Industry Sector selection is required';
      if (!formData.businessModel) errs.businessModel = 'Business Model details are required';
      if (!formData.products) errs.products = 'Products & Services detail is required';
      if (!formData.annualTurnover) errs.annualTurnover = 'Annual Turnover is required';
      if (!formData.employeeCount) {
        errs.employeeCount = 'Employee count is required';
      } else if (parseInt(formData.employeeCount, 10) <= 0) {
        errs.employeeCount = 'Number of employees must be greater than zero';
      }

      if (!formData.directors || formData.directors.length === 0) {
        errs.directors = 'At least one Director or beneficial owner is required';
      } else {
        const totalOwnership = formData.directors.reduce((sum, d) => sum + parseFloat(d.ownership || '0'), 0);
        if (totalOwnership > 100) {
          errs.directors = 'Total beneficial ownership (UBO) share cannot exceed 100%';
        }
      }
    }

    if (step === 3) {
      if (!formData.certIncorporation) errs.certIncorporation = 'Certificate of Incorporation is required';
      if (!formData.memoArticles) errs.memoArticles = 'Memorandum & Articles of Association is required';
      if (!formData.cacForm7) errs.cacForm7 = 'CAC Form 1.1 / Form 7 is required';
      if (!formData.directorId) errs.directorId = 'Director Valid Identification is required';
      if (!formData.utilityBill) errs.utilityBill = 'Utility Bill / Office Proof is required';

      if (!formData.settlementBank) errs.settlementBank = 'Settlement Bank is required';
      
      if (!formData.accountNumber) {
        errs.accountNumber = 'Account Number is required';
      } else if (!/^\d{10}$/.test(formData.accountNumber)) {
        errs.accountNumber = 'NUBAN Account Number must be exactly 10 digits';
      }

      if (!formData.bvnSignatory) {
        errs.bvnSignatory = 'Signatory BVN is required';
      } else if (!/^\d{11}$/.test(formData.bvnSignatory)) {
        errs.bvnSignatory = 'BVN must be exactly 11 digits';
      }

      if (!isBankVerified) {
        errs.bankVerified = 'You must run the identity resolution verification check before proceeding';
      }
    }

    if (step === 4) {
      if (!formData.sourceOfFunds) errs.sourceOfFunds = 'Primary Source of Funds is required';
      if (!formData.sourceOfWealth) errs.sourceOfWealth = 'Primary Source of Wealth is required';
      if (!formData.estimatedInflow) errs.estimatedInflow = 'Estimated Monthly Inflow is required';
      if (!formData.purposeOfAccount) errs.purposeOfAccount = 'Purpose of Account is required';
    }

    if (step === 5) {
      if (!formData.infoAccurate) errs.infoAccurate = 'You must assert that all information is accurate';
      if (!formData.amlObligations) errs.amlObligations = 'You must accept CBN AML/CFT guidelines';
      if (!formData.consentVerification) errs.consentVerification = 'You must consent to real-time verification';
      if (!formData.acceptTerms) errs.acceptTerms = 'You must accept terms of service and privacy policies';
    }

    return errs;
  };

  // Run dynamic validations on input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let val: string | boolean = value;
    if (type === 'checkbox') {
      val = (e.target as HTMLInputElement).checked;
    }

    setFormData(prev => ({
      ...prev,
      [name]: val
    }));

    // Reset bank identity check on modifying parameters
    if (name === 'accountNumber' || name === 'bvnSignatory' || name === 'settlementBank') {
      setIsBankVerified(false);
      setErrors(prev => ({ ...prev, bankVerified: undefined }));
    }

    // Clear error tags on input modification
    if (errors[name as keyof OnboardingFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (touched[name]) {
      setTouched(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const stepErrors = validateStep(currentStep);
    if (stepErrors[name as keyof OnboardingFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: stepErrors[name as keyof OnboardingFormErrors] }));
    }
  };

  // Inline Director Beneficial Owner Handlers
  const handleDirectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDirector(prev => ({ ...prev, [name]: value }));
  };

  const addDirector = () => {
    if (!newDirector.fullName || !newDirector.ownership || !newDirector.dob) {
      alert("Please enter Name, Date of Birth, and Beneficial Share for the director.");
      return;
    }
    const ownershipVal = parseFloat(newDirector.ownership);
    if (isNaN(ownershipVal) || ownershipVal <= 0 || ownershipVal > 100) {
      alert("Beneficial ownership percentage must be a number between 1 and 100.");
      return;
    }

    const updatedDirectors: Director[] = [...formData.directors, {
      ...newDirector,
      ownership: ownershipVal.toString()
    }];

    const totalOwnership = updatedDirectors.reduce((sum, d) => sum + parseFloat(d.ownership || '0'), 0);
    if (totalOwnership > 100) {
      alert("Total beneficial ownership of all directors cannot exceed 100%.");
      return;
    }

    setFormData(prev => ({
      ...prev,
      directors: updatedDirectors
    }));

    // Clear errors for directors
    setErrors(prev => ({ ...prev, directors: undefined }));

    setNewDirector({ fullName: '', dob: '', nationality: 'Nigerian', ownership: '' });
  };

  const removeDirector = (index: number) => {
    setFormData(prev => ({
      ...prev,
      directors: prev.directors.filter((_, i) => i !== index)
    }));
  };

  // Mock file uploader callback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file.name
      }));
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };

  // ? Real-time Bank and BVN verification
  // ! NIBSS (Nigerian Inter-Bank Settlement System) KYC simulation
  // Resolves the provided BVN and Account Number parameters against national registers.
  // Requires explicit verification approval before Step 3 transitions.
  const verifyBankAndBvn = async () => {
    const activeErrors = validateStep(3);
    if (activeErrors.accountNumber || activeErrors.bvnSignatory) {
      setBankError(activeErrors.accountNumber || activeErrors.bvnSignatory || '');
      return;
    }

    setIsVerifyingBank(true);
    setBankError('');
    try {
      // Simulate NIBSS verification resolution latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsBankVerified(true);
      setFormData(prev => ({
        ...prev,
        // Automatically link resolved bank name to CAC Institution title
        accountName: prev.orgName ? prev.orgName.toUpperCase() : 'CASHRECOVA FINANCE LTD'
      }));
      setErrors(prev => ({ ...prev, bankVerified: undefined }));
    } catch (err) {
      setBankError("Could not resolve bank account details. Verify NUBAN number and BVN.");
    } finally {
      setIsVerifyingBank(false);
    }
  };

  // Form step navigation checks
  const handleNextStep = () => {
    const activeErrors = validateStep(currentStep);
    if (Object.keys(activeErrors).length > 0) {
      // Force all errors to show
      const stepTouched: Record<string, boolean> = {};
      Object.keys(activeErrors).forEach(key => {
        stepTouched[key] = true;
      });
      setTouched(prev => ({ ...prev, ...stepTouched }));
      setErrors(activeErrors);
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({});
    }
  };

  // Final submit handler
  const submitOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeErrors = validateStep(5);
    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    // Prepare API format structured payload
    const mfiPayload = {
      institutionName: formData.orgName,
      licenseNumber: formData.rcNumber,
      address: `${formData.state}, ${formData.country}`,
      city: formData.state,
      country: formData.country,
      employeeCount: parseInt(formData.employeeCount, 10) || 0,
      metadata: {
        email: formData.email,
        password: formData.password, // securely passed during registration context
        industryType: formData.industryType,
        businessModel: formData.businessModel,
        products: formData.products,
        annualTurnover: formData.annualTurnover,
        directors: formData.directors,
        settlementBank: formData.settlementBank,
        accountNumber: formData.accountNumber,
        bvnSignatory: formData.bvnSignatory,
        accountName: formData.accountName,
        sourceOfFunds: formData.sourceOfFunds,
        sourceOfWealth: formData.sourceOfWealth,
        estimatedInflow: formData.estimatedInflow,
        purposeOfAccount: formData.purposeOfAccount,
        expectedVolume: formData.expectedVolume,
        documents: {
          certIncorporation: formData.certIncorporation,
          memoArticles: formData.memoArticles,
          cacForm7: formData.cacForm7,
          directorId: formData.directorId,
          utilityBill: formData.utilityBill
        }
      }
    };

    try {
      const response = await mfiService.createMFI(mfiPayload);
      if (response.success) {
        setIsSubmitted(true);
        // Clear drafts on success
        const userKey = user?.email || 'guest';
        localStorage.removeItem(`cashrecova_onboarding_draft_${userKey}`);
        localStorage.removeItem(`cashrecova_onboarding_step_${userKey}`);
      } else {
        setSubmitError(response.message || "Onboarding submission failed.");
      }
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-slate-700 font-sans antialiased">
      
      {/* LEFT PANEL: Sticky Onboarding Sidebar */}
      <OnboardingSidebar 
        currentStep={currentStep} 
        setCurrentStep={setCurrentStep} 
        validateStep={validateStep} 
      />

      {/* RIGHT PANEL: Card-less Main Content Area */}
      <main className="flex-1 py-10 px-6 sm:px-12 lg:px-16 overflow-y-auto">
        <div className="max-w-xl mx-auto flex flex-col justify-between min-h-[calc(100vh-80px)]">
          
          {/* Header Title Section */}
          <OnboardingHeader currentStep={currentStep} />

          {/* Core Content Form View */}
          <div className="flex-1">
            
            {/* STEP 1: SETUP */}
            {currentStep === 1 && (
              <Step1CorporateIdentity 
                formData={formData} 
                errors={errors} 
                touched={touched} 
                handleInputChange={handleInputChange} 
                handleBlur={handleBlur} 
              />
            )}

            {/* STEP 2: BUSINESS & OWNERSHIP */}
            {currentStep === 2 && (
              <Step2BusinessProfile 
                formData={formData} 
                errors={errors} 
                touched={touched} 
                handleInputChange={handleInputChange} 
                handleBlur={handleBlur} 
                newDirector={newDirector} 
                onDirectorChange={handleDirectorChange} 
                onAddDirector={addDirector} 
                onRemoveDirector={removeDirector} 
              />
            )}

            {/* STEP 3: DOCUMENT UPLOADS & VERIFICATION */}
            {currentStep === 3 && (
              <Step3KycVerification 
                formData={formData} 
                errors={errors} 
                touched={touched} 
                handleInputChange={handleInputChange} 
                handleBlur={handleBlur} 
                onFileUpload={handleFileUpload} 
                bankError={bankError} 
                isVerifyingBank={isVerifyingBank} 
                isBankVerified={isBankVerified} 
                verifyBankAndBvn={verifyBankAndBvn} 
              />
            )}

            {/* STEP 4: COMPLIANCE & RISK REVIEW */}
            {currentStep === 4 && (
              <Step4ComplianceScreening 
                formData={formData} 
                errors={errors} 
                touched={touched} 
                handleInputChange={handleInputChange} 
                handleBlur={handleBlur} 
              />
            )}

            {/* STEP 5: REVIEW & ACTIVATION */}
            {currentStep === 5 && (
              <Step5ReviewActivation 
                formData={formData} 
                errors={errors} 
                submitError={submitError} 
                isSubmitted={isSubmitted} 
                isSubmitting={isSubmitting} 
                submitOnboarding={submitOnboarding} 
                handleInputChange={handleInputChange}
                onGoToDashboard={() => navigate('/dashboard')} 
              />
            )}

          </div>

          {/* Stepper Footer actions */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
            <button 
              type="button" 
              onClick={handlePrevStep}
              disabled={currentStep === 1 || isSubmitted}
              className="flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-600 font-extrabold py-2 px-4 rounded-xl transition-all shadow-3xs active:scale-98"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>

            {currentStep < 5 ? (
              <button 
                type="button" 
                onClick={handleNextStep}
                disabled={isSubmitted}
                className="flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 text-white font-extrabold py-2 px-5 rounded-xl shadow-md transition-all active:scale-98 hover:shadow-lg hover:shadow-primary-500/10"
              >
                Continue <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              !isSubmitted && (
                <button 
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white font-extrabold py-2 px-5 rounded-xl shadow-md transition-all active:scale-98"
                >
                  Dashboard <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )
            )}
          </div>

          {/* Bottom Consolidated Specs Row */}
          <OnboardingFooter />

        </div>
      </main>

      {/* Floating User-Keyed Auto-Save status at bottom right */}
      <div className="fixed bottom-4 right-4 z-50 bg-white border border-slate-200/85 px-3 py-1.5 rounded-lg shadow-md text-[9px] font-extrabold text-slate-500 flex items-center gap-1.5 animate-in slide-in-from-bottom-2 duration-300">
        {saveStatus === 'saving' ? (
          <>
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
            <span className="uppercase tracking-wider text-amber-500">Auto-Saving...</span>
          </>
        ) : (
          <>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span className="uppercase tracking-wider text-emerald-650">Auto-Saved</span>
          </>
        )}
      </div>

    </div>
  );
};

export default OnboardingPage;
