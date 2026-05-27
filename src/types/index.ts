export interface User {
  id: string;
  institutionName: string;
  email: string;
  phone?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  errors?: Record<string, string[]>;
}

export interface Director {
  fullName: string;
  dob: string;
  nationality: string;
  ownership: string;
}

export interface OnboardingFormData {
  // Step 1: Corporate Identity
  email: string;
  password?: string;
  orgName: string;
  rcNumber: string;
  incorporationDate: string;
  country: string;
  state: string;

  // Step 2: Business & UBO
  industryType: string;
  businessModel: string;
  products: string;
  annualTurnover: string;
  employeeCount: string;
  directors: Director[];

  // Step 3: Documents and Settlement
  certIncorporation: string;
  memoArticles: string;
  cacForm7: string;
  directorId: string;
  utilityBill: string;
  settlementBank: string;
  accountNumber: string;
  accountName: string;
  bvnSignatory: string;

  // Step 4: Compliance
  sourceOfFunds: string;
  sourceOfWealth: string;
  estimatedInflow: string;
  purposeOfAccount: string;
  expectedVolume: string;

  // Step 5: Assertions
  infoAccurate: boolean;
  amlObligations: boolean;
  consentVerification: boolean;
  acceptTerms: boolean;
}

export interface OnboardingNewDirector {
  fullName: string;
  dob: string;
  nationality: string;
  ownership: string;
}

export type OnboardingFormErrors = Partial<Record<keyof OnboardingFormData | 'bankVerified' | 'submit' | 'directors', string>>;

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: Record<string, string>) => Promise<ApiResponse<User>>;
  register: (userData: Record<string, string>) => Promise<ApiResponse<User>>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  isRTL: boolean;
  toggleDarkMode: () => void;
  toggleRTL: () => void;
}
