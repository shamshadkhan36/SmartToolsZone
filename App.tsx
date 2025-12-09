
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Sitemap } from './pages/Sitemap';
import { About, Contact, Privacy, Terms, ToolsList } from './pages/ContentPages';
import { AlertTriangle, Home as HomeIcon, Search } from 'lucide-react';

// Dynamic Imports using React.lazy for performance
const WordCounter = React.lazy(() => import('./pages/tools/WordCounter').then(module => ({ default: module.WordCounter })));
const EmiCalculator = React.lazy(() => import('./pages/tools/EmiCalculator').then(module => ({ default: module.EmiCalculator })));
const PdfMerge = React.lazy(() => import('./pages/tools/PdfMerge').then(module => ({ default: module.PdfMerge })));
const PdfSplit = React.lazy(() => import('./pages/tools/PdfSplit').then(module => ({ default: module.PdfSplit })));
const PdfProtect = React.lazy(() => import('./pages/tools/PdfProtect').then(module => ({ default: module.PdfProtect })));
const JpgToPdf = React.lazy(() => import('./pages/tools/JpgToPdf').then(module => ({ default: module.JpgToPdf })));
const MetaTagGenerator = React.lazy(() => import('./pages/tools/MetaTagGenerator').then(module => ({ default: module.MetaTagGenerator })));
const KeywordExtractor = React.lazy(() => import('./pages/tools/KeywordExtractor').then(module => ({ default: module.KeywordExtractor })));
const XmlSitemapGenerator = React.lazy(() => import('./pages/tools/XmlSitemapGenerator').then(module => ({ default: module.XmlSitemapGenerator })));
const RobotsTxtGenerator = React.lazy(() => import('./pages/tools/RobotsTxtGenerator').then(module => ({ default: module.RobotsTxtGenerator })));
const ImageCompressor = React.lazy(() => import('./pages/tools/ImageCompressor').then(module => ({ default: module.ImageCompressor })));
const ImageConverter = React.lazy(() => import('./pages/tools/ImageConverter').then(module => ({ default: module.ImageConverter })));
const ImageResizer = React.lazy(() => import('./pages/tools/ImageResizer').then(module => ({ default: module.ImageResizer })));
const BackgroundRemover = React.lazy(() => import('./pages/tools/BackgroundRemover').then(module => ({ default: module.BackgroundRemover })));
const AgeCalculator = React.lazy(() => import('./pages/tools/AgeCalculator').then(module => ({ default: module.AgeCalculator })));
const BmiCalculator = React.lazy(() => import('./pages/tools/BmiCalculator').then(module => ({ default: module.BmiCalculator })));
const GstCalculator = React.lazy(() => import('./pages/tools/GstCalculator').then(module => ({ default: module.GstCalculator })));
const JsonFormatter = React.lazy(() => import('./pages/tools/JsonFormatter').then(module => ({ default: module.JsonFormatter })));
const TextConverter = React.lazy(() => import('./pages/tools/TextConverter').then(module => ({ default: module.TextConverter })));
const TextCleaner = React.lazy(() => import('./pages/tools/TextCleaner').then(module => ({ default: module.TextCleaner })));
const UserAgentChecker = React.lazy(() => import('./pages/tools/UserAgentChecker').then(module => ({ default: module.UserAgentChecker })));
const AiWriter = React.lazy(() => import('./pages/tools/AiWriter').then(module => ({ default: module.AiWriter })));
const AiSummarizer = React.lazy(() => import('./pages/tools/AiSummarizer').then(module => ({ default: module.AiSummarizer })));
const AiParaphraser = React.lazy(() => import('./pages/tools/AiParaphraser').then(module => ({ default: module.AiParaphraser })));
const AiChat = React.lazy(() => import('./pages/tools/AiChat').then(module => ({ default: module.AiChat })));
const ImageCaptionGenerator = React.lazy(() => import('./pages/tools/ImageCaptionGenerator').then(module => ({ default: module.ImageCaptionGenerator })));
const IpFinder = React.lazy(() => import('./pages/tools/IpFinder').then(module => ({ default: module.IpFinder })));
const QrGenerator = React.lazy(() => import('./pages/tools/QrGenerator').then(module => ({ default: module.QrGenerator })));


// Loading Component
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Custom 404 Page
const NotFound = () => (
  <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
    <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 p-6 rounded-full mb-6">
      <AlertTriangle size={48} />
    </div>
    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Page Not Found</h1>
    <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 text-lg">
      The page you are looking for might have been moved, deleted, or possibly never existed.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors">
        <HomeIcon size={20} /> Go Home
      </Link>
      <Link to="/tools" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
        <Search size={20} /> Browse Tools
      </Link>
    </div>
  </div>
);

const App: React.FC = () => {
  // Dark mode logic
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        <main className="flex-grow">
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<ToolsList />} />
              
              {/* Blog System */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />

              {/* Content Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/sitemap" element={<Sitemap />} />

              {/* Tool Routes */}
              <Route path="/tools/word-counter" element={<WordCounter />} />
              <Route path="/tools/emi-calculator" element={<EmiCalculator />} />
              
              <Route path="/tools/pdf-merge" element={<PdfMerge />} />
              <Route path="/tools/pdf-split" element={<PdfSplit />} />
              <Route path="/tools/pdf-protect" element={<PdfProtect />} />
              <Route path="/tools/jpg-to-pdf" element={<JpgToPdf />} />
              
              <Route path="/tools/meta-tag-generator" element={<MetaTagGenerator />} />
              <Route path="/tools/keyword-extractor" element={<KeywordExtractor />} />
              <Route path="/tools/xml-sitemap-generator" element={<XmlSitemapGenerator />} />
              <Route path="/tools/robots-txt-generator" element={<RobotsTxtGenerator />} />

              <Route path="/tools/image-compressor" element={<ImageCompressor />} />
              <Route path="/tools/image-converter" element={<ImageConverter />} />
              <Route path="/tools/image-resizer" element={<ImageResizer />} />
              <Route path="/tools/background-remover" element={<BackgroundRemover />} />
              
              <Route path="/tools/age-calculator" element={<AgeCalculator />} />
              <Route path="/tools/bmi-calculator" element={<BmiCalculator />} />
              <Route path="/tools/gst-calculator" element={<GstCalculator />} />
              
              <Route path="/tools/json-formatter" element={<JsonFormatter />} />
              <Route path="/tools/case-converter" element={<TextConverter />} />
              <Route path="/tools/text-cleaner" element={<TextCleaner />} />
              
              <Route path="/tools/user-agent-checker" element={<UserAgentChecker />} />
              <Route path="/tools/qr-generator" element={<QrGenerator />} />
              <Route path="/tools/ip-finder" element={<IpFinder />} />
              
              {/* AI Tools */}
              <Route path="/tools/ai-writer" element={<AiWriter />} />
              <Route path="/tools/ai-summarizer" element={<AiSummarizer />} />
              <Route path="/tools/ai-paraphraser" element={<AiParaphraser />} />
              <Route path="/tools/ai-chat" element={<AiChat />} />
              <Route path="/tools/image-caption-generator" element={<ImageCaptionGenerator />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
};

export default App;
