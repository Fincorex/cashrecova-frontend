
type TransactionStatus = 'Successful' | 'Failed';

interface TransactionItem {
  id: string;
  type: string;
  description: string;
  amount: string;
  status: TransactionStatus;
  date: string;
}

const transactions: TransactionItem[] = [
    { id: 'TXN-001', type: 'Disbursement', description: 'Loan to Emeka Obi', amount: '+₦250,000', status: 'Successful', date: 'May 14, 2025' },
    { id: 'TXN-002', type: 'Repayment', description: 'Monthly installment - A. Johnson', amount: '+₦45,000', status: 'Successful', date: 'May 14, 2025' },
    { id: 'TXN-003', type: 'Disbursement', description: 'Loan to Fatima Bello', amount: '+₦500,000', status: 'Failed', date: 'May 13, 2025' },
    { id: 'TXN-004', type: 'Wallet Top-up', description: 'Fund wallet from bank', amount: '+₦1,000,000', status: 'Successful', date: 'May 13, 2025' },
    { id: 'TXN-005', type: 'Repayment', description: 'Overdue installment - K. Adeleke', amount: '+₦30,000', status: 'Failed', date: 'May 12, 2025' },
    { id: 'TXN-006', type: 'Fee Charge', description: 'Transaction processing fee', amount: '-₦2,500', status: 'Successful', date: 'May 12, 2025' },
    { id: 'TXN-007', type: 'Disbursement', description: 'Loan to Chidi Nwosu', amount: '+₦180,000', status: 'Successful', date: 'May 11, 2025' },
];

const statusStyle: Record<TransactionStatus, string> = {
    Successful: 'bg-emerald-50 text-emerald-600',
    Failed: 'bg-rose-50 text-rose-600',
};

const RecentTransactionsTable = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">Recent Transactions</h3>
                <button className="text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors duration-200">
                    View all →
                </button>
            </div>
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50">
                            <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">ID</th>
                            <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Type</th>
                            <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description</th>
                            <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap text-right">Amount</th>
                            <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                            <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {transactions.map((tx, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors duration-150">
                                <td className="px-5 py-3 text-xs font-bold text-primary-500 whitespace-nowrap">{tx.id}</td>
                                <td className="px-5 py-3 text-xs font-medium text-slate-650 whitespace-nowrap">{tx.type}</td>
                                <td className="px-5 py-3 text-xs text-slate-550 max-w-[180px] truncate">{tx.description}</td>
                                <td className={`px-5 py-3 text-xs font-bold whitespace-nowrap text-right ${tx.amount.startsWith('-') ? 'text-rose-600' : 'text-slate-850'}`}>{tx.amount}</td>
                                <td className="px-5 py-3 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-bold ${statusStyle[tx.status]}`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-xs text-slate-400 whitespace-nowrap">{tx.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentTransactionsTable;
