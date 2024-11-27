import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaFileUpload } from 'react-icons/fa'; // Ícone de upload
import { AiOutlineCalendar, AiOutlineLink } from 'react-icons/ai'; // Ícones de calendário e link
import { FiLoader } from 'react-icons/fi'; // Ícone de carregamento

import HeaderAdmin from './HeaderAdmin';

// Contêiner Externo
export const OuterContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100%;
  height: 100vh;
  background-color: #121212;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Contêiner Principal
export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #1e1e1e;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  padding: 30px;
  border: 2px solid rgba(254, 207, 3, 0.8);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 20px;
  }
`;

// Título
export const Title = styled.h1`
  font-size: 30px;
  color: rgba(254, 207, 3, 0.9);
  margin-bottom: 25px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

// Contêiner de Input com Ícone
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
`;

export const Icon = styled.span`
  color: rgba(254, 207, 3, 1);
  margin-right: 10px;
  font-size: 18px;
`;

// Estilo de Entrada
export const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: rgba(254, 207, 3, 1);
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
  background-color: #333;
  color: #fff;
  font-size: 16px;

  &:focus {
    border-color: rgba(254, 207, 3, 1);
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Estilo customizado do input de arquivo
export const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const FileInputLabel = styled.label`
  background-color: rgba(254, 207, 3, 1);
  color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(254, 207, 3, 0.8);
  }
`;

export const FileName = styled.span`
  color: #fff;
  margin-left: 15px;
  font-size: 14px;
`;

// Estilo de Botão
export const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: rgba(254, 207, 3, 1);
  color: #000;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(254, 207, 3, 0.8);
    transform: scale(1.03);
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SuccessMessage = styled.div`
  color: #28a745;
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
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
  background-color: #222;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

export const LogEntry = styled.div`
  padding: 10px;
  border-bottom: 1px solid #444;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(254, 207, 3, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const LogText = styled.p`
  margin: 5px 0;
  color: rgba(254, 207, 3, 1);
  font-size: 14px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background-color: rgba(254, 207, 3, 1);
  border: none;
  color: black;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(254, 207, 3, 0.8);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const PageInfo = styled.span`
  color: #fff;
  margin: 0 10px;
  font-size: 14px;
`;

// Componente Principal
const MediaUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mediaTitle, setMediaTitle] = useState<string>('');
  const [mediaDescription, setMediaDescription] = useState<string>('');
  const [mediaDate, setMediaDate] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [uploadDate, setUploadDate] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [logs, setLogs] = useState<{ title: string; description: string; date: string }[]>([]);

  useEffect(() => {
    const storedLogs = localStorage.getItem('uploadMediaLogs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !mediaTitle || !mediaDescription || !mediaDate) {
      setError('Por favor, preencha todas as informações.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', mediaTitle);
      formData.append('description', mediaDescription);
      formData.append('date', mediaDate);

      await axios.post('https://backendlife-production.up.railway.app/upload-media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const currentDate = new Date().toLocaleString('pt-BR');
      setUploadDate(currentDate);

      const newLog = { title: mediaTitle, description: mediaDescription, date: currentDate };
      const updatedLogs = [...logs, newLog];
      setLogs(updatedLogs);
      localStorage.setItem('uploadMediaLogs', JSON.stringify(updatedLogs));

      setSuccess(true);
      setMediaTitle('');
      setMediaDescription('');
      setFile(null);
      setMediaDate('');
    } catch (error) {
      setError('Erro ao enviar o arquivo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <OuterContainer id='gallery'>
        <Container>
          <Title>Envio de Mídia</Title>
          <InputContainer>
            <Icon><AiOutlineLink /></Icon>
            <Input
              type="text"
              placeholder="Título da Mídia"
              value={mediaTitle}
              onChange={(e) => setMediaTitle(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Icon><AiOutlineLink /></Icon>
            <Input
              type="text"
              placeholder="Descrição da Mídia"
              value={mediaDescription}
              onChange={(e) => setMediaDescription(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Icon><AiOutlineCalendar /></Icon>
            <Input
              type="text"
              placeholder="dd/mm/aaaa"
              value={mediaDate}
              onChange={(e) => setMediaDate(e.target.value)}
            />
          </InputContainer>

          {/* Customização do input de arquivo */}
          <FileInputContainer>
            <FileInputLabel htmlFor="file-upload">
              <FaFileUpload /> Escolher arquivo
            </FileInputLabel>
            <input
              id="file-upload"
              type="file"
              style={{ display: 'none' }} // Esconder o input padrão
              onChange={handleFileChange}
            />
            <FileName>{file ? file.name : 'Nenhum arquivo selecionado'}</FileName>
          </FileInputContainer>

          <Button onClick={handleUpload} disabled={loading}>
            {loading ? <FiLoader /> : 'Enviar Mídia'}
          </Button>
          {success && <SuccessMessage>Mídia enviada com sucesso! Data: {uploadDate}</SuccessMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {logs.length > 0 && (
            <LogHistory>
              {logs.map((log, index) => (
                <LogEntry key={index}>
                  <LogText>Descrição: {log.description}, Data: {log.date}</LogText>
                </LogEntry>
              ))}
            </LogHistory>
          )}
        </Container>
      </OuterContainer>
    </>
  );
};

export default MediaUpload;
