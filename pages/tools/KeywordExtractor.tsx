import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Hash, BarChart2 } from 'lucide-react';

export const KeywordExtractor: React.FC = () => {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState<{word: string, count: number}[]>([]);

  const extractKeywords = () => {
    if (!text.trim()) return;

    // Simple tokenizer and frequency counter
    const stopWords = new Set(['the', 'is', 'in', 'and', 'to', 'of', 'a', 'for', 'on', 'with', 'as', 'at', 'by', 'an', 'be', 'this', 'that', 'it', 'from', 'or', 'are']);
    const words: string[] = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    const frequency: Record<string, number> = {};
    
    words.forEach(word => {
      if (!stopWords.has(word) && word.length > 2 && isNaN(Number(word))) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    });

    const sorted = Object.entries(frequency)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    setKeywords(sorted);
  };

  return (
    <ToolLayout
      toolId="keyword-extractor"
      title="Keyword Extractor"
      description="Find the most frequent keywords in your text to optimize for SEO."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-96 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white"
            placeholder="Paste your content here..."
          />
          <button 
            onClick={extractKeywords}
            className="w-full py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700"
          >
            Extract Keywords
          </button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 h-96 overflow-auto">
          <h3 className="font-bold text-lg mb-4 dark:text-white flex items-center gap-2">
            <BarChart2 size={20} /> Top Keywords
          </h3>
          {keywords.length > 0 ? (
            <div className="space-y-2">
              {keywords.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.word}</span>
                  <span className="bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded text-sm font-bold">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center mt-20">Results will appear here</p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};