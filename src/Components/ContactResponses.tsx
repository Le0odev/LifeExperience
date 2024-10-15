import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineMessage } from 'react-icons/ai';

import HeaderAdmin from './HeaderAdmin';

// Estilo global para a interface de alto nível
export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background: #2f2f2f; /* Cor sólida e sóbria */
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Contêiner principal estilizado
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  border-radius: 10px;
  padding: 40px;
  background-color: #3b3b3b; /* Tons cinza escuro */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Sombra sutil */
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Título principal
export const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

// Cartão estilizado para cada contato
export const ContactCard = styled.div`
  background: #444444; /* Fundo mais claro para o cartão */
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

// Estilo para as informações do contato (lado esquerdo)
export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 48%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const InfoIcon = styled.span`
  color: #f1c40f; /* Um amarelo mais neutro */
  margin-right: 10px;
  font-size: 20px;
`;

export const InfoText = styled.p`
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

// Estilo para a mensagem
export const MessageSection = styled.div`
  background: #4d4d4d; /* Um fundo levemente mais claro */
  padding: 20px;
  border-radius: 8px;
  flex-basis: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;

  @media (max-width: 768px) {
    flex-basis: 100%;
    margin-top: 20px;
  }
`;

export const MessageText = styled.p`
  color: #dcdcdc;
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
  font-weight: 400;
`;

// Contêiner de Paginação
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const PaginationButton = styled.button`
  background-color: #f1c40f; /* Amarelo destacado */
  border: none;
  color: #000;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #e1b707;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const PageInfo = styled.span`
  color: #ffffff;
  margin: 0 15px;
  font-size: 16px;
  font-weight: 600;
`;

// Componente Principal
const ContactResponses: React.FC = () => {
  const [contacts, setContacts] = useState<{ name: string; email: string; celular: string; message: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true); // Para exibir estado de carregamento
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://backendlife-production.up.railway.app/contato');
        const formattedContacts = response.data.map((contact: any) => ({
          ...contact,
          createdAt: new Date(contact.createdAt).toLocaleString('pt-BR'),
        }));
        setContacts(formattedContacts);
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };
    fetchContacts();
  }, []);

  // Paginação
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Exibe mensagem de erro ou carregamento enquanto os dados são obtidos
  if (loading) {
    return (
      <OuterContainer>
        <Title>Carregando...</Title>
      </OuterContainer>
    );
  }

  if (error) {
    return (
      <OuterContainer>
        <Title>{error}</Title>
      </OuterContainer>
    );
  }

  return (
    <>
      <HeaderAdmin />
      <OuterContainer>
        <Container>
          <Title>Respostas de Contato</Title>

          {currentContacts.length > 0 ? (
            currentContacts.map((contact, index) => (
              <ContactCard key={index}>
                <InfoSection>
                  <InfoRow>
                    <InfoIcon><AiOutlineUser /></InfoIcon>
                    <InfoText>Nome: {contact.name}</InfoText>
                  </InfoRow>
                  <InfoRow>
                    <InfoIcon><AiOutlineMail /></InfoIcon>
                    <InfoText>E-mail: {contact.email}</InfoText>
                  </InfoRow>
                  <InfoRow>
                    <InfoIcon><AiOutlinePhone /></InfoIcon>
                    <InfoText>Telefone: {contact.celular}</InfoText>
                  </InfoRow>
                </InfoSection>
                <MessageSection>
                  <MessageText><AiOutlineMessage /> {contact.message}</MessageText>
                  <InfoText>Enviado em: {contact.createdAt}</InfoText>
                </MessageSection>
              </ContactCard>
            ))
          ) : (
            <Title>Nenhuma resposta encontrada</Title>
          )}

          <PaginationContainer>
            <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</PaginationButton>
            <PageInfo>{`Página ${currentPage} de ${totalPages}`}</PageInfo>
            <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>Próxima</PaginationButton>
          </PaginationContainer>
        </Container>
      </OuterContainer>
    </>
  );
};

export default ContactResponses;
