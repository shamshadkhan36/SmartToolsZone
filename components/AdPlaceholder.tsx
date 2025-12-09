
import React from 'react';

interface AdPlaceholderProps {
  slotId: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slotId, format = 'horizontal', className = '' }) => {
  // ---------------------------------------------------------------------------
  // ADVERTISEMENT TOGGLE
  // KEEP THIS FALSE UNTIL ADSENSE APPROVAL
  // ---------------------------------------------------------------------------
  const showAds = false;

  if (!showAds) {
    return null;
  }

  // CLS Protection: strictly enforce heights to prevent layout jumping
  // Horizontal (Leaderboard): 90px mobile / 90px desktop
  // Vertical (Sidebar): 600px
  // Rectangle (In-content): 250px/280px

  let sizeClass = 'h-[100px] w-full max-w-[728px]'; 
  if (format === 'vertical') sizeClass = 'h-[600px] w-full max-w-[300px]';
  if (format === 'rectangle') sizeClass = 'h-[280px] w-full max-w-[336px]';

  return (
    <div 
      id={`ad-slot-${slotId}`}
      className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800/50 rounded-xl flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700/50 my-8 mx-auto ${sizeClass} ${className}`}
    >
      {/* Wireframe lines to make it look designed, not broken */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #cbd5e1 25%, transparent 25%, transparent 50%, #cbd5e1 50%, #cbd5e1 75%, transparent 75%, transparent 100%)', backgroundSize: '20px 20px' }}></div>
      
      <div className="relative z-10 text-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
          Advertisement
        </span>
      </div>
    </div>
  );
};
