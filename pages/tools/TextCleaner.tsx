import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Trash2 } from 'lucide-react';

export const TextCleaner: React.FC = () => {
  const [text, setText] = useState('');

  const removeExtraSpaces = () => setText(text.replace(/\s+/g, ' ').trim());
  const removeLineBreaks = () => setText(text.replace(/(\r\n|\n|\r)/gm, " "));
  const removeHtml = () => setText(text.replace(/<[^>]*>?/gm, ''));

  return (
    <ToolLayout
      toolId="text-cleaner"
      title="Text Cleaner"
      description="Remove extra spaces, line breaks, and HTML tags from your text."
    >
       <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
             <button onClick={removeExtraSpaces} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-brand-500 hover:text-white">Remove Extra Spaces</button>
             <button onClick={removeLineBreaks} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-brand-500 hover:text-white">Remove Line Breaks</button>
             <button onClick={removeHtml} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-brand-500 hover:text-white">Remove HTML Tags</button>
             <button onClick={() => setText('')} className="ml-auto px-4 py-2 text-red-600"><Trash2 size={20}/></button>
          </div>
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)}
            placeholder="Paste text to clean..."
            className="w-full h-80 p-4 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white"
          />
       </div>
    </ToolLayout>
  );
};