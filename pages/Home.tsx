import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Zap, Shield, Globe, ArrowRight, Star, Cpu, Lock } from 'lucide-react';
import { tools } from '../constants';
import { ToolCard } from '../components/ToolCard';
import { ToolCategory } from '../types';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Home Page SEO Logic
  useEffect(() => {
    document.title = "SmartToolsZone - Free Online Tools Suite (PDF, SEO, Calc)";
    
    const desc = "A comprehensive suite of free online tools for PDF, SEO, Calculation, and Image processing. Optimized for performance and usability. No signup required.";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', desc);
    }

    // Canonical for Home
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://smarttoolszone.com/');

    // OG Tags for Home
    const setMeta = (property: string, content: string) => {
        let element = document.querySelector(`meta[property="${property}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('property', property);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };
    setMeta('og:title', 'SmartToolsZone - Free Online Tools Suite');
    setMeta('og:description', desc);
    setMeta('og:url', 'https://smarttoolszone.com/');
    setMeta('og:type', 'website');

  }, []);

  const featuredTools = tools.filter(t => t.popular);
  const categories = Object.values(ToolCategory);

  const filteredTools = searchTerm 
    ? tools.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase()))
    : featuredTools;

  return (
    <div className="overflow-hidden">
      {/* Modern Gradient Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-semibold mb-8 animate-fade-in border border-brand-100 dark:border-brand-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            New Tools Added Weekly
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-tight animate-slide-up">
            Master Your Workflow <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 dark:from-brand-400 dark:via-indigo-400 dark:to-accent-400">
              With Smart Tools
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A powerful suite of PDF, SEO, and utility tools designed for speed and privacy. 
            100% free, forever.
          </p>
          
          <div className="max-w-2xl mx-auto relative mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-14 pr-6 py-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-xl shadow-brand-500/5"
              placeholder="What do you want to do? (e.g., 'Merge PDF', 'Calculate BMI')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"><Zap size={18} className="text-amber-500" /> Lightning Fast</span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"><Shield size={18} className="text-green-500" /> Secure Privacy</span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"><Globe size={18} className="text-brand-500" /> Always Free</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 mb-20">
         <AdPlaceholder slotId="home-hero-ad" className="shadow-sm" />
      </div>

      {/* Featured / Search Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
               {searchTerm ? 'Search Results' : 'Trending Tools'}
             </h2>
             <p className="text-slate-500 dark:text-slate-400">Most used utilities by our community</p>
          </div>
          {!searchTerm && (
            <Link to="/tools" className="hidden md:flex items-center gap-1 text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 transition-colors group">
              View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
        
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <Search size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">No tools found matching "{searchTerm}"</p>
            <button onClick={() => setSearchTerm('')} className="mt-4 text-brand-600 font-bold hover:underline">Clear Search</button>
          </div>
        )}
      </section>

      {/* Categories Bento Grid */}
      {!searchTerm && (
        <section className="bg-slate-50 dark:bg-slate-900/50 py-24 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Explore by Category</h2>
               <p className="text-slate-500 max-w-2xl mx-auto">Find exactly what you need. Our tools are organized for quick access.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat, idx) => (
                <Link 
                  key={idx}
                  to={`/tools?category=${encodeURIComponent(cat)}`}
                  className="group bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl text-center border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-brand-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                     <Star size={24} fill="currentColor" className="opacity-75" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 transition-colors">{cat}</h3>
                  <p className="text-xs text-slate-400 mt-2">View Tools &rarr;</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Content & Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="prose prose-lg dark:prose-invert">
            <h2>Why Professionals Trust SmartToolsZone</h2>
            <p>
              In today's fast-paced digital landscape, finding reliable, secure, and efficient tools is essential for productivity. <strong>SmartToolsZone</strong> provides a comprehensive platform where you can perform essential document, image, and data operations without the need for expensive software subscriptions or risky software installations.
            </p>
            <p>
              Our platform uses advanced web technologies like WebAssembly to process files directly in your browser. This means when you merge a PDF or compress an image, the file never actually uploads to a remote server—keeping your sensitive data completely private and secure.
            </p>
            
            <h3>Comprehensive Tool Suite</h3>
            <p>We don't just stop at PDFs. Our suite includes:</p>
            <ul>
                <li><strong>SEO Utilities:</strong> Generate meta tags, sitemaps, and robots.txt files to boost your website rankings.</li>
                <li><strong>Calculators:</strong> Plan your loans and taxes with our precise EMI and GST calculators.</li>
                <li><strong>Image Tools:</strong> Compress, resize, and remove backgrounds from images securely.</li>
                <li><strong>Developer Tools:</strong> Format JSON and check user agents instantly.</li>
            </ul>

            <h3>Secure & Private by Design</h3>
            <p>
              Privacy is our top priority. For tools like the <Link to="/tools/image-compressor">Image Compressor</Link> and <Link to="/tools/pdf-merge">PDF Merger</Link>, we utilize client-side processing APIs. Your files remain on your device. We do not store, share, or view your uploaded content. This makes SmartToolsZone safe for corporate environments and personal use alike.
            </p>
          </div>
          
          <div className="grid gap-6">
             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-lg flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                   <Lock size={28} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Enterprise-Grade Security</h3>
                   <p className="text-slate-600 dark:text-slate-400 text-sm">We use modern encryption and handle sensitive tasks locally on your device to ensure maximum privacy.</p>
                </div>
             </div>
             
             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-lg flex items-start gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                   <Cpu size={28} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Browser-Based Processing</h3>
                   <p className="text-slate-600 dark:text-slate-400 text-sm">No software installation required. Our tools run efficiently directly in your browser.</p>
                </div>
             </div>

             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-lg flex items-start gap-4">
                <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-xl">
                   <Zap size={28} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Zero Latency</h3>
                   <p className="text-slate-600 dark:text-slate-400 text-sm">Optimized code ensures our calculators and converters run instantly, saving you valuable time.</p>
                </div>
             </div>
          </div>
        </div>
      </section>
      
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <AdPlaceholder slotId="home-bottom-ad" />
      </div>
    </div>
  );
};