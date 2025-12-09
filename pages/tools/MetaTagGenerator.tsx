import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Copy } from 'lucide-react';

export const MetaTagGenerator: React.FC = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    viewport: true,
    charset: true
  });

  const generatedCode = `<!-- Primary Meta Tags -->
<title>${form.title}</title>
<meta name="title" content="${form.title}">
<meta name="description" content="${form.description}">
<meta name="keywords" content="${form.keywords}">
<meta name="author" content="${form.author}">
${form.viewport ? '<meta name="viewport" content="width=device-width, initial-scale=1">' : ''}
${form.charset ? '<meta charset="UTF-8">' : ''}
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert("Meta tags copied!");
  };

  return (
    <ToolLayout
      toolId="meta-tag-generator"
      title="Meta Tag Generator"
      description="Create SEO-optimized meta tags for your website to improve search engine ranking."
      faqs={[
        { question: "Why are meta tags important?", answer: "They provide search engines with information about your page content." },
        { question: "Do keywords still matter?", answer: "While less critical for Google ranking than before, they can still help with relevance." }
      ]}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Site Title</label>
            <input 
              type="text" 
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 dark:text-white"
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
              placeholder="e.g., SmartToolsZone - Free Online Tools"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description (Max 160 chars recommended)</label>
            <textarea 
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 dark:text-white h-24"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              placeholder="A brief description of your page content..."
            ></textarea>
            <p className="text-xs text-right text-slate-500">{form.description.length} chars</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Keywords (Comma separated)</label>
            <input 
              type="text" 
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 dark:text-white"
              value={form.keywords}
              onChange={(e) => setForm({...form, keywords: e.target.value})}
              placeholder="tools, pdf, seo, calculator"
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Author</label>
             <input 
               type="text" 
               className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 dark:text-white"
               value={form.author}
               onChange={(e) => setForm({...form, author: e.target.value})}
             />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input type="checkbox" checked={form.viewport} onChange={(e) => setForm({...form, viewport: e.target.checked})} className="rounded text-brand-600" />
                Include Viewport
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input type="checkbox" checked={form.charset} onChange={(e) => setForm({...form, charset: e.target.checked})} className="rounded text-brand-600" />
                Include Charset
            </label>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Generated HTML</label>
          <div className="relative bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm h-full max-h-[400px] overflow-auto">
            <pre>{generatedCode}</pre>
            <button 
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded text-white transition-colors"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};