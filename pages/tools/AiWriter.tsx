import React, { useState } from 'react';
import { ToolLayout } from '../../components/ToolLayout';
import { generateBlogIntro } from '../../services/geminiService';
import { Sparkles, Copy, RefreshCw, AlertCircle } from 'lucide-react';

export const AiWriter: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      const generatedText = await generateBlogIntro(topic, tone);
      setResult(generatedText);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      toolId="ai-writer"
      title="AI Blog Intro Generator"
      description="Generate engaging, SEO-friendly blog post introductions instantly using advanced AI."
      faqs={[
        { question: "Is this AI content original?", answer: "Yes, the AI generates unique content based on your prompt each time." },
        { question: "Is it free?", answer: "Yes, this tool is currently free to use for our users." }
      ]}
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="md:col-span-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Blog Topic / Title
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Benefits of Yoga"
                className="w-full h-32 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tone of Voice
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-white"
              >
                <option>Professional</option>
                <option>Casual</option>
                <option>Excited</option>
                <option>Informative</option>
                <option>Witty</option>
              </select>
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="animate-spin" /> : <Sparkles />} 
              {loading ? 'Generating...' : 'Generate Intro'}
            </button>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5" /> {error}
              </div>
            )}
          </div>

          {/* Output */}
          <div className="md:col-span-2">
            <div className="relative h-full min-h-[300px] border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 p-6">
              {result ? (
                <>
                  <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: result }} />
                  <button
                    onClick={() => navigator.clipboard.writeText(result.replace(/<[^>]*>?/gm, ''))}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-brand-600 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="Copy Text"
                  >
                    <Copy size={20} />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center">
                  <Sparkles size={48} className="mb-4 opacity-20" />
                  <p>Enter a topic and click generate to see the AI magic happen.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};
