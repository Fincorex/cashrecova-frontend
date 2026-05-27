import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../hooks/useSidebar';
import { useAuth } from '@shared/context/AuthContext';

const Topbar = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    return (
        <header className={`
            fixed top-0 right-0 z-40 h-20 flex items-center px-6 sm:px-10 transition-all duration-300 
            ${isSidebarOpen ? 'lg:left-64' : 'lg:left-20'}
            left-0
            bg-white/60 backdrop-blur-xl border-b border-slate-200/60
        `}>
            <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button 
                        className="p-2.5 text-slate-500 hover:bg-slate-100/80 rounded-xl transition-all active:scale-95 group" 
                        onClick={toggleSidebar}
                        title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                    >
                        <Icon 
                            icon={isSidebarOpen ? "solar:sidebar-minimalistic-outline" : "solar:sidebar-minimalistic-bold"} 
                            width="24" height="24" 
                            className={`transition-transform duration-500 ${!isSidebarOpen ? 'text-primary-500' : ''}`}
                        />
                    </button>
                    
                    <div className="relative hidden md:block group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                            <Icon icon="solar:minimalistic-magnifer-outline" width="20" height="20" />
                        </span>
                        <input 
                            type="text" 
                            className="w-80 lg:w-[400px] bg-slate-50 border border-slate-200/80 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-primary-400/10 focus:border-primary-400 block pl-11 p-3 outline-none transition-all placeholder:text-slate-400 shadow-sm" 
                            placeholder="Search transactions, clients, reports..." 
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-6">
                    {/* Notifications */}
                    <div className="relative">
                        <button 
                            className={`p-3 text-slate-500 hover:bg-slate-100/80 rounded-2xl transition-all relative group ${isNotificationOpen ? 'bg-primary-50 text-primary-500' : ''}`}
                            onClick={() => {
                                setIsNotificationOpen(!isNotificationOpen);
                                setIsUserOpen(false);
                            }}
                        >
                            <Icon icon="solar:bell-bing-outline" width="24" height="24" />
                            <span className="absolute top-2.5 right-2.5 w-4.5 h-4.5 bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                9
                            </span>
                        </button>
                        
                        {isNotificationOpen && (
                            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                                    <h5 className="font-bold text-slate-900">Notifications</h5>
                                    <button className="text-xs font-semibold text-primary-500 hover:text-primary-600">Mark all read</button>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="p-5 hover:bg-slate-50/50 cursor-pointer transition-colors border-b border-slate-50 group">
                                            <div className="flex gap-4">
                                                <div className="w-11 h-11 rounded-2xl bg-primary-100/50 flex items-center justify-center text-primary-500 shrink-0 font-bold text-sm">
                                                    {i === 1 ? 'CS' : i === 2 ? 'JD' : 'MK'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="text-sm font-bold text-slate-900 truncate">System Update</p>
                                                        <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                                                    </div>
                                                    <p className="text-xs text-slate-550 line-clamp-2 leading-relaxed">Your monthly report for April has been generated and is ready for review.</p>
                                                    <p className="text-[10px] text-slate-400 mt-2 font-medium">Just now</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full p-4 text-sm text-center text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                                    View All Notifications
                                </button>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="relative">
                        <button 
                            className={`flex items-center gap-3 p-1.5 pl-1.5 pr-4 hover:bg-slate-100/80 rounded-2xl transition-all border ${isUserOpen ? 'bg-slate-50 border-slate-300' : 'border-transparent'}`}
                            onClick={() => {
                                setIsUserOpen(!isUserOpen);
                                setIsNotificationOpen(false);
                            }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center font-bold text-white shadow-lg shadow-primary-200">
                                {(user?.institutionName || user?.email || 'A').substring(0, 1).toUpperCase()}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                                    {user?.institutionName || 'Admin'}
                                </p>
                                <p className="text-[11px] font-medium text-slate-500">
                                    {user?.email || 'Platform Manager'}
                                </p>
                            </div>
                            <Icon icon="solar:alt-arrow-down-linear" width="16" height="16" className={`text-slate-400 transition-transform duration-300 ${isUserOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isUserOpen && (
                            <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                    <p className="text-sm font-bold text-slate-900">
                                        {user?.institutionName || 'Administrator'}
                                    </p>
                                    <p className="text-xs font-medium text-slate-550 mt-0.5 truncate">
                                        {user?.email || 'admin@cashrecova.com'}
                                    </p>
                                </div>
                                <div className="p-3">
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-650 hover:bg-slate-50 hover:text-primary-500 rounded-2xl transition-all group">
                                        <Icon icon="solar:user-circle-bold-duotone" width="20" height="20" className="text-slate-400 group-hover:text-primary-500" />
                                        <span>My Profile</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-650 hover:bg-slate-50 hover:text-primary-500 rounded-2xl transition-all group">
                                        <Icon icon="solar:settings-bold-duotone" width="20" height="20" className="text-slate-400 group-hover:text-primary-500" />
                                        <span>Settings</span>
                                    </button>
                                    <div className="my-2 border-t border-slate-100"></div>
                                    <button 
                                        onClick={async () => {
                                            await logout();
                                            navigate('/login');
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-all group"
                                    >
                                        <Icon icon="solar:logout-3-bold-duotone" width="20" height="20" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
