import React from 'react';
import Chart from 'react-apexcharts';

const VisitorsByBrowser = () => {
    const chartOptions = {
        series: [27.65, 19.20, 9.69, 7.15],
        labels: ['Chrome', 'Firefox', 'Safari', 'Opera'],
        chart: {
            type: 'donut',
            height: 250
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%'
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#7168EE', '#46B277', '#963b68', '#01D4FF'],
        legend: {
            show: false
        }
    };

    const browsers = [
        { name: 'Chrome', percentage: '27.65%', color: 'text-primary' },
        { name: 'Firefox', percentage: '19.20%', color: 'text-success' },
        { name: 'Safari', percentage: '9.69%', color: '' },
        { name: 'Opera', percentage: '7.15%', color: '' }
    ];

    return (
        <div className="card">
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0">Visitors By Browser</h5>
                </div>
            </div>

            <div className="card-body">
                <div id="device-views" className="apex-charts">
                    <Chart options={chartOptions} series={chartOptions.series} type="donut" height={250} />
                </div>

                <div className="row mt-4">
                    <div className="col">
                        {browsers.map((browser, index) => (
                            <div key={index} className="d-flex justify-content-between align-items-center p-1">
                                <div>
                                    <i className={`mdi mdi-circle fs-12 align-middle me-1 ${browser.color || ''}`} style={!browser.color ? { color: chartOptions.colors[index] } : {}}></i>
                                    <span className="align-middle fw-semibold">{browser.name}</span>
                                </div>
                                <span className="fw-medium text-muted float-end">
                                    <i className="mdi mdi-arrow-up text-success align-middle fs-14 me-1"></i>
                                    {browser.percentage}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisitorsByBrowser;
