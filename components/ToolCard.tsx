import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';
import { ArrowRight, Star, Sparkles } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const Icon = tool.icon;

  return (
    <Link 
      to={tool.path}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Decorative Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent dark:from-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-700 dark:text-slate-300 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-brand-500/30">
            <Icon size={28} />
          </div>
          
          <div className="flex gap-2">
            {tool.isNew && (
              <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full">
                <Sparkles size={10} /> New
              </span>
            )}
            {tool.popular && (
              <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full">
                <Star size={10} fill="currentColor" /> Hot
              </span>
            )}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {tool.name}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {tool.description}
        </p>
        
        <div className="flex items-center text-sm font-bold text-brand-600 dark:text-brand-400 mt-auto">
          Try Tool <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
};