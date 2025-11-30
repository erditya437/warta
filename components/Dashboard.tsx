import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { NewsCategory, NewsResponse } from '../types';
import { fetchNewsWithAI } from '../services/geminiService';
import { NewsCard } from './NewsCard';

export const Dashboard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(NewsCategory.HEADLINES);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async (topic: string) => {
    setLoading(true);
    setError(null);
    setNewsData(null);
    try {
      const data = await fetchNewsWithAI(topic);
      setNewsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadNews(activeCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setSearchQuery('');
    loadNews(category);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveCategory('Pencarian');
      loadNews(searchQuery);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Controls Section */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            {activeCategory === 'Pencarian' ? `Hasil: "${searchQuery}"` : activeCategory}
          </h1>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Cari topik spesifik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            />
            <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
          </form>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {Object.values(NewsCategory).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category && !searchQuery
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin mb-4 text-blue-500" size={48} />
            <p className="text-lg font-medium text-slate-600">Sedang mengkurasi berita...</p>
            <p className="text-sm">sedang membaca sumber terpercaya untuk Anda</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-500 bg-red-50 rounded-xl border border-red-100">
            <AlertCircle size={48} className="mb-4" />
            <p className="text-lg font-medium text-slate-800 mb-2">{error}</p>
            <button 
              onClick={() => loadNews(activeCategory === 'Pencarian' ? searchQuery : activeCategory)}
              className="mt-4 flex items-center gap-2 px-6 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <RefreshCw size={16} /> Coba Lagi
            </button>
          </div>
        ) : newsData ? (
          <div className="animate-fadeIn">
             <NewsCard 
               content={newsData.content} 
               sources={newsData.sources}
               topic={activeCategory === 'Pencarian' ? searchQuery : activeCategory}
             />
          </div>
        ) : null}
      </div>
    </div>
  );
};