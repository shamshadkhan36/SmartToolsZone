import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-brand-600 text-white p-1.5 rounded-lg">
                <Wrench size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                SmartToolsZone
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed max-w-sm">
              Your one-stop destination for free, secure, and fast online tools. 
              We are committed to providing high-quality utilities that respect your privacy and enhance your productivity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"><Twitter size={18} /></a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"><Github size={18} /></a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Popular Tools</h3>
              <ul className="space-y-4">
                <li><Link to="/tools/pdf-merge" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">Merge PDF</Link></li>
                <li><Link to="/tools/emi-calculator" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">EMI Calculator</Link></li>
                <li><Link to="/tools/word-counter" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">Word Counter</Link></li>
                <li><Link to="/tools/background-remover" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">Background Remover</Link></li>
                <li><Link to="/tools/image-compressor" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">Image Compressor</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><Link to="/tools" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">All Categories</Link></li>
                <li><Link to="/blog" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">Blog & Guides</Link></li>
                <li><Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><Link to="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">Terms of Service</Link></li>
                <li><Link to="/sitemap" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 text-sm font-medium transition-colors">Sitemap</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer Section for AdSense Trust */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 pb-4">
            <p className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed max-w-4xl mx-auto">
                <strong>Disclaimer:</strong> The tools provided on SmartToolsZone are for informational and utility purposes only. 
                While we strive for accuracy, we cannot guarantee the correctness of calculations or conversions. 
                Users are advised to verify results before using them for critical financial, legal, or professional tasks. 
                Files processed on this site are handled locally in your browser for privacy; we do not store your data.
            </p>
        </div>

        {/* Newsletter / Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-4">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-slate-500 text-sm text-center md:text-left">
                © {currentYear} SmartToolsZone. All rights reserved.
              </p>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs text-slate-500 font-medium">Systems Operational</span>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};