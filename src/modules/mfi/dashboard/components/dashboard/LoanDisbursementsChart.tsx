import Chart from 'react-apexcharts';

const LoanDisbursementsChart = () => {
    const days = Array.from({ length: 31 }, (_, i) => `May ${i + 1}`);

    const thisMonth = [
        3.2, 2.8, 4.1, 3.9, 5.2, 4.7, 3.8, 6.1, 5.5, 4.9,
        7.2, 6.8, 5.9, 8.1, 7.5, 6.9, 9.2, 8.7, 7.8, 10.1,
        9.5, 8.9, 11.2, 10.7, 9.8, 12.1, 11.5, 10.9, 13.2, 12.7, 11.8
    ];

    const lastMonth = [
        2.1, 2.5, 3.2, 2.8, 4.0, 3.5, 2.9, 4.8, 4.2, 3.8,
        5.5, 5.1, 4.4, 6.2, 5.6, 5.0, 7.0, 6.5, 5.8, 7.9,
        7.3, 6.7, 8.5, 8.0, 7.4, 9.2, 8.6, 8.0, 10.0, 9.5, 9.1
    ];

    const options: any = {
        chart: {
            type: 'line',
            height: 220,
            toolbar: { show: false },
            fontFamily: 'Inter, sans-serif',
            animations: { enabled: true, easing: 'easeinout', speed: 600 },
            zoom: { enabled: false },
        },
        stroke: {
            curve: 'smooth',
            width: [2.5, 2],
            dashArray: [0, 5],
        },
        colors: ['#7168EE', '#94A3B8'],
        fill: {
            type: ['gradient', 'solid'],
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.12,
                opacityTo: 0.01,
                stops: [0, 100],
            },
            opacity: [0.15, 0],
        },
        xaxis: {
            categories: days,
            tickAmount: 6,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                rotate: 0,
                style: { colors: '#94A3B8', fontSize: '10px', fontFamily: 'Inter, sans-serif' },
                formatter: (val: any) => {
                    if (val === undefined || val === null) return '';
                    const valStr = String(val);
                    if (!valStr.startsWith('May ')) return valStr;
                    const d = parseInt(valStr.replace('May ', ''), 10);
                    return [1, 8, 15, 22, 29, 31].includes(d) ? valStr : '';
                },
            },
            crosshairs: { show: true },
        },
        yaxis: {
            labels: {
                style: { colors: '#94A3B8', fontSize: '10px', fontFamily: 'Inter, sans-serif' },
                formatter: (v: any) => `₦${v}M`,
            },
        },
        grid: {
            borderColor: '#F1F5F9',
            strokeDashArray: 4,
            padding: { top: -10, bottom: 0 },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '11px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            markers: { size: 5, shape: 'circle' },
            itemMargin: { horizontal: 10 },
        },
        tooltip: {
            theme: 'light',
            shared: true,
            intersect: false,
            y: { formatter: (v: any) => `₦${v}M` },
        },
        dataLabels: { enabled: false },
    };

    const series = [
        { name: 'This Month', data: thisMonth },
        { name: 'Last Month', data: lastMonth },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-slate-800">Loan Disbursements</h3>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg">May 2025</span>
            </div>
            <div className="-mx-2 flex-1">
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    height={230}
                />
            </div>
        </div>
    );
};

export default LoanDisbursementsChart;
