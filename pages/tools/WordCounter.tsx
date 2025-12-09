
import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Trash2, Copy } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({ words: 0, chars: 0, sentences: 0, paragraphs: 0 });

  useEffect(() => {
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    setStats({ words, chars, sentences, paragraphs });
  }, [text]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  return (
    <ToolLayout
      toolId="word-counter"
      title="Free Word Counter"
      description="Calculate words, characters, sentences, and paragraphs in real-time. Perfect for writers and SEOs."
      faqs={[
        { question: "Is this word counter accurate?", answer: "Yes, it uses standard algorithms to count words and characters instantly as you type." },
        { question: "Does it store my text?", answer: "No. This tool runs 100% in your browser. Your text is never sent to our servers, ensuring your privacy." },
        { question: "Does it count spaces?", answer: "The 'Characters' count typically includes spaces. We count raw characters." }
      ]}
      content={
        <>
          <h3>How to use the Word Counter</h3>
          <p>
            Using this tool is straightforward. Simply type directly into the text area or paste your document content from Word, Google Docs, or any other source. The statistics panel above the text box will update automatically in real-time as you type or delete content.
          </p>
          
          <h3>Why use a Word Counter?</h3>
          <p>
            Word count is a critical metric for many professionals. 
          </p>
          <ul>
            <li><strong>Writers & Authors:</strong> Adhering to publisher guidelines often requires strict word count limits.</li>
            <li><strong>Students:</strong> Academic essays and assignments usually have a minimum or maximum word requirement.</li>
            <li><strong>Social Media Managers:</strong> Platforms like Twitter (X) have hard character limits (280 characters). LinkedIn posts and Instagram captions also perform better at specific lengths.</li>
            <li><strong>SEO Professionals:</strong> Content length is a ranking factor. Ensure your blog posts and meta descriptions meet optimal length standards.</li>
          </ul>

          <h3>Features of SmartToolsZone Word Counter</h3>
          <p>
            Our tool goes beyond simple counting. We provide:
          </p>
          <ul>
            <li><strong>Instant Updates:</strong> No need to click a "Calculate" button. It happens as you type.</li>
            <li><strong>Sentence & Paragraph Count:</strong> Helps you analyze the structure and readability of your text.</li>
            <li><strong>Privacy Guaranteed:</strong> Since the code runs in your browser, your confidential text remains on your machine.</li>
          </ul>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-lg text-center">
            <span className="block text-2xl font-bold text-brand-600 dark:text-brand-400">{stats.words}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">Words</span>
          </div>
          <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-lg text-center">
            <span className="block text-2xl font-bold text-brand-600 dark:text-brand-400">{stats.chars}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">Characters</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg text-center">
            <span className="block text-2xl font-bold text-slate-700 dark:text-slate-300">{stats.sentences}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">Sentences</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg text-center">
            <span className="block text-2xl font-bold text-slate-700 dark:text-slate-300">{stats.paragraphs}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">Paragraphs</span>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            className="w-full h-64 p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 resize-y"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => setText('')}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 size={18} /> Clear
          </button>
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          >
            <Copy size={18} /> Copy Text
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};
