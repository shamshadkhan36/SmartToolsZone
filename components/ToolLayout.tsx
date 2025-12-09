
import React, { useEffect } from 'react';
import { AdPlaceholder } from './AdPlaceholder';
import { FAQItem } from '../types';
import { ChevronDown, ChevronUp, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  faqs?: FAQItem[];
  content?: React.ReactNode; 
  toolId: string;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ title, description, children, faqs, content, toolId }) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const location = useLocation();

  // Dynamic SEO: Update Title, Meta Tags, Canonical, Open Graph, and Schema
  useEffect(() => {
    // 1. Title
    document.title = `${title} - SmartToolsZone`;
    
    // 2. Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Canonical URL
    const currentUrl = `https://smarttoolszone.com${location.pathname}`;
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 4. Open Graph Tags
    const setMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:url', currentUrl);
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'SmartToolsZone');

    // 5. Twitter Card Tags
    const setTwitterMeta = (name: string, content: string) => {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('name', name);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setTwitterMeta('twitter:card', 'summary_large_image');
    setTwitterMeta('twitter:title', title);
    setTwitterMeta('twitter:description', description);

    // 6. Schema.org: SoftwareApplication
    const appSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": title,
      "url": currentUrl,
      "operatingSystem": "Web",
      "applicationCategory": "UtilitiesApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": description
    };

    // 7. Schema.org: Breadcrumbs
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://smarttoolszone.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": "https://smarttoolszone.com/tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
          "item": currentUrl
        }
      ]
    };
    
    const scriptApp = document.createElement('script');
    scriptApp.type = 'application/ld+json';
    scriptApp.text = JSON.stringify(appSchema);
    document.head.appendChild(scriptApp);

    const scriptBread = document.createElement('script');
    scriptBread.type = 'application/ld+json';
    scriptBread.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(scriptBread);

    // Cleanup function
    return () => {
      if (document.head.contains(scriptApp)) document.head.removeChild(scriptApp);
      if (document.head.contains(scriptBread)) document.head.removeChild(scriptBread);
    };
  }, [title, description, location.pathname]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <article className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      {/* Breadcrumbs UI */}
      <nav className="flex text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="hover:text-brand-600 dark:hover:text-white">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-slate-400">/</span>
              <Link to="/tools" className="hover:text-brand-600 dark:hover:text-white">Tools</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">{title}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600 dark:from-brand-400 dark:to-accent-400 mb-6 drop-shadow-sm">
          {title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </header>

      {/* Top Ad Unit - High Visibility */}
      <div className="mb-8 flex justify-center">
        <AdPlaceholder slotId={`${toolId}-top`} format="horizontal" className="shadow-sm" />
      </div>

      {/* Main Tool Area - Card Style */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-brand-500/5 border border-slate-200 dark:border-slate-800 p-6 md:p-10 mb-12 min-h-[400px] relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        {children}
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
             <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">Secure</h4>
            <p className="text-xs text-slate-500">Client-side processing</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
             <Zap size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">Fast</h4>
            <p className="text-xs text-slate-500">Instant results</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
             <Globe size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">Free</h4>
            <p className="text-xs text-slate-500">No hidden costs</p>
          </div>
        </div>
      </div>

      {/* Middle Ad Unit */}
      <div className="mb-12 flex justify-center">
        <AdPlaceholder slotId={`${toolId}-middle`} format="rectangle" />
      </div>

      {/* SEO Content Section - crucial for ranking */}
      <section className="prose prose-lg dark:prose-invert max-w-none mb-16 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        {content || (
          <div>
            <h2>How to use {title}</h2>
            <p>
              SmartToolsZone offers a simple and efficient way to handle your tasks. 
              Our <strong>{title}</strong> is designed to be user-friendly, fast, and completely free.
            </p>
            <h3>Why use this tool?</h3>
            <ul>
              <li><strong>Privacy Focused:</strong> We don't store your personal data.</li>
              <li><strong>No Installation:</strong> Works directly in your browser.</li>
              <li><strong>Mobile Friendly:</strong> Use it on your phone, tablet, or desktop.</li>
            </ul>
            <p>
              Whether you are a student, professional, or casual user, this tool helps you get the job done without the hassle of installing heavy software.
            </p>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-slate-500 mt-2">Common questions about {title}</p>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden transition-all duration-200 hover:border-brand-300 dark:hover:border-brand-700">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  {openFaq === index ? <ChevronUp className="text-brand-500" size={20} /> : <ChevronDown className="text-slate-400" size={20} />}
                </button>
                {openFaq === index && (
                  <div className="p-5 pt-0 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Ad Unit */}
      <div className="flex justify-center">
        <AdPlaceholder slotId={`${toolId}-bottom`} format="horizontal" />
      </div>
    </article>
  );
};
