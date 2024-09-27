import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Components/Header.tsx'
import Home from './Components/Home.tsx'
import Programacao from './Components/Programacao.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Home />
    <Programacao />
  </StrictMode>,
)
