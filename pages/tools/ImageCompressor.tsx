
import React, { useState, useRef } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Upload, Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

export const ImageCompressor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        compressImage(event.target?.result as string, quality);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (imageSrc: string, q: number) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            const url = URL.createObjectURL(blob);
            setCompressedImage(url);
            setIsProcessing(false);
          }
        }, 'image/jpeg', q);
      }
    };
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuality = parseFloat(e.target.value);
    setQuality(newQuality);
    if (originalImage) {
      compressImage(originalImage, newQuality);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ToolLayout
      toolId="img-compress"
      title="Image Compressor"
      description="Compress JPG and PNG images online without losing visible quality. Improve website speed with optimized images."
      faqs={[
        { question: "Does this support PNG transparency?", answer: "This tool converts images to optimized JPEG format for maximum compression, so transparency may be replaced by a white background." },
        { question: "Is my image uploaded?", answer: "No, all compression happens in your browser using local resources." },
        { question: "What formats are supported?", answer: "You can upload JPG, PNG, or WebP. The output will be a highly optimized JPG." }
      ]}
      content={
        <>
          <h3>How to Compress Images Online</h3>
          <p>
            Optimizing your images is crucial for web performance. Large images slow down your website, leading to poor user experience and lower SEO rankings. Our <strong>Image Compressor</strong> allows you to reduce file size significantly while maintaining excellent visual quality.
          </p>
          <ol>
            <li><strong>Upload:</strong> Click the upload box or drag your image file (JPG, PNG) onto the screen.</li>
            <li><strong>Adjust Quality:</strong> Use the slider to balance between file size and image quality. Lower percentage means smaller file size but potentially lower quality.</li>
            <li><strong>Download:</strong> Once satisfied with the preview, click "Download" to save the optimized image.</li>
          </ol>

          <h3>Why is Image Compression Important?</h3>
          <p>
            <strong>Website Speed:</strong> Images often account for the majority of a webpage's weight. Compressing them can make your site load 2x-3x faster.
          </p>
          <p>
            <strong>SEO Rankings:</strong> Google considers page speed a ranking factor. Faster sites rank higher in search results.
          </p>
          <p>
            <strong>Save Storage & Bandwidth:</strong> Smaller images take up less space on your server and consume less data for your mobile users.
          </p>

          <h3>Privacy Focused</h3>
          <p>
            We take your privacy seriously. Unlike other services that upload your photos to their cloud servers for processing, SmartToolsZone processes your images <strong>locally on your device</strong>. This means your personal photos, business assets, or documents never leave your computer.
          </p>
        </>
      }
    >
      <div className="space-y-6">
        {!originalImage ? (
           <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <input
              type="file"
              id="img-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="img-upload" className="cursor-pointer flex flex-col items-center gap-4">
              <div className="p-4 bg-brand-100 dark:bg-brand-900/30 rounded-full text-brand-600 dark:text-brand-400">
                <ImageIcon size={32} />
              </div>
              <div>
                <p className="text-lg font-medium text-slate-900 dark:text-white">Click to Upload Image</p>
                <p className="text-sm text-slate-500">JPG, PNG, WebP supported</p>
              </div>
            </label>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <h3 className="font-bold text-center dark:text-white">Original ({formatSize(originalSize)})</h3>
               <img src={originalImage} alt="Original" className="w-full rounded-lg border dark:border-slate-700" />
               
               <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                   Compression Level: {Math.round(quality * 100)}%
                 </label>
                 <input 
                   type="range" min="0.1" max="1" step="0.1" 
                   value={quality} 
                   onChange={handleQualityChange}
                   className="w-full accent-brand-500"
                 />
                 <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Small Size</span>
                    <span>High Quality</span>
                 </div>
               </div>
               
               <button onClick={() => { setOriginalImage(null); setCompressedImage(null); }} className="w-full py-2 text-slate-600 dark:text-slate-400 hover:text-red-500 text-sm">
                 Upload Different Image
               </button>
            </div>

            <div className="space-y-4">
               <h3 className="font-bold text-center dark:text-white">Compressed ({formatSize(compressedSize)})</h3>
               {isProcessing ? (
                 <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-lg">
                   <RefreshCw className="animate-spin text-brand-500" size={32} />
                 </div>
               ) : (
                 compressedImage && <img src={compressedImage} alt="Compressed" className="w-full rounded-lg border dark:border-slate-700" />
               )}
               
               {compressedImage && (
                 <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-lg text-center text-sm font-bold">
                   Savings: {formatSize(originalSize - compressedSize)} ({Math.round(((originalSize - compressedSize) / originalSize) * 100)}%)
                 </div>
               )}

               <a 
                 href={compressedImage || '#'} 
                 download="compressed-image.jpg"
                 className={`block w-full py-3 bg-brand-600 text-white text-center font-bold rounded-lg hover:bg-brand-700 transition-colors ${!compressedImage ? 'pointer-events-none opacity-50' : ''}`}
               >
                 <Download className="inline mr-2" size={18} /> Download
               </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
