import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Activity } from 'lucide-react';

export const BmiCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');

  const calculateBmi = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(1)));

      if (bmiValue < 18.5) setStatus('Underweight');
      else if (bmiValue < 25) setStatus('Normal weight');
      else if (bmiValue < 30) setStatus('Overweight');
      else setStatus('Obese');
    }
  };

  const getStatusColor = () => {
    if (status === 'Normal weight') return 'text-green-600 dark:text-green-400';
    if (status === 'Underweight') return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <ToolLayout
      toolId="bmi-calculator"
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to know if you are at a healthy weight."
      faqs={[
        { question: "What is a healthy BMI?", answer: "A BMI between 18.5 and 24.9 is considered normal weight." }
      ]}
    >
      <div className="max-w-xl mx-auto space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Weight (kg)
            </label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Height (cm)
            </label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        <button 
          onClick={calculateBmi}
          className="w-full py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition-colors"
        >
          Calculate BMI
        </button>

        {bmi !== null && (
          <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 mb-2">Your BMI Score</p>
            <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              {bmi}
            </div>
            <p className={`text-xl font-bold ${getStatusColor()}`}>
              {status}
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};