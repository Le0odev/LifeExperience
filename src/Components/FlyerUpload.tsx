import React, { useState } from 'react';
import { storage, db } from '../Config/firebase'; // Certifique-se de que o Firebase esteja configurado corretamente
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import styled from 'styled-components';
import Header from './Header';
import axios from 'axios';

const OuterContainer = styled.div`
  background-color: #000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 40px;
  border: 1px solid #f8c200;
  border-radius: 8px;
  background-color: #222;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
`;

const Title = styled.h2`
  color: #f8c200;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  border: 1px solid #f8c200;
  border-radius: 4px;
  font-size: 18px;
  background-color: #333;
  color: #fff;

  &:focus {
    border-color: #f8c200;
    outline: none;
  }
`;

const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 15px;
  background-color: ${({ disabled }) => (disabled ? '#555' : '#f8c200')};
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#555' : '#d5a700')};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  border: 1px solid #f8c200;
  border-radius: 4px;
  font-size: 18px;
  background-color: #333;
  color: #fff;
  appearance: none;

  &:focus {
    border-color: #f8c200;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 15px;
`;
const FlyerUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [eventName, setEventName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !eventName) {
      setError('Please provide a file and event name');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('flyer', file); // 'flyer' deve corresponder ao nome do campo no back-end
    formData.append('name', eventName);

    try {
      const response = await axios.post('http://localhost:5000/upload-flyer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Flyer uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading flyer:', error);
      setError('Failed to upload flyer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Flyer</h2>
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Event Name"
        required
      />
      <input type="file" onChange={handleFileChange} required />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};  

export default FlyerUpload;