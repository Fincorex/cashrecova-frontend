import { Icon } from '@iconify/react';

interface ActionItem {
  icon: string;
  label: string;
  color: string;
  iconColor: string;
}

const actions: ActionItem[] = [
    { icon: 'solar:document-add-bold-duotone', label: 'Create Loan', color: '#EEF2FF', iconColor: '#7168EE' },
    { icon: 'solar:transfer-horizontal-bold-duotone', label: 'Disburse Loan', color: '#F0FDF4', iconColor: '#22C55E' },
    { icon: 'solar:wallet-add-bold-duotone', label: 'Add Funds', color: '#FFF7ED', iconColor: '#F97316' },
    { icon: 'solar:buildings-bold-duotone', label: 'Add Organization', color: '#F0F9FF', iconColor: '#0EA5E9' },
    { icon: 'solar:chart-2-bold-duotone', label: 'View Reports', color: '#FDF4FF', iconColor: '#A855F7' },
    { icon: 'solar:key-bold-duotone', label: 'API Keys', color: '#FFF1F2', iconColor: '#F43F5E' },
];

const QuickActionsCard = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1">
                {actions.map((action, i) => (
                    <button
                        key={i}
                        className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200 group cursor-pointer"
                        style={{ backgroundColor: action.color + '80' }}
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                            style={{ backgroundColor: action.color }}
                        >
                            <Icon icon={action.icon} width="20" height="20" style={{ color: action.iconColor }} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActionsCard;
