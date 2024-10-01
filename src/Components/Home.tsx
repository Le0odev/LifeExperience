// src/components/Home.tsx
import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Altura total da seção */
    background-image: url('https://images.unsplash.com/photo-1473968217939-ab9d99b2eacb?q=80&w=1392&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); /* Imagem de fundo */
    background-size: cover; /* Cobre toda a seção */
    background-position: center; /* Centraliza a imagem */
    color: #fecf03; /* Amarelo */
    text-align: center; /* Centraliza o texto */
    padding: 20px;

    /* Adicionando responsividade */
    @media (max-width: 768px) {
        padding: 40px 20px; /* Ajuste do padding em telas menores */
    }
`;

const Title = styled.h2`
    font-size: 48px; /* Tamanho do título */
    font-weight: bold;
    margin-bottom: 20px; /* Espaçamento abaixo do título */

    /* Responsividade para o título */
    @media (max-width: 768px) {
        font-size: 32px; /* Tamanho do título em telas menores */
    }
`;

const Highlight = styled.span`
    color: #e6b600; /* Cor de destaque para a palavra CONCEITO */
    font-size: 48px; /* Tamanho maior para destaque */

    /* Responsividade para a palavra em destaque */
    @media (max-width: 768px) {
        font-size: 32px; /* Tamanho em telas menores */
    }
`;

const Subtitle = styled.p`
    font-size: 24px; /* Tamanho do subtítulo */
    margin-bottom: 40px; /* Espaçamento abaixo do subtítulo */

    /* Responsividade para o subtítulo */
    @media (max-width: 768px) {
        font-size: 18px; /* Tamanho do subtítulo em telas menores */
        margin-bottom: 20px; /* Ajuste de espaçamento */
    }
`;

const Button = styled.button`
    background-color: #ffcc00;
    color: #000;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e6b800; /* Cor mais escura ao passar o mouse */
    }
  

    /* Responsividade para o botão */
    @media (max-width: 768px) {
        font-size: 18px; /* Tamanho do botão em telas menores */
        padding: 10px 20px; /* Ajuste de padding */
    }
`;

const Home: React.FC = () => {
    return (
        <HomeContainer id="home">
            <Title>Viva essa <Highlight>experiência</Highlight> em Recife! 🛸 </Title>
            <Subtitle>Explore nossos serviços, tire suas dúvidas e reserve agora!</Subtitle>
            <Button >RESERVE AQUI 👽 </Button>
        </HomeContainer>
    );
};

export default Home;
