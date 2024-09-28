// src/components/Login.tsx
import React, { useState } from 'react';
import { auth } from '../Config/firebase'; // Importe sua configuração do Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components';
import Header from './Header';

// Estilização com styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: yellow;
  min-height: 100vh;
  justify-content: center;
  padding: 20px;
  
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 38px;
  margin-top: 100px

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px; // Ajuste conforme necessário
  border: yellow;
  margin-bottom: 100px;

  @media (max-width: 768px) {
      width: 300px; // Ajuste conforme necessário
      margin-bottom: 200px;
 }  
  
`;

const Input = styled.input`
  padding: 10px;
  font-size: 20px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid yellow;
  border-radius: 4px;
  background-color: black;
  color: yellow;

  @media (max-width: 768px) {
      font-size: 14px;

 }

   
  &:focus {
    outline: none;
    border-color: yellow;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: yellow;
  border: none;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: darkorange; // Um tom mais escuro de amarelo
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const Login: React.FC<{ setUser: (user: any) => void }> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    setError(''); // Limpa o erro ao tentar logar

    if (!email || !password) {
      setError('Email and password are required.'); // Verificação de campos vazios
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Armazena o usuário autenticado
      setEmail('');
      setPassword('');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <Container>
        <Header />
      <Title>Login</Title>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default Login;
