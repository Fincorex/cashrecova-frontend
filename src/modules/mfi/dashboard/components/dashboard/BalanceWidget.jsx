import React from 'react';
import { Icon } from '@iconify/react';

const BalanceWidget = ({ title, balance, details, icon, color = 'blue' }) => {
    // Map of color names to Tailwind classes
    const colorMap = {
        blue: 'from-primary-500 to-primary-400 text-white shadow-primary-200',
        emerald: 'from-emerald-600 to-emerald-500 text-white shadow-emerald-200',
        indigo: 'from-primary-700 to-primary-600 text-white shadow-indigo-200',
        amber: 'from-amber-600 to-amber-500 text-white shadow-amber-200',
        slate: 'from-slate-700 to-slate-600 text-white shadow-slate-200',
        rose: 'from-rose-600 to-rose-500 text-white shadow-rose-200',
        cyan: 'from-cyan-600 to-cyan-500 text-white shadow-cyan-200',
        violet: 'from-violet-600 to-violet-500 text-white shadow-violet-200',
    };

    const colorClasses = colorMap[color] || colorMap.blue;

    return (
        <div className="p-6 rounded-[28px] border border-slate-200/50 bg-white hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 group relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br shadow-lg ${colorClasses} group-hover:scale-110 transition-transform duration-500`}>
                        <Icon icon={icon} width="22" height="22" />
                    </div>
                    <p className="text-[11px] uppercase font-bold text-slate-400 tracking-[0.15em] truncate">{title}</p>
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-500 transition-colors tracking-tight">{balance}</h4>
                <p className="text-xs font-medium text-slate-500 leading-relaxed line-clamp-2">{details}</p>
            </div>
            
            {/* Subtle background decoration */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-out -z-0 opacity-50" />
        </div>
    );
};

export default BalanceWidget;
