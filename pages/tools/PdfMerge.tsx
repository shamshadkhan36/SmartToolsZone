
import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { PDFDocument } from 'pdf-lib';
import { Upload, X, FileText, Download } from 'lucide-react';

export const PdfMerge: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged-document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert("An error occurred while merging PDFs. Please check if the files are valid PDFs.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      toolId="pdf-merge"
      title="Merge PDF Files"
      description="Combine multiple PDF files into one single document in seconds. 100% Free & Secure."
      faqs={[
        { question: "Is my data safe?", answer: "Yes! All processing happens in your browser. Your files are never uploaded to any server, ensuring complete privacy." },
        { question: "How many files can I merge?", answer: "There is no strict limit, but performance depends on your device memory. You can usually merge dozens of files without issues." },
        { question: "Does it work on Mac and Windows?", answer: "Yes, our tool works on any operating system (Windows, Mac, Linux) and any device (Desktop, Tablet, Mobile) with a modern web browser." },
        { question: "Can I merge PDF files with different page sizes?", answer: "Yes, the tool preserves the original page dimensions of each document you merge." }
      ]}
      content={
        <>
          <h3>How to Merge PDF Files Online</h3>
          <p>
            Merging PDF files is one of the most common document management tasks. Whether you are combining invoices for a client, putting together a portfolio, or merging chapters of a book, our <strong>Free PDF Merger</strong> makes it incredibly simple.
          </p>
          <ol>
            <li><strong>Select your files:</strong> Click the "Upload PDFs" button or drag and drop your files into the box above.</li>
            <li><strong>Review Selection:</strong> Ensure you have selected all the files you want to combine.</li>
            <li><strong>Merge:</strong> Click the "Merge PDFs" button. The tool will process your files instantly using client-side technology.</li>
            <li><strong>Download:</strong> Your new, single PDF document will download automatically to your device.</li>
          </ol>
          
          <h3>Why Use Our PDF Merger?</h3>
          <p>
            Unlike many other online tools that require you to create an account or pay for a subscription, SmartToolsZone offers this service completely free. Furthermore, we prioritize <strong>Security</strong>.
          </p>
          <p>
            Most online PDF tools upload your sensitive documents to a remote server to process them. This creates a risk of data breaches. Our tool uses <strong>Client-Side Processing</strong> technology. This means the actual merging logic runs directly inside your web browser. Your files never leave your computer, making it safe for confidential business documents, legal papers, or personal records.
          </p>

          <h3>Common Use Cases</h3>
          <ul>
            <li><strong>Business:</strong> Combining monthly reports, invoices, or receipts into a single file for accounting.</li>
            <li><strong>Education:</strong> Merging different assignment parts or research papers into one submission file.</li>
            <li><strong>Legal:</strong> Consolidating various evidence documents or contract pages.</li>
            <li><strong>Personal:</strong> Merging scanned photos or letters into a digital family album.</li>
          </ul>
        </>
      }
    >
      <div className="space-y-8">
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <input
            type="file"
            id="file-upload"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
            <div className="p-4 bg-brand-100 dark:bg-brand-900/30 rounded-full text-brand-600 dark:text-brand-400">
              <Upload size={32} />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-900 dark:text-white">Click to Upload PDFs</p>
              <p className="text-sm text-slate-500">or drag and drop files here</p>
            </div>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white">Selected Files ({files.length})</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="text-red-500" size={20} />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-xs">{file.name}</span>
                    <span className="text-xs text-slate-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <button onClick={() => removeFile(index)} className="text-slate-400 hover:text-red-500">
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={mergePdfs}
          disabled={files.length < 2 || isProcessing}
          className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
             <>Processing...</>
          ) : (
             <><Download size={20} /> Merge PDFs</>
          )}
        </button>
      </div>
    </ToolLayout>
  );
};
