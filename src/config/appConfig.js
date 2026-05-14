/**
 * Global application configuration and environment variables.
 */

export const appConfig = {
  name: "Fincorex",
  version: "1.0.0",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "https://api.fincorex.com/v1",
  environment: import.meta.env.MODE || "development",
  features: {
    waitlist: true,
    onboarding: true,
    analytics: true,
  },
};

export default appConfig;
