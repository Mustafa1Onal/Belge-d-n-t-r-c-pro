export enum ConversionType {
  WORD_TO_PDF = 'WORD_TO_PDF',
  PDF_TO_WORD = 'PDF_TO_WORD',
  AI_ENHANCE = 'AI_ENHANCE'
}

export interface FileState {
  file: File | null;
  status: 'idle' | 'uploading' | 'converting' | 'completed' | 'error';
  progress: number;
  downloadUrl?: string;
}

export enum GeminiModel {
  FLASH = 'gemini-3-flash-preview',
}
