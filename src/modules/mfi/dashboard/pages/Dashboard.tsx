/**
 * Executive MFI Dashboard Hub (Dashboard.tsx)
 * 
 * ? Organizes visual cards, loan charts, pending transaction tables, and compliance action items.
 * ? Communicates with the `useSidebar` context to dynamically adapt the metrics grid sizes,
 * ? preventing element squashing when the navigation drawer is expanded or collapsed.
 */

import { Icon } from '@iconify/react';
import { useSidebar } from '../hooks/useSidebar';

// Dashboard Components
import MetricCard from '../components/dashboard/MetricCard';
import LoanDisbursementsChart from '../components/dashboard/LoanDisbursementsChart';
import RepaymentSummaryChart from '../components/dashboard/RepaymentSummaryChart';
import AlertsCard from '../components/dashboard/AlertsCard';
import LoansByStatusChart from '../components/dashboard/LoansByStatusChart';
import TopLendersCard from '../components/dashboard/TopLendersCard';
import QuickActionsCard from '../components/dashboard/QuickActionsCard';
import RecentTransactionsTable from '../components/dashboard/RecentTransactionsTable';
import RevenueOverviewChart from '../components/dashboard/RevenueOverviewChart';

interface MetricData {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  subLabel: string;
  change: string;
  changeType: 'up' | 'down';
}

// ─── Static Metric Seed Data ────────────────────────────────────────────────────────
// Serves as representation structure for cashrecova metrics dashboards
const metrics: MetricData[] = [
    {
        icon: 'solar:wallet-money-bold-duotone',
        iconBg: '#EEF2FF',
        iconColor: '#7168EE',
        label: 'Wallet Balance',
        value: '₦12,450,000.00',
        subLabel: 'This Month',
        change: '+8.3%',
        changeType: 'up',
    },
    {
        icon: 'solar:documents-bold-duotone',
        iconBg: '#F0F9FF',
        iconColor: '#0EA5E9',
        label: 'Total Loans',
        value: '1,240',
        subLabel: 'Active portfolio',
        change: '+5.2%',
        changeType: 'up',
    },
    {
        icon: 'solar:transfer-horizontal-bold-duotone',
        iconBg: '#F0FDF4',
        iconColor: '#22C55E',
        label: 'Total Disbursed',
        value: '₦245,600,000',
        subLabel: 'Cumulative',
        change: '+12.1%',
        changeType: 'up',
    },
    {
        icon: 'solar:graph-up-bold-duotone',
        iconBg: '#FDF4FF',
        iconColor: '#A855F7',
        label: 'Repayment Rate',
        value: '92.4%',
        subLabel: 'This Month',
        change: '+1.8%',
        changeType: 'up',
    },
    {
        icon: 'solar:danger-triangle-bold-duotone',
        iconBg: '#FFF7ED',
        iconColor: '#F97316',
        label: 'At Risk Loans',
        value: '86',
        subLabel: 'Overdue > 30 days',
        change: '+4.7%',
        changeType: 'down',
    },
    {
        icon: 'solar:money-bag-bold-duotone',
        iconBg: '#FFF1F2',
        iconColor: '#F43F5E',
        label: 'Revenue (Fees)',
        value: '₦8,650,000',
        subLabel: 'This Month',
        change: '+9.4%',
        changeType: 'up',
    },
];

const Dashboard = () => {
    const { isSidebarOpen } = useSidebar();

    return (
        <div className="space-y-6 pb-8">
            {/* ── Page Header Action Blocks ──────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-sm text-slate-500 mt-0.5 font-medium">
                        Welcome back! Here's what's happening with your platform.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
                        <Icon icon="solar:calendar-bold-duotone" width="14" height="14" className="text-primary-500" />
                        May 14, 2025
                    </span>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-white bg-primary-500 hover:bg-primary-600 px-3 py-1.5 rounded-xl shadow-sm shadow-primary-500/25 transition-colors duration-200">
                        <Icon icon="solar:refresh-bold" width="13" height="13" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* 
              * ── Metrics Grid (6 Responsive Cards) ─────────────────────────────────── 
              * 
              * ? Adaptive grid configurations check sidebar open parameters.
              * ? Alters the grid sizes dynamically to preserve visually balanced density.
              */}
            <div className={`grid gap-4 transition-all duration-300 ${
                isSidebarOpen 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3'
            }`}>
                {metrics.map((m, i) => {
                    // Prevent wrapping mismatches in expanded layouts by expanding lower index cards
                    const isLastTwo = i >= 4;
                    const spanClass = isSidebarOpen && isLastTwo 
                        ? 'sm:col-span-2' 
                        : 'col-span-1';
                    return (
                        <div key={i} className={spanClass}>
                            <MetricCard {...m} />
                        </div>
                    );
                })}
            </div>

            {/* ── Charts Row: Line | Donut | Alerts ────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <LoanDisbursementsChart />
                <RepaymentSummaryChart />
                <AlertsCard />
            </div>

            {/* ── Mid Section: Donut | Bars | Quick Actions ─────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <LoansByStatusChart />
                <TopLendersCard />
                <QuickActionsCard />
            </div>

            {/* ── Bottom Section: Transactions Table | Revenue Chart ──────── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2">
                    <RecentTransactionsTable />
                </div>
                <div className="xl:col-span-1">
                    <RevenueOverviewChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
