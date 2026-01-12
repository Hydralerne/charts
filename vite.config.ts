import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    cssMinify: 'esbuild', // or false if you want zero risk 
  }
})
