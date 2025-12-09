import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Copy, Download } from 'lucide-react';

export const RobotsTxtGenerator: React.FC = () => {
  const [allowAll, setAllowAll] = useState(true);
  const [sitemap, setSitemap] = useState('');
  const [disallowed, setDisallowed] = useState('/admin/\n/private/');
  
  const output = `User-agent: *
${allowAll ? 'Allow: /' : 'Disallow: /'}
${disallowed.split('\n').filter(l => l.trim()).map(l => `Disallow: ${l.trim()}`).join('\n')}
${sitemap ? `Sitemap: ${sitemap}` : ''}`;

  return (
    <ToolLayout
      toolId="robots-generator"
      title="Robots.txt Generator"
      description="Create a robots.txt file to control how search engines crawl your website."
    >
       <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
             <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-700">
                <label className="block mb-2 font-medium dark:text-white">Default Access</label>
                <div className="flex gap-4">
                   <label className="flex items-center gap-2 dark:text-slate-300">
                      <input type="radio" checked={allowAll} onChange={() => setAllowAll(true)} /> Allow All
                   </label>
                   <label className="flex items-center gap-2 dark:text-slate-300">
                      <input type="radio" checked={!allowAll} onChange={() => setAllowAll(false)} /> Disallow All
                   </label>
                </div>
             </div>
             
             <div>
                <label className="block mb-2 font-medium dark:text-white">Disallow Paths (one per line)</label>
                <textarea 
                  value={disallowed} 
                  onChange={e => setDisallowed(e.target.value)}
                  className="w-full h-32 p-3 border rounded dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                />
             </div>

             <div>
                <label className="block mb-2 font-medium dark:text-white">Sitemap URL (Optional)</label>
                <input 
                  type="text"
                  value={sitemap} 
                  onChange={e => setSitemap(e.target.value)}
                  className="w-full p-3 border rounded dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                  placeholder="https://example.com/sitemap.xml"
                />
             </div>
          </div>

          <div className="space-y-4">
             <label className="block font-medium dark:text-white">Generated File</label>
             <textarea 
                readOnly
                value={output}
                className="w-full h-64 p-4 font-mono text-sm bg-slate-900 text-green-400 rounded-lg"
             />
             <div className="flex gap-4">
                <button onClick={() => navigator.clipboard.writeText(output)} className="flex-1 py-2 bg-slate-200 dark:bg-slate-700 dark:text-white rounded hover:bg-slate-300 flex justify-center items-center gap-2"><Copy size={16}/> Copy</button>
             </div>
          </div>
       </div>
    </ToolLayout>
  );
};