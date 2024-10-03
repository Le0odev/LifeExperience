import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from './Header';
import HeaderAdmin from './HeaderAdmin';

// Estilos do Container Principal
const OuterContainer = styled.div`
  background-color: #000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 40px;
  border-radius: 12px;
  background: linear-gradient(145deg, #1e1e1e, #111);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  border: 1px solid #ffc107; /* Amarelo */
  margin-bottom: 90px;

  @media (max-width: 768px) {
    margin-bottom: 100px;
  }
`;

// Estilos dos Títulos e Entradas
const Title = styled.h2`
  color: #ffc107; /* Amarelo */
  text-align: center;
  font-size: 28px;
  margin-bottom: 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 18px;
  background-color: #333;
  color: #fff;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ffc107; /* Amarelo */
    background-color: #444;
    box-shadow: 0 0 5px #ffc107;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 18px;
  background-color: #333;
  color: #fff;
  appearance: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ffc107; /* Amarelo */
    background-color: #444;
    box-shadow: 0 0 5px #ffc107;
    outline: none;
  }
`;

// Estilos do Botão
const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: ${({ disabled }) => (disabled ? '#555' : '#ffc107')}; /* Amarelo */
  color: #000; /* Preto */
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: 0 4px 10px rgba(255, 193, 7, 0.4); /* Amarelo */
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#555' : '#e0a800')}; /* Amarelo mais escuro */
    box-shadow: ${({ disabled }) =>
      disabled ? 'none' : '0 6px 15px rgba(255, 193, 7, 0.6)'};
  }
`;

// Estilos das Mensagens
const SuccessMessage = styled.p`
  color: #00ff7f;
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
`;

// Estilos dos Logs
const LogHistory = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 0.5px solid #ffc107; /* Amarelo */
  border-radius: 8px;
  background-color: #222;
  color: #fff;
  text-align: left;
  max-height: 300px; /* Aumentado para dar mais espaço */
  overflow-y: auto;
`;

const LogEntry = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #333;
  border-radius: 6px;
`;

const LogText = styled.p`
  font-size: 14px;
  color: #fff;
  margin: 0;
  word-wrap: break-word;
`;

// Estilos da Paginação
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  border: none;
  background-color: #ffc107; /* Amarelo */
  color: #000;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0a800; /* Amarelo mais escuro */
  }
`;

const PageInfo = styled.p`
  color: #ffc107; /* Amarelo */
  margin: 0 15px;
  align-self: center;
`;

// Componente Principal
const FlyerUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [eventName, setEventName] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('quinta-feira');
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
