
import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { PDFDocument } from 'pdf-lib';
import { Upload, X, FileImage, Download } from 'lucide-react';

export const JpgToPdf: React.FC = () => {
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

  const convertToPdf = async () => {
    if (files.length === 0) {
      alert("Please select at least 1 image file.");
      return;
    }

    setIsProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const isPng = file.type === 'image/png';
        
        let image;
        try {
            if (isPng) {
                image = await pdfDoc.embedPng(arrayBuffer);
            } else {
                image = await pdfDoc.embedJpg(arrayBuffer);
            }
        } catch (e) {
            console.warn(`Failed to embed image ${file.name}`, e);
            // Optionally continue or alert user
            continue; 
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      if (pdfDoc.getPageCount() === 0) {
          alert("No valid images could be processed. Please try different files.");
          setIsProcessing(false);
          return;
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'images-converted.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please ensure you uploaded valid JPG or PNG files.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      toolId="jpg-to-pdf"
      title="JPG to PDF Converter"
      description="Convert your images (JPG, PNG, WebP) into a single PDF document instantly. Free, secure, and works offline."
      faqs={[
        { question: "Are my photos uploaded to a server?", answer: "No. The conversion happens entirely in your browser using secure client-side technology. Your privacy is guaranteed." },
        { question: "Can I convert multiple images at once?", answer: "Yes, you can select multiple images and they will be compiled into a single PDF file, with one image per page." },
        { question: "Does it support PNG and WebP?", answer: "Yes, our tool supports JPG, JPEG, PNG, and typically WebP formats." },
        { question: "Is there a file size limit?", answer: "Since processing happens on your device, the limit depends on your browser's available memory, but typical files work perfectly." }
      ]}
      content={
          <>
            <h3>How to Convert JPG to PDF Online</h3>
            <p>
                Converting images to PDF is a great way to share a collection of photos, scanned documents, or receipts in a single, professional file. Our <strong>JPG to PDF Converter</strong> is designed to be fast, free, and incredibly easy to use.
            </p>
            <ol>
                <li><strong>Upload Images:</strong> Click the upload area to select your JPG or PNG files. You can select multiple files at once.</li>
                <li><strong>Review Selection:</strong> You will see a list of selected images. You can remove any unwanted images before conversion.</li>
                <li><strong>Convert:</strong> Click the "Convert to PDF" button. The tool will process the images instantly.</li>
                <li><strong>Download:</strong> Your new PDF file will be downloaded automatically to your device.</li>
            </ol>
            
            <h3>Benefits of Using Our Converter</h3>
            <ul>
                <li><strong>Privacy First:</strong> We use advanced client-side technology. Your personal photos and documents never leave your computer.</li>
                <li><strong>No Registration:</strong> You don't need to create an account or provide an email address.</li>
                <li><strong>High Quality:</strong> The tool preserves the original resolution of your images within the PDF pages.</li>
                <li><strong>Universal Compatibility:</strong> Works on Windows, Mac, Linux, Android, and iOS devices directly in the browser.</li>
            </ul>

            <h3>When to use JPG to PDF?</h3>
            <p>
                This tool is perfect for:
            </p>
            <ul>
                <li><strong>Students:</strong> Submitting homework assignments where you took photos of handwritten pages.</li>
                <li><strong>Freelancers:</strong> Combining receipts into a single expense report.</li>
                <li><strong>Designers:</strong> Sharing a portfolio of image assets in a viewable format.</li>
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
            accept="image/jpeg, image/png, image/jpg, image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
            <div className="p-4 bg-brand-100 dark:bg-brand-900/30 rounded-full text-brand-600 dark:text-brand-400">
              <Upload size={32} />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-900 dark:text-white">Click to Upload Images</p>
              <p className="text-sm text-slate-500">JPG, PNG, WebP supported</p>
            </div>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white">Selected Images ({files.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                  <div className="aspect-square bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                    <FileImage size={32} className="text-slate-400" />
                  </div>
                  <div className="p-2 text-xs truncate dark:text-slate-300">{file.name}</div>
                  <button 
                    onClick={() => removeFile(index)} 
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={convertToPdf}
          disabled={files.length === 0 || isProcessing}
          className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
             <>Processing...</>
          ) : (
             <><Download size={20} /> Convert to PDF</>
          )}
        </button>
      </div>
    </ToolLayout>
  );
};
