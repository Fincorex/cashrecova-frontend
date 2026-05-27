import { Link, useLocation } from 'react-router-dom';
import { navigation, NavItem } from '../../config/navigation';
import { useSidebar } from '../../hooks/useSidebar';

// Define extended NavItem for local submenus if needed
interface ExtendedNavItem extends NavItem {
  subMenu?: { label: string; path: string }[];
}

const HorizontalSubNav = () => {
    const location = useLocation();
    const { isSidebarOpen } = useSidebar();

    // Find the current top-level item based on the pathname
    const currentTopLevel = (navigation as ExtendedNavItem[]).find(item => {
        if (item.path === '/dashboard') {
            return location.pathname === '/dashboard' || location.pathname === '/dashboard/analytics';
        }
        return location.pathname.startsWith(item.path);
    });

    if (!currentTopLevel || !currentTopLevel.subMenu) {
        return null;
    }

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className={`
            fixed top-20 right-0 z-30
            transition-all duration-300 ease-in-out
            ${isSidebarOpen ? 'lg:left-64' : 'lg:left-20'}
            left-0
            bg-white/60 backdrop-blur-xl border-b border-slate-200/60 shadow-sm overflow-x-auto no-scrollbar
        `}>
            <div className="max-w-[1600px] mx-auto h-14 px-6 sm:px-10">
                <ul className="flex items-center h-full gap-2">
                    {currentTopLevel.subMenu.map((subItem, index) => (
                        <li key={index} className="h-full flex items-center">
                            <Link
                                to={subItem.path}
                                className={`
                                    relative flex items-center justify-center px-5 h-10 rounded-xl text-[13px] font-bold transition-all duration-200 whitespace-nowrap
                                    ${isActive(subItem.path) 
                                        ? 'text-primary-500 bg-primary-50' 
                                        : 'text-slate-500 hover:text-primary-500 hover:bg-slate-50/80'}
                                `}
                            >
                                <span>{subItem.label}</span>
                                {isActive(subItem.path) && (
                                    <div className="absolute -bottom-[1px] inset-x-5 h-0.5 bg-primary-500 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.6)]" />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HorizontalSubNav;
