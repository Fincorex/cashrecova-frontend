import React from 'react';
import Chart from 'react-apexcharts';
import { Icon } from '@iconify/react';

const WidgetCard = ({ title, value, change, changeType, chartData, chartColor }) => {
    const chartOptions = {
        series: [{
            name: 'Data',
            data: chartData
        }],
        chart: {
            height: 45,
            type: 'area',
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 3,
                color: chartColor,
                opacity: 0.2
            }
        },
        colors: [chartColor],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0,
                stops: [0, 100]
            }
        },
        tooltip: {
            enabled: false
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: false
        },
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false
        },
        stroke: {
            curve: 'smooth',
            width: 1
        }
    };

    return (
        <div className="bg-white rounded-lg border border-slate-200/60 p-7  hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 group">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-[0.15em]">{title}</p>
                    <div className={`p-2 rounded-xl transition-colors ${changeType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        <Icon 
                            icon={changeType === 'up' ? 'solar:graph-up-bold-duotone' : 'solar:graph-down-bold-duotone'} 
                            width="20" 
                            height="20" 
                        />
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-600 tracking-tight">{value}</h3>
                        <div className="flex items-center gap-2">
                            <span className={`text-[13px] font-medium ${
                                changeType === 'up' ? 'text-emerald-600' : 'text-rose-600'
                            }`}>
                                {changeType === 'up' ? '+' : '-'}{change}%
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">vs month</span>
                        </div>
                    </div>
                    <div className="w-28 h-12 mb-1">
                        <Chart options={chartOptions} series={chartOptions.series} type="area" height={45} width="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidgetCard;
