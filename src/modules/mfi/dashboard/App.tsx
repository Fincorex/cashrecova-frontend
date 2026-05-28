/**
 * MFI Dashboard App Router Root (App.tsx)
 * 
 * ? Coordinates sub-navigation routing inside the authenticated dashboard view.
 * ? Wraps layout layouts with `SidebarProvider` to coordinate toggle actions on different screen sizes.
 */

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Simplebar custom scrollbars styling for navigation drawers
import 'simplebar-react/dist/simplebar.min.css';

// Layout and Pages
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';
import Loans from './pages/Loans';
import CreateLoan from './pages/CreateLoan';
import { SidebarProvider } from './hooks/useSidebar';

function DashboardAdmin() {
  // Override background colors globally for the dashboard admin views
  useEffect(() => {
    document.body.className = 'bg-slate-50';
  }, []);

  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Analytics Index Dashboard */}
          <Route index element={<Dashboard />} />
          
          {/* 
            * Cashrecova Product Sub-sections
            * 
            * ? Non-dashboard items are linked to a consolidated `<PlaceholderPage />`
            * ? indicating future feature implementation details.
            */}
          <Route path="loans" element={<Loans />} />
          <Route path="loans/create" element={<CreateLoan/>} />
          <Route path="loans/applications" element={<PlaceholderPage />} />
          <Route path="loans/products" element={<PlaceholderPage />} />
          <Route path="disbursements" element={<PlaceholderPage />} />
          <Route path="repayments" element={<PlaceholderPage />} />
          <Route path="recovery" element={<PlaceholderPage />} />
          <Route path="wallet" element={<PlaceholderPage />} />
          <Route path="transactions" element={<PlaceholderPage />} />
          <Route path="mandates" element={<PlaceholderPage />} />
          <Route path="credit-insights" element={<PlaceholderPage />} />
          <Route path="billing" element={<PlaceholderPage />} />
          <Route path="organizations" element={<PlaceholderPage />} />
          <Route path="api-integrations" element={<PlaceholderPage />} />
          <Route path="settings" element={<PlaceholderPage />} />
        </Route>
      </Routes>
    </SidebarProvider>
  );
}

export default DashboardAdmin;
