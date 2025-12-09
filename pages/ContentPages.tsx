
import React, { useState, useEffect } from 'react';
import { tools } from '../constants';
import { ToolCategory } from '../types';
import { ToolCard } from '../components/ToolCard';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Send, Mail, Phone, User } from 'lucide-react';

const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const location = useLocation();

  useEffect(() => {
    // Basic SEO for Content Pages
    document.title = `${title} - SmartToolsZone`;
    
    // Canonical
    const currentUrl = `https://smarttoolszone.com${location.pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Schema: WebPage
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "url": currentUrl
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
        if(document.head.contains(script)) document.head.removeChild(script);
    }

  }, [title, location.pathname]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">{title}</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-slate-800 p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        {children}
      </div>
    </div>
  );
};

export const About: React.FC = () => (
  <PageLayout title="About SmartToolsZone">
    <p className="lead text-xl text-slate-600 dark:text-slate-300">
      Welcome to <strong>SmartToolsZone</strong>, your premier destination for high-quality, free, and secure online utilities.
    </p>
    
    <h3>Our Mission</h3>
    <p>
      In an era where software subscriptions are becoming the norm, SmartToolsZone aims to democratize access to essential digital tools. We believe that basic tasks like merging a PDF, calculating a loan, or resizing an image should be free, fast, and accessible to everyone, regardless of their device or budget.
    </p>

    <h3>Why Choose Us?</h3>
    <ul>
      <li><strong>Privacy First:</strong> Unlike many competitors, we prioritize client-side processing. This means your files (PDFs, Images) often never leave your device, ensuring maximum security.</li>
      <li><strong>Speed & Efficiency:</strong> Our tools are built using modern web technologies (React, Next.js, WebAssembly) to ensure instant results without page reloads.</li>
      <li><strong>Always Free:</strong> We are supported by ads, allowing us to offer premium-grade features without charging you a dime.</li>
    </ul>

    <h3>Our Story</h3>
    <p>
      Founded in 2024 by <strong>Shamshad</strong>, a passionate developer and SEO specialist, SmartToolsZone started with a simple vision: to create a web space where students, professionals, and creators can find every tool they need in one place.
    </p>
    <p>
      Shamshad recognized that many existing free tools were cluttered with spammy ads or required confusing logins. SmartToolsZone was built to be the antidote—clean, fast, and respectful of the user.
    </p>
    
    <p>
      We are constantly updating our platform. If you have a suggestion for a new tool, please don't hesitate to <Link to="/contact">contact us</Link>.
    </p>
  </PageLayout>
);

export const Privacy: React.FC = () => (
  <PageLayout title="Privacy Policy">
    <p className="text-sm text-slate-500 mb-6">Last Updated: October 26, 2023</p>
    
    <h3>1. Introduction</h3>
    <p>
      At SmartToolsZone, accessible from smarttoolszone.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SmartToolsZone and how we use it.
    </p>

    <h3>2. Information We Collect</h3>
    <p>
      <strong>Personal Data:</strong> We do not require you to create an account to use our tools. We do not collect personally identifiable information (PII) such as your name, address, or phone number unless you voluntarily provide it via our contact form.
    </p>
    <p>
      <strong>Files & Data Processing:</strong> For tools like PDF Merger, Image Compressor, etc., files are processed <strong>locally in your browser</strong>. They are not uploaded to our servers, ensuring your data remains private and secure on your device.
    </p>

    <h3>3. Cookies and Web Beacons</h3>
    <p>
      Like any other website, SmartToolsZone uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
    </p>

    <h3>4. Google DoubleClick DART Cookie</h3>
    <p>
      Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a>
    </p>

    <h3>5. Third Party Privacy Policies</h3>
    <p>
      SmartToolsZone's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
    </p>
  </PageLayout>
);

export const Terms: React.FC = () => (
  <PageLayout title="Terms & Conditions">
    <p className="text-sm text-slate-500 mb-6">Last Updated: October 26, 2023</p>

    <h3>1. Acceptance of Terms</h3>
    <p>
      By accessing this website we assume you accept these terms and conditions. Do not continue to use SmartToolsZone if you do not agree to take all of the terms and conditions stated on this page.
    </p>

    <h3>2. License</h3>
    <p>
      Unless otherwise stated, SmartToolsZone and/or its licensors own the intellectual property rights for all material on SmartToolsZone. All intellectual property rights are reserved. You may access this from SmartToolsZone for your own personal use subjected to restrictions set in these terms and conditions.
    </p>

    <h3>3. User Obligations</h3>
    <p>
      You must not:
    </p>
    <ul>
      <li>Republish material from SmartToolsZone</li>
      <li>Sell, rent or sub-license material from SmartToolsZone</li>
      <li>Reproduce, duplicate or copy material from SmartToolsZone</li>
      <li>Redistribute content from SmartToolsZone</li>
    </ul>

    <h3>4. Disclaimer</h3>
    <p>
      The materials on SmartToolsZone's website are provided on an 'as is' basis. SmartToolsZone makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
    </p>
    
    <h3>5. Limitation of Liability</h3>
    <p>
      In no event shall SmartToolsZone or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the tools on SmartToolsZone's website.
    </p>
  </PageLayout>
);

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <PageLayout title="Contact Us">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent Successfully!</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md">
            Thank you for reaching out to us. Our team will review your message and get back to you within 24-48 hours.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-8 px-6 py-2 text-brand-600 font-bold hover:underline"
          >
            Send another message
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Contact Us">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="mb-6 text-lg">
            Have questions, feedback, or need support? We're here to help! Reach out directly to Shamshad or use the form below.
          </p>
          
          <div className="space-y-6 mt-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-lg">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Founder</h4>
                <p className="text-slate-500">Shamshad</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-lg">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Phone</h4>
                <p className="text-slate-500 font-mono">+91 93702 62177</p>
                <p className="text-xs text-slate-400 mt-1">Available for business inquiries</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-lg">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Email Us</h4>
                <p className="text-slate-500">support@smarttoolszone.com</p>
                <p className="text-xs text-slate-400 mt-1">Typical response time: 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                <input required type="text" className="block w-full rounded-lg border-slate-300 dark:border-slate-600 shadow-sm p-3 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500" placeholder="John Doe" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input required type="email" className="block w-full rounded-lg border-slate-300 dark:border-slate-600 shadow-sm p-3 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500" placeholder="john@example.com" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <select className="block w-full rounded-lg border-slate-300 dark:border-slate-600 shadow-sm p-3 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500">
                  <option>General Inquiry</option>
                  <option>Business Proposal</option>
                  <option>Bug Report</option>
                  <option>Advertising</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea required className="block w-full rounded-lg border-slate-300 dark:border-slate-600 shadow-sm p-3 bg-white dark:bg-slate-800 h-32 dark:text-white focus:ring-2 focus:ring-brand-500" placeholder="How can we help you?"></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full px-4 py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 shadow-lg shadow-brand-500/30 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {status === 'submitting' ? 'Sending...' : <><Send size={18} /> Send Message</>}
            </button>
        </form>
      </div>
    </PageLayout>
  );
};

export const ToolsList: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
    const categories = ['All', ...Object.values(ToolCategory)];

    // SEO for Tools List
    useEffect(() => {
        document.title = "All Tools - SmartToolsZone";
    }, []);

    const filteredTools = selectedCategory === 'All' 
        ? tools 
        : tools.filter(tool => tool.category === selectedCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">Our Tools Collection</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                Explore our growing library of free online utilities. Filter by category to find exactly what you need.
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                            selectedCategory === cat 
                                ? 'bg-brand-600 text-white shadow-brand-500/30 scale-105' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.length > 0 ? (
                    filteredTools.map(tool => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))
                ) : (
                    <div className="col-span-3 text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p className="text-slate-500 text-lg">No tools found in this category yet.</p>
                        <button onClick={() => setSelectedCategory('All')} className="mt-4 text-brand-600 font-bold hover:underline">View All Tools</button>
                    </div>
                )}
            </div>
        </div>
    );
}
