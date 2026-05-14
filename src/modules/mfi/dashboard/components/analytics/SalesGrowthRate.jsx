import React from 'react';
import Chart from 'react-apexcharts';

const SalesGrowthRate = () => {
    const chartOptions = {
        series: [76],
        chart: {
            height: 280,
            type: 'radialBar'
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%'
                },
                dataLabels: {
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: '13px'
                    },
                    value: {
                        color: '#111',
                        fontSize: '30px',
                        show: true
                    }
                }
            }
        },
        colors: ['#7168EE'],
        labels: ['Growth Rate']
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Sales Growth Rate</h5>
                    <div className="ms-auto">
                        <button className="btn btn-sm bg-primary-subtle border dropdown-toggle fw-medium text-primary" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Today
                            <i className="mdi mdi-chevron-down ms-1 fs-14"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">This Week</a>
                            <a className="dropdown-item" href="#">Last Week</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-body">
                <div id="salegrowthrate" className="apex-charts mt-n3">
                    <Chart options={chartOptions} series={chartOptions.series} type="radialBar" height={280} />
                </div>
            </div>
        </div>
    );
};

export default SalesGrowthRate;
