
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { blogPosts } from '../constants';
import { ToolLayout } from '../components/ToolLayout';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Schema.org Article Data
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": "https://smarttoolszone.com/assets/blog-placeholder.jpg",
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmartToolsZone",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smarttoolszone.com/logo.png"
      }
    },
    "datePublished": "2023-10-15", // In a real app, parse post.date
    "description": post.excerpt
  };

  return (
    <ToolLayout
      toolId={`blog-${post.id}`}
      title={post.title}
      description={post.excerpt}
    >
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <Link to="/blog" className="inline-flex items-center text-slate-500 hover:text-brand-600 mb-6 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to Blog
        </Link>

        {/* Article Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
           <div className="flex items-center gap-2">
             <User size={16} className="text-brand-500" />
             <span>{post.author}</span>
           </div>
           <div className="flex items-center gap-2">
             <Calendar size={16} className="text-brand-500" />
             <span>{post.date}</span>
           </div>
           <div className="flex items-center gap-2">
             <Tag size={16} className="text-brand-500" />
             <span className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-full font-bold text-xs">
               {post.category}
             </span>
           </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Author Bio Box */}
        <div className="mt-16 bg-slate-50 dark:bg-slate-800 p-6 rounded-xl flex items-center gap-4 border border-slate-200 dark:border-slate-700">
           <div className="w-16 h-16 bg-brand-200 dark:bg-brand-900 rounded-full flex items-center justify-center text-2xl font-bold text-brand-700 dark:text-brand-300">
             {post.author.charAt(0)}
           </div>
           <div>
             <h3 className="font-bold text-slate-900 dark:text-white m-0 text-lg">Written by {post.author}</h3>
             <p className="text-slate-600 dark:text-slate-400 text-sm m-0 mt-1">
               Owner & Lead Developer at SmartToolsZone. Passionate about creating free, accessible software for everyone.
             </p>
           </div>
        </div>

        <div className="mt-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Tools</h3>
            <AdPlaceholder slotId="blog-bottom" />
        </div>
      </div>
    </ToolLayout>
  );
};
