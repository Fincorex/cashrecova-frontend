import { useState } from 'react';
import { Icon } from '@iconify/react';
import useLoans from '../hooks/useLoans';
import type { Loan, LoanStatus, RiskLevel } from '../../../../shared/services/loanService';
import { useNavigate } from "react-router-dom";



type TabFilter = 'All Loans' | 'Active' | 'Disbursed' | 'Repaid' | 'Late' | 'Defaulted';

const TABS: TabFilter[] = ['All Loans', 'Active', 'Disbursed', 'Repaid', 'Late', 'Defaulted'];

const STATS = [
    { label: 'Total Loans', value: '1,240', change: '8.4% vs last month', positive: true, icon: 'solar:hand-money-bold-duotone', bg: 'bg-violet-50', color: 'text-violet-500' },
    { label: 'Total Disbursed', value: '₦245,600,000', change: '15.6% vs last month', positive: true, icon: 'solar:card-send-bold-duotone', bg: 'bg-blue-50', color: 'text-blue-500' },
    { label: 'Total Outstanding', value: '₦142,350,000', change: '10.2% vs last month', positive: true, icon: 'solar:wallet-bold-duotone', bg: 'bg-amber-50', color: 'text-amber-500' },
    { label: 'Repayment Rate', value: '92.4%', change: '4.7% vs last month', positive: true, icon: 'solar:pie-chart-bold-duotone', bg: 'bg-emerald-50', color: 'text-emerald-500' },
    { label: 'At Risk Loans', value: '86', change: '6.1% vs last month', positive: false, icon: 'solar:shield-warning-bold-duotone', bg: 'bg-orange-50', color: 'text-orange-500' },
    { label: 'Defaulted', value: '64', change: '3.3% vs last month', positive: false, icon: 'solar:danger-bold-duotone', bg: 'bg-rose-50', color: 'text-rose-500' },
];



const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;

const AVATAR_COLORS = [
    'bg-violet-100 text-violet-600',
    'bg-blue-100 text-blue-600',
    'bg-emerald-100 text-emerald-600',
    'bg-amber-100 text-amber-600',
    'bg-rose-100 text-rose-600',
];
const avatarColor = (initials: string) => AVATAR_COLORS[initials.charCodeAt(0) % AVATAR_COLORS.length];

const StatusBadge = ({ status }: { status: LoanStatus }) => {
    const map: Record<LoanStatus, string> = {
        Active: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        Disbursed: 'bg-blue-50 text-blue-600 border border-blue-100',
        Late: 'bg-orange-50 text-orange-600 border border-orange-100',
        Repaid: 'bg-slate-100 text-slate-500 border border-slate-200',
        Defaulted: 'bg-rose-50 text-rose-600 border border-rose-100',
    };
    return <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status]}`}>{status}</span>;
};

const RiskBadge = ({ level }: { level: RiskLevel }) => {
    const map: Record<RiskLevel, string> = {
        Low: 'bg-emerald-50 text-emerald-600',
        Medium: 'bg-amber-50 text-amber-600',
        High: 'bg-rose-50 text-rose-600',
    };
    return <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${map[level]}`}>{level}</span>;
};



