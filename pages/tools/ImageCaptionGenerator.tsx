import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { generateImageCaption } from '../../services/geminiService';
import { Upload, Camera, Hash } from 'lucide-react';

export const ImageCaptionGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files[0]) {
         const reader = new FileReader();
         reader.onload = (evt) => {
             setImage(evt.target?.result as string);
             setCaption('');
         };
         reader.readAsDataURL(e.target.files[0]);
     }
  };

  const generate = async () => {
      if (!image) return;
      setLoading(true);
      try {
          const result = await generateImageCaption(image);
          setCaption(result);
      } catch (e) {
          setCaption("Error generating caption. Please try again.");
      } finally {
          setLoading(false);
      }
  };

  return (
    <ToolLayout
      toolId="image-caption"
      title="AI Image Caption Generator"
      description="Upload an image and let AI write SEO-friendly captions and hashtags for Instagram/Social Media."
    >
      <div className="grid md:grid-cols-2 gap-8">
         <div className="space-y-4">
            {!image ? (
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center">
                    <input type="file" id="caption-up" accept="image/*" onChange={handleUpload} className="hidden" />
                    <label htmlFor="caption-up" className="cursor-pointer flex flex-col items-center gap-4">
                        <Camera size={48} className="text-brand-500" />
                        <span className="font-bold dark:text-white">Upload Image</span>
                    </label>
                </div>
            ) : (
                <div className="relative">
                    <img src={image} alt="To Caption" className="w-full rounded-lg border dark:border-slate-700" />
                    <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded text-xs">Remove</button>
                </div>
            )}
            <button 
                onClick={generate}
                disabled={!image || loading}
                className="w-full py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 disabled:opacity-50"
            >
                {loading ? 'Analyzing Image...' : 'Generate Caption'}
            </button>
         </div>

         <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[300px]">
            <h3 className="font-bold mb-4 dark:text-white flex items-center gap-2"><Hash size={20}/> AI Output</h3>
            {caption ? (
                <div className="prose dark:prose-invert text-sm whitespace-pre-wrap">
                    {caption}
                </div>
            ) : (
                <div className="text-slate-400 text-center mt-20">
                    Upload image and click generate to see magic.
                </div>
            )}
         </div>
      </div>
    </ToolLayout>
  );
};