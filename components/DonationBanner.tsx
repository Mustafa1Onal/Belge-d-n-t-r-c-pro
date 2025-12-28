import React, { useState } from 'react';

const DonationBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg relative z-50 select-none drag-none">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-yellow-500/20 rounded-full shrink-0">
            <i className="fa-brands fa-bitcoin text-yellow-500 text-xl"></i>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            Bu uygulama sizin gibi insanların bağışları ile ücretsiz olarak geliştiriliyor.
            <span className="block mt-1 sm:mt-0 sm:inline sm:ml-2 text-yellow-400 font-mono text-xs sm:text-sm bg-gray-700/50 px-2 py-1 rounded select-all cursor-pointer hover:bg-gray-600 transition-colors" title="Kopyalamak için tıklayın" onClick={() => navigator.clipboard.writeText("bc1q2psekc70zn2v9k7p04gc42xz7wg5kayq44wze3")}>
              bitcoin:bc1q2psekc70zn2v9k7p04gc42xz7wg5kayq44wze3
              <i className="fa-regular fa-copy ml-2"></i>
            </span>
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="shrink-0 flex p-2 rounded-md hover:bg-white/10 focus:outline-none transition-colors"
          aria-label="Kapat"
        >
          <i className="fa-solid fa-xmark text-gray-400 hover:text-white"></i>
        </button>
      </div>
    </div>
  );
};

export default DonationBanner;