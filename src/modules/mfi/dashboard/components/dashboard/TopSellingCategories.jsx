import React from 'react';
import Chart from 'react-apexcharts';
import { Icon } from '@iconify/react';

const TopSellingCategories = () => {
    const chartOptions = {
        series: [72.02, 24.53, 16.47, 18],
        labels: ['Savings', 'Business', 'Loans', 'Fixed Deposit'],
        chart: {
            type: 'donut',
            height: 385,
            fontFamily: 'Inter, sans-serif',
            animations: {
                enabled: true,
                speed: 800
            }
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                offsetY: 10,
                donut: {
                    size: '75%',
                    labels: {
                        show: false
                    }
                }
            }
        },
        stroke: {
            width: 0
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            padding: {
                bottom: -190
            }
        },
        colors: ['#2563EB', '#10B981', '#F59E0B', '#6366F1'],
        legend: {
            show: false
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { height: 250 },
                    grid: { padding: { bottom: -90 } }
                }
            }
        ]
    };

    const categories = [
        { name: 'Savings', change: '12.48%', color: '#2563EB' },
        { name: 'Business', change: '5.23%', color: '#10B981' },
        { name: 'Loans', change: '15.58%', color: '#F59E0B' },
        { name: 'Fixed Deposit', change: '14.15%', color: '#6366F1' }
    ];

    return (
        <div className="bg-white rounded-lg border border-slate-200/60  overflow-hidden h-full flex flex-col hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-bold text-slate-900">Portfolio Distribution</h5>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">Asset allocation by account type</p>
                </div>
            </div>

            <div className="p-8 flex-grow flex flex-col justify-between">
                <div className="relative">
                    <div className="h-[250px] sm:h-[350px]">
                        <Chart options={chartOptions} series={chartOptions.series} type="donut" height="100%" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 text-center pb-6 lg:pb-10">
                        <p className="text-[11px] uppercase font-bold text-slate-400 tracking-[0.2em] mb-1">Portfolio Total</p>
                        <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">$15.6M</h3>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-sm transition-all group">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: cat.color }}></span>
                                <span className="text-[13px] font-bold text-slate-700 truncate group-hover:text-primary-500 transition-colors">{cat.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Growth</span>
                                <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                                    <Icon icon="solar:round-alt-arrow-up-bold-duotone" width="14" height="14" />
                                    {cat.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopSellingCategories;
