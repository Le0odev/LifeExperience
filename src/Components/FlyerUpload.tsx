import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from './Header';
import HeaderAdmin from './HeaderAdmin';


// Contêiner Externo
export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #000; /* Fundo preto para contraste */
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Contêiner Principal
export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #1a1a1a; /* Cinza escuro com leve ajuste */
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  padding: 30px;
  border: 2px solid rgba(254, 207, 3, 0.8); /* Borda amarelo mais suave */
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6); /* Sombra mais intensa ao passar o mouse */
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 20px;
  }
`;

// Título
export const Title = styled.h1`
  font-size: 28px; /* Tamanho aumentado para destaque */
  color: rgba(254, 207, 3, 0.9); /* Amarelo suave */
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px; /* Maior espaçamento entre letras */
`;

// Estilo de Entrada
export const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: #333; /* Cinza escuro */
  color: #fff; /* Texto branco */
  font-size: 16px;

  &:focus {
    border-color: rgba(254, 207, 3, 1);
    outline: none;
    box-shadow: 0 0 5px rgba(254, 207, 3, 0.5); /* Brilho amarelo ao focar */
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: #333; /* Cinza escuro */
  color: #fff; /* Texto branco */
  font-size: 16px;

  &:focus {
    border-color: rgba(254, 207, 3, 1);
    outline: none;
    box-shadow: 0 0 5px rgba(254, 207, 3, 0.5); /* Brilho amarelo ao focar */
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Estilo de Botão
export const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: rgba(254, 207, 3, 1); /* Amarelo */
  color: #000; /* Texto preto */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: rgba(254, 207, 3, 0.8); /* Amarelo suave ao passar o mouse */
    transform: scale(1.03); /* Aumento sutil ao passar o mouse */
  }

  &:disabled {
    background-color: #555; /* Cinza para botão desabilitado */
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Mensagens de Sucesso e Erro
export const SuccessMessage = styled.div`
  color: #28a745; /* Verde */
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  color: #dc3545; /* Vermelho */
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`;

// Histórico de Logs
export const LogHistory = styled.div`
  margin-top: 30px;
  max-height: 300px;
  overflow-y: auto;
  background-color: #222; /* Fundo cinza escuro para logs */
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); /* Sombra mais intensa para histórico */
`;

// Entrada de Log
export const LogEntry = styled.div`
  padding: 10px;
  border-bottom: 1px solid #444; /* Borda entre logs */
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(254, 207, 3, 0.1); /* Fundo amarelo claro ao passar o mouse */
  }

  &:last-child {
    border-bottom: none;
  }
`;

// Texto de Log
export const LogText = styled.p`
  margin: 5px 0;
  color: rgba(254, 207, 3, 1); /* Amarelo para texto de logs */
  font-size: 14px;
`;

// Contêiner de Paginação
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

// Botão de Paginação
export const PaginationButton = styled.button`
  background-color: rgba(254, 207, 3, 1); /* Amarelo */
  border: none;
  color: black;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(254, 207, 3, 0.8); /* Amarelo suave ao passar o mouse */
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Informações da Página
export const PageInfo = styled.span`
  color: #fff; /* Texto branco */
  margin: 0 10px;
  font-size: 14px;
`;
// Estilo do Label
export const Label = styled.label`
  display: block;
  font-size: 16px; /* Tamanho da fonte */
  color: #ffcc00; /* Amarelo */
  margin-bottom: 5px; /* Espaçamento inferior */
  text-transform: uppercase; /* Transformação de texto */
  letter-spacing: 1px; /* Espaçamento entre letras */
  
  @media (max-width: 768px) {
    font-size: 14px; /* Ajuste no tamanho da fonte para telas menores */
  }
`;

// Componente Principal
const FlyerUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [eventName, setEventName] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState('Seleciona o dia');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [uploadDate, setUploadDate] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [logs, setLogs] = useState<{ eventName: string; selectedDay: string; date: string }[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const [title, setTitle] = useState<string>(''); // Novo estado para o título

  // Carregar logs do local storage ao montar o componente
  useEffect(() => {
    const storedLogs = localStorage.getItem('uploadLogs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(e.target.value);
  };
  

  
  const handleUpload = async () => {
    if (!file || !eventName || !title) { // Verifique se o título foi preenchido
      setError('Por favor, preencha todas as informações.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', eventName);
      formData.append('day', selectedDay);
      formData.append('title', title); // Inclua o título nos dados do formulário

      await axios.post('https://backendlife-production.up.railway.app/upload-flyer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const currentDate = new Date().toLocaleString('pt-BR');
      setUploadDate(currentDate);

      // Adicionar log
      const newLog = { eventName, selectedDay, date: currentDate };
      const updatedLogs = [...logs, newLog];
      setLogs(updatedLogs);
      localStorage.setItem('uploadLogs', JSON.stringify(updatedLogs));

      setSuccess(true);
      setEventName('');
      setFile(null);
      setTitle(''); // Resetar o título após o envio
      setSelectedDay('quinta'); // Resetar para o dia padrão
    } catch (error) {
      setError('Erro ao enviar o arquivo.');
    } finally {
      setLoading(false);
    }
  };

  // Páginação
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / itemsPerPage);

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

  return (
    <><HeaderAdmin />
    <OuterContainer>
      <Container>
        <Title>Upload do Flyer</Title>
        <Input
          type="text"
          placeholder="Título do Evento"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Atualizando o estado do título
        />
        <Input
          type="text"
          placeholder="Nome do Evento"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <Select value={selectedDay} onChange={handleDayChange}>
        <option value="Selecione o dia" >
          Seleciona o dia
        </option>
          <option value="quinta">Quinta</option>
          <option value="sexta">Sexta</option>
          <option value="sábado">Sábado</option>
        </Select>
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
        {success && (
          <SuccessMessage>Flyer enviado com sucesso! Data: {uploadDate}</SuccessMessage>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <LogHistory>
          {currentLogs.map((log, index) => (
            <LogEntry key={index}>
              <LogText>
                {log.eventName} - {log.selectedDay} - {log.date}
              </LogText>
            </LogEntry>
          ))}
        </LogHistory>
        
        <PaginationContainer>
          <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </PaginationButton>
          <PageInfo>{`Página ${currentPage} de ${totalPages}`}</PageInfo>
          <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
            Próxima
          </PaginationButton>
        </PaginationContainer>
      </Container>
    </OuterContainer>
    </>
  );
};

export default FlyerUpload;
