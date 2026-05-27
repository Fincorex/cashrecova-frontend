/**
 * Application Router Orchestrator (AppRouter.tsx)
 * 
 * ? Handles global routing layout, including nested sub-routes and guarded paths.
 * ? Wraps the router tree with core state providers (ThemeProvider, AuthProvider).
 * 
 * NOTE: 
 * We keep ThemeProvider and AuthProvider initialized here at the routing root 
 * to ensure context states are fully instantiated before any router matches occur.
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@shared/context/AuthContext';
import { ThemeProvider } from '@shared/context/ThemeContext';
import ScrollToTop from '@shared/components/ScrollToTop';
import { ROUTES } from '@shared/constants/routes';

// MFI / App Pages
import LoginPage from '@mfi/auth/LoginPage';
import RegisterPage from '@mfi/auth/RegisterPage';
import ForgotPasswordPage from '@mfi/auth/ForgotPasswordPage';
import OnboardingPage from '@mfi/onboarding/OnboardingPage';
import DashboardApp from '@mfi/dashboard/App';
import ProtectedRoute from '@shared/components/layout/ProtectedRoute';

const AppRouter = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* Automatically resets scroll position across SPA page transitions */}
          <ScrollToTop />
          <Routes>
            {/* Entry Redirect to Login */}
            <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
            
            {/* Public Authentication Flows */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

            {/* 
              * Protected Dashboard Sub-router
              * 
              * ? The trailing `/*` wildcard allows the nested router inside 
              * ? `DashboardApp` to resolve sub-views (like /dashboard/loans, etc.)
              * ? without breaking matching on this parent routing table.
              */}
            <Route 
              path={`${ROUTES.DASHBOARD}/*`}
              element={
                <ProtectedRoute>
                  <DashboardApp />
                </ProtectedRoute>
              } 
            />

            {/* Protected Stepper Onboarding Flow */}
            <Route 
              path={ROUTES.ONBOARDING}
              element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all - fallback redirect for safety */}
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppRouter;
