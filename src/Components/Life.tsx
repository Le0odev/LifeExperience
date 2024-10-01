  import { BsWhatsapp } from "react-icons/bs";
  import { FaRocket, FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaGoogle } from "react-icons/fa";
import { FaMap } from "react-icons/fa6";
  import { PiFlyingSaucerFill } from "react-icons/pi";
import { SiGooglemaps, SiInstagram, SiWhatsapp } from "react-icons/si";
import { TbBrandGoogleMaps } from "react-icons/tb";
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
    font-size: 1.5rem;
    color: #ffcc00;
    margin-bottom: -5px;
  `;

  const Separator = styled.hr`
    border: 1px solid #ffcc00; /* Cor do separador */
    margin: 20px 0; /* Espaçamento acima e abaixo */
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
  `;

  const SocialIconsContainer = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 10px; /* Espaço entre os ícones */
  `;

  const SocialIcon = styled.a`
    color: #ffcc00;
    font-size: 1.7rem;
    transition: color 0.3s;
    margin-left: 1px;

    &:hover {
      color: #e6b800; /* Cor mais escura ao passar o mouse */
    }
  `;

  const Life = () => {
    return (
      <Container id='life'>
        <Image src='src/assets/LIFE 4.jpg' alt="Imagem da casa LIFE, um local vibrante e animado." />
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
          <SocialIconsContainer>
            <SocialIcon href="https://www.instagram.com/lifeexperience___/" target="_blank"><SiInstagram /></SocialIcon>
            <SocialIcon href="https://api.whatsapp.com/send?phone=5581998991105&fbclid=PAZXh0bgNhZW0CMTEAAab6-ylk4xcwgfgUorzqG3cQfAlv6pZbEBpcXqW7-J9RxCkJ1UjYjSnY7Yo_aem_4s7W00HUkvd1c6v9o4cGHg" target="_blank"><SiWhatsapp /></SocialIcon>
            <SocialIcon href="https://www.google.com/maps/place/Life+Experience/@-8.124186,-34.899323,15z/data=!4m6!3m5!1s0x7ab1fbae229edd3:0x99f59ea18b334c0b!8m2!3d-8.124186!4d-34.899323!16s%2Fg%2F11vk8lc11s?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank"><SiGooglemaps />

            </SocialIcon>
          </SocialIconsContainer>
        </TextContainer>
      </Container>
    );
  };

  export default Life;
