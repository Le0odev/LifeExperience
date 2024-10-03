import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeaderAdmin from './HeaderAdmin';


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
// Estilos do Container Principal
const OuterContainer = styled.section`
  background-color: #000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

// O restante do seu código de estilo permanece o mesmo...

// Componente Principal
const MidiaUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mediaDescription, setMediaDescription] = useState<string>('');
  const [title, setTitle] = useState<string>(''); // Novo estado para title
  const [date, setDate] = useState<string>(''); // Novo estado para date
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [logs, setLogs] = useState<{ description: string; date: string }[]>([]);

  useEffect(() => {
    const storedLogs = localStorage.getItem('mediaUploadLogs');
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
    if (!file || !mediaDescription) {
      setError('Por favor, preencha todas as informações.');
      return;
    }
  
    setLoading(true);
    setError('');
    setSuccess(false);
  
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', mediaDescription); // Você deve usar os campos corretos
      formData.append('type', 'image'); // Ou o tipo que você está lidando
      formData.append('title', 'Título da Mídia'); // Substitua por uma variável ou estado se necessário
      formData.append('date', new Date().toISOString()); // Formato ISO ou outro formato que você precisa
  
      // Inspecionar o FormData antes de enviar
      console.log(Array.from(formData.entries()));
  
      const response = await axios.post('https://backendlife-production.up.railway.app/upload-gallery-media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Verifique a estrutura da resposta do servidor
      const { id, name } = response.data; // Suponha que o servidor retorne um objeto com id e nome
      const currentDate = new Date().toLocaleString('pt-BR');
      const newLog = { description: name || mediaDescription, date: currentDate }; // Usar name do response ou mediaDescription
      const updatedLogs = [...logs, newLog];
      setLogs(updatedLogs);
      localStorage.setItem('mediaUploadLogs', JSON.stringify(updatedLogs));
  
      setSuccess(true);
      setMediaDescription('');
      setFile(null);
    } catch (error) {
      setError('Erro ao enviar o arquivo. Verifique o console para mais detalhes.');
      console.error(error); // Adicione esta linha para verificar o erro no console
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
          <Input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Título da Mídia" 
          />
          <Input 
            type="text" 
            value={mediaDescription} 
            onChange={(e) => setMediaDescription(e.target.value)} 
            placeholder="Descrição da Mídia" 
          />
          <Input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            placeholder="Data" 
          />
          <Input type="file" onChange={handleFileChange} />
          <Button disabled={loading} onClick={handleUpload}>
            {loading ? 'Enviando...' : 'Enviar Mídia'}
          </Button>
          {success && <SuccessMessage>Mídia enviada com sucesso!</SuccessMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <LogHistory>
            {logs.map((log, index) => (
              <LogEntry key={index}>
                <LogText>{`Descrição: ${log.description}, Data: ${log.date}`}</LogText>
              </LogEntry>
            ))}
          </LogHistory>
        </Container>
      </OuterContainer>
    </>
  );
};

export default MidiaUpload;
