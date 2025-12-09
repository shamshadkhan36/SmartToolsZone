import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { paraphraseText } from '../../services/geminiService';
import { RefreshCw, Copy, AlertCircle } from 'lucide-react';

export const AiParaphraser: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'standard' | 'fluent' | 'creative'>('standard');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleParaphrase = async () => {
    if (!input.trim()) {
      setError('Please enter text to paraphrase.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const paraphrased = await paraphraseText(input, mode);
      setResult(paraphrased);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      toolId="ai-paraphraser"
      title="AI Text Paraphraser"
      description="Rewrite text to improve clarity, vocabulary, and tone using AI."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block font-medium dark:text-white">Original Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white"
            placeholder="Paste text to rewrite here..."
          />
          <div className="flex gap-4 items-center">
             <select 
               value={mode} 
               onChange={(e) => setMode(e.target.value as any)}
               className="p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 dark:text-white"
             >
               <option value="standard">Standard</option>
               <option value="fluent">Fluent</option>
               <option value="creative">Creative</option>
             </select>
             <button 
               onClick={handleParaphrase}
               disabled={loading}
               className="flex-grow py-2 bg-brand-600 text-white rounded font-bold hover:bg-brand-700 disabled:opacity-50 flex justify-center items-center gap-2"
             >
               {loading ? <RefreshCw className="animate-spin" /> : <RefreshCw />} Paraphrase
             </button>
          </div>
          {error && <div className="text-red-500 text-sm flex items-center gap-1"><AlertCircle size={16}/> {error}</div>}
        </div>

        <div className="space-y-4">
           <label className="block font-medium dark:text-white">Rewritten Text</label>
           <div className="relative w-full h-80 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-slate-300 overflow-auto whitespace-pre-wrap">
             {result ? result : <span className="text-slate-400">Result will appear here...</span>}
             
             {result && (
               <button 
                 onClick={() => navigator.clipboard.writeText(result)}
                 className="absolute top-2 right-2 p-2 bg-white dark:bg-slate-700 rounded shadow hover:text-brand-600"
               >
                 <Copy size={16}/>
               </button>
             )}
           </div>
        </div>
      </div>
    </ToolLayout>
  );
};