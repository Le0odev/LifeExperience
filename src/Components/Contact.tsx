import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const PageContainer = styled.div`
  background-color: #0d0d0d; /* Preto suave */
  color: #fecf03;
  padding: 6rem 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #ffffff;
  letter-spacing: 2px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #fecf03;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
`;


const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledInput = styled.input`
  padding: 1rem;
  border: 1px solid #333;
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 0.9rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &:focus {
    outline: none;
    border-color: #fecf03;
    box-shadow: 0 0 0 2px rgba(254, 207, 3, 0.2);
  }
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Torna os elementos em uma única coluna no mobile */
    grid-template-rows: auto;
  }
`;

const StyledTextArea = styled.textarea`
  grid-column: 2;
  grid-row: 1 / span 3;
  padding: 1rem;
  border: 1px solid #333;
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 0.9rem;
  resize: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &:focus {
    outline: none;
    border-color: #fecf03;
    box-shadow: 0 0 0 2px rgba(254, 207, 3, 0.2);
  }

  @media (max-width: 768px) {
    grid-column: 1; /* Ajusta o textarea para a primeira coluna no mobile */
    grid-row: 3;    /* Move o textarea para depois dos inputs */
  }
`;

const StyledButton = styled.button`
  grid-column: 2;
  background-color: #fecf03;
  color: #000;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ffdb4d;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    grid-column: 1; /* Ajusta o botão para a primeira coluna no mobile */
    grid-row: 4;    /* Move o botão para depois do textarea */
  }
`;

const SocialMediaContainer = styled.div`
  text-align: center;
`;

const SocialMediaTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #fecf03;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SocialMediaLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const SocialMediaLink = styled.a`
  color: #fecf03;
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #ffdb4d;
    transform: translateY(-2px);
  }
`;
const Contact: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formulário enviado', { nome, email, telefone, mensagem });
    setNome('');
    setEmail('');
    setTelefone('');
    setMensagem('');
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>CONTATO</Title>
        <Subtitle>PRECISA DE AJUDA OU TEM ALGUMA DÚVIDA? ENTRE EM CONTATO CONOSCO.</Subtitle>
        <StyledForm onSubmit={handleSubmit}>
          <InputGroup>
            <StyledInput
              type="text"
              placeholder="SEU NOME"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <StyledInput
              type="email"
              placeholder="SEU EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <StyledInput
              type="tel"
              placeholder="SEU TELEFONE"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </InputGroup>
          <StyledTextArea
            placeholder="MENSAGEM"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          />
          <StyledButton type="submit">ENVIAR</StyledButton>
        </StyledForm>
        
        <SocialMediaContainer>
          <SocialMediaTitle>SIGA-NOS NAS REDES SOCIAIS</SocialMediaTitle>
          <SocialMediaLinks>
            <SocialMediaLink href="https://facebook.com/mahaubar" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </SocialMediaLink>
            <SocialMediaLink href="https://instagram.com/mahaubar" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialMediaLink>
            <SocialMediaLink href="https://twitter.com/mahaubarsp" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialMediaLink>
          </SocialMediaLinks>
        </SocialMediaContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Contact;