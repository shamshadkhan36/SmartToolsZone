import React from 'react';
import { ToolLayout } from '../../components/ToolLayout';

export const UserAgentChecker: React.FC = () => {
  const ua = navigator.userAgent;

  return (
    <ToolLayout
      toolId="ua-checker"
      title="User Agent Checker"
      description="View your browser's user agent string. Useful for developers and debugging."
    >
      <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
         <p className="text-slate-500 dark:text-slate-400 mb-4">Your User Agent String:</p>
         <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-600 font-mono text-sm break-all text-brand-600 dark:text-brand-400">
            {ua}
         </div>
         <button 
           onClick={() => navigator.clipboard.writeText(ua)}
           className="mt-6 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
         >
            Copy to Clipboard
         </button>
      </div>
    </ToolLayout>
  );
};