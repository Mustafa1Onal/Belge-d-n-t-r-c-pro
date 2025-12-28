import { GoogleGenAI } from "@google/genai";
import { GeminiModel } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDocumentContent = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: GeminiModel.FLASH,
      contents: `Aşağıdaki metni analiz et, dilbilgisi hatalarını düzelt ve daha profesyonel bir dile çevirip özetle:\n\n${text}`,
      config: {
        systemInstruction: "Sen profesyonel bir editör ve belge asistanısın. Kullanıcının belgelerini iyileştirmesine yardım et.",
      }
    });
    
    return response.text || "Analiz tamamlanamadı.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("AI analizi sırasında bir hata oluştu.");
  }
};
