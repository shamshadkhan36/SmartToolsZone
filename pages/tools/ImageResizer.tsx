
import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Image as ImageIcon, Download, Upload, RefreshCw, Trash2, ArrowRight } from 'lucide-react';

export const ImageResizer: React.FC = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image');
  const [fileType, setFileType] = useState<string>('image/jpeg');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(true);
  const [origRatio, setOrigRatio] = useState(1);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files?.[0]) {
         const file = e.target.files[0];
         setFileName(file.name.split('.')[0]);
         setFileType(file.type);
         
         const reader = new FileReader();
         reader.onload = (evt) => {
             const img = new window.Image();
             img.onload = () => {
                 setImgSrc(img.src);
                 setWidth(img.width);
                 setHeight(img.height);
                 setOrigRatio(img.width / img.height);
                 setResizedImage(null);
             };
             img.src = evt.target?.result as string;
         };
         reader.readAsDataURL(file);
     }
  };

  const handleWidthChange = (val: number) => {
      const newWidth = Math.max(1, val);
      setWidth(newWidth);
      if (aspectRatio) setHeight(Math.round(newWidth / origRatio));
  };

  const handleHeightChange = (val: number) => {
      const newHeight = Math.max(1, val);
      setHeight(newHeight);
      if (aspectRatio) setWidth(Math.round(newHeight * origRatio));
  };

  const resize = () => {
      if (!imgSrc) return;
      setIsProcessing(true);

      // Use setTimeout to allow UI to render the loading state
      setTimeout(() => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          const img = new window.Image();
          
          img.onload = () => {
              // High quality image smoothing
              if (ctx) {
                  ctx.imageSmoothingEnabled = true;
                  ctx.imageSmoothingQuality = 'high';
                  ctx.drawImage(img, 0, 0, width, height);
                  
                  // Attempt to preserve format, fallback to png if issue, or jpeg 0.92 quality
                  const outputType = fileType === 'image/png' || fileType === 'image/webp' ? fileType : 'image/jpeg';
                  setResizedImage(canvas.toDataURL(outputType, 0.92));
              }
              setIsProcessing(false);
          };
          img.src = imgSrc;
      }, 100);
  };

  const reset = () => {
      setImgSrc(null);
      setResizedImage(null);
      setWidth(0);
      setHeight(0);
  };

  return (
    <ToolLayout
      toolId="img-resizer"
      title="Free Online Image Resizer"
      description="Resize JPG, PNG, and WebP images to exact pixel dimensions instantly. 100% free, secure, and client-side."
      faqs={[
          { question: "Does resizing reduce quality?", answer: "Scaling down usually maintains quality. Scaling up significantly may cause pixelation. Our tool uses high-quality resampling to minimize quality loss." },
          { question: "Is my image uploaded to a server?", answer: "No. All processing is done locally in your browser for maximum privacy and speed." },
          { question: "What formats are supported?", answer: "We support JPG, JPEG, PNG, and WebP formats." }
      ]}
      content={
          <>
            <h3>How to Resize Images Online</h3>
            <p>
                Resizing images for social media, websites, or print has never been easier. Our <strong>Free Image Resizer</strong> allows you to adjust the dimensions of your photos in seconds directly from your browser.
            </p>
            <ol>
                <li><strong>Upload Image:</strong> Select your file (JPG, PNG, WebP) by clicking the upload area.</li>
                <li><strong>Set Dimensions:</strong> Enter your desired Width or Height. By default, the tool locks the <strong>Aspect Ratio</strong> to prevent the image from looking stretched or squashed.</li>
                <li><strong>Resize:</strong> Click the "Resize Image" button.</li>
                <li><strong>Download:</strong> Save your perfectly sized image instantly.</li>
            </ol>
            
            <h3>Why Use This Tool?</h3>
            <ul>
                <li><strong>Social Media Ready:</strong> Quickly create images for Instagram (1080x1080), YouTube thumbnails (1280x720), or Twitter headers.</li>
                <li><strong>Web Performance:</strong> Reduce large camera photos to web-friendly sizes (e.g., 800px width) to make your website load faster.</li>
                <li><strong>Privacy First:</strong> Your photos never leave your device. We use HTML5 Canvas technology to process everything locally.</li>
            </ul>
          </>
      }
    >
      <div className="space-y-8">
         {!imgSrc ? (
             <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                 <input type="file" id="res-up" accept="image/*" onChange={handleUpload} className="hidden" />
                 <label htmlFor="res-up" className="cursor-pointer flex flex-col items-center gap-4">
                     <div className="p-4 bg-brand-100 dark:bg-brand-900/30 rounded-full text-brand-600 dark:text-brand-400">
                        <ImageIcon size={48} />
                     </div>
                     <div>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">Click to Upload Image</p>
                        <p className="text-slate-500 mt-2">JPG, PNG, WebP</p>
                     </div>
                 </label>
             </div>
         ) : (
             <div className="grid lg:grid-cols-2 gap-8">
                 {/* Controls Column */}
                 <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <ImageIcon size={20}/> Resize Settings
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Width (px)</label>
                                <input 
                                    type="number" 
                                    value={width} 
                                    onChange={e => handleWidthChange(Number(e.target.value))} 
                                    className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-brand-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Height (px)</label>
                                <input 
                                    type="number" 
                                    value={height} 
                                    onChange={e => handleHeightChange(Number(e.target.value))} 
                                    className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-brand-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-6 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-100 dark:border-brand-900">
                            <input 
                                type="checkbox" 
                                id="aspect"
                                checked={aspectRatio} 
                                onChange={e => setAspectRatio(e.target.checked)} 
                                className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
                            /> 
                            <label htmlFor="aspect" className="text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
                                Maintain Aspect Ratio
                            </label>
                        </div>

                        <div className="space-y-3">
                            <button 
                                onClick={resize} 
                                disabled={isProcessing}
                                className="w-full py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30 flex justify-center items-center gap-2 disabled:opacity-70"
                            >
                                {isProcessing ? <RefreshCw className="animate-spin" /> : <RefreshCw />} Resize Image
                            </button>
                            <button 
                                onClick={reset} 
                                className="w-full py-2 text-slate-500 hover:text-red-500 text-sm flex justify-center items-center gap-2"
                            >
                                <Trash2 size={16} /> Discard & Start Over
                            </button>
                        </div>
                    </div>

                    {/* Original Preview (Small) */}
                    <div className="opacity-75">
                         <p className="text-xs font-bold uppercase text-slate-500 mb-2">Original Image</p>
                         <img src={imgSrc} alt="Original" className="max-h-32 rounded border dark:border-slate-700" />
                    </div>
                 </div>

                 {/* Preview Column */}
                 <div className="flex flex-col">
                     <div className="flex-grow bg-slate-100 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center p-6 min-h-[400px]">
                         {resizedImage ? (
                             <>
                                <img src={resizedImage} alt="Resized" className="max-w-full max-h-[400px] mb-6 shadow-xl rounded-lg" />
                                <div className="text-center w-full">
                                    <p className="text-sm text-slate-500 mb-4">
                                        New Size: <strong>{width} x {height}</strong>
                                    </p>
                                    <a 
                                        href={resizedImage} 
                                        download={`${fileName}-resized.${fileType.split('/')[1]}`} 
                                        className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                                    >
                                        <Download size={20}/> Download Image
                                    </a>
                                </div>
                             </>
                         ) : (
                             <div className="text-center text-slate-400">
                                 <ArrowRight size={48} className="mx-auto mb-4 opacity-20" />
                                 <p>Resized preview will appear here</p>
                             </div>
                         )}
                     </div>
                 </div>
             </div>
         )}
      </div>
    </ToolLayout>
  );
};
