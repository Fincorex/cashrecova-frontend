import Chart from 'react-apexcharts';

const RevenueOverviewChart = () => {
    const options: any = {
        chart: {
            type: 'donut',
            fontFamily: 'Inter, sans-serif',
            toolbar: { show: false },
            animations: { enabled: true, easing: 'easeinout', speed: 600 },
        },
        labels: ['Per Transaction Fees', 'Per Loan Fees', 'Other Fees'],
        colors: ['#7168EE', '#22C55E', '#F97316'],
        plotOptions: {
            pie: {
                donut: {
                    size: '72%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total Revenue',
                            fontSize: '10px',
                            fontWeight: 600,
                            fontFamily: 'Inter, sans-serif',
                            color: '#94A3B8',
                            formatter: () => '₦8.65M',
                        },
                        value: {
                            show: true,
                            fontSize: '18px',
                            fontWeight: 800,
                            fontFamily: 'Inter, sans-serif',
                            color: '#0F172A',
                            formatter: (v: any) => `${v}%`,
                        },
                    },
                },
            },
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        tooltip: {
            theme: 'light',
            y: { formatter: (v: any) => `${v}%` },
        },
    };

    const series = [52, 33, 15];

    const legendItems = [
        { label: 'Per Transaction Fees', color: '#7168EE', pct: '52%', value: '₦4,498,000' },
        { label: 'Per Loan Fees', color: '#22C55E', pct: '33%', value: '₦2,854,500' },
        { label: 'Other Fees', color: '#F97316', pct: '15%', value: '₦1,297,500' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">Revenue Overview</h3>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg">This Month</span>
            </div>

            <div className="text-center mb-1">
                <p className="text-2xl font-extrabold text-slate-900">₦8,650,000</p>
                <p className="text-xs text-slate-400 font-medium">Total Revenue</p>
            </div>

            <div className="flex justify-center -mx-2">
                <Chart options={options} series={series} type="donut" height={190} width={190} />
            </div>

            <div className="mt-3 space-y-2.5">
                {legendItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-slate-600 font-medium">{item.label}</span>
                            <span className="text-xs text-slate-400 font-medium">({item.pct})</span>
                        </div>
                        <span className="text-xs font-bold text-slate-800">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RevenueOverviewChart;
