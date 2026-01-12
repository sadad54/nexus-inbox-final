import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    // Auto-import Vuetify styles
    vuetify({ autoImport: true }), 
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Critical for clean imports
    },
  },
})