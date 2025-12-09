import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Cake } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <ToolLayout
      toolId="age-calculator"
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days based on your date of birth."
      faqs={[
        { question: "Does this consider leap years?", answer: "Yes, the calculation logic accounts for the number of days in each month correctly." }
      ]}
    >
      <div className="max-w-xl mx-auto space-y-8">
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Select Date of Birth
          </label>
          <div className="flex gap-4">
            <input 
              type="date" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="flex-grow p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
            />
            <button 
              onClick={calculateAge}
              className="bg-brand-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors"
            >
              Calculate
            </button>
          </div>
        </div>

        {age && (
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-6 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-900">
              <span className="block text-4xl font-bold text-brand-600 dark:text-brand-400">{age.years}</span>
              <span className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Years</span>
            </div>
            <div className="p-6 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-900">
              <span className="block text-4xl font-bold text-brand-600 dark:text-brand-400">{age.months}</span>
              <span className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Months</span>
            </div>
            <div className="p-6 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-900">
              <span className="block text-4xl font-bold text-brand-600 dark:text-brand-400">{age.days}</span>
              <span className="text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Days</span>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};