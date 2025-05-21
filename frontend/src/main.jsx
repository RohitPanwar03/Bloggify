import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from './Context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>

  <Toaster/>
  <StrictMode>
    <App />
  </StrictMode>

  </AuthProvider>
)
