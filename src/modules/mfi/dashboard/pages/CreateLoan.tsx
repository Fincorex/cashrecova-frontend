import { useState } from "react";

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS = [
  { id: 1, label: "Loan Details" },
  { id: 2, label: "Borrower Details" },
  { id: 3, label: "Repayment & Terms" },
  { id: 4, label: "Review" },
  { id: 5, label: "Disbursement" },
];

const LOAN_PRODUCTS = ["Business Loan", "Personal Loan", "Asset Finance", "Salary Advance"];
const LOAN_TYPES = ["Term Loan", "Revolving Credit", "Overdraft"];
const INTEREST_TYPES = ["Reducing Balance", "Flat Rate"];
const PURPOSES = ["Business Expansion", "Working Capital", "Asset Purchase", "Personal Use", "Education"];

function formatNGN(value: number) {
  return `NGN ${value.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
}

function computeSummary(amount: number, ratePA: number, tenureMonths: number, processingFee: number, otherCharges: number) {
  const totalLoan = amount + processingFee + otherCharges;
  const monthlyRate = ratePA / 100 / 12;
  let emi = 0;
  if (monthlyRate > 0 && tenureMonths > 0) {
    emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  } else if (tenureMonths > 0) {
    emi = amount / tenureMonths;
  }
  const totalRepayment = emi * tenureMonths;
  const totalInterest = totalRepayment - amount;
  return { totalLoan, emi, totalRepayment, totalInterest };
}

export default function CreateLoan() {
  const [step, setStep] = useState<Step>(1);


  const [loanProduct, setLoanProduct] = useState("Business Loan");
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [purpose, setPurpose] = useState("Business Expansion");
  const [loanType, setLoanType] = useState("Term Loan");
  const [interestType, setInterestType] = useState("Reducing Balance");
  const [interestRate, setInterestRate] = useState(12.5);
  const [processingFee, setProcessingFee] = useState(15000);
  const [otherCharges, setOtherCharges] = useState(5000);
  const [tenure, setTenure] = useState(12);
  const [moratorium, setMoratorium] = useState(0);
  const [disbursementDate, setDisbursementDate] = useState("2025-05-31");
  const [disbursementWallet, setDisbursementWallet] = useState("Operating Wallet (NGN)");
  const [settlementAccount] = useState("Access Bank - 1234567890");
  const [referenceNote, setReferenceNote] = useState("");
  const [saveAsDraft, setSaveAsDraft] = useState(false);

  const { totalLoan, emi, totalRepayment, totalInterest } = computeSummary(
    loanAmount, interestRate, tenure, processingFee, otherCharges
  );

  const installments = Array.from({ length: Math.min(3, tenure) }, (_, i) => {
    const d = new Date(disbursementDate);
    d.setMonth(d.getMonth() + i + 1);
    return {
      num: i + 1,
      date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, " "),
      amount: emi,
    };
  });

  return (
    <div className="flex gap-6 p-6 min-h-screen bg-gray-50">
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">
            <span className="text-indigo-600 cursor-pointer hover:underline">Loans</span>
            <span className="mx-1 text-gray-400">›</span>
            <span>Create Loan</span>
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Create Loan</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in the loan details to create and disburse a new loan.</p>
        </div>

        <div className="flex items-center mb-8">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setStep(s.id as Step)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors
                    ${step === s.id
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : step > s.id
                      ? "bg-indigo-100 border-indigo-400 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-400"
                    }`}
                >
                  {s.id}
                </button>
                <span className={`text-xs mt-1 whitespace-nowrap ${step === s.id ? "text-indigo-600 font-medium" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 mb-4 ${step > s.id ? "bg-indigo-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>


        {step === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Loan Details</h2>
            <p className="text-sm text-gray-500 mb-6">Enter the basic information about the loan</p>

            <div className="grid grid-cols-3 gap-4 mb-4">
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Product <span className="text-red-500">*</span>
                </label>
                <select
                  value={loanProduct}
                  onChange={e => setLoanProduct(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {LOAN_PRODUCTS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-sm text-gray-600">NGN</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={e => setLoanAmount(Number(e.target.value))}
                    className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Loan <span className="text-red-500">*</span>
                </label>
                <select
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {PURPOSES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={loanType}
                  onChange={e => setLoanType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {LOAN_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={interestType}
                  onChange={e => setInterestType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {INTEREST_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (p.a.) <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={e => setInterestRate(Number(e.target.value))}
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-sm text-gray-600">%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Processing Fee</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-sm text-gray-600">NGN</span>
                  <input
                    type="number"
                    value={processingFee}
                    onChange={e => setProcessingFee(Number(e.target.value))}
                    className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Other Charges</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-sm text-gray-600">NGN</span>
                  <input
                    type="number"
                    value={otherCharges}
                    onChange={e => setOtherCharges(Number(e.target.value))}
                    className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Loan Amount</label>
                <input
                  readOnly
                  value={formatNGN(totalLoan)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-indigo-700 font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tenure <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={tenure}
                    onChange={e => setTenure(Number(e.target.value))}
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-sm text-gray-600">Months</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Moratorium (Optional)</label>
                <div className="flex">
                  <input
                    type="number"
                    value={moratorium}
                    onChange={e => setMoratorium(Number(e.target.value))}
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-sm text-gray-600">Months</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disbursement Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={disbursementDate}
                  onChange={e => setDisbursementDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Funding Source</h3>
              <p className="text-sm text-gray-500 mb-4">Select wallet or settlement account for disbursement</p>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disbursement Wallet <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={disbursementWallet}
                    onChange={e => setDisbursementWallet(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Operating Wallet (NGN)</option>
                    <option>Reserve Wallet (NGN)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Available Balance: NGN 5,450,000.00</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Settlement Account <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                    <span className="text-sm text-gray-700 flex-1">{settlementAccount}</span>
                    <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded px-2 py-0.5 ml-2">Verified</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Account Holder: Prime Capital Ltd.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference Note (Optional)</label>
                  <textarea
                    value={referenceNote}
                    onChange={e => setReferenceNote(e.target.value)}
                    placeholder="Enter reference note"
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {step !== 1 && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-indigo-400">{step}</span>
            </div>
            <h2 className="text-base font-semibold text-gray-700 mb-1">{STEPS[step - 1].label}</h2>
            <p className="text-sm text-gray-400">This step's form fields go here.</p>
          </div>
        )}
        <div className="flex items-center justify-between mt-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={saveAsDraft}
              onChange={e => setSaveAsDraft(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">Save as draft</span>
          </label>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(prev => Math.max(1, prev - 1) as Step)}
              className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setStep(prev => Math.min(5, prev + 1) as Step)}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              {step === 5 ? "Disburse Loan" : `Next: ${STEPS[step].label}`}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="w-72 shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm sticky top-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Loan Summary</h3>

          <div className="space-y-2.5 text-sm border-b border-gray-100 pb-4 mb-4">
            {[
              ["Loan Product", loanProduct],
              ["Loan Type", loanType],
              ["Loan Amount", formatNGN(loanAmount)],
              ["Interest Rate (p.a.)", `${interestRate}%`],
              ["Tenure", `${tenure} Months`],
              ["Moratorium", `${moratorium} Months`],
              ["Processing Fee", formatNGN(processingFee)],
              ["Other Charges", formatNGN(otherCharges)],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="text-gray-800 font-medium text-right">{val}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="font-semibold text-gray-700">Total Loan Amount</span>
              <span className="font-bold text-indigo-600">{formatNGN(totalLoan)}</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-900">Repayment Preview</span>
              <button className="text-xs text-indigo-600 hover:underline">View Full Schedule</button>
            </div>
            <div className="space-y-1.5 text-sm mb-4">
              {[
                ["Monthly EMI", formatNGN(emi)],
                ["Total Repayment", formatNGN(totalRepayment)],
                ["Total Interest", formatNGN(totalInterest)],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span className="text-gray-800 font-semibold">{val}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-semibold text-gray-700 mb-2">First 3 Installments</p>
            <div className="rounded-lg overflow-hidden border border-gray-100">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Installment</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Due Date</th>
                    <th className="text-right px-3 py-2 text-gray-500 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {installments.map(inst => (
                    <tr key={inst.num} className="border-t border-gray-100">
                      <td className="px-3 py-2 text-gray-700">{inst.num}</td>
                      <td className="px-3 py-2 text-gray-700">{inst.date}</td>
                      <td className="px-3 py-2 text-gray-700 text-right">{formatNGN(inst.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">Schedule shown is an estimate and may vary based on actual disbursement date.</p>
          </div>

          <div className="flex items-start gap-2 bg-indigo-50 rounded-lg p-3">
            <svg className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-xs text-indigo-700">All loans are subject to compliance checks and organizational policies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
