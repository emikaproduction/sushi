import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// fonty hostowane lokalnie (zamiast Google Fonts, które blokowały renderowanie); tylko alfabety łaciński + polskie znaki
import '@fontsource/anton/latin-400.css'
import '@fontsource/anton/latin-ext-400.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-ext-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-ext-500.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/inter/latin-ext-700.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
