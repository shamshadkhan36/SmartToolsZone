import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Copy, Download, RefreshCw, FileCode } from 'lucide-react';

export const XmlSitemapGenerator: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState('https://mysite.com');
  const [pages, setPages] = useState('/ \n/about \n/services \n/contact \n/blog');
  const [frequency, setFrequency] = useState('monthly');
  const [priority, setPriority] = useState('0.8');
  const [xmlOutput, setXmlOutput] = useState('');

  const generateSitemap = () => {
    // Basic validation
    let cleanBaseUrl = baseUrl.trim();
    if (!cleanBaseUrl.startsWith('http')) {
        cleanBaseUrl = 'https://' + cleanBaseUrl;
    }
    if (cleanBaseUrl.endsWith('/')) {
        cleanBaseUrl = cleanBaseUrl.slice(0, -1);
    }

    const date = new Date().toISOString().split('T')[0];
    const lines = pages.split('\n').filter(line => line.trim() !== '');

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    lines.forEach(line => {
        let path = line.trim();
        if (!path.startsWith('/')) path = '/' + path;
        // Handle root if user typed just /
        const fullUrl = (path === '/') ? cleanBaseUrl : `${cleanBaseUrl}${path}`;
        
        xml += '  <url>\n';
        xml += `    <loc>${fullUrl}</loc>\n`;
        xml += `    <lastmod>${date}</lastmod>\n`;
        xml += `    <changefreq>${frequency}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>';
    setXmlOutput(xml);
  };

  const handleCopy = () => {
    if (!xmlOutput) return;
    navigator.clipboard.writeText(xmlOutput);
    alert('Sitemap copied to clipboard!');
  };

  const handleDownload = () => {
    if (!xmlOutput) return;
    const blob = new Blob([xmlOutput], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolLayout
      toolId="xml-sitemap-generator"
      title="XML Sitemap Generator"
      description="Generate a Google-compliant XML sitemap for your website instantly to improve SEO indexing."
      faqs={[
        { question: "What is an XML Sitemap?", answer: "It is a file that lists essential pages of a website, making sure Google and other search engines can find and crawl them all." },
        { question: "How often should I update it?", answer: "You should update your sitemap whenever you add new pages or significantly update content." }
      ]}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Website URL
              </label>
              <input 
                type="text" 
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
                placeholder="https://example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Change Frequency
                    </label>
                    <select 
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
                    >
                        <option value="always">Always</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="never">Never</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Priority (0.0 - 1.0)
                    </label>
                    <select 
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
                    >
                        <option value="1.0">1.0 (High)</option>
                        <option value="0.9">0.9</option>
                        <option value="0.8">0.8</option>
                        <option value="0.7">0.7</option>
                        <option value="0.6">0.6</option>
                        <option value="0.5">0.5 (Medium)</option>
                        <option value="0.4">0.4</option>
                        <option value="0.3">0.3</option>
                        <option value="0.2">0.2</option>
                        <option value="0.1">0.1 (Low)</option>
                    </select>
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Pages (one URL per line)
              </label>
              <textarea 
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                className="w-full h-48 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white font-mono text-sm"
                placeholder="/page1&#10;/page2&#10;/blog/post-1"
              />
            </div>

            <button 
                onClick={generateSitemap}
                className="w-full py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors flex justify-center items-center gap-2"
            >
                <RefreshCw size={20} /> Generate Sitemap
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
             <div className="flex justify-between items-center mb-2">
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Generated XML
                </label>
                {xmlOutput && (
                    <div className="flex gap-2">
                         <button onClick={handleCopy} className="text-xs flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-brand-600">
                             <Copy size={14} /> Copy
                         </button>
                    </div>
                )}
             </div>
             <div className="relative w-full h-[500px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                 {xmlOutput ? (
                     <textarea 
                        readOnly
                        value={xmlOutput}
                        className="w-full h-full bg-transparent text-green-400 p-4 font-mono text-sm focus:outline-none resize-none"
                     />
                 ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                         <FileCode size={48} className="opacity-20" />
                         <p>Click Generate to see the code here</p>
                     </div>
                 )}
             </div>

             <button 
                onClick={handleDownload}
                disabled={!xmlOutput}
                className="w-full py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
             >
                 <Download size={20} /> Download sitemap.xml
             </button>
        </div>
      </div>
    </ToolLayout>
  );
};