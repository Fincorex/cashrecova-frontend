import React from 'react';
import Chart from 'react-apexcharts';

const RevenueStatistics = () => {
    const chartOptions = {
        series: [
            {
                name: 'Net Profit',
                type: 'column',
                data: [60, 65, 80, 85, 56, 50, 40]
            },
            {
                name: 'Sales',
                type: 'column',
                data: [30, 50, 40, 36, 86, 32, 90]
            }
        ],
        chart: {
            type: 'bar',
            height: 200,
            toolbar: {
                show: false
            }
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 3
        },
        colors: ['#27ebb0', '#E77636'],
        plotOptions: {
            bar: {
                borderRadius: 1,
                horizontal: false,
                columnWidth: '50%'
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        stroke: {
            show: true,
            width: 4,
            colors: ['transparent']
        },
        yaxis: {
            labels: {
                rotate: -90
            }
        },
        xaxis: {
            type: 'month',
            categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            axisBorder: {
                show: true,
                color: 'rgba(167, 180, 201 ,0.2)',
                offsetX: 0,
                offsetY: 0
            }
        },
        markers: {
            size: 0
        }
    };

    return (
        <div className="card overflow-hidden">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Revenue Statistics</h5>

                    <div className="ms-auto">
                        <button className="btn btn-sm bg-primary-subtle border dropdown-toggle fw-medium text-primary" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            View All<i className="mdi mdi-chevron-down ms-1 fs-14"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">Today</a>
                            <a className="dropdown-item" href="#">Target</a>
                            <a className="dropdown-item" href="#">This Year</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-body mt-0">
                <div className="apex-charts">
                    <Chart options={chartOptions} series={chartOptions.series} type="bar" height={200} />
                </div>

                <div className="row border border-dashed border-1 rounded-2">
                    <div className="col col-xl-6">
                        <div className="p-2 border-end border-inline-end-dashed text-center">
                            <h3 className="mb-0 fs-18 me-1">$12,4658</h3>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <p className="mb-0 fs-14 text-muted me-1">Total Revenue</p>
                                <i className="ti ti-arrow-up text-success"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col col-xl-6">
                        <div className="p-2 text-center">
                            <h3 className="mb-0 fs-18 me-1">$8,4658</h3>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <p className="mb-0 fs-14 text-muted me-1">Total Profit</p>
                                <i className="ti ti-arrow-down text-danger"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueStatistics;
