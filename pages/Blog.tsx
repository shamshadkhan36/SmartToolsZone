
import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { SubscribeBox } from '../components/SubscribeBox';

export const Blog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Latest Tech Insights</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Expert guides, tutorials, and tips on how to use online tools to boost your productivity, enhance SEO, and streamline your workflow.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            {blogPosts.map(post => (
            <article key={post.id} className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                        <span className="text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded">{post.category}</span>
                        <div className="flex items-center gap-1"><Calendar size={12}/> {post.date}</div>
                        <div className="flex items-center gap-1"><User size={12}/> {post.author}</div>
                    </div>
                    
                    <Link to={`/blog/${post.id}`}>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {post.title}
                        </h2>
                    </Link>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-grow">
                        {post.excerpt}
                    </p>
                    
                    <Link 
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center font-bold text-brand-600 dark:text-brand-400 hover:underline"
                    >
                        Read Full Article <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>
            </article>
            ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
            {/* Newsletter / Sticky Ad */}
            <div className="sticky top-24 space-y-8">
                {/* Functional Subscribe Component */}
                <SubscribeBox />

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Trending Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {['PDF', 'SEO', 'Productivity', 'AI', 'Finance', 'Security'].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm rounded-full hover:bg-brand-100 hover:text-brand-700 dark:hover:bg-brand-900/50 cursor-pointer transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                <AdPlaceholder slotId="blog-sidebar" format="vertical" />
            </div>
        </div>
      </div>
    </div>
  );
};
