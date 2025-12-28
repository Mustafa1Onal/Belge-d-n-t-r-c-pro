import React, { useState, useRef, useCallback } from 'react';
import { ConversionType, FileState } from '../types';
import { analyzeDocumentContent } from '../services/geminiService';

interface ConverterProps {
  type: ConversionType;
}

const Converter: React.FC<ConverterProps> = ({ type }) => {
  const [fileState, setFileState] = useState<FileState>({
    file: null,
    status: 'idle',
    progress: 0
  });
  const [aiResult, setAiResult] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getTitle = () => {
    switch (type) {
      case ConversionType.WORD_TO_PDF: return "Word'den PDF'e";
      case ConversionType.PDF_TO_WORD: return "PDF'ten Word'e";
      case ConversionType.AI_ENHANCE: return "AI Belge İyileştirici";
      default: return "";
    }
  };

  const getIcon = () => {
    switch (type) {
      case ConversionType.WORD_TO_PDF: return "fa-file-word";
      case ConversionType.PDF_TO_WORD: return "fa-file-pdf";
      case ConversionType.AI_ENHANCE: return "fa-wand-magic-sparkles";
      default: return "fa-file";
    }
  };

  const getTargetIcon = () => {
    switch (type) {
      case ConversionType.WORD_TO_PDF: return "fa-file-pdf";
      case ConversionType.PDF_TO_WORD: return "fa-file-word";
      case ConversionType.AI_ENHANCE: return "fa-file-signature";
      default: return "fa-file";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileState({
        file: e.target.files[0],
        status: 'idle',
        progress: 0
      });
      setAiResult("");
    }
  };

  const startConversion = useCallback(async () => {
    if (!fileState.file) return;

    setFileState(prev => ({ ...prev, status: 'uploading', progress: 10 }));

    // Simulation of upload
    await new Promise(resolve => setTimeout(resolve, 800));
    setFileState(prev => ({ ...prev, status: 'converting', progress: 30 }));

    try {
      if (type === ConversionType.AI_ENHANCE) {
         // Real AI interaction for demo purposes using Gemini
         // Note: In a real browser environment, reading .doc/.pdf directly without libraries is hard.
         // We will simulate reading the text for this demo or just use a placeholder text if we can't read binary.
         setFileState(prev => ({ ...prev, progress: 50 }));
         const mockText = "Bu belge dönüştürme işlemi için örnek bir metindir. Gemini API kullanılarak analiz edilecektir.";
         const result = await analyzeDocumentContent(mockText);
         setAiResult(result);
      } else {
        // Simulating heavy processing
        for (let i = 30; i <= 90; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 400));
          setFileState(prev => ({ ...prev, progress: i }));
        }
      }

      setFileState(prev => ({ 
        ...prev, 
        status: 'completed', 
        progress: 100,
        downloadUrl: '#' // Mock URL
      }));
    } catch (e) {
      setFileState(prev => ({ ...prev, status: 'error', progress: 0 }));
    }
  }, [fileState.file, type]);

  const reset = () => {
    setFileState({ file: null, status: 'idle', progress: 0 });
    setAiResult("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden w-full max-w-2xl mx-auto transition-all duration-300 hover:shadow-2xl">
      <div className={`p-6 sm:p-8 ${fileState.status === 'completed' ? 'bg-green-50' : 'bg-white'}`}>
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
            type === ConversionType.WORD_TO_PDF ? 'bg-blue-100 text-blue-600' :
            type === ConversionType.PDF_TO_WORD ? 'bg-red-100 text-red-600' :
            'bg-purple-100 text-purple-600'
          }`}>
            <i className={`fa-solid ${getIcon()} text-3xl`}></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{getTitle()}</h2>
          <p className="text-gray-500 mt-2">Belgenizi sürükleyip bırakın veya seçin</p>
        </div>

        {/* Upload Area or Status Area */}
        {fileState.status === 'idle' ? (
          <div 
            className="border-3 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:bg-gray-50 hover:border-brand-500 transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept={type === ConversionType.WORD_TO_PDF ? ".doc,.docx" : ".pdf"}
            />
            <div className="mb-4 text-gray-300 group-hover:text-brand-500 transition-colors">
              <i className="fa-solid fa-cloud-arrow-up text-5xl"></i>
            </div>
            <p className="text-lg font-medium text-gray-700">Dosya Seçin</p>
            <p className="text-sm text-gray-400 mt-1">veya buraya bırakın</p>
            {type === ConversionType.WORD_TO_PDF && <span className="inline-block mt-4 px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">.DOCX &rarr; .PDF</span>}
            {type === ConversionType.PDF_TO_WORD && <span className="inline-block mt-4 px-3 py-1 bg-red-50 text-red-600 text-xs rounded-full font-medium">.PDF &rarr; .DOCX</span>}
          </div>
        ) : fileState.status === 'completed' ? (
          <div className="text-center py-8">
             <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <i className="fa-solid fa-check text-4xl"></i>
             </div>
             <h3 className="text-xl font-bold text-gray-800 mb-2">Dönüştürme Başarılı!</h3>
             <p className="text-gray-500 mb-8">Dosyanız indirilmeye hazır.</p>
             
             {type === ConversionType.AI_ENHANCE && aiResult && (
               <div className="bg-white p-4 rounded-xl border border-purple-200 text-left mb-6 shadow-sm">
                 <h4 className="font-semibold text-purple-700 mb-2"><i className="fa-solid fa-robot mr-2"></i>AI Analizi:</h4>
                 <p className="text-gray-700 text-sm whitespace-pre-wrap">{aiResult}</p>
               </div>
             )}

             <div className="flex gap-4 justify-center">
                <button onClick={reset} className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
                  Yeni İşlem
                </button>
                <button className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg shadow-green-600/30 transition-all flex items-center gap-2">
                  <i className="fa-solid fa-download"></i> İndir
                </button>
             </div>
          </div>
        ) : (
          <div className="py-12 px-6 bg-gray-50 rounded-2xl border border-gray-100">
             <div className="flex items-center justify-between mb-2">
               <span className="text-sm font-semibold text-gray-700">
                  {fileState.status === 'uploading' ? 'Yükleniyor...' : 'Dönüştürülüyor...'}
               </span>
               <span className="text-sm font-bold text-brand-600">{fileState.progress}%</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
               <div 
                 className="bg-brand-500 h-3 rounded-full transition-all duration-300 ease-out relative"
                 style={{ width: `${fileState.progress}%` }}
               >
                 <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/30 animate-pulse"></div>
               </div>
             </div>
             <p className="text-center text-xs text-gray-400 mt-4">Lütfen pencereyi kapatmayın, işlem devam ediyor.</p>
          </div>
        )}

        {/* Action Button (if file selected but not started) */}
        {fileState.file && fileState.status === 'idle' && (
           <div className="mt-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg mb-6 w-full max-w-sm">
                <i className={`fa-solid ${getIcon()} text-xl text-gray-600`}></i>
                <span className="flex-1 truncate font-medium text-gray-700">{fileState.file.name}</span>
                <button onClick={reset} className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
              </div>
              
              <button 
                onClick={startConversion}
                className="w-full max-w-xs group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-brand-600 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/30"
              >
                <span>Dönüştür</span>
                <i className={`fa-solid ${getTargetIcon()} ml-2 group-hover:translate-x-1 transition-transform`}></i>
              </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default Converter;