import React from 'react';
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
          <ScrollToTop />
          <Routes>
            {/* Authentication Routes */}
            <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

            {/* Protected Dashboard Routes */}
            <Route 
              path={`${ROUTES.DASHBOARD}/*`}
              element={
                <ProtectedRoute>
                  <DashboardApp />
                </ProtectedRoute>
              } 
            />

            <Route 
              path={ROUTES.ONBOARDING}
              element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all - Redirect to Login */}
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppRouter;
