import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { summarizeText } from '../../services/geminiService';
import { Sparkles, AlertCircle } from 'lucide-react';

export const AiSummarizer: React.FC = () => {
  const [input, setInput] = useState('');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!input.trim()) {
      setError('Please enter text to summarize.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const summary = await summarizeText(input, length);
      setResult(summary);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      toolId="ai-summarizer"
      title="AI Text Summarizer"
      description="Condense long articles, essays, or documents into short, easy-to-read summaries using AI."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block font-medium dark:text-white">Original Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white"
            placeholder="Paste your long text here..."
          />
          <div className="flex gap-4 items-center">
             <select 
               value={length} 
               onChange={(e) => setLength(e.target.value as any)}
               className="p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 dark:text-white"
             >
               <option value="short">Short Summary</option>
               <option value="medium">Medium Summary</option>
               <option value="long">Detailed Summary</option>
             </select>
             <button 
               onClick={handleSummarize}
               disabled={loading}
               className="flex-grow py-2 bg-brand-600 text-white rounded font-bold hover:bg-brand-700 disabled:opacity-50 flex justify-center items-center gap-2"
             >
               {loading ? <Sparkles className="animate-spin" /> : <Sparkles />} Summarize
             </button>
          </div>
          {error && <div className="text-red-500 text-sm flex items-center gap-1"><AlertCircle size={16}/> {error}</div>}
        </div>

        <div className="space-y-4">
           <label className="block font-medium dark:text-white">Summary</label>
           <div className="w-full h-80 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-slate-300 overflow-auto">
             {result ? (
               <div className="prose dark:prose-invert">
                 <div dangerouslySetInnerHTML={{ __html: result }} />
               </div>
             ) : (
               <div className="h-full flex items-center justify-center text-slate-400">
                 Summary will appear here...
               </div>
             )}
           </div>
        </div>
      </div>
    </ToolLayout>
  );
};