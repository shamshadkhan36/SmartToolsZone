
import React, { useState } from "react";
import { Loader2, CheckCircle, AlertCircle, Mail } from "lucide-react";

export const SubscribeBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMsg("Please enter a valid email address.");
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMsg("");

    try {
      // Using no-cors mode as Google Scripts often have CORS issues with direct fetch from browser
      // Note: In no-cors, we can't read the response JSON, so we assume success if no network error throws.
      // Ideally, your Google Script should return JSONP or handle CORS options.
      // However, for this specific script URL pattern, often a simple POST works.
      
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycby5X6elDFQo9gxM54Qi0ibq2EnEx-EOyTILJHeNxZAN6i30eYyYzKjJg-sB5IiFlFDP/exec",
        {
          method: "POST",
          mode: "no-cors", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      // Since mode is no-cors, we can't check res.ok or data.success. 
      // We assume it went through if no error was caught.
      setStatus('success');
      setMsg("🎉 You're subscribed! Check your inbox soon.");
      setEmail("");
      
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMsg("Network error. Please try again later.");
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-8 text-center text-white relative overflow-hidden shadow-xl border border-slate-800">
      {/* Decorative background effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-500 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
           <Mail size={20} className="text-brand-400"/> Subscribe to Updates
        </h3>
        <p className="text-slate-400 text-sm mb-6">
          Get the latest SEO tips, tools, and guides delivered directly to your inbox.
        </p>

        {status === 'success' ? (
          <div className="animate-fade-in bg-green-500/20 border border-green-500/50 rounded-xl p-4 flex flex-col items-center gap-2">
            <CheckCircle className="text-green-400 w-10 h-10" />
            <p className="text-green-200 font-medium text-sm">{msg}</p>
            <button 
              onClick={() => setStatus('idle')}
              className="text-xs text-green-400 hover:text-white underline mt-2"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Your email address"
                    disabled={status === 'loading'}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all disabled:opacity-50"
                />
            </div>
            
            <button 
                onClick={handleSubscribe} 
                disabled={status === 'loading'}
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-brand-600/20 hover:shadow-brand-600/40 disabled:opacity-70 flex justify-center items-center gap-2"
            >
                {status === 'loading' ? (
                    <>
                        <Loader2 className="animate-spin" size={18} /> Processing...
                    </>
                ) : (
                    "Subscribe Now"
                )}
            </button>

            {status === 'error' && (
                <div className="flex items-center justify-center gap-2 text-red-400 text-sm animate-slide-up bg-red-900/20 p-2 rounded-lg">
                    <AlertCircle size={16} /> {msg}
                </div>
            )}
          </div>
        )}
        
        <p className="text-xs text-slate-500 mt-4">
            No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};
