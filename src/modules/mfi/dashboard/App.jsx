import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// CSS imports
import 'simplebar-react/dist/simplebar.min.css';

// Layout and Pages
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';
import { SidebarProvider } from './hooks/useSidebar.jsx';

function DashboardAdmin() {
  useEffect(() => {
    document.body.className = 'bg-slate-50';
  }, []);

  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Dashboard Section */}
          <Route index element={<Dashboard />} />
          
          {/* Placeholder Sections for Cashrecova Modules */}
          <Route path="loans" element={<PlaceholderPage />} />
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


