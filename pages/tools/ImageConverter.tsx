import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Upload, Download, ArrowRight, Image as ImageIcon } from 'lucide-react';

export const ImageConverter: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState('image/png');
  const [convertedImage, setConvertedImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setImage(evt.target?.result as string);
      reader.readAsDataURL(file);
      setConvertedImage(null);
    }
  };

  const convert = () => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw white background for JPG transparency handling
        if (format === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        setConvertedImage(canvas.toDataURL(format));
      }
    };
  };

  return (
    <ToolLayout
      toolId="img-converter"
      title="Image Converter"
      description="Convert images between PNG, JPG, and WebP formats instantly."
    >
       <div className="space-y-8">
         {!image ? (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center bg-slate-50 dark:bg-slate-900">
              <input type="file" id="conv-upload" accept="image/*" onChange={handleUpload} className="hidden" />
              <label htmlFor="conv-upload" className="cursor-pointer flex flex-col items-center gap-4">
                <div className="p-4 bg-brand-100 dark:bg-brand-900/30 rounded-full text-brand-600 dark:text-brand-400">
                  <ImageIcon size={32} />
                </div>
                <span className="text-slate-900 dark:text-white font-medium">Upload Image</span>
              </label>
            </div>
         ) : (
           <div className="grid md:grid-cols-3 gap-8 items-center">
             <div className="text-center">
               <img src={image} alt="Original" className="max-h-64 mx-auto rounded border dark:border-slate-700" />
               <p className="mt-2 text-sm text-slate-500">Original</p>
             </div>
             
             <div className="flex flex-col gap-4 items-center">
               <ArrowRight className="hidden md:block text-slate-400" size={32} />
               <select 
                 value={format} 
                 onChange={(e) => setFormat(e.target.value)}
                 className="w-full p-2 border border-slate-300 rounded dark:bg-slate-800 dark:border-slate-600 dark:text-white"
               >
                 <option value="image/png">Convert to PNG</option>
                 <option value="image/jpeg">Convert to JPG</option>
                 <option value="image/webp">Convert to WebP</option>
               </select>
               <button 
                 onClick={convert}
                 className="w-full py-2 bg-brand-600 text-white rounded font-bold hover:bg-brand-700"
               >
                 Convert
               </button>
             </div>

             <div className="text-center">
               {convertedImage ? (
                 <>
                   <img src={convertedImage} alt="Converted" className="max-h-64 mx-auto rounded border dark:border-slate-700" />
                   <a 
                     href={convertedImage} 
                     download={`converted-image.${format.split('/')[1]}`}
                     className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                   >
                     <Download size={16} /> Download
                   </a>
                 </>
               ) : (
                 <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded text-slate-400 border border-dashed dark:border-slate-700">
                   Converted image here
                 </div>
               )}
             </div>
           </div>
         )}
         {image && (
            <button onClick={() => { setImage(null); setConvertedImage(null); }} className="mx-auto block text-slate-500 hover:text-red-500 text-sm">
                Reset
            </button>
         )}
       </div>
    </ToolLayout>
  );
};