const DetailPanel = ({ loan, onClose }: { loan: Loan; onClose: () => void }) => {
    const { repaymentSummary: rs } = loan;
    const paidPct = rs.total > 0 ? Math.round((rs.paid / rs.total) * 100) : 0;
    const outPct = rs.total > 0 ? Math.round((rs.outstanding / rs.total) * 100) : 0;

    const r = 36, circ = 2 * Math.PI * r;
    const paidDash = (paidPct / 100) * circ;
    const outDash = (outPct / 100) * circ;
    const offset0 = -circ * 0.25;
    const offset1 = offset0 - paidDash;

    return (
        <div className="w-[300px] shrink-0 bg-white border-l border-slate-100 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">Loan Details</span>
                    <StatusBadge status={loan.status} />
                </div>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
                    <Icon icon="solar:close-circle-bold" className="w-5 h-5 text-slate-400" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${avatarColor(loan.borrower.initials)}`}>
                        {loan.borrower.initials}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{loan.borrower.name}</p>
                        <p className="text-xs text-slate-400 truncate">{loan.borrower.email}</p>
                    </div>
                    <button className="ml-auto shrink-0 text-[10px] font-semibold text-violet-600 bg-violet-50 hover:bg-violet-100 px-2 py-1 rounded-lg transition-colors">
                        View Borrower Profile
                    </button>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 space-y-1.5">
                    {([
                        ['Loan ID', loan.id],
                        ['Loan Type', loan.loanType],
                        ['Amount', fmt(loan.amount)],
                        ['Interest Rate', loan.interestRate],
                        ['Tenure', loan.tenure],
                        ['Disbursed On', loan.disbursedOn],
                        ['Maturity Date', loan.maturityDate],
                        ['Loan Purpose', loan.loanPurpose],
                    ] as [string, string][]).map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                            <span className="text-xs text-slate-500">{label}</span>
                            <span className="text-xs font-semibold text-slate-700 text-right">{value}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500">Risk Score</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-700">{loan.riskScore}</span>
                            <RiskBadge level={loan.riskLevel} />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-bold text-slate-700 mb-2">Repayment Summary</p>
                    <div className="bg-slate-50 rounded-xl p-3">
                        <div className="flex justify-between mb-3">
                            <span className="text-xs text-slate-500">Total Repayable</span>
                            <span className="text-xs font-bold text-slate-800">{fmt(rs.total)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0">
                                <circle cx="40" cy="40" r={r} fill="none" stroke="#F1F5F9" strokeWidth="9" />
                                <circle cx="40" cy="40" r={r} fill="none" stroke="#7168EE" strokeWidth="9"
                                    strokeDasharray={`${outDash} ${circ - outDash}`}
                                    strokeDashoffset={offset1} strokeLinecap="round" />
                                <circle cx="40" cy="40" r={r} fill="none" stroke="#22C55E" strokeWidth="9"
                                    strokeDasharray={`${paidDash} ${circ - paidDash}`}
                                    strokeDashoffset={offset0} strokeLinecap="round" />
                            </svg>
                            <div className="space-y-1.5 text-[11px]">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                    <span className="text-slate-500">Paid</span>
                                    <span className="font-bold text-slate-700 ml-1">{fmt(rs.paid)} ({paidPct}%)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                                    <span className="text-slate-500">Outstanding</span>
                                    <span className="font-bold text-slate-700 ml-1">{fmt(rs.outstanding)} ({outPct}%)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                                    <span className="text-slate-500">Overdue</span>
                                    <span className="font-bold text-slate-700 ml-1">{fmt(rs.overdue)} (0%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs font-bold text-slate-700 mb-2">Next Repayment</p>
                    <div className="flex items-center gap-2 mb-1">
                        <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-700">{loan.nextRepayment.date}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${loan.nextRepayment.isOverdue ? 'bg-rose-50 text-rose-500' : 'bg-violet-50 text-violet-500'}`}>
                            {loan.nextRepayment.daysLabel}
                        </span>
                    </div>
                    {loan.nextRepaymentAmount > 0 && (
                        <p className="text-xs text-slate-500 mb-2">Amount: <span className="font-bold text-slate-700">{fmt(loan.nextRepaymentAmount)}</span></p>
                    )}
                    <button className="w-full text-center text-[10px] font-semibold text-violet-600 bg-violet-50 hover:bg-violet-100 py-1.5 rounded-lg transition-colors">
                        View Repayment Schedule
                    </button>
                </div>
            </div>

            <div className="px-4 py-3 border-t border-slate-100 flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    <Icon icon="solar:card-send-bold-duotone" className="w-3.5 h-3.5" />Disburse
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    <Icon icon="solar:pen-bold-duotone" className="w-3.5 h-3.5" />Edit Loan
                </button>
                <button className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors">
                    More Actions <Icon icon="solar:alt-arrow-down-bold" className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};



