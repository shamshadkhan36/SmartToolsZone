
import React, { useState, useRef, useEffect } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Upload, Download, Eraser, MousePointerClick, RefreshCw, Image as ImageIcon } from 'lucide-react';

export const BackgroundRemover: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState<number>(20);
  const [selectedColor, setSelectedColor] = useState<{r: number, g: number, b: number} | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setProcessedImage(null);
        setSelectedColor(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw the original image onto the canvas when loaded
  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
      };
    }
  }, [imageSrc]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    setSelectedColor({ r: pixel[0], g: pixel[1], b: pixel[2] });
    
    // Trigger removal immediately on click
    removeBackground({ r: pixel[0], g: pixel[1], b: pixel[2] }, tolerance);
  };

  const removeBackground = (targetColor: {r: number, g: number, b: number} | null, tol: number) => {
    if (!imageSrc || !canvasRef.current || !targetColor) return;

    setIsProcessing(true);
    
    // Use setTimeout to allow UI to update loading state
    setTimeout(() => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Reload original to process fresh
      const img = new Image();
      img.src = imageSrc;
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Calculate distance from target color
          const distance = Math.sqrt(
            Math.pow(r - targetColor.r, 2) +
            Math.pow(g - targetColor.g, 2) +
            Math.pow(b - targetColor.b, 2)
          );

          // Normalized tolerance (0-100 mapped to distance)
          // Max distance in RGB is ~441. Tolerance 100 should cover significantly.
          const maxDist = 441; 
          const threshold = (tol / 100) * maxDist;

          if (distance < threshold) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        setProcessedImage(canvas.toDataURL('image/png'));
        setIsProcessing(false);
      };
    }, 50);
  };

  // Re-run if tolerance changes and we have a selected color
  useEffect(() => {
    if (selectedColor) {
      removeBackground(selectedColor, tolerance);
    }
  }, [tolerance]);

  const reset = () => {
    if (imageSrc && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            ctx?.clearRect(0,0, canvas.width, canvas.height);
            ctx?.drawImage(img, 0, 0);
            setProcessedImage(null);
            setSelectedColor(null);
        }
    }
  };

  return (
    <ToolLayout
      toolId="background-remover"
      title="Background Remover (Magic Eraser)"
      description="Remove backgrounds from images instantly for free. Click a color to erase it."
      faqs={[
        { question: "Is this automatic?", answer: "This tool works like a 'Magic Wand'. You click the background color you want to remove, and it erases matching pixels." },
        { question: "Is it free?", answer: "Yes, 100% free and client-side. No limits." }
      ]}
    >
      <div className="space-y-6">
        {!imageSrc ? (
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <input
              type="file"
              id="bg-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="bg-upload" className="cursor-pointer flex flex-col items-center gap-4">
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Eraser size={20} /> Controls
                </h3>
                
                <div className="mb-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <strong>Step 1:</strong> Click on the background color in the image.
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Step 2:</strong> Adjust tolerance if needed.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Tolerance: {tolerance}
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={tolerance} 
                    onChange={(e) => setTolerance(Number(e.target.value))}
                    className="w-full accent-brand-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Precise</span>
                    <span>Broad</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                    <button 
                        onClick={reset}
                        className="w-full py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={16} /> Reset Image
                    </button>
                    <button 
                        onClick={() => { setImageSrc(null); setProcessedImage(null); }}
                        className="w-full py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        Upload New Image
                    </button>
                </div>
              </div>

              {processedImage && (
                 <a 
                   href={processedImage} 
                   download="removed-background.png"
                   className="block w-full py-3 bg-brand-600 text-white font-bold rounded-xl text-center hover:bg-brand-700 shadow-lg transition-colors"
                 >
                   <Download className="inline mr-2" size={20} /> Download PNG
                 </a>
              )}
            </div>

            {/* Canvas Area */}
            <div className="lg:col-span-2 bg-slate-100 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-4 flex items-center justify-center overflow-hidden relative min-h-[400px]">
               {/* Checkered background for transparency */}
               <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
                   backgroundImage: `linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)`,
                   backgroundSize: '20px 20px',
                   backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
               }}></div>

               <div className="relative z-10 cursor-crosshair group">
                   <canvas 
                     ref={canvasRef} 
                     onClick={handleCanvasClick}
                     className="max-w-full max-h-[600px] shadow-xl rounded"
                   />
                   {!selectedColor && (
                       <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap flex items-center gap-2">
                           <MousePointerClick size={16} /> Click to remove color
                       </div>
                   )}
                   {isProcessing && (
                       <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center">
                           <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-xl flex items-center gap-3">
                               <RefreshCw className="animate-spin text-brand-500" />
                               <span className="font-bold text-slate-900 dark:text-white">Processing...</span>
                           </div>
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
