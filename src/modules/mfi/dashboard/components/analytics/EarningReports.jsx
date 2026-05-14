import React from 'react';
import Chart from 'react-apexcharts';

const EarningReports = () => {
    const chartOptions = {
        series: [
            {
                name: 'Revenue',
                data: [31, 40, 28, 51, 42, 109, 100, 120, 115, 95, 110, 130]
            },
            {
                name: 'Profit',
                data: [11, 32, 45, 32, 34, 52, 41, 60, 55, 45, 50, 70]
            }
        ],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.2,
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
                    colors: '#9aa0ac'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return '$' + val + 'K';
                },
                style: {
                    colors: '#9aa0ac'
                }
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            theme: 'light',
            y: {
                formatter: function (val) {
                    return '$' + val + 'K';
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            markers: {
                width: 12,
                height: 12,
                radius: 12
            }
        },
        colors: ['#7168EE', '#46B277'],
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 3
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Earning Reports</h5>
                </div>
            </div>

            <div className="card-body">
                <div id="monthly-sales" className="apex-charts">
                    <Chart options={chartOptions} series={chartOptions.series} type="area" height={350} />
                </div>
            </div>
        </div>
    );
};

export default EarningReports;
