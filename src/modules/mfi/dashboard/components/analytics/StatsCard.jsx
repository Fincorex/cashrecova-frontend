import React from 'react';
import { Icon } from '@iconify/react';

const StatsCard = ({ icon, title, value, change, changeType }) => {
    return (
        <div className="bg-white rounded-[32px] border border-slate-200/60 p-8 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 group">
            <div className="flex items-center gap-4 mb-6">
                <div 
                    dangerouslySetInnerHTML={{ __html: icon }} 
                    className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-500 shrink-0 [&>svg]:w-7 [&>svg]:h-7 transition-transform group-hover:scale-110 duration-500" 
                />
                <p className="text-[13px] font-bold text-slate-500 uppercase tracking-[0.15em] truncate">{title}</p>
            </div>

            <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
                <div className={`flex items-center gap-1 text-[13px] font-bold px-2 py-0.5 rounded-lg ${
                    changeType === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                    <Icon icon={changeType === 'success' ? "solar:round-alt-arrow-up-bold-duotone" : "solar:round-alt-arrow-down-bold-duotone"} width="16" height="16" />
                    <span>{change}%</span>
                </div>
            </div>

            <p className="text-sm text-slate-400 mb-8 font-medium">Compared to last month</p>

            <button className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-bold text-slate-700 hover:bg-white hover:border-primary-200 hover:text-primary-500 hover:shadow-sm transition-all duration-300 group/btn">
                <span>View Insights</span>
                <Icon icon="solar:round-alt-arrow-right-bold-duotone" width="20" height="20" className="text-slate-400 group-hover/btn:text-primary-500 group-hover/btn:translate-x-1 transition-all" />
            </button>
        </div>
    );
};

export default StatsCard;
