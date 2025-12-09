import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Copy } from 'lucide-react';

export const TextConverter: React.FC = () => {
  const [text, setText] = useState('');

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
  };
  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()));
  };

  return (
    <ToolLayout
      toolId="case-converter"
      title="Case Converter"
      description="Easily convert text to Uppercase, Lowercase, Title Case, and Sentence Case."
    >
       <div className="space-y-4">
         <div className="flex flex-wrap gap-2">
           <button onClick={toUpperCase} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-brand-500 hover:text-white transition-colors">UPPERCASE</button>
           <button onClick={toLowerCase} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-brand-500 hover:text-white transition-colors">lowercase</button>
           <button onClick={toTitleCase} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-brand-500 hover:text-white transition-colors">Title Case</button>
           <button onClick={toSentenceCase} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-brand-500 hover:text-white transition-colors">Sentence case</button>
           <button onClick={() => navigator.clipboard.writeText(text)} className="ml-auto px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700 flex items-center gap-2"><Copy size={16}/> Copy</button>
         </div>
         <textarea
           value={text}
           onChange={(e) => setText(e.target.value)}
           placeholder="Type or paste text here..."
           className="w-full h-64 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
         />
       </div>
    </ToolLayout>
  );
};