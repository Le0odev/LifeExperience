
import styled from 'styled-components';
import { FaWhatsapp, FaInstagram, FaTwitter,  FaCode, FaLinkedin, FaMapMarkerAlt, FaClock, FaUserClock } from 'react-icons/fa';
import { SiGooglemaps } from 'react-icons/si';

const FooterWrapper = styled.footer`
  background-color: #0d0d0d;
  color: #ffffff;
  padding: 4rem 2rem 1.5rem;
  text-align: center;
  border-top: 1px solid #333;
`;

const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    text-align: left;
    gap: 4rem;
  }
`;

const SectionTitle = styled.h3`
  color: #fecf03;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background-color: #fecf03;

    @media (min-width: 768px) {
      left: 0;
      transform: none;
    }
  }
`;

const InfoList = styled.div`
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: #ffffff;
  transition: color 0.3s ease;

  svg {
    color: #fecf03;
    font-size: 1.1rem;
  }

  &:hover {
    color: #fecf03;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
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

const DeveloperSection = styled.div`
  width: 100%;
  margin-top: 4rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const DevLink = styled.a`
  color: #888;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);

  &:hover {
    color: #fecf03;
    background: rgba(254, 207, 3, 0.1);
  }

  .linkedin-icon {
    font-size: 1rem;
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }

  &:hover .linkedin-icon {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Copyright = styled.div`
  font-size: 0.85rem;
  color: #666;
  letter-spacing: 0.3px;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterWrapper>
      <FooterGrid>
        <div>
          <SectionTitle>Funcionamento</SectionTitle>
          <InfoList>
            <InfoItem>
              <FaClock />
              <span>Quinta, Sexta e Sábado</span>
            </InfoItem>
            <InfoItem>
              <FaUserClock />
              <span>Horário: 22h</span>
            </InfoItem>
            <InfoItem>
              <span>Entrada a partir de 18 anos</span>
            </InfoItem>
          </InfoList>
        </div>
        
        <div>
          <SectionTitle>Localização</SectionTitle>
          <InfoList>
            <InfoItem>
              <FaMapMarkerAlt />
              <span>Rua Pedro Bérgamo, 36</span>
            </InfoItem>
            <InfoItem>
              <span>Boa Viagem</span>
            </InfoItem>
            <InfoItem>
              <span>Recife - PE</span>
            </InfoItem>
          </InfoList>
        </div>
        
        <SocialContainer>
          <SectionTitle>Redes Sociais</SectionTitle>
          <SocialIcons>
            <SocialIcon href="https://api.whatsapp.com/send?phone=5581998991105" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </SocialIcon>
            <SocialIcon href="https://instagram.com/lifeexperience" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://www.google.com/maps/place/Life+Experience/@-8.124186,-34.899323,15z/data=!4m6!3m5!1s0x7ab1fbae229edd3:0x99f59ea18b334c0b!8m2!3d-8.124186!4d-34.899323!16s%2Fg%2F11vk8lc11s?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank"><SiGooglemaps /> </SocialIcon>

          </SocialIcons>
        </SocialContainer>
      </FooterGrid>

      <DeveloperSection>
        <DevLink href="https://linkedin.com/in/seu-perfil" target="_blank" rel="noopener noreferrer">
          <FaCode /> 
          Desenvolvido por LR Tech
          <FaLinkedin className="linkedin-icon" />
        </DevLink>
        <Copyright>
          © {currentYear} Life Experience. Todos os direitos reservados.
        </Copyright>
      </DeveloperSection>
    </FooterWrapper>
  );
};

export default Footer;