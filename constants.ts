
import { Tool, ToolCategory, BlogPost } from './types';
import { 
  FileText, Search, Calculator, Image, Type,
  FileDigit, Percent, AlignLeft, Code, Layers, Calendar,
  FileImage, Activity, Hash, FileCode, Eraser,
  Scissors, Lock, Monitor
} from 'lucide-react';

export const tools: Tool[] = [
  // PDF Tools
  {
    id: 'pdf-merge',
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into one file instantly in your browser.',
    category: ToolCategory.PDF,
    path: '/tools/pdf-merge',
    icon: Layers,
    popular: true
  },
  {
    id: 'pdf-split',
    name: 'Split PDF',
    description: 'Extract pages from a PDF file to create a new document.',
    category: ToolCategory.PDF,
    path: '/tools/pdf-split',
    icon: Scissors,
    isNew: true
  },
  {
    id: 'pdf-protect',
    name: 'Protect PDF',
    description: 'Encrypt your PDF with a password.',
    category: ToolCategory.PDF,
    path: '/tools/pdf-protect',
    icon: Lock
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert images (JPG, PNG) into a single PDF document.',
    category: ToolCategory.PDF,
    path: '/tools/jpg-to-pdf',
    icon: FileImage
  },

  // Image Tools
  {
    id: 'img-compress',
    name: 'Image Compressor',
    description: 'Reduce image size without losing quality client-side.',
    category: ToolCategory.IMAGE,
    path: '/tools/image-compressor',
    icon: Image
  },
  {
    id: 'img-resizer',
    name: 'Image Resizer',
    description: 'Resize images to specific dimensions.',
    category: ToolCategory.IMAGE,
    path: '/tools/image-resizer',
    icon: Image,
    isNew: true
  },
  {
    id: 'img-converter',
    name: 'Image Converter',
    description: 'Convert between PNG, JPG, and WebP formats.',
    category: ToolCategory.IMAGE,
    path: '/tools/image-converter',
    icon: FileImage
  },
  {
    id: 'bg-remover',
    name: 'Background Remover',
    description: 'Remove image backgrounds by clicking a color (Magic Eraser).',
    category: ToolCategory.IMAGE,
    path: '/tools/background-remover',
    icon: Eraser,
    popular: true
  },

  // Text Tools
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, and sentences instantly.',
    category: ToolCategory.TEXT,
    path: '/tools/word-counter',
    icon: AlignLeft,
    popular: true
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to Uppercase, Lowercase, Title Case.',
    category: ToolCategory.TEXT,
    path: '/tools/case-converter',
    icon: Type
  },
  {
    id: 'text-cleaner',
    name: 'Text Cleaner',
    description: 'Remove extra spaces, line breaks, and cleanup text.',
    category: ToolCategory.TEXT,
    path: '/tools/text-cleaner',
    icon: Eraser,
    isNew: true
  },

  // Calculators
  {
    id: 'emi-calculator',
    name: 'EMI Calculator',
    description: 'Calculate loan EMI with visualized charts.',
    category: ToolCategory.CALC,
    path: '/tools/emi-calculator',
    icon: Calculator,
    popular: true
  },
  {
    id: 'gst-calculator',
    name: 'GST Calculator',
    description: 'Calculate Goods and Services Tax (Inclusive/Exclusive).',
    category: ToolCategory.CALC,
    path: '/tools/gst-calculator',
    icon: Percent,
    isNew: true
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    category: ToolCategory.CALC,
    path: '/tools/age-calculator',
    icon: Calendar
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index and check health status.',
    category: ToolCategory.CALC,
    path: '/tools/bmi-calculator',
    icon: Activity
  },

  // Web Utilities
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Beautify or minify JSON data.',
    category: ToolCategory.WEB,
    path: '/tools/json-formatter',
    icon: Code
  },
  {
    id: 'ua-checker',
    name: 'User Agent Checker',
    description: 'View your browser User Agent string.',
    category: ToolCategory.WEB,
    path: '/tools/user-agent-checker',
    icon: Monitor,
    isNew: true
  },

  // SEO Tools
  {
    id: 'seo-tags',
    name: 'Meta Tag Generator',
    description: 'Create SEO-friendly meta tags for your website.',
    category: ToolCategory.SEO,
    path: '/tools/meta-tag-generator',
    icon: Search
  },
  {
    id: 'keyword-extractor',
    name: 'Keyword Extractor',
    description: 'Find most frequent keywords in a text block.',
    category: ToolCategory.SEO,
    path: '/tools/keyword-extractor',
    icon: Hash
  },
  {
    id: 'xml-sitemap-generator',
    name: 'XML Sitemap Generator',
    description: 'Create a Google-compliant XML sitemap for your website.',
    category: ToolCategory.SEO,
    path: '/tools/xml-sitemap-generator',
    icon: FileCode
  },
  {
    id: 'robots-generator',
    name: 'Robots.txt Generator',
    description: 'Generate robots.txt file to control crawler access.',
    category: ToolCategory.SEO,
    path: '/tools/robots-txt-generator',
    icon: FileCode,
    isNew: true
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'top-10-free-pdf-tools',
    title: 'Top 10 Free Online PDF Tools for Everyday Work',
    excerpt: 'Discover how to manage your documents efficiently without spending a dime. Learn to merge, split, and compress PDFs securely.',
    date: 'October 15, 2023',
    author: 'Shamshad',
    category: 'Productivity',
    content: `
      <h2>Why You Need Online PDF Tools</h2>
      <p>In the modern digital workplace, the Portable Document Format (PDF) is the gold standard for sharing documents. Whether you are a student submitting an assignment, a freelancer sending an invoice, or a business professional sharing a contract, you deal with PDFs daily.</p>
      
      <p>However, premium PDF software can be incredibly expensive. This is where <strong>free online PDF tools</strong> come in. They allow you to perform complex operations right in your browser without installing heavy software.</p>

      <h3>1. PDF Merger</h3>
      <p>Combining multiple documents into a single file is essential for organization. Our <a href="/tools/pdf-merge">Merge PDF</a> tool lets you take invoices, receipts, and reports and stitch them together into one organized document.</p>

      <h3>2. PDF Splitter</h3>
      <p>Sometimes you only need one specific page from a large report. A split tool extracts just the pages you need, saving storage space and making sharing easier.</p>

      <h3>3. PDF Compressor</h3>
      <p>Large PDF files can be a nightmare to email. Compressing them reduces file size by optimizing images and fonts, ensuring your email never bounces back due to size limits.</p>

      <h2>Security Matters</h2>
      <p>One concern with online tools is data privacy. At SmartToolsZone, we prioritize <strong>client-side processing</strong>. This means for many of our tools, the file processing happens directly on your device using advanced web technologies, rather than being uploaded to a central server. This ensures your sensitive data remains yours.</p>

      <h3>Conclusion</h3>
      <p>You don't need to break the bank to manage your documents. With the right set of free online tools, you can handle any PDF task that comes your way efficiently and securely.</p>
    `
  },
  {
    id: 'seo-tools-guide',
    title: 'How Online SEO Tools Can Help You Rank Faster',
    excerpt: 'A guide to using free meta tag generators and keyword tools to boost your search engine visibility. Technical SEO is the backbone of any successful website strategy.',
    date: 'October 22, 2023',
    author: 'Shamshad',
    category: 'SEO',
    content: `
      <h2>The Foundation of SEO</h2>
      <p>Search Engine Optimization (SEO) can seem like a dark art, but at its core, it's about helping search engines understand your content. While content is king, <strong>Technical SEO</strong> is the castle that protects it.</p>

      <h3>Meta Tags: The First Impression</h3>
      <p>Meta tags are snippets of text that describe a page's content. They don't appear on the page itself but only in the page's source code. The <strong>Title Tag</strong> and <strong>Meta Description</strong> are critical because they determine how your site looks in search results.</p>
      <p>Using a <a href="/tools/meta-tag-generator">Meta Tag Generator</a> ensures you don't miss any critical tags and that your character counts stay within Google's recommended limits.</p>

      <h3>XML Sitemaps</h3>
      <p>An XML sitemap is a roadmap for Google's crawlers. It lists every important page on your website. Without one, Google might miss deep pages on your site. Our Sitemap Generator creates a compliant XML file in seconds.</p>

      <h3>Robots.txt</h3>
      <p>This file tells search engines where they can and cannot go. It's crucial for preventing Google from indexing admin pages or duplicate content.</p>

      <h2>Why Use Free Tools?</h2>
      <p>Professional SEO suites can cost hundreds of dollars a month. For small business owners and bloggers, free tools provide 80% of the value for 0% of the cost. They are perfect for quick checks, generating standard files, and analyzing basic on-page elements.</p>
    `
  },
  {
    id: 'client-side-privacy',
    title: 'Why Client-Side Image Compression is Safer',
    excerpt: 'Learn why processing images in your browser protects your privacy and saves server costs compared to server-side uploads.',
    date: 'October 28, 2023',
    author: 'Shamshad',
    category: 'Privacy',
    content: `
      <h2>The Old Way vs. The New Way</h2>
      <p>Traditionally, when you used an online image compressor, you would upload your photo to a remote server. The server would process the image and send it back to you. This posed two problems: <strong>Privacy</strong> and <strong>Speed</strong>.</p>

      <h3>The Privacy Risk</h3>
      <p>When you upload a photo, you lose control over it. Even if a site promises to delete it, there's a risk of data breaches or temporary storage logs. For personal photos or sensitive business documents, this is unacceptable.</p>

      <h3>The Client-Side Revolution</h3>
      <p>Modern web browsers are incredibly powerful. With technologies like <strong>WebAssembly</strong> and the <strong>Canvas API</strong>, we can now perform heavy image processing tasks right on your computer.</p>
      
      <p>When you use our <a href="/tools/image-compressor">Image Compressor</a>:</p>
      <ul>
        <li>Your image <strong>never</strong> leaves your device.</li>
        <li>Processing is instant because there is no upload/download time.</li>
        <li>You save bandwidth.</li>
      </ul>

      <h2>Better for the Planet</h2>
      <p>Client-side processing is also greener. It reduces the load on massive server farms, lowering the carbon footprint of your digital tasks. It's a win for privacy, speed, and the environment.</p>
    `
  },
  {
    id: 'guide-to-emi',
    title: 'Understanding EMI: A Guide for Home Buyers',
    excerpt: 'Before taking a loan, understand how Equated Monthly Installments work and how to calculate them accurately.',
    date: 'November 12, 2023',
    author: 'Shamshad',
    category: 'Finance',
    content: `
      <h2>What is EMI?</h2>
      <p>EMI stands for <strong>Equated Monthly Installment</strong>. It is the fixed amount of money you pay to a bank or lender every month to repay your loan. It consists of two parts: the <strong>Principal</strong> (the money you borrowed) and the <strong>Interest</strong> (the cost of borrowing).</p>

      <h3>The Mathematics of Borrowing</h3>
      <p>The formula for EMI is complex: <code>E = P x R x (1+R)^N / ((1+R)^N - 1)</code>. </p>
      <p>Calculating this manually is prone to errors. That's why an <a href="/tools/emi-calculator">EMI Calculator</a> is essential before you sign any loan agreement.</p>

      <h3>Factors Affecting Your EMI</h3>
      <ul>
        <li><strong>Loan Amount:</strong> The higher the loan, the higher the EMI.</li>
        <li><strong>Interest Rate:</strong> Even a 0.5% difference can save you thousands over the long term.</li>
        <li><strong>Tenure:</strong> A longer tenure reduces your monthly EMI but increases the total interest you pay.</li>
      </ul>

      <h2>Smart Borrowing Tips</h2>
      <p>Financial experts recommend that your total EMIs should not exceed 40-50% of your monthly take-home income. Use our calculator to experiment with different tenures and interest rates to find a monthly payment that fits your budget comfortably.</p>
    `
  },
  {
    id: 'jpg-to-pdf-benefits',
    title: '5 Reasons to Convert Your JPG Images to PDF',
    excerpt: 'Why keeping your documents as images might be hurting your professionalism. Discover the benefits of PDF conversion.',
    date: 'November 15, 2023',
    author: 'Shamshad',
    category: 'Productivity',
    content: `
      <h2>The Professional Standard</h2>
      <p>Sending a client 15 separate JPG files of a contract is a surefire way to look unprofessional. Converting them into a single, cohesive <a href="/tools/jpg-to-pdf">PDF document</a> transforms chaos into order.</p>

      <h3>1. Universal Compatibility</h3>
      <p>PDFs look exactly the same on every device, from iPhones to Androids to Windows PCs. Images can sometimes render differently depending on the viewer software.</p>

      <h3>2. Reduced File Size</h3>
      <p>PDF compression algorithms are highly efficient. You can often combine multiple high-quality images into a PDF that is smaller than the sum of the original parts, making email attachments faster.</p>

      <h3>3. Security</h3>
      <p>Unlike a standard JPG, a PDF can be password protected. This adds a layer of security to your sensitive scans or financial documents.</p>

      <h3>4. Multi-Page Support</h3>
      <p>The biggest advantage is structure. A 10-page report should be one file, not ten. PDF supports multi-page layouts natively.</p>

      <h3>5. Print Readiness</h3>
      <p>Printers love PDFs. They maintain margins, bleeds, and DPI settings better than raw image files, ensuring your hard copies look perfect.</p>
    `
  },
  {
    id: 'importance-of-sitemaps',
    title: 'What is an XML Sitemap and Why You Need One',
    excerpt: 'Unlock the potential of your website SEO by ensuring Google can find every single page you publish.',
    date: 'November 18, 2023',
    author: 'Shamshad',
    category: 'SEO',
    content: `
      <h2>The Roadmap for Google</h2>
      <p>Imagine trying to navigate a new city without a map. That is what Googlebot faces when it crawls a large website without an XML Sitemap. An <a href="/tools/xml-sitemap-generator">XML Sitemap</a> is literally a list of URLs that you want search engines to index.</p>

      <h3>Crawling Budget</h3>
      <p>Search engines don't have infinite resources. They allocate a "crawl budget" to your site. If your site structure is messy, they might waste time on unimportant pages and miss your new blog post. A sitemap directs them straight to the gold.</p>

      <h3>When Do You Need One?</h3>
      <ul>
        <li><strong>New Websites:</strong> You don't have many backlinks yet, so Google might not find you easily.</li>
        <li><strong>Large Websites:</strong> E-commerce sites with thousands of products need sitemaps to ensure deep pages get indexed.</li>
        <li><strong>Rich Media Content:</strong> If you have lots of images or videos, specialized sitemaps help them rank in Google Images/Video search.</li>
      </ul>

      <h2>How to Generate One</h2>
      <p>You don't need to write XML code manually. SmartToolsZone offers a free generator. Simply enter your URL, and we build the file for you. Upload it to your root directory (e.g., yoursite.com/sitemap.xml) and submit it to Google Search Console.</p>
    `
  },
  {
    id: 'json-formatter-guide',
    title: 'Why Developers Love JSON Formatters',
    excerpt: 'Debugging API responses is a nightmare when the JSON is minified. Here is why a formatter is a developer\'s best friend.',
    date: 'November 20, 2023',
    author: 'Shamshad',
    category: 'Development',
    content: `
      <h2>The Readable Data Standard</h2>
      <p>JSON (JavaScript Object Notation) has taken over the web. It is the standard for APIs, configuration files, and data storage. However, computers prefer "minified" JSON (no spaces, no newlines) to save bandwidth.</p>

      <h3>The Human Readability Problem</h3>
      <p>Minified JSON looks like a wall of text. Finding a missing comma or a nested object key in a 5,000-character line is impossible for a human.</p>

      <h3>Enter the Formatter</h3>
      <p>A <a href="/tools/json-formatter">JSON Formatter</a> (or "Beautifier") takes that wall of text and applies indentation, colors, and line breaks. It turns chaos into a structured tree view.</p>

      <h3>Validation is Key</h3>
      <p>Beyond making it pretty, a good tool validates the syntax. It tells you exactly where the error is—maybe you missed a closing brace '}' or used single quotes instead of double quotes. This saves hours of debugging time.</p>
    `
  },
  {
    id: 'password-protect-pdf',
    title: 'How to Securely Share Sensitive Documents',
    excerpt: 'Sending tax returns or legal contracts via email? Learn why you should always encrypt your PDFs first.',
    date: 'November 22, 2023',
    author: 'Shamshad',
    category: 'Privacy',
    content: `
      <h2>Email is Not Secure</h2>
      <p>Most people treat email like a sealed envelope. In reality, it's more like a postcard. It passes through multiple servers, and if any of them are compromised, your attachments are visible.</p>

      <h3>The Solution: PDF Encryption</h3>
      <p>Before you hit send on that bank statement or employee contract, run it through a <a href="/tools/pdf-protect">PDF Protection Tool</a>. This wraps your file in 128-bit or 256-bit AES encryption.</p>

      <h3>How it Works</h3>
      <ol>
        <li>You upload the file locally (ensure you use a client-side tool like ours).</li>
        <li>You set a strong password.</li>
        <li>The tool mathematically scrambles the file contents.</li>
        <li>You download the locked file.</li>
      </ol>

      <p>Now, even if a hacker intercepts the email, the file is useless to them without the password. Send the password via a different channel (like SMS or WhatsApp) for maximum security (2-Factor Authentication).</p>
    `
  },
  {
    id: 'calculate-bmi-health',
    title: 'BMI Explained: Is It a Good Indicator of Health?',
    excerpt: 'Body Mass Index is widely used but often misunderstood. Learn what your numbers mean and the limitations of BMI.',
    date: 'November 25, 2023',
    author: 'Shamshad',
    category: 'Health',
    content: `
      <h2>The Simple Math of Health</h2>
      <p>BMI is a simple calculation using a person's height and weight. The formula is BMI = kg/m². It classifies people into groups: Underweight, Healthy Weight, Overweight, and Obese.</p>

      <h3>Why Doctors Use It</h3>
      <p>It is a quick, non-invasive screening tool. While it doesn't measure body fat directly, it correlates strongly with metabolic disease risks like diabetes and heart disease.</p>

      <h3>The Limitations</h3>
      <p>BMI does not distinguish between muscle and fat. An athlete might have a high BMI but very low body fat. Conversely, an elderly person might have a normal BMI but very low muscle mass.</p>

      <h3>Using the Calculator</h3>
      <p>Our <a href="/tools/bmi-calculator">BMI Calculator</a> gives you a starting point. If your number is outside the healthy range (18.5 – 24.9), it is a signal to consult a healthcare provider, not a definitive diagnosis.</p>
    `
  },
  {
    id: 'gst-calculator-india',
    title: 'GST Calculation Made Simple for Small Business Owners',
    excerpt: 'Confused by Inclusive vs Exclusive GST? Here is a breakdown of how to calculate your taxes correctly.',
    date: 'November 28, 2023',
    author: 'Shamshad',
    category: 'Finance',
    content: `
      <h2>The Indian Tax Landscape</h2>
      <p>Since the introduction of GST (Goods and Services Tax) in India, billing has changed. Whether you are a freelancer or a shop owner, you need to get the numbers right to avoid penalties.</p>

      <h3>Exclusive vs. Inclusive</h3>
      <p>This is where most mistakes happen:</p>
      <ul>
        <li><strong>GST Exclusive:</strong> You have a product price (e.g., ₹1000) and you add tax on top. Final Price = ₹1000 + 18% = ₹1180.</li>
        <li><strong>GST Inclusive:</strong> You sell a product for ₹1180 MRP. You need to back-calculate the tax to find the base price. The formula is Base = MRP / (1 + Rate/100).</li>
      </ul>

      <h3>Why Use a Calculator?</h3>
      <p>Doing the "Inclusive" calculation manually is tricky. Our <a href="/tools/gst-calculator">GST Calculator</a> handles the reverse math instantly. It shows you the Net Price, the GST Amount, and the Total, ensuring your invoices are always compliant.</p>
    `
  }
];
