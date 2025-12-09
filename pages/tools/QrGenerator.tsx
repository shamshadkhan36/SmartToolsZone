import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Download, Link as LinkIcon } from 'lucide-react';

export const QrGenerator: React.FC = () => {
  const [input, setInput] = useState('https://smarttoolszone.com');
  const [size, setSize] = useState(200);
  const [qrUrl, setQrUrl] = useState('');

  // Use a reliable public API for the QR to avoid complex canvas deps in this environment
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        if(input) {
            setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(input)}`);
        }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [input, size]);

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert('Could not download automatically. Please right-click the image and "Save Image As"');
    }
  };

  return (
    <ToolLayout
      toolId="qr-generator"
      title="Free QR Code Generator"
      description="Create permanent QR codes for URLs, text, Wi-Fi, and more. Instant download."
      faqs={[
        { question: "Do these QR codes expire?", answer: "No, the QR codes generated here are static and will work forever." },
        { question: "Can I use this for commercial purposes?", answer: "Yes, you are free to use the generated codes for business cards, flyers, etc." }
      ]}
    >
        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Enter URL or Text
                    </label>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 text-slate-400" size={20}/>
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full pl-10 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white"
                            placeholder="https://example.com"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Image Size: {size}x{size}px
                    </label>
                    <input 
                        type="range" min="100" max="500" step="50"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="w-full accent-brand-500"
                    />
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-100 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                {input ? (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                            <img src={qrUrl} alt="Generated QR Code" className="max-w-full" />
                        </div>
                        <button 
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
                        >
                            <Download size={18} /> Download PNG
                        </button>
                    </>
                ) : (
                    <p className="text-slate-500">Enter text to generate QR</p>
                )}
            </div>
        </div>
    </ToolLayout>
  );
};
