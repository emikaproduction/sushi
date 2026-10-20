import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // build idzie na GitHub Pages pod https://emikaproduction.github.io/sushi/
  base: command === 'build' ? '/sushi/' : '/',
  plugins: [react(), tailwindcss()],
}))
