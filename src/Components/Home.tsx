// src/components/Home.tsx
import styled from 'styled-components';

// Container principal da página
const HomeContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Altura total da seção */
    background-image: url('src/assets/background-life.webp'); /* Imagem de fundo */
    background-size: cover; /* Cobre toda a seção */
    background-position: center; /* Centraliza a imagem */
    color: #fecf03; /* Amarelo */
    text-align: center; /* Centraliza o texto */
    padding: 20px;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;

    /* Adicionando responsividade */
    @media (max-width: 768px) {
        padding: 40px 20px; /* Ajuste do padding em telas menores */
    }
`;

// Título principal
const Title = styled.h1`
    font-size: clamp(2rem, 5vw, 4rem); /* Tamanho responsivo */
    font-weight: bold;
    margin-bottom: 10px; /* Espaçamento abaixo do título */
`;

// Destaque dentro do título
export const Highlight = styled.span`
    color: #e6b600; /* Cor de destaque */
    font-size: clamp(2rem, 5vw, 4rem); /* Tamanho responsivo */
`;

// Subtítulo
const Subtitle = styled.p`
    font-size: clamp(1.2rem, 2.5vw, 1.5rem); /* Tamanho responsivo */
    margin-bottom: 20px; /* Espaçamento abaixo do subtítulo */
    
`;

const Button = styled.button`
background-color: #fecf03;
  color: #000;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #e6b800; /* Cor mais escura ao passar o mouse */
    }
  `;

// Componente principal da página
const Home: React.FC = () => {
  // Efeito para animação de entrada
     
    return (
        <HomeContainer  id="home">
            <Title>Viva essa <Highlight>experiência</Highlight> em Recife! 🛸</Title>
            <Subtitle>Explore nossos serviços, tire suas dúvidas e reserve agora!</Subtitle>
            <Button aria-label="Reserve sua experiência">RESERVE AQUI 👽</Button>
        </HomeContainer>
    );
};

export default Home;
