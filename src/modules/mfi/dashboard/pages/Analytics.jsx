import React from 'react';
import { Icon } from '@iconify/react';
import UpgradeCard from '../components/analytics/UpgradeCard';
import StatsCard from '../components/analytics/StatsCard';
import EarningReports from '../components/analytics/EarningReports';
import SalesByCountries from '../components/analytics/SalesByCountries';
import TrafficSource from '../components/analytics/TrafficSource';
import SalesGrowthRate from '../components/analytics/SalesGrowthRate';
import VisitsBySource from '../components/analytics/VisitsBySource';
import VisitorsByBrowser from '../components/analytics/VisitorsByBrowser';
import CampaignAnalytics from '../components/analytics/CampaignAnalytics';

const Analytics = () => {
    const statsCards = [
        {
            title: 'Total Revenues',
            value: '$599,240',
            change: '19',
            changeType: 'success',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" class="me-2"><path fill="#7168EE" d="M12.5 10.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75a.75.75 0 1 0 0 1.5h3.5a.75.75 0 1 0 0-1.5zm-2.47-5.22a.75.75 0 1 0-1.06-1.06l-1.47 1.47l-.47-.47a.75.75 0 0 0-1.06 1.06l1 1a.75.75 0 0 0 1.06 0zm0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0m5.214-10.136A2.25 2.25 0 0 0 13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764zm0 .012L16 4.25q0-.078-.005-.154M10.25 6.5h3.5c.78 0 1.467-.397 1.871-1h2.129a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H6.25a.75.75 0 0 1-.75-.75V6.25a.75.75 0 0 1 .75-.75h2.129c.404.603 1.091 1 1.871 1m0-3h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5"/></svg>`
        },
        {
            title: 'Active Users',
            value: '10,413',
            change: '19',
            changeType: 'success',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" class="me-2"><path fill="#7168EE" d="M9.354 12.5a2.75 2.75 0 0 1 0-1.5h-7a3.4 3.4 0 0 0-.104.75c0 .203.036.459.104.75zm2.645 6H6.68C8.063 19.39 9.818 20 12 20h.002c3.641 0 6.091-1.698 7.612-3.556a11 11 0 0 0 1.624-2.707c.33-.794.514-1.528.514-1.987s-.184-1.193-.514-1.987c-.34-.82-.869-1.784-1.624-2.707C18.093 5.198 15.642 3.5 12 3.5c-2.183 0-3.938.61-5.322 1.5h5.323c3.11 0 5.16 1.427 6.451 3.006a9.5 9.5 0 0 1 1.4 2.332c.302.73.4 1.246.4 1.412s-.098.682-.4 1.412a9.5 9.5 0 0 1-1.4 2.332c-1.292 1.579-3.342 3.006-6.45 3.006zM5.385 6a10 10 0 0 0-1.34 1.5h7.954V6zm6.614 2.5H3.391A11 11 0 0 0 2.67 10h7.209a2.75 2.75 0 1 1 0 3.5h-7.21q.045.117.095.237c.164.395.372.822.627 1.263h8.608v1a4.25 4.25 0 1 0 0-8.5zm0 7.5H4.044q.165.223.344.444c.296.362.628.718.997 1.056h6.614z"/></svg>`
        },
        {
            title: 'Unique Users',
            value: '921',
            change: '5',
            changeType: 'success',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 2048 2048" class="me-2"><path fill="#7168EE" d="M1397 1550q-21-114-78-210t-141-166t-189-110t-221-40q-88 0-170 23t-153 64t-129 100t-100 130t-65 153t-23 170H0q0-117 35-229t101-207t157-169t203-113q-56-36-100-83t-76-103t-47-119t-17-129q0-106 40-199t109-163T568 40T768 0t199 40t163 109t110 163t40 200q0 66-16 129t-48 119t-75 103t-101 83q99 38 183 100t147 143t105 177t54 202l-57 58zM384 512q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149m1645 941l-557 558l-269-270l90-90l179 178l467-466z"/></svg>`
        },
        {
            title: 'Total Transactions',
            value: '1.6M',
            change: '2',
            changeType: 'success',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20" class="me-2"><path fill="#7168EE" d="M4.75 4A2.75 2.75 0 0 0 2 6.75v6.5A2.75 2.75 0 0 0 4.75 16h10.5A2.75 2.75 0 0 0 18 13.25v-6.5A2.75 2.75 0 0 0 15.25 4zM12 5v10H9V5zm1 10V5h2.25c.966 0 1.75.784 1.75 1.75v6.5A1.75 1.75 0 0 1 15.25 15zm-5 0H6V5h2zM5 5v10h-.25A1.75 1.75 0 0 1 3 13.25v-6.5C3 5.784 3.784 5 4.75 5z"/></svg>`
        }
    ];

    return (
        <div className="space-y-12 mt-30">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200/60 pb-10">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
                    <p className="text-sm text-slate-500">Deep dive into your operational performance data.</p>
                </div>

                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                        <li><a href="#" className="hover:text-primary-500 transition-colors">Fincorex</a></li>
                        <li className="flex items-center space-x-2">
                            <span className="text-slate-300">/</span>
                            <a href="#" className="hover:text-primary-500 transition-colors">Apps</a>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="text-slate-300">/</span>
                            <span className="text-primary-500 font-semibold">Analytics</span>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Upgrade Card Section */}
            <section>
                <UpgradeCard />
            </section>

            {/* Stats Cards Section */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((card, index) => (
                        <StatsCard key={index} {...card} />
                    ))}
                </div>
            </section>

            {/* Reports Section */}
            <section className="grid grid-cols-1 xl:grid-cols-6 gap-6 pt-4">
                <div className="xl:col-span-4">
                    <EarningReports />
                </div>
                <div className="xl:col-span-2">
                    <SalesByCountries />
                </div>
            </section>

            {/* Traffic Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                <TrafficSource />
                <SalesGrowthRate />
                <VisitsBySource />
            </section>

            {/* Visitors & Campaign Section */}
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-10">
                <div className="xl:col-span-3">
                    <VisitorsByBrowser />
                    
                </div>
                <div className="xl:col-span-9">
                    <CampaignAnalytics />
                </div>
            </section>
        </div>
    );
};

export default Analytics;
