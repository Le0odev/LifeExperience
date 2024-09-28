// src/index.tsx
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Header from './Components/Header.tsx';
import Home from './Components/Home.tsx';
import Programacao from './Components/Programacao.tsx';
import FlyerUpload from './Components/FlyerUpload.tsx';
import Login from './Components/Login.tsx'; // Certifique-se de que este import está correto
import { auth } from './Config/firebase'; // Importe o auth do Firebase
import { onAuthStateChanged } from 'firebase/auth'; // Importe a função para monitorar mudanças de autenticação

// Componente para renderizar Header, Home e Programacao com base na localização
const App = () => {
  const [user, setUser] = useState<any>(null); // Estado para armazenar o usuário
  const location = useLocation();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Armazena o usuário autenticado
    });
    return () => unsubscribe(); // Limpa o listener
  }, []);

  return (
    <>
      {/* Renderiza apenas se não estiver na rota /admin */}
      {location.pathname !== '/admin' && (
        <>
          <Header />
          <Home />
          <Programacao />
        </>
      )}
      <Routes>
        <Route path="/admin" element={user ? <FlyerUpload /> : <Login setUser={setUser} />} /> {/* Rota para o painel administrativo */}
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