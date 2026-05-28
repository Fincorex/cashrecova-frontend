import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SimpleBar from 'simplebar-react';
import { useSidebar } from '../../hooks/useSidebar';
import { navigation } from '../../config/navigation';

const Sidebar = () => {
    const location = useLocation();
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const [openDropdowns, setOpenDropdowns] = useState<string[]>(['loans']); // loans open by default

    const isActive = (path: string) => {
        if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname === '/dashboard/analytics';
        return location.pathname.startsWith(path);
    };

    const toggleDropdown = (id: string) => {
        setOpenDropdowns(prev =>
            prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
        );
    };

    return (
        <aside className={`
            fixed inset-y-0 left-0 z-50
            bg-[#0B0F1A] text-slate-400
            transition-all duration-300 ease-in-out
            ${isSidebarOpen ? 'w-50 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
            border-r border-white/5 flex flex-col
        `}>
            {/* Logo */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0 group-hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20 group-hover:scale-105">
                        C
                    </div>
                    {isSidebarOpen && (
                        <span className="font-bold text-white text-xl tracking-tight animate-in fade-in duration-500">
                            Cashrecova<span className="text-primary-500">.</span>
                        </span>
                    )}
                </Link>
                <button
                    className="lg:hidden text-slate-500 hover:text-white transition-colors"
                    onClick={toggleSidebar}
                >
                    <Icon icon="solar:close-circle-bold-duotone" width="24" height="24" />
                </button>
            </div>

            <SimpleBar className="flex-1 px-3 py-4 custom-scrollbar" autoHide={false}>
                <nav className="space-y-3">
                    <div>
                        <div className={`px-4 mb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ${!isSidebarOpen ? 'text-center opacity-0 h-0 overflow-hidden' : ''}`}>
                            Menu
                        </div>

                        <ul className="space-y-0.5">
                            {navigation.map((item) => {
                                const hasChildren = item.children && item.children.length > 0;
                                const isDropdownOpen = openDropdowns.includes(item.id);
                                const isParentActive = isActive(item.path);

                                return (
                                    <li key={item.id}>
                                        {hasChildren ? (
                                            <>
                                                {/* Parent button — toggles dropdown */}
                                                <button
                                                    onClick={() => isSidebarOpen && toggleDropdown(item.id)}
                                                    className={`
                                                        w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 group
                                                        ${isParentActive
                                                            ? 'bg-primary-500/10 text-primary-400'
                                                            : 'hover:bg-white/5 hover:text-white'}
                                                        ${!isSidebarOpen ? 'justify-center px-0' : ''}
                                                    `}
                                                    title={!isSidebarOpen ? item.label : ''}
                                                >
                                                    <Icon
                                                        icon={item.icon}
                                                        width="20" height="20"
                                                        className={`shrink-0 transition-transform duration-300 ${isParentActive ? 'scale-110 text-primary-400' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}
                                                    />
                                                    {isSidebarOpen && (
                                                        <>
                                                            <span className="flex-1 text-left text-[12.5px] font-bold whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                                                                {item.label}
                                                            </span>
                                                            <Icon
                                                                icon="solar:alt-arrow-down-bold"
                                                                width="14" height="14"
                                                                className={`transition-transform duration-200 opacity-50 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                                            />
                                                        </>
                                                    )}
                                                </button>

                                                {/* Children dropdown */}
                                                {isSidebarOpen && isDropdownOpen && (
                                                    <ul className="mt-0.5 ml-4 pl-4 border-l border-white/10 space-y-0.5">
                                                        {item.children!.map(child => (
                                                            <li key={child.id}>
                                                                <Link
                                                                    to={child.path}
                                                                    className={`
                                                                        flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150
                                                                        ${location.pathname === child.path
                                                                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                                                            : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                                                                    `}
                                                                >
                                                                    <span className="w-1 h-1 rounded-full bg-current opacity-60 shrink-0" />
                                                                    {child.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </>
                                        ) : (
                                            /* Regular nav item — no children */
                                            <Link
                                                to={item.path}
                                                className={`
                                                    flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 group
                                                    ${isActive(item.path)
                                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                                        : 'hover:bg-white/5 hover:text-white'}
                                                    ${!isSidebarOpen ? 'justify-center px-0' : ''}
                                                `}
                                                title={!isSidebarOpen ? item.label : ''}
                                            >
                                                <Icon
                                                    icon={item.icon}
                                                    width="20" height="20"
                                                    className={`shrink-0 transition-transform duration-300 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`}
                                                />
                                                {isSidebarOpen && (
                                                    <span className="text-[12.5px] font-bold whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                                                        {item.label}
                                                    </span>
                                                )}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
            </SimpleBar>

            {/* User footer */}
            <div className="p-4 border-t border-white/5 bg-black/20">
                <div className={`flex items-center gap-3 p-2 rounded-2xl transition-all ${isSidebarOpen ? 'bg-white/5 border border-white/5' : 'justify-center'}`}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-700 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                        AD
                    </div>
                    {isSidebarOpen && (
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate leading-none mb-1">Alex J.</p>
                            <p className="text-[10px] font-medium text-slate-500 truncate uppercase tracking-wider">Super Admin</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;