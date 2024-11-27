  import { FaInstagram, FaRocket, FaWhatsapp } from "react-icons/fa";
  import { PiFlyingSaucerFill } from "react-icons/pi";
  import { SiGooglemaps, SiInstagram, SiWhatsapp } from "react-icons/si";
  import styled, { keyframes } from "styled-components";

  // Animação de fade-in
  const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const Container = styled.section`
    display: flex;
    align-items: flex-start;
    padding: 20px;
    background-color: #000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-height: 100vh;

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 10px;
    }
  `;

  const Paragraph = styled.p`
    line-height: 1.6;
    margin-bottom: 20px;
    font-family: 'Open Sans', sans-serif;
  `;

  const Image = styled.img`
    width: 50%;
    border-radius: 10px;
    margin-right: 20px;
    filter: brightness(0.7); /* Escurecendo a imagem para melhorar a legibilidade do texto */

    @media (max-width: 768px) {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }
  `;

  const TextContainer = styled.div`
    width: 50%;
    color: #fff;
    font-size: 1.1rem;
    padding: 20px;
    background-color: #000;
    border-radius: 10px;
    font-family: 'Open Sans', sans-serif;
    margin-top: 40px;
    animation: ${fadeIn} 0.5s ease-out; /* Adicionando a animação */

    @media (max-width: 768px) {
      width: 100%;
      padding: 10px;
      margin-top: 20px; /* Reduzindo o espaço superior */
    }
  `;

  const AttractionsTitle = styled.h3`
    font-size: 1.75rem;
    margin-top: 30px;
    color: #ffcc00;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  `;

  const Icon = styled.span`
    margin-left: 10px;
    font-size: 1.6rem;
    color: #ffcc00;
    margin-bottom: -5px;
  `;

  const Separator = styled.hr`
    border:  1px solid #333; /* Cor do separador */
    margin: 20px 0; /* Espaçamento acima e abaixo */
  `;

  const Button = styled.button`
    background-color: #fecf03;
  color: #000;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #e6b800; /* Cor mais escura ao passar o mouse */
    }
  `;

  
const SocialContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin-top: 16px;


@media (max-width: 768px) {
    margin-top: 16px;
    flex-direction: row;

`;

const SocialIcons = styled.div`
display: flex;
justify-content: center;
gap: 1.5rem;

@media (min-width: 768px) {
  justify-content: flex-start;
}
`;

const SocialIcon = styled.a`
color: #ffffff;
font-size: 1.5rem;
transition: all 0.3s ease;
padding: 0.5rem;
border-radius: 50%;
background: rgba(255, 255, 255, 0.1);
display: flex;
align-items: center;
justify-content: center;
width: 2.5rem;
height: 2.5rem;

&:hover {
  color: #0d0d0d;
  background: #fecf03;
  transform: translateY(-3px);
}
`;

  const Life = () => {
    return (
      <Container id='life'>
        <Image src='src/assets/LIFE-4.webp' alt="Imagem da casa LIFE, um local vibrante e animado." />
        <TextContainer>
          <AttractionsTitle>
            Life Experience
            <Icon><PiFlyingSaucerFill /></Icon>
          </AttractionsTitle>
          <Paragraph>
            Venha viver uma experiência única na Life! 
            Abrimos de <strong>Quinta à Sábado</strong>, proporcionando uma 
            atmosfera incrível para desfrutar com amigos e familiares. 
            <strong> Sejam bem-vindos!</strong>
          </Paragraph>
          <Separator />
          <AttractionsTitle>
            Sobre a LIFE
            <Icon><FaRocket /></Icon>
          </AttractionsTitle>
          <Paragraph>
            A LIFE é o destino ideal para quem busca <strong>diversão</strong> e <strong>festas incríveis</strong> em um ambiente vibrante. 
            Com uma programação repleta de <strong>eventos eletrizantes</strong>, de quinta a sábado, 
            unimos <strong>música ao vivo</strong> e <strong>energia contagiante</strong>, criando a atmosfera perfeita para 
            reunir amigos e aproveitar noites memoráveis. 
            Localizada na <strong>Rua Pedro Bérgamo, Boa Viagem</strong>, a LIFE é reconhecida por suas festas 
            e atrações que celebram <strong>momentos inesquecíveis</strong>.
          </Paragraph>
          <Separator />
          <Paragraph>
            Na LIFE, você pode esperar por <strong>performances ao vivo</strong>, <strong>DJs renomados</strong>, 
            <strong>festas temáticas</strong> e muito mais! Prepare-se para experiências incríveis que 
            vão deixar você e seus amigos em êxtase.
          </Paragraph>
          <Button>Reserve seu lugar agora!</Button>
          <SocialContainer>
          <SocialIcons>
            <SocialIcon href="https://api.whatsapp.com/send?phone=5581998991105" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/lifeexperience___/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://www.google.com/maps/place/Life+Experience/@-8.124186,-34.899323,15z/data=!4m6!3m5!1s0x7ab1fbae229edd3:0x99f59ea18b334c0b!8m2!3d-8.124186!4d-34.899323!16s%2Fg%2F11vk8lc11s?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank"><SiGooglemaps /> </SocialIcon>

          </SocialIcons>
        </SocialContainer>
        </TextContainer>
      </Container>
    );
  };


  
  export default Life;
