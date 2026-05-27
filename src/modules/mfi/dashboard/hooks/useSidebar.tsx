/**
 * Dashboard Drawer Toggle Context Hook (useSidebar.tsx)
 * 
 * ? Coordinates sidebar expansion states across responsive views (desktop, tablet, mobile).
 * ? Leverages window-resize event listeners to auto-collapse menus on smaller dimensions.
 */

import { useState, useEffect, createContext, useContext } from 'react';

interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  // ! Desktop devices default to expanded drawers for productivity,
  // ! while mobile/tablet screens default to closed states to optimize screen space.
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(window.innerWidth >= 1024);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Synchronize drawer states dynamically when browser sizing updates
  useEffect(() => {
    const handleResize = () => {
      // Auto-close sidebar on mobile but don't force open on desktop
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
