import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import HorizontalSubNav from './HorizontalSubNav';
import { useSidebar } from '../../hooks/useSidebar.jsx';
import { navigation } from '../../config/navigation';

const Layout = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const location = useLocation();

    // Find if current section has sub-menus
    const currentTopLevel = navigation.find(item => {
        if (item.path === '/dashboard') {
            return location.pathname === '/dashboard' || location.pathname === '/dashboard/analytics';
        }
        return location.pathname.startsWith(item.path);
    });

    const hasSubMenu = currentTopLevel && currentTopLevel.subMenu;

    return (
        <div className="min-h-screen bg-neutral-50 font-sans selection:bg-primary-100 selection:text-primary-600">
            <Sidebar />
            
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300" 
                    onClick={toggleSidebar}
                ></div>
            )}

            <div className={`
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
                flex flex-col min-h-screen
            `}>
                <Topbar />
                
                <main className={`
                    flex-grow p-4 sm:p-6 lg:p-10
                    ${hasSubMenu ? 'pt-52' : 'pt-32'}
                    transition-all duration-300 mt-10
                `}>
                    <HorizontalSubNav />
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
