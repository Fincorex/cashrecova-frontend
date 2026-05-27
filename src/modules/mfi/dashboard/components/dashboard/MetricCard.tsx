import { Icon } from '@iconify/react';

export interface MetricCardProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  subLabel: string;
  change: string;
  changeType: 'up' | 'down';
}

const MetricCard = ({ icon, iconBg, iconColor, label, value, subLabel, change, changeType }: MetricCardProps) => {
    const isPositive = changeType === 'up';
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:shadow-primary-500/5 transition-all duration-300 group flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: iconBg }}
                >
                    <Icon icon={icon} width="22" height="22" style={{ color: iconColor }} />
                </div>
                <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg ${
                        isPositive
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-rose-50 text-rose-600'
                    }`}
                >
                    <Icon
                        icon={isPositive ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
                        width="12"
                        height="12"
                    />
                    {change}
                </span>
            </div>

            <div>
                <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
                <p className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">{value}</p>
            </div>

            <p className="text-xs text-slate-400 font-medium">{subLabel}</p>
        </div>
    );
};

export default MetricCard;
