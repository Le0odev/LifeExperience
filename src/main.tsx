// src/index.tsx
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Header from './Components/Header.tsx';
import Home from './Components/Home.tsx';
import Programacao from './Components/Programacao.tsx';
import FlyerUpload from './Components/admin/FlyerUpload.tsx';
import Login from '../src/Components/admin/Login.tsx'; // Certifique-se de que este import está correto
import { auth } from './Config/firebase'; // Importe o auth do Firebase
import { onAuthStateChanged } from 'firebase/auth'; // Importe a função para monitorar mudanças de autenticação
import Life from './Components/Life.tsx';
import GallerySection from './Components/Gallery.tsx';
import MidiaUpload from './Components/admin/MidiaUpload.tsx';
import Reservas from './Components/Reservas.tsx';
import Contact from './Components/Contact.tsx';
import ContactResponses from './Components/admin/ContactResponses.tsx';
import Footer from './Components/Footer.tsx';


const App = () => {
  const [user, setUser] = useState<any>(null); 
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
    });
    return () => unsubscribe(); 
  }, []);

  return (
    <>
      {location.pathname !== '/admin' && location.pathname !== '/admin/media'  && location.pathname !== '/admin/contatos' && (
        <>
          <Header />
          <Home />
          <Life />
          <Programacao />
          <GallerySection />
          <Reservas />
          <Contact />
          <Footer />
        </>
      )}
      <Routes>
        <Route path="/admin" element={user ? <FlyerUpload /> : <Login setUser={setUser} />} />
        <Route path="/admin/media" element={user ? <MidiaUpload /> : <Login setUser={setUser} />} /> 
        <Route path="/admin/contatos" element={user ? <ContactResponses /> : <Login setUser={setUser} />} /> 

      </Routes>

    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
