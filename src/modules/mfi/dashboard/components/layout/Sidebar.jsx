import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SimpleBar from 'simplebar-react';
import { useSidebar } from '../../hooks/useSidebar.jsx';
import { navigation } from '../../config/navigation';

const Sidebar = () => {
    const location = useLocation();
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    const isActive = (path) => {
        if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname === '/dashboard/analytics';
        return location.pathname.startsWith(path);
    };

    return (
        <aside className={`
            fixed inset-y-0 left-0 z-50
            bg-[#0B0F1A] text-slate-400
            transition-all duration-300 ease-in-out
            ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
            border-r border-white/5 flex flex-col
        `}>
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
                        <div className={`px-4 mb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ${!isSidebarOpen && 'text-center opacity-0 h-0 overflow-hidden'}`}>
                            Menu
                        </div>

                        <ul className="space-y-0.5">
                            {navigation.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={item.path}
                                        className={`
                                            flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 group
                                            ${isActive(item.path) 
                                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
                                                : 'hover:bg-white/5 hover:text-white'}
                                            ${!isSidebarOpen && 'justify-center px-0'}
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
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </SimpleBar>

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

