import Chart from 'react-apexcharts';

const LoansByStatusChart = () => {
    const options: any = {
        chart: {
            type: 'donut',
            fontFamily: 'Inter, sans-serif',
            toolbar: { show: false },
            animations: { enabled: true, easing: 'easeinout', speed: 600 },
        },
        labels: ['Active', 'Fully Repaid', 'Late', 'Defaulted'],
        colors: ['#7168EE', '#22C55E', '#F97316', '#F43F5E'],
        plotOptions: {
            pie: {
                donut: {
                    size: '72%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total Loans',
                            fontSize: '11px',
                            fontWeight: 600,
                            fontFamily: 'Inter, sans-serif',
                            color: '#94A3B8',
                            formatter: () => '1,240',
                        },
                        value: {
                            show: true,
                            fontSize: '22px',
                            fontWeight: 800,
                            fontFamily: 'Inter, sans-serif',
                            color: '#0F172A',
                        },
                    },
                },
            },
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: { width: 0 },
        tooltip: { theme: 'light' },
    };

    const series = [820, 280, 96, 44];

    const legendItems = [
        { label: 'Active', color: '#7168EE', count: '820' },
        { label: 'Fully Repaid', color: '#22C55E', count: '280' },
        { label: 'Late', color: '#F97316', count: '96' },
        { label: 'Defaulted', color: '#F43F5E', count: '44' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">Loans by Status</h3>
            </div>

            <div className="flex justify-center -mx-2">
                <Chart options={options} series={series} type="donut" height={200} width={200} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                {legendItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-slate-600 font-medium truncate">{item.label}</span>
                        <span className="text-xs font-bold text-slate-800 ml-auto">{item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoansByStatusChart;
