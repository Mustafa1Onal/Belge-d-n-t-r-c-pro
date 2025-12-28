import React, { useState } from 'react';
import DonationBanner from './components/DonationBanner';
import Converter from './components/Converter';
import { ConversionType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ConversionType>(ConversionType.WORD_TO_PDF);

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      <DonationBanner />
      
      {/* Navbar / Header - draggable region for electron */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30" style={{ WebkitAppRegion: 'drag' } as any}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                 <i className="fa-solid fa-file-arrow-up"></i>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">Dönüştürücü<span className="text-brand-600">Pro</span> Desktop</span>
            </div>
            
            <nav className="hidden md:flex space-x-8" style={{ WebkitAppRegion: 'no-drag' } as any}>
              <button className="text-gray-500 hover:text-gray-900 font-medium">Nasıl Çalışır?</button>
              <button className="text-gray-500 hover:text-gray-900 font-medium">Ayarlar</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 -translate-x-1/2 translate-y-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-3xl -z-10 pointer-events-none mix-blend-multiply opacity-70"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-[10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl -z-10 pointer-events-none mix-blend-multiply opacity-70"></div>

        <div className="text-center max-w-3xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Masaüstünüzde <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Hızlıca</span> Dönüştürün
          </h1>
          <p className="text-lg text-gray-600">
            İnternet bağlantısı gerektirmeyen temel işlemler ve AI destekli gelişmiş özellikler tek uygulamada.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200 inline-flex mb-10 overflow-x-auto max-w-full">
           <button 
             onClick={() => setActiveTab(ConversionType.WORD_TO_PDF)}
             className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
               activeTab === ConversionType.WORD_TO_PDF 
               ? 'bg-brand-600 text-white shadow-md' 
               : 'text-gray-500 hover:bg-gray-50'
             }`}
           >
             <i className="fa-solid fa-file-word"></i> Word &rarr; PDF
           </button>
           <button 
             onClick={() => setActiveTab(ConversionType.PDF_TO_WORD)}
             className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
               activeTab === ConversionType.PDF_TO_WORD 
               ? 'bg-brand-600 text-white shadow-md' 
               : 'text-gray-500 hover:bg-gray-50'
             }`}
           >
             <i className="fa-solid fa-file-pdf"></i> PDF &rarr; Word
           </button>
            <div className="w-px bg-gray-200 mx-1"></div>
           <button 
             onClick={() => setActiveTab(ConversionType.AI_ENHANCE)}
             className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
               activeTab === ConversionType.AI_ENHANCE 
               ? 'bg-purple-600 text-white shadow-md' 
               : 'text-purple-600 hover:bg-purple-50'
             }`}
           >
             <i className="fa-solid fa-wand-magic-sparkles"></i> AI Asistanı
           </button>
        </div>

        {/* Converter Card */}
        <Converter type={activeTab} />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-7xl w-full">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <i className="fa-solid fa-desktop text-xl"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Native Performans</h3>
            <p className="text-gray-500 text-sm">Tarayıcı sınırlarına takılmadan bilgisayarınızın gücünü kullanın.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
              <i className="fa-solid fa-lock text-xl"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Maksimum Gizlilik</h3>
            <p className="text-gray-500 text-sm">Dosyalarınız yerel olarak işlenir, sunuculara yüklenmez (AI hariç).</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
              <i className="fa-solid fa-microchip text-xl"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">AI Entegrasyonu</h3>
            <p className="text-gray-500 text-sm">Gemini AI teknolojisi masaüstü uygulamanıza entegre edilmiştir.</p>
          </div>
        </div>

      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2025 Dönüştürücü Pro Desktop v1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;