import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Copy, Trash2, CheckCircle } from 'lucide-react';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  
  const formatJson = () => {
    try {
      if(!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 4));
      setError('');
    } catch (e) {
      setError("Invalid JSON format");
    }
  };

  const minifyJson = () => {
    try {
      if(!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError("Invalid JSON format");
    }
  };

  return (
    <ToolLayout
      toolId="json-formatter"
      title="JSON Formatter & Validator"
      description="Beautify, minify, and validate JSON data instantly."
      faqs={[{question: "Is data sent to a server?", answer: "No, all processing is done locally in your browser."}]}
    >
      <div className="space-y-4">
        <div className="flex gap-2 justify-end">
          <button onClick={formatJson} className="px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 text-sm">Beautify</button>
          <button onClick={minifyJson} className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 text-sm">Minify</button>
          <button onClick={() => setInput('')} className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded text-sm"><Trash2 size={16} /></button>
        </div>
        
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            placeholder="Paste your JSON here..."
            className={`w-full h-96 p-4 font-mono text-sm border rounded-lg bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-brand-500'}`}
          />
          {error && (
            <div className="absolute bottom-4 left-4 text-red-500 text-sm bg-white dark:bg-slate-800 px-2 py-1 rounded shadow">
              {error}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};