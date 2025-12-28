import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: Cast process to any to access cwd() method which might be missing in some type definitions
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    base: './', // Important for Electron to find assets
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})