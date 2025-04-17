import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from './Context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
 <BrowserRouter>
  <Toaster/>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </AuthProvider>
)
