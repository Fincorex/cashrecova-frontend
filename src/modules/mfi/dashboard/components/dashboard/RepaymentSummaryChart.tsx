import Chart from 'react-apexcharts';

const RepaymentSummaryChart = () => {
    const options: any = {
        chart: {
            type: 'donut',
            fontFamily: 'Inter, sans-serif',
            toolbar: { show: false },
            animations: { enabled: true, easing: 'easeinout', speed: 600 },
        },
        labels: ['Paid On Time', 'Paid Late', 'Defaulted'],
        colors: ['#22C55E', '#F97316', '#F43F5E'],
        plotOptions: {
            pie: {
                donut: {
                    size: '72%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Repayment Rate',
                            fontSize: '11px',
                            fontWeight: 600,
                            fontFamily: 'Inter, sans-serif',
                            color: '#94A3B8',
                            formatter: () => '92.4%',
                        },
                        value: {
                            show: true,
                            fontSize: '22px',
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
            y: {
                formatter: (v: any) => `${v}%`,
            },
        },
    };

    const series = [67, 18, 7];

    const legendItems = [
        { label: 'Paid On Time', color: '#22C55E', pct: '67%' },
        { label: 'Paid Late', color: '#F97316', pct: '18%' },
        { label: 'Defaulted', color: '#F43F5E', pct: '7%' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">Repayment Summary</h3>
            </div>

            <div className="flex justify-center -mx-2">
                <Chart options={options} series={series} type="donut" height={200} width={200} />
            </div>

            <div className="mt-3 space-y-2">
                {legendItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-xs text-slate-600 font-medium">{item.label}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-800">{item.pct}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Total Expected</span>
                    <span className="text-sm font-extrabold text-slate-800">₦245,600,000</span>
                </div>
            </div>
        </div>
    );
};

export default RepaymentSummaryChart;
