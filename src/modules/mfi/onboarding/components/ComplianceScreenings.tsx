
/**
 * ComplianceScreenings Component
 * 
 * Displays automated KYC/AML checks status and low-medium risk class rating.
 */
const ComplianceScreenings = () => {
  const complianceChecks = [
    { name: 'PEP (Politically Exposed Persons)', desc: 'NFIU Watchlist scanning' },
    { name: 'Sanctions & Global Watchlists', desc: 'OFAC, UN and UK watchlists' },
    { name: 'Adverse Media Check', desc: 'Live AI news scans' },
    { name: 'NFIU Domestic Watchlist', desc: 'Domestic restricted entities search' }
  ];

  return (
    <div className="space-y-3">
      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
        Automated Compliance Screenings
      </span>
      
      <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2.5 shadow-3xs">
        {complianceChecks.map((check, idx) => (
          <div 
            key={idx} 
            className="flex justify-between items-center text-xs border-b border-slate-200/50 pb-2 last:border-b-0 last:pb-0"
          >
            <div>
              <span className="text-slate-800 font-bold block">{check.name}</span>
              <span className="text-[9px] text-slate-405 font-semibold">{check.desc}</span>
            </div>
            <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded shadow-3xs animate-in zoom-in duration-300">
              CLEARED
            </span>
          </div>
        ))}
      </div>

      {/* Sector Risk Rating */}
      <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3.5 flex items-center justify-between text-xs shadow-3xs">
        <div>
          <span className="font-bold text-amber-900 block">System Compliance Class</span>
          <span className="text-[9px] text-amber-600 font-semibold">Standard low-risk KYC workflow</span>
        </div>
        <span className="font-extrabold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg text-[9px] shadow-3xs">
          LOW - MEDIUM
        </span>
      </div>
    </div>
  );
};

export default ComplianceScreenings;
