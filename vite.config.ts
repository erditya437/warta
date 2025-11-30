import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // loadEnv tidak lagi diperlukan, bisa dihapus atau diabaikan
    // const env = loadEnv(mode, '.', ''); 
    return {
      // 🚨 TAMBAHKAN BARIS INI UNTUK MEMPERBAIKI CSS 404
      base: '/', 
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // 🚨 HAPUS BLOCK DEFINE INI SEPENUHNYA
      // define: {
      //   'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      //   'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      // },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});