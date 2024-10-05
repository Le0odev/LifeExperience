
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPhoneAlt, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa';

// Estilos principais da seção de reservas
const ReservasSection = styled.section`
  position: relative;
  background-image: url('src/assets/tetete.png');
  background-size: cover;
  background-position: center;
  padding: 150px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    animation: fadeIn 1s ease-out forwards;
    z-index: 1;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 100px 0;
  }
`;

const ReservasContent = styled.div`
  position: relative;
  z-index: 2;
  color: #fff;
  text-align: center;
  max-width: 800px;
  padding: 25px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  animation: slideUp 1s ease-out forwards;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 90%;
  }
`;

const ReservasTitulo = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  color: #fecf03;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  letter-spacing: 2px;

  & > svg {
      color: #fecf03;
  }

  
`;

const ReservasSubtitulo = styled.p`
  font-size: 1.3rem;
  color: #ddd;
  margin-bottom: 20px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ReservasBotaoPrimario = styled.button`
  background-color: #fecf03;
  color: #000;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 25px;

  &:hover {
    background-color: #e6b600;
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(254, 207, 3, 0.5);
  }

  &:focus {
    outline: 3px solid #fff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 16px;
  }
`;

const ReservasBotaoSecundario = styled.button`
  background-color: transparent;
  color: #fecf03;
  padding: 12px 25px;
  border: 2px solid #fecf03;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.3s ease;
  margin-left: 15px;
  cursor: pointer;

  &:hover {
    color: #fff;
    border-color: #e6b600;
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(254, 207, 3, 0.5);
  }

  &:focus {
    outline: 3px solid #fff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 16px;
    margin-left: 10px;
  }
`;

const InformacoesContato = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;

  & > div {
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 1.1rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    font-size: 1rem;
  }
`;

const IconContainer = styled.div`
  font-size: 1.5rem;
  margin-top: 6.5px;
  color: #fecf03;
  margin-right: -2px;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222;
  padding: 30px;
  border-radius: 15px;
  width: 500px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 1000;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 0;
  color: #fecf03;
  font-size: 2rem;
  font-weight: bold;
`;

const ModalSubtitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.3rem;
  color: #ddd;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const ModalText = styled.p`
  color: #ddd;
  margin-bottom: 15px;
  font-size: 1.2rem;
  line-height: 1.5;
`;

const CloseButton = styled.button`
 
  background-color: transparent;
  color: #fecf03;
  padding: 12px 25px;
  border: 2px solid #fecf03;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.3s ease;
  margin-left: 15px;
  cursor: pointer;

  &:hover {
    color: #fff;
    border-color: #e6b600;
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(254, 207, 3, 0.5);
  }

  &:focus {
    outline: 3px solid #fff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 16px;
    margin-left: 10px;
  }
`;

const ModalContent = styled.div`
  margin: 15px 0;
  text-align: left;
`;

const ModalBulletPoint = styled.p`
  margin: 5px 0;
  line-height: 1.5;
`;

const ReservarAgoraButton = styled.button`
  background-color: #fecf03;
  color: #000;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 25px;
  margin-left: 15px;

  &:hover {
    background-color: #e6b600;
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(254, 207, 3, 0.5);
  }

  &:focus {
    outline: 3px solid #fff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 16px;
  }
`;

const Reservas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ReservasSection id='reservas'>
        <ReservasContent>
          <ReservasTitulo>Reservas</ReservasTitulo>
          <ReservasSubtitulo>
            Reserve seu espaço para aniversários, festas e eventos corporativos. Entre em contato de segunda a sexta-feira, das 9h30 às 17h30.
          </ReservasSubtitulo>
          <div>
          <a href='https://api.whatsapp.com/send?phone=5581998991105&fbclid=PAZXh0bgNhZW0CMTEAAab6-ylk4xcwgfgUorzqG3cQfAlv6pZbEBpcXqW7-J9RxCkJ1UjYjSnY7Yo_aem_4s7W00HUkvd1c6v9o4cGHg' target='blank'><ReservarAgoraButton>Reservar Agora</ReservarAgoraButton></a> 
            <ReservasBotaoSecundario onClick={() => setIsModalOpen(true)}>Saiba Mais</ReservasBotaoSecundario>
          </div>

          <InformacoesContato>
            <div>
            <IconContainer>
              <a href='https://api.whatsapp.com/send?phone=5581998991105&fbclid=PAZXh0bgNhZW0CMTEAAab6-ylk4xcwgfgUorzqG3cQfAlv6pZbEBpcXqW7-J9RxCkJ1UjYjSnY7Yo_aem_4s7W00HUkvd1c6v9o4cGHg' target="_blank" rel="noopener noreferrer">
                <FaWhatsapp style={{ color: '#fecf03' }} />
              </a>
            </IconContainer>              (81) 99881-6008
            </div>
            <div>
              <IconContainer><FaEnvelope /></IconContainer>
              contato@empresa.com
            </div>
            <div>
              <IconContainer><FaClock /></IconContainer>
              Seg - Qui: 10:00 - 17:30
            </div>
          </InformacoesContato>
        </ReservasContent>
      </ReservasSection>

      {isModalOpen && (
        <ModalContainer>
          <ModalTitle>Celebrate in Life</ModalTitle>
          <ModalSubtitle>Aniversário</ModalSubtitle>
          <ModalContent>
          <ModalBulletPoint>🎉 Comemore na Navezinha!</ModalBulletPoint>
            <ModalBulletPoint>🍹 Ganhe um camarote exclusivo!</ModalBulletPoint>
            <ModalBulletPoint>🥂 Bebida por nossa conta!</ModalBulletPoint>
            <ModalBulletPoint>👫 Você + acompanhante FREE!</ModalBulletPoint>
            <ModalBulletPoint>🎟️ Lista de descontos para convidados!</ModalBulletPoint>
            <ModalBulletPoint>📋 Plaquinha personalizada!</ModalBulletPoint>
            <ModalBulletPoint>🚫 Isento de fila!</ModalBulletPoint>
          </ModalContent>
          <div>
          <ModalText>Entre em contato para mais informações e reservas.</ModalText>
          <CloseButton onClick={() => setIsModalOpen(false)}>Fechar</CloseButton>
          <a href='https://api.whatsapp.com/send?phone=5581998991105&fbclid=PAZXh0bgNhZW0CMTEAAab6-ylk4xcwgfgUorzqG3cQfAlv6pZbEBpcXqW7-J9RxCkJ1UjYjSnY7Yo_aem_4s7W00HUkvd1c6v9o4cGHg' target='blank'><ReservarAgoraButton>Reservar Agora</ReservarAgoraButton></a> 
          </div>
        </ModalContainer>
      )}
    </>
  );
};

export default Reservas;
