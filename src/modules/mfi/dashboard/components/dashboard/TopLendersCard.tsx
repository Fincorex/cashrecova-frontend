
interface LenderItem {
  name: string;
  amount: string;
  pct: number;
}

const lenders: LenderItem[] = [
    { name: 'Capital First MFB', amount: '₦52.3M', pct: 88 },
    { name: 'Heritage Lending Ltd', amount: '₦41.8M', pct: 70 },
    { name: 'PrimeFund Co-op', amount: '₦36.2M', pct: 61 },
    { name: 'Unity Micro Finance', amount: '₦28.5M', pct: 48 },
    { name: 'Afri-Loan Services', amount: '₦19.7M', pct: 33 },
];

const barColors = ['#7168EE', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF'];

const TopLendersCard = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800">Top 5 Lenders</h3>
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg">By Disbursement</span>
            </div>

            <div className="flex flex-col gap-4 flex-1">
                {lenders.map((lender, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
                                    style={{ backgroundColor: barColors[i] }}
                                >
                                    {i + 1}
                                </span>
                                <span className="text-xs font-semibold text-slate-700">{lender.name}</span>
                            </div>
                            <span className="text-xs font-bold text-slate-800">{lender.amount}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${lender.pct}%`, backgroundColor: barColors[i] }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopLendersCard;
