import React, { useState, useMemo } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenure, setTenure] = useState<number>(12); // in months

  const result = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure;
    
    // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      emi: isFinite(emi) ? Math.round(emi) : 0,
      totalInterest: isFinite(totalInterest) ? Math.round(totalInterest) : 0,
      totalPayment: isFinite(totalPayment) ? Math.round(totalPayment) : 0,
    };
  }, [loanAmount, interestRate, tenure]);

  const chartData = [
    { name: 'Principal Loan Amount', value: loanAmount },
    { name: 'Total Interest', value: result.totalInterest },
  ];

  const COLORS = ['#0ea5e9', '#eab308'];

  return (
    <ToolLayout
      toolId="emi-calculator"
      title="EMI Calculator"
      description="Calculate your Equated Monthly Installment (EMI) for home loans, car loans, or personal loans."
      faqs={[
        { question: "How is EMI calculated?", answer: "EMI is calculated using the formula: [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is interest rate per month, and N is tenure in months." },
        { question: "Is this accurate for Indian Banks?", answer: "Yes, this uses the standard formula used by most major banks worldwide, including India (SBI, HDFC, ICICI, etc.)." }
      ]}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Loan Amount (Currency)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white"
            />
            <input 
              type="range" min="10000" max="10000000" step="10000" 
              value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full mt-2 accent-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Interest Rate (% p.a)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white"
            />
             <input 
              type="range" min="1" max="30" step="0.1" 
              value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full mt-2 accent-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Loan Tenure (Months)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white"
            />
             <input 
              type="range" min="6" max="360" step="6" 
              value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full mt-2 accent-brand-500"
            />
          </div>
        </div>

        {/* Result Section */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl text-center">
           <div className="mb-6 h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
           </div>

           <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-brand-200 dark:border-brand-900 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-sm">Monthly EMI</span>
              <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                {result.emi.toLocaleString()}
              </div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Total Interest</span>
              <span className="font-bold text-slate-900 dark:text-white">{result.totalInterest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">Total Payable</span>
              <span className="font-bold text-slate-900 dark:text-white">{result.totalPayment.toLocaleString()}</span>
            </div>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
};
