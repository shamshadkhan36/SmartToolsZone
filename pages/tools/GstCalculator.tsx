import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Percent } from 'lucide-react';

export const GstCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');

  const result = (() => {
    let gstAmount = 0;
    let totalAmount = 0;
    let netAmount = 0;

    if (type === 'exclusive') {
      gstAmount = (amount * rate) / 100;
      totalAmount = amount + gstAmount;
      netAmount = amount;
    } else {
      gstAmount = amount - (amount * (100 / (100 + rate)));
      netAmount = amount - gstAmount;
      totalAmount = amount;
    }
    return { gst: gstAmount, total: totalAmount, net: netAmount };
  })();

  return (
    <ToolLayout
      toolId="gst-calculator"
      title="GST Calculator"
      description="Calculate Goods and Services Tax (GST) inclusive or exclusive amounts easily."
    >
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="mb-4">
             <label className="block text-sm font-medium dark:text-white mb-2">Amount</label>
             <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full p-3 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
          </div>
          <div className="mb-4">
             <label className="block text-sm font-medium dark:text-white mb-2">GST Rate (%)</label>
             <div className="flex gap-2 mb-2">
               {[5, 12, 18, 28].map(r => (
                 <button key={r} onClick={() => setRate(r)} className={`px-3 py-1 rounded border ${rate === r ? 'bg-brand-600 text-white border-brand-600' : 'bg-white dark:bg-slate-900 dark:text-slate-300 dark:border-slate-600'}`}>{r}%</button>
               ))}
             </div>
             <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full p-3 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
          </div>
          <div className="mb-6">
             <div className="flex bg-white dark:bg-slate-900 rounded-lg p-1 border dark:border-slate-600">
               <button onClick={() => setType('exclusive')} className={`flex-1 py-2 rounded-md transition-colors ${type === 'exclusive' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 font-bold' : 'text-slate-500'}`}>GST Exclusive</button>
               <button onClick={() => setType('inclusive')} className={`flex-1 py-2 rounded-md transition-colors ${type === 'inclusive' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 font-bold' : 'text-slate-500'}`}>GST Inclusive</button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
           <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-700">
              <span className="text-slate-500 text-sm">GST Amount</span>
              <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{result.gst.toFixed(2)}</p>
           </div>
           <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-700">
              <span className="text-slate-500 text-sm">Total Amount</span>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.total.toFixed(2)}</p>
           </div>
           <div className="col-span-2 bg-slate-100 dark:bg-slate-900 p-4 rounded-lg">
             <span className="text-slate-500 text-sm">Net Amount (Pre-Tax)</span>
             <p className="text-xl font-bold text-slate-700 dark:text-slate-300">{result.net.toFixed(2)}</p>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
};