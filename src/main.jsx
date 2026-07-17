import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { VibeProvider } from './hooks/useVibe'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VibeProvider>
      <App />
    </VibeProvider>
  </StrictMode>,
)
