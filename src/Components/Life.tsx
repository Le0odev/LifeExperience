import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #000; /* Fundo preto para o TextContainer */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 50%; /* Ajuste a largura conforme necessário */
  border-radius: 10px;
  margin-right: 20px; /* Espaço entre a imagem e o texto */
`;

const TextContainer = styled.div`
  width: 50%; /* Ajuste a largura conforme necessário */
  background-color: #000; /* Fundo preto para o TextContainer */
  color: #fff; /* Cor da fonte branca */
  font-size: 1.2rem; /* Tamanho da fonte */
  padding: 20px; /* Espaçamento interno */
  border-radius: 10px; /* Borda arredondada */
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.h3`
  font-size: 1.5rem; /* Tamanho do subtítulo */
  margin-bottom: 10px; /* Espaço abaixo do subtítulo */
  color: #ffcc00; /* Cor amarela para o subtítulo */
`;

const Paragraph = styled.p`
  line-height: 1.5;
  margin-bottom: 20px; /* Espaço abaixo de cada parágrafo */
`;

const Life = () => {
  return (
    <Container>
      <Image src='src/assets/LIFE 4.jpg' alt="Descrição da Casa" />
      <TextContainer>
        <Title>Sobre a Casa</Title>
        <Subtitle>Sobre a LIFE</Subtitle> {/* Subtítulo sobre a LIFE */}
        <Paragraph>
          A LIFE é o destino ideal para quem busca diversão, festas incríveis e as melhores atrações da cidade! Com uma programação repleta de eventos eletrizantes, garantimos uma experiência única nas quintas, sextas e sábados, onde a energia contagiante se une à música ao vivo e a um ambiente vibrante. Venha fazer parte dessa festa!
        </Paragraph>

        <Paragraph>
          Localizada em um dos pontos mais animados, a LIFE oferece uma atmosfera perfeita para reunir amigos, dançar e aproveitar as noites mais memoráveis. Nossa casa é conhecida por receber as melhores festas e atrações, tornando-se o cenário ideal para quem deseja celebrar momentos inesquecíveis. Não perca a oportunidade de vivenciar essa experiência de entretenimento que vai além do convencional!
        </Paragraph>
      </TextContainer>
    </Container>
  );
};

export default Life;
