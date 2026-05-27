/**
 * Alerts & Actions Card (AlertsCard.tsx)
 * 
 * ? Displays real-time critical system notifications (failed disbursements, KYC queues).
 * ? Leverages severity scales (warning, error, info) with HSL tailored backgrounds.
 */

import { Icon } from '@iconify/react';

type Severity = 'warning' | 'error' | 'info';

interface AlertItem {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
  severity: Severity;
}

// ─── Static Notification Seed ───────────────────────────────────────────────────
const alerts: AlertItem[] = [
    {
        icon: 'solar:wallet-money-bold-duotone',
        iconBg: '#FFF7ED',
        iconColor: '#F97316',
        title: 'Low Wallet Balance',
        description: 'Your wallet balance is below ₦500,000.',
        time: '2h ago',
        severity: 'warning',
    },
    {
        icon: 'solar:close-circle-bold-duotone',
        iconBg: '#FFF1F2',
        iconColor: '#F43F5E',
        title: 'Failed Repayments',
        description: '12 repayments failed to process today.',
        time: '4h ago',
        severity: 'error',
    },
    {
        icon: 'solar:shield-user-bold-duotone',
        iconBg: '#F0F9FF',
        iconColor: '#0EA5E9',
        title: 'KYC Pending',
        description: '34 borrowers awaiting KYC verification.',
        time: '6h ago',
        severity: 'info',
    },
    {
        icon: 'solar:transfer-horizontal-bold-duotone',
        iconBg: '#FFF1F2',
        iconColor: '#F43F5E',
        title: 'Disbursements Failed',
        description: '3 disbursements could not be completed.',
        time: '8h ago',
        severity: 'error',
    },
];

// Mapping severity attributes to corresponding Tailwind color classes
const severityDot: Record<Severity, string> = {
    warning: 'bg-orange-400',
    error: 'bg-rose-500',
    info: 'bg-sky-400',
};

const AlertsCard = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">Alerts &amp; Notifications</h3>
                <span className="text-xs font-semibold bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">
                    {alerts.length} New
                </span>
            </div>
            <div className="flex flex-col divide-y divide-slate-50 flex-1">
                {alerts.map((alert, i) => (
                    <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50/60 transition-colors duration-200">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: alert.iconBg }}
                        >
                            <Icon icon={alert.icon} width="18" height="18" style={{ color: alert.iconColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${severityDot[alert.severity]}`} />
                                <p className="text-xs font-bold text-slate-800 truncate">{alert.title}</p>
                            </div>
                            <p className="text-[11px] text-slate-550 leading-snug truncate">{alert.description}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0 mt-0.5">{alert.time}</span>
                    </div>
                ))}
            </div>
            <div className="px-5 py-3 border-t border-slate-100">
                <button className="w-full text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors duration-200 text-center">
                    View all alerts →
                </button>
            </div>
        </div>
    );
};

export default AlertsCard;