const Loans = () => {
    const [activeTab, setActiveTab] = useState<TabFilter>('All Loans');
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [searchInput, setSearchInput] = useState('');

    const { loans, loading, error, total, page, lastPage, setPage, setFilters } = useLoans();
    const navigate = useNavigate();
    const handleTabChange = (tab: TabFilter) => {
        setActiveTab(tab);
        setFilters({ status: tab === 'All Loans' ? 'All' : tab });
    };
    const handleSearch = (value: string) => {
        setSearchInput(value);
        setFilters({ search: value });
    };

    return (
        <div className="flex h-full min-h-screen bg-slate-50">
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">Loans</h1>
                            <p className="text-sm text-slate-500 mt-0.5">Manage, review and monitor all loans across your organization.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                                <Icon icon="solar:upload-bold-duotone" className="w-4 h-4" />Import Loans
                            </button>
                            <button
                                onClick={() => navigate("/dashboard/loans/create")}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors shadow-sm"
                            >
                                <Icon icon="solar:add-circle-bold" className="w-4 h-4" />
                                Create Loan
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                        {STATS.map(s => (
                            <div key={s.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
                                <div className={`${s.bg} rounded-xl p-2.5 shrink-0`}>
                                    <Icon icon={s.icon} className={`w-5 h-5 ${s.color}`} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-slate-500 font-medium truncate">{s.label}</p>
                                    <p className="text-base font-bold text-slate-800 truncate">{s.value}</p>
                                    <div className="flex items-center gap-0.5">
                                        <Icon icon={s.positive ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'} className={`w-3 h-3 ${s.positive ? 'text-emerald-500' : 'text-rose-500'}`} />
                                        <span className={`text-[9px] font-semibold ${s.positive ? 'text-emerald-500' : 'text-rose-500'}`}>{s.change}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                        {/* Tabs */}
                        <div className="flex items-center justify-between px-5 border-b border-slate-100">
                            <div className="flex overflow-x-auto">
                                {TABS.map(tab => (
                                    <button key={tab} onClick={() => handleTabChange(tab)}
                                        className={`px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${activeTab === tab ? 'text-violet-600 border-violet-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}>
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 shrink-0 pl-4">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                    <Icon icon="solar:export-bold-duotone" className="w-3.5 h-3.5" />Export
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                    <Icon icon="solar:filter-bold-duotone" className="w-3.5 h-3.5" />Filters
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 flex-wrap border-b border-slate-50">
                            <div className="relative flex-1 min-w-[200px]">
                                <Icon icon="solar:magnifer-bold" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" placeholder="Search by borrower name, loan ID..."
                                    value={searchInput} onChange={e => handleSearch(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200 bg-slate-50 placeholder:text-slate-400" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-2.5 text-[9px] font-bold text-slate-400 bg-white px-1">Status</label>
                                <select onChange={e => setFilters({ status: e.target.value })}
                                    className="pl-3 pr-7 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-200">
                                    <option value="All">All</option>
                                    <option>Active</option><option>Disbursed</option><option>Late</option><option>Repaid</option><option>Defaulted</option>
                                </select>
                                <Icon icon="solar:alt-arrow-down-bold" className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-2.5 text-[9px] font-bold text-slate-400 bg-white px-1">Loan Type</label>
                                <select onChange={e => setFilters({ loanType: e.target.value })}
                                    className="pl-3 pr-7 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-600 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-200">
                                    <option value="All">All</option><option>Personal Loan</option><option>Business Loan</option>
                                </select>
                                <Icon icon="solar:alt-arrow-down-bold" className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                            </div>
                            <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                <Icon icon="solar:calendar-bold-duotone" className="w-4 h-4 text-slate-400" />May 1 – May 31, 2025
                            </button>
                            <button className="flex items-center gap-1.5 px-2 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                                <Icon icon="solar:tuning-bold-duotone" className="w-4 h-4" />More Filters
                            </button>
                        </div>
                        <div className="overflow-x-auto px-5 pb-5">
                            {loading && (
                                <div className="flex items-center justify-center py-16 gap-3">
                                    <Icon icon="solar:refresh-bold-duotone" className="w-5 h-5 text-violet-500 animate-spin" />
                                    <span className="text-sm text-slate-500">Loading loans...</span>
                                </div>
                            )}
                            {!loading && error && (
                                <div className="flex items-center justify-center py-16 gap-3">
                                    <Icon icon="solar:danger-bold-duotone" className="w-5 h-5 text-rose-500" />
                                    <span className="text-sm text-rose-500">{error}</span>
                                </div>
                            )}

                            {!loading && !error && loans.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 gap-2">
                                    <Icon icon="solar:hand-money-bold-duotone" className="w-10 h-10 text-slate-300" />
                                    <p className="text-sm font-semibold text-slate-500">No loans found</p>
                                    <p className="text-xs text-slate-400">Try adjusting your filters</p>
                                </div>
                            )}
                            {!loading && !error && loans.length > 0 && (
                                <table className="w-full text-sm mt-3">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            <th className="w-8 pb-3 pr-2"><input type="checkbox" className="rounded border-slate-300 accent-violet-600" /></th>
                                            {['Loan ID', 'Borrower', 'Loan Type', 'Amount', 'Status', 'Next Repayment', 'Risk Score', 'Action'].map(h => (
                                                <th key={h} className="text-left pb-3 pr-4 text-xs font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {loans.map(loan => {
                                            const ac = avatarColor(loan.borrower.initials);
                                            const isSelected = selectedLoan?.id === loan.id;
                                            return (
                                                <tr key={loan.id} onClick={() => setSelectedLoan(isSelected ? null : loan)}
                                                    className={`cursor-pointer transition-colors hover:bg-slate-50 ${isSelected ? 'bg-violet-50/50' : ''}`}>
                                                    <td className="py-3.5 pr-2">
                                                        <input type="checkbox" checked={isSelected} onChange={() => { }} onClick={e => e.stopPropagation()} className="rounded border-slate-300 accent-violet-600" />
                                                    </td>
                                                    <td className="py-3.5 pr-4 text-xs font-semibold text-slate-600 whitespace-nowrap">{loan.id}</td>
                                                    <td className="py-3.5 pr-4">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${ac}`}>{loan.borrower.initials}</div>
                                                            <div>
                                                                <p className="text-xs font-semibold text-slate-800 whitespace-nowrap">{loan.borrower.name}</p>
                                                                <p className="text-[10px] text-slate-400">{loan.borrower.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3.5 pr-4 text-xs text-slate-600 whitespace-nowrap">{loan.loanType}</td>
                                                    <td className="py-3.5 pr-4 text-xs font-bold text-slate-800 whitespace-nowrap">{fmt(loan.amount)}</td>
                                                    <td className="py-3.5 pr-4"><StatusBadge status={loan.status} /></td>
                                                    <td className="py-3.5 pr-4">
                                                        <p className="text-xs font-semibold text-slate-700 whitespace-nowrap">{loan.nextRepayment.date}</p>
                                                        <p className={`text-[10px] font-semibold ${loan.nextRepayment.isOverdue ? 'text-rose-500' : 'text-slate-400'}`}>{loan.nextRepayment.daysLabel}</p>
                                                    </td>
                                                    <td className="py-3.5 pr-4">
                                                        <p className="text-sm font-semibold text-slate-700">{loan.riskScore}</p>
                                                        <RiskBadge level={loan.riskLevel} />
                                                    </td>
                                                    <td className="py-3.5">
                                                        <div className="flex items-center gap-1">
                                                            <button onClick={e => { e.stopPropagation(); setSelectedLoan(isSelected ? null : loan); }}
                                                                className="px-3 py-1.5 text-xs font-semibold text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors">View</button>
                                                            <button onClick={e => e.stopPropagation()} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                                                <Icon icon="solar:menu-dots-bold" className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                            {!loading && loans.length > 0 && (
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                                    <span className="text-xs text-slate-500">Showing {loans.length} of {total} loans</span>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => setPage(page - 1)} disabled={page === 1}
                                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors disabled:opacity-40">
                                            <Icon icon="solar:alt-arrow-left-bold" className="w-4 h-4" />
                                        </button>
                                        {Array.from({ length: Math.min(lastPage, 5) }, (_, i) => i + 1).map(p => (
                                            <button key={p} onClick={() => setPage(p)}
                                                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${p === page ? 'bg-violet-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>{p}</button>
                                        ))}
                                        {lastPage > 5 && <span className="text-slate-400 text-xs px-1">...</span>}
                                        {lastPage > 5 && (
                                            <button onClick={() => setPage(lastPage)}
                                                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${page === lastPage ? 'bg-violet-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>{lastPage}</button>
                                        )}
                                        <button onClick={() => setPage(page + 1)} disabled={page === lastPage}
                                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors disabled:opacity-40">
                                            <Icon icon="solar:alt-arrow-right-bold" className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {selectedLoan && <DetailPanel loan={selectedLoan} onClose={() => setSelectedLoan(null)} />}
        </div>
    );
};

export default Loans;