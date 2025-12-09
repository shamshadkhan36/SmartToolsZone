import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { PDFDocument } from 'pdf-lib';
import { Upload, Lock } from 'lucide-react';

export const PdfProtect: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const protectPdf = async () => {
    if (!file || !password) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Standard 128-bit AES encryption
      pdfDoc.encrypt({
        userPassword: password,
        ownerPassword: password, // Same for simplicity in this tool
        permissions: { printing: 'highResolution', modifying: false, copying: false, annotating: false, fillingForms: false, contentAccessibility: false, documentAssembly: false }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `protected-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert("Error protecting PDF. Note: Cannot protect already encrypted files.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      toolId="pdf-protect"
      title="Protect PDF"
      description="Secure your PDF files with a password. Client-side encryption."
    >
      <div className="space-y-6">
        {!file ? (
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center">
             <input type="file" id="pdf-prot-up" accept="application/pdf" onChange={handleFileChange} className="hidden" />
             <label htmlFor="pdf-prot-up" className="cursor-pointer flex flex-col items-center gap-4">
                <Lock size={48} className="text-brand-500" />
                <span className="font-bold dark:text-white">Upload PDF to Protect</span>
             </label>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
             <p className="font-bold mb-4 dark:text-white">Selected: {file.name}</p>
             <label className="block text-sm font-medium mb-2 dark:text-slate-300">Set Password</label>
             <input 
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full p-3 border rounded-lg mb-6 dark:bg-slate-900 dark:border-slate-600 dark:text-white"
               placeholder="Enter strong password"
             />
             <button 
               onClick={protectPdf}
               disabled={!password || isProcessing}
               className="w-full py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 disabled:opacity-50"
             >
               {isProcessing ? 'Encrypting...' : 'Download Protected PDF'}
             </button>
             <button onClick={() => setFile(null)} className="w-full mt-2 py-2 text-slate-500">Cancel</button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};