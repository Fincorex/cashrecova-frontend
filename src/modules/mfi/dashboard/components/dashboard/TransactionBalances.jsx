import React from 'react';
import BalanceWidget from './BalanceWidget';
import { Icon } from '@iconify/react';

const TransactionBalances = () => {
    return (
        <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm h-full flex flex-col overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500">
                        <Icon icon="solar:wallet-2-bold-duotone" width="22" height="22" />
                    </div>
                    <div>
                        <h5 className="text-lg font-bold text-slate-900">Liquidity & Balances</h5>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">Real-time settlement account overview</p>
                    </div>
                </div>
                <button className="text-xs font-bold text-primary-500 hover:bg-primary-50 px-4 py-2.5 rounded-xl transition-all border border-primary-100/50">
                    Manage Accounts
                </button>
            </div>
            
            <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    <BalanceWidget
                        title="Sms Balance"
                        balance="4,500 Units"
                        details="Remaining SMS credits for alerts."
                        icon="solar:chat-round-unread-bold-duotone"
                        color="blue"
                    />
                    <BalanceWidget
                        title="Verification Balance"
                        balance="$1,250.00"
                        details="Funds reserved for verification APIs."
                        icon="solar:verified-check-bold-duotone"
                        color="emerald"
                    />
                    <BalanceWidget
                        title="Inward Transfer"
                        balance="$45,200.50"
                        details="Total received from external accounts."
                        icon="solar:arrow-left-down-bold-duotone"
                        color="indigo"
                    />
                    <BalanceWidget
                        title="Outward Transfer"
                        balance="$12,800.00"
                        details="Total sent to external bank accounts."
                        icon="solar:arrow-right-up-bold-duotone"
                        color="amber"
                    />
                    <BalanceWidget
                        title="General Balance"
                        balance="$28,950.00"
                        details="Main operational account balance."
                        icon="solar:wallet-bold-duotone"
                        color="slate"
                    />
                    <BalanceWidget
                        title="Bills Balance"
                        balance="$3,400.00"
                        details="Reserved for recurring bill payments."
                        icon="solar:bill-list-bold-duotone"
                        color="rose"
                    />
                    <BalanceWidget
                        title="Card Balance"
                        balance="$8,750.00"
                        details="Aggregate balance on issued cards."
                        icon="solar:card-bold-duotone"
                        color="cyan"
                    />
                    <BalanceWidget
                        title="Ussd Balance"
                        balance="$560.00"
                        details="Funds for USSD service charges."
                        icon="solar:smartphone-bold-duotone"
                        color="violet"
                    />
                </div>
            </div>
        </div>
    );
};

export default TransactionBalances;
