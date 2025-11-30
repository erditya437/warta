// src/components/Header.tsx

import React from 'react';
import { Newspaper, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  // Tambahkan prop navigasi baru
  onNavigateAbout: () => void; 
  currentPage: 'landing' | 'dashboard' | 'about'; // Tambahkan 'about' ke tipe currentPage
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNavigateDashboard, onNavigateAbout, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={onNavigateHome}>
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Newspaper className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
              Warta
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={onNavigateHome}
              className={`text-sm font-medium transition-colors ${currentPage === 'landing' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Beranda
            </button>
            <button 
              onClick={onNavigateDashboard}
              className={`text-sm font-medium transition-colors ${currentPage === 'dashboard' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Berita
            </button>
            {/* Tombol About Baru */}
            <button 
              onClick={onNavigateAbout}
              className={`text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              About
            </button>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-slate-900">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4">
          <div className="flex flex-col space-y-4">
             <button 
              onClick={() => { onNavigateHome(); setIsMenuOpen(false); }}
              className="text-left text-base font-medium text-slate-600"
            >
              Beranda
            </button>
            <button 
              onClick={() => { onNavigateDashboard(); setIsMenuOpen(false); }}
              className="text-left text-base font-medium text-slate-600"
            >
              Berita
            </button>
            {/* Tombol About Mobile Baru */}
            <button 
              onClick={() => { onNavigateAbout(); setIsMenuOpen(false); }}
              className="text-left text-base font-medium text-slate-600"
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
};