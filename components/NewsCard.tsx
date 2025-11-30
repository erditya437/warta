import React from 'react';
import { ExternalLink, Bot, Share2 } from 'lucide-react';
import { NewsSource } from '../types';
import ReactMarkdown from 'react-markdown';

interface NewsCardProps {
  content: string;
  sources: NewsSource[];
  topic: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({ content, sources, topic }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          <Bot size={20} className="text-blue-200" />
          Rangkuman AI: {topic}
        </h2>
        <button className="text-white/80 hover:text-white transition-colors">
          <Share2 size={18} />
        </button>
      </div>
      
      <div className="p-6">
        <div className="markdown-content text-slate-700 leading-relaxed">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {sources.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Sumber Terverifikasi
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {sources.map((source, idx) => (
                <a 
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors group border border-slate-200 hover:border-blue-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-700">
                      {source.title}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {new URL(source.uri).hostname.replace('www.', '')}
                    </p>
                  </div>
                  <ExternalLink size={14} className="ml-2 text-slate-400 group-hover:text-blue-500 mt-1" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};