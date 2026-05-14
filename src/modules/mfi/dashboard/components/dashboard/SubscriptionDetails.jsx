import React from 'react';
import { Icon } from '@iconify/react';

const SubscriptionDetails = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="bg-primary-500 bg-gradient-to-br from-primary-500 to-indigo-700 p-6 relative overflow-hidden shrink-0">
                <div className="relative z-10 text-center">
                    <p className="text-primary-100/70 text-[10px] uppercase font-bold tracking-widest mb-1">Current Plan</p>
                    <h3 className="text-white text-xl font-extrabold tracking-tight">Standard Plan</h3>
                </div>
                {/* Decorative Icon Background */}
                <Icon
                    icon="solar:crown-star-bold-duotone"
                    className="absolute text-white/10 -right-4 -top-2"
                    style={{ fontSize: '100px', transform: 'rotate(15deg)' }}
                />
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-6">
                    {/* Expiry Date */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                            <Icon icon="solar:calendar-date-bold-duotone" className="text-rose-500" width="22" height="22" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Expiry Date</p>
                            <h5 className="text-sm font-bold text-slate-900">Oct 24, 2026</h5>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100 whitespace-nowrap">
                            320 Days Left
                        </span>
                    </div>

                    {/* License Key */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                            <Icon icon="solar:key-minimalistic-square-3-bold-duotone" className="text-amber-500" width="22" height="22" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">License Key</p>
                            <code className="text-xs font-mono font-bold text-slate-700 truncate block bg-slate-50 px-1 rounded">
                                FCX-8859-2201-9988
                            </code>
                        </div>
                        <button className="p-1.5 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-all" title="Copy Key">
                            <Icon icon="solar:copy-bold-duotone" width="18" height="18" />
                        </button>
                    </div>

                    {/* Transfer Limit */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                            <Icon icon="solar:wallet-money-bold-duotone" className="text-emerald-500" width="22" height="22" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Min Transfer</p>
                            <h5 className="text-sm font-bold text-slate-900">$100.00</h5>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                    <button className="w-full py-3 px-4 rounded-xl bg-primary-500 text-white text-sm font-bold shadow-lg shadow-primary-200 hover:bg-primary-600 hover:shadow-xl transition-all active:scale-[0.98]">
                        Upgrade Subscription
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionDetails;
