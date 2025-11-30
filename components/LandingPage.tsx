import React from 'react';
import { ArrowRight, Globe, Zap, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24 text-center">
          <div className="relative z-10">
            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl mb-6">
              <span className="block">Berita Dunia dalam</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Genggaman AI 
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500 mb-10">
              Dapatkan rangkuman berita terkini, akurat, dan terpercaya dari berbagai sumber global dalam hitungan detik menggunakan kekuatan AI dan google search.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2"
              >
                Mulai Baca Berita <ArrowRight size={20} />
              </button>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sumber Global</h3>
              <p className="text-slate-600">
                Akses informasi dari ribuan sumber terpercaya di seluruh dunia yang dikurasi secara otomatis.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rangkuman Cepat</h3>
              <p className="text-slate-600">
                Hemat waktu dengan rangkuman poin-poin penting yang mudah dibaca tanpa clickbait.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Faktual & Terkini</h3>
              <p className="text-slate-600">
                Didukung oleh Google Search Grounding untuk memastikan data yang Anda terima selalu segar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};