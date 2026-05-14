import React from 'react';
import Chart from 'react-apexcharts';

const SalesOvertime = () => {
    const chartOptions = {
        series: [
            {
                name: 'Revenue',
                data: [9000, 15000, 6000, 9500, 16000, 8500, 14000, 19000, 12000, 8500, 15000, 18564]
            },
            {
                name: 'Order',
                data: [5000, 3000, 13000, 5000, 9000, 13500, 19000, 9500, 3000, 14000, 10500, 8500]
            }
        ],
        chart: {
            type: 'area',
            height: 320,
            toolbar: {
                show: false
            },
            fontFamily: 'Inter, sans-serif',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        colors: ['#2563EB', '#10B981'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: '#94a3b8',
                    fontSize: '12px',
                    fontWeight: 600
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return '$' + (val / 1000) + 'K';
                },
                style: {
                    colors: '#94a3b8',
                    fontSize: '12px',
                    fontWeight: 600
                }
            },
            min: 0,
            max: 20000,
            tickAmount: 4
        },
        tooltip: {
            shared: true,
            intersect: false,
            theme: 'light',
            marker: {
                show: true
            },
            y: {
                formatter: function (val) {
                    return '$' + val.toLocaleString();
                }
            },
            style: {
                fontSize: '13px'
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetY: -10,
            markers: {
                width: 10,
                height: 10,
                radius: 10,
                offsetX: -4
            },
            itemMargin: {
                horizontal: 15,
                vertical: 10
            },
            labels: {
                colors: '#64748b',
                useSeriesColors: false
            },
            fontWeight: 700
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4,
            padding: {
                top: 0,
                right: 20,
                bottom: 0,
                left: 20
            }
        }
    };

    return (
        <div className="bg-white rounded-lg border border-slate-200/60  hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 h-full overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-bold text-slate-900">Monthly Cashflow Performance</h5>
                    <p className="text-xs font-medium text-slate-500 mt-1">Real-time revenue vs order analysis</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/50">
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="p-8">
                <div className="h-[290px]">
                    <Chart options={chartOptions} series={chartOptions.series} type="area" height={290} />
                </div>
            </div>
        </div>
    );
};

export default SalesOvertime;
