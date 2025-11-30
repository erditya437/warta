import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { About } from './components/About'; // Import komponen About baru

function App() {
  // Update state type untuk memasukkan 'about'
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'about'>('landing');

  // Fungsi untuk menentukan komponen yang akan dirender berdasarkan state
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'about':
        return <About />; // Tampilkan komponen About
      case 'landing':
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header 
        currentPage={currentPage}
        onNavigateHome={() => setCurrentPage('landing')}
        onNavigateDashboard={() => setCurrentPage('dashboard')}
        onNavigateAbout={() => setCurrentPage('about')} // Prop baru untuk navigasi About
      />
      
      <main className="flex-grow">
        {renderPage()} {/* Panggil fungsi rendering */}
      </main>

      <Footer />
    </div>
  );
}

export default App;