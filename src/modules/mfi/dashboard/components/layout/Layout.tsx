/**
 * Authenticated Layout Frame (Layout.tsx)
 * 
 * ? Serves as the primary layout shell for all authenticated MFI admin dashboard routes.
 * ? Houses the global Sidebar navigation, top action Bar, and footer sections.
 * 
 * NOTE:
 * Uses React Router's `<Outlet />` element to mount nested sub-pages,
 * and dynamically shifts margin spacings (`lg:ml-45` / `lg:ml-20`) based on sidebar expansion state.
 */

import { Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import HorizontalSubNav from './HorizontalSubNav';
import { useSidebar } from '../../hooks/useSidebar';
import { navigation, NavItem } from '../../config/navigation';

interface ExtendedNavItem extends NavItem {
  subMenu?: { label: string; path: string }[];
}

const Layout = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const location = useLocation();

    // ? Dynamic Sub-navigation Resolution
    // Resolves if the active nav route contains sub-items (like loans sub-categories)
    // to dynamically resize content page paddings.
    const currentTopLevel = (navigation as ExtendedNavItem[]).find(item => {
        if (item.path === '/dashboard') {
            return location.pathname === '/dashboard' || location.pathname === '/dashboard/analytics';
        }
        return location.pathname.startsWith(item.path);
    });

    const hasSubMenu = currentTopLevel && currentTopLevel.subMenu;

    return (
        <div className="min-h-screen bg-neutral-50 font-sans selection:bg-primary-100 selection:text-primary-600">
            <Sidebar />
            
            {/* Sidebar backdrop overlay: captures pointer events to toggle sidebar off on smaller mobile viewports */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300" 
                    onClick={toggleSidebar}
                ></div>
            )}

            <div className={`
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'lg:ml-45' : 'lg:ml-20'}
                flex flex-col min-h-screen
            `}>
                <Topbar />
                
                {/* 
                  * Page Content Body Wrapper
                  * 
                  * ! Dynamic Padding Adjustment:
                  * ! Shifts top offset (pt-52 vs pt-32) if a horizontal sub-nav is active.
                  */}
                <main className={`
                    flex-grow p-4 sm:p-6 lg:p-10
                    ${hasSubMenu ? 'pt-52' : 'pt-32'}
                    transition-all duration-300 mt-10
                `}>
                    <HorizontalSubNav />
                    {/* CSS Animation classes provide a smooth entrance on routing shifts */}
                    <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </div>
                </main>
                
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
