/**
 * Centralized route paths for the application.
 */

export const ROUTES = {
  // Public / Marketing
  HOME: "/",
  HRM: "/hrm",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:slug",
  ABOUT: "/company/about",
  CASE_STUDIES: "/company/case-studies",
  WAITLIST: "/waitlist",
  CONTACT: "/contact",

  // MFI / App
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  ONBOARDING: "/onboarding",

  // Dashboard (Base path)
  DASHBOARD: "/dashboard",
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];

export default ROUTES;
