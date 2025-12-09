import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, Scissors, FileText } from 'lucide-react';

export const PdfSplit: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      // Load to get page count
      const arrayBuffer = await f.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
      setPageRange(`1-${pdf.getPageCount()}`);
    }
  };

  const splitPdf = async () => {
    if (!file || !pageRange) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // Parse range "1,3,5-7"
      const indices: number[] = [];
      const parts = pageRange.split(',');
      
      parts.forEach(part => {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          for (let i = start; i <= end; i++) indices.push(i - 1); // 0-based
        } else {
          indices.push(Number(part) - 1);
        }
      });

      // Filter valid indices
      const validIndices = indices.filter(i => i >= 0 && i < srcPdf.getPageCount());
      
      if (validIndices.length === 0) {
        alert("Invalid page range.");
        setIsProcessing(false);
        return;
      }

      const copiedPages = await newPdf.copyPages(srcPdf, validIndices);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `split-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert("Error splitting PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      toolId="pdf-split"
      title="Split PDF"
      description="Extract specific pages from your PDF file instantly."
    >
       <div className="space-y-6">
          {!file ? (
             <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center">
                <input type="file" id="pdf-split-up" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                <label htmlFor="pdf-split-up" className="cursor-pointer flex flex-col items-center gap-4">
                   <Scissors size={48} className="text-brand-500" />
                   <span className="font-bold dark:text-white">Upload PDF to Split</span>
                </label>
             </div>
          ) : (
             <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                   <FileText size={24} className="text-red-500" />
                   <div>
                      <p className="font-bold dark:text-white">{file.name}</p>
                      <p className="text-sm text-slate-500">{pageCount} Pages</p>
                   </div>
                </div>

                <label className="block text-sm font-medium mb-2 dark:text-slate-300">Pages to Extract (e.g. 1,3,5-10)</label>
                <input 
                  type="text" 
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  className="w-full p-3 border rounded-lg mb-6 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                />

                <button 
                  onClick={splitPdf}
                  disabled={isProcessing}
                  className="w-full py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Download Split PDF'}
                </button>
                <button onClick={() => setFile(null)} className="w-full mt-2 py-2 text-slate-500">Cancel</button>
             </div>
          )}
       </div>
    </ToolLayout>
  );
};