import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="mb-2">© 2024 Warta.by erditya</p>
        <p className="text-sm text-slate-500">
          Informasi yang disajikan dihasilkan oleh Google Search. Selalu verifikasi berita penting.
        </p>
      </div>
    </footer>
  );
};