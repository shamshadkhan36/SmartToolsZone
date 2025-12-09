import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { Globe, MapPin } from 'lucide-react';

export const IpFinder: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
          setData(data);
          setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ToolLayout
      toolId="ip-finder"
      title="My IP Address"
      description="Find your public IP address, location, and ISP details."
    >
      <div className="max-w-xl mx-auto">
         {loading ? (
             <div className="text-center py-20 text-slate-500">Scanning network...</div>
         ) : data ? (
             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                 <div className="bg-brand-600 p-8 text-center text-white">
                     <p className="opacity-80 mb-2">Your Public IP</p>
                     <h2 className="text-4xl font-mono font-bold">{data.ip}</h2>
                 </div>
                 <div className="p-6 space-y-4">
                     <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                         <span className="text-slate-500 dark:text-slate-400">City</span>
                         <span className="font-medium dark:text-white">{data.city}</span>
                     </div>
                     <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                         <span className="text-slate-500 dark:text-slate-400">Region</span>
                         <span className="font-medium dark:text-white">{data.region}</span>
                     </div>
                     <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                         <span className="text-slate-500 dark:text-slate-400">Country</span>
                         <span className="font-medium dark:text-white">{data.country_name}</span>
                     </div>
                     <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                         <span className="text-slate-500 dark:text-slate-400">ISP</span>
                         <span className="font-medium dark:text-white">{data.org}</span>
                     </div>
                     <div className="flex justify-between">
                         <span className="text-slate-500 dark:text-slate-400">Timezone</span>
                         <span className="font-medium dark:text-white">{data.timezone}</span>
                     </div>
                 </div>
             </div>
         ) : (
             <div className="text-center text-red-500">Failed to fetch IP details. Adblocker might be interfering.</div>
         )}
      </div>
    </ToolLayout>
  );
};