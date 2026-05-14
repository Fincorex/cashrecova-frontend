import React from 'react';

import { Icon } from '@iconify/react';

const UpgradeCard = () => {
    return (
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary-500 via-primary-600 to-indigo-900 p-4 shadow-xl shadow-blue-900/20 group">
            {/* Decorative backgrounds */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-300/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/10">
                        <Icon icon="solar:star-bold-duotone" width="14" height="14" className="text-amber-400" />
                        Premium Feature
                    </div>
                    <h3 className="text-2xl  font-extrabold text-white tracking-tight leading-tight mb-4">
                        Upgrade your plan for <br className="hidden sm:block" />a Greater experience
                    </h3>
                    <p className="text-primary-100 text-sm font-medium mb-8 max-w-lg opacity-80">
                        Unlock powerful sales insights, multi-currency settlement, and high-performance API endpoints to boost your business growth.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a href="#" className="w-full sm:w-auto px-4 py-2 bg-white text-primary-600 rounded-lg font-bold text-sm hover:bg-primary-50 transition-all  active:scale-95 flex items-center justify-center gap-2">
                            <span>Upgrade Now</span>
                            <Icon icon="solar:round-alt-arrow-right-bold" width="18" height="18" />
                        </a>
                        <a href="#" className="w-full sm:w-auto px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg font-bold text-sm hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2">
                            <span>View Plans</span>
                        </a>
                    </div>
                </div>

                <div className="hidden lg:flex shrink-0 animate-bounce-slow">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary-300/20 blur-2xl rounded-full"></div>
                        <Icon icon="solar:rocket-bold-duotone" width="180" height="180" className="text-white drop-shadow-2xl opacity-90" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradeCard;
