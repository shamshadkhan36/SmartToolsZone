
import React from 'react';
import { Link } from 'react-router-dom';
import { tools, blogPosts } from '../constants';
import { ToolCategory } from '../types';
import { ToolLayout } from '../components/ToolLayout';

export const Sitemap: React.FC = () => {
  const categories = Object.values(ToolCategory);

  return (
    <ToolLayout
      toolId="html-sitemap"
      title="Sitemap"
      description="Navigate through all pages and tools available on SmartToolsZone."
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
           {/* Tools List */}
           <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b dark:border-slate-700">Tools by Category</h2>
              <div className="space-y-8">
                 {categories.map(cat => {
                    const catTools = tools.filter(t => t.category === cat);
                    if (catTools.length === 0) return null;
                    return (
                        <div key={cat}>
                            <h3 className="font-bold text-brand-600 dark:text-brand-400 mb-3">{cat}</h3>
                            <ul className="space-y-2">
                                {catTools.map(tool => (
                                    <li key={tool.id}>
                                        <Link to={tool.path} className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:underline">
                                            {tool.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                 })}
              </div>
           </div>

           {/* Pages & Blog */}
           <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b dark:border-slate-700">General Pages</h2>
              <ul className="space-y-3 mb-10">
                  <li><Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:underline">Home</Link></li>
                  <li><Link to="/about" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:underline">About Us</Link></li>
                  <li><Link to="/contact" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:underline">Contact Us</Link></li>
                  <li><Link to="/privacy" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:underline">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:underline">Terms of Service</Link></li>
                  <li><Link to="/blog" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:underline">Blog Index</Link></li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b dark:border-slate-700">Recent Blog Posts</h2>
              <ul className="space-y-3">
                  {blogPosts.map(post => (
                      <li key={post.id}>
                          <Link to={`/blog/${post.id}`} className="text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:underline">
                              {post.title}
                          </Link>
                      </li>
                  ))}
              </ul>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
};
