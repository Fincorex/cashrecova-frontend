/**
 * Global application configuration and environment variables.
 */

export interface AppConfig {
  name: string;
  version: string;
  apiBaseUrl: string;
  environment: string;
  features: {
    waitlist: boolean;
    onboarding: boolean;
    analytics: boolean;
  };
}

export const appConfig: AppConfig = {
  name: "Cashrecova",
  version: "1.0.0",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "https://api.cashrecova.com/v1",
  environment: import.meta.env.MODE || "development",
  features: {
    waitlist: true,
    onboarding: true,
    analytics: true,
  },
};

export default appConfig;
