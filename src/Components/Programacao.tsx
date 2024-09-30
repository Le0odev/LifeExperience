import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ProgramacaoContainer = styled.section`
    padding: 60px 20px;
    background-color: #000000;
    color: #fecf03;
    text-align: center;
    height: 100vh;

    @media (max-width: 768px) {
        margin: 0 auto;
        height: 100%;
    }
`;

const ContentWrapper = styled.div`
    margin-top: 55px;
`;

const Title = styled.h2`
    font-size: 3.5rem;
    margin-bottom: 20px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const EventList = styled.div`
    display: flex;
    justify-content: center;
    margin-top: px;
    gap: 40px;
    margin-bottom: 0px;

    @media (max-width: 768px) {
        margin: 0 auto;
        flex-wrap: wrap;
    }
`;

const EventCard = styled.div`
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border: 1px solid rgba(254, 207, 3, 0.3);
    border-radius: 20px;
    padding: 30px;
    margin: 15px;
    width: 40%;
    max-width: 350px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-12px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), inset 0 3px 3px rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 768px) {
        width: 100%;
        margin: 5px 0;
    }
`;

const EventDate = styled.h3`
    margin: 0;
    font-size: 26px;
    font-weight: bold;
    color: #fecf03;
    letter-spacing: 1px;
    text-shadow: 1px 1px 8px rgba(254, 207, 3, 0.8);
    text-transform: uppercase;
    background: linear-gradient(90deg, rgba(254, 207, 3, 0.8), rgba(255, 255, 255, 0.2));
    -webkit-background-clip: text;
`;

const Flyer = styled.img`
    width: 100%;
    border-radius: 16px;
    margin: 20px 0 25px;

    &:hover {
        transform: scale(1);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }
`;

const ReserveButton = styled.a`
    background-color: #fecf03;
    color: #000000;
    padding: 15px 30px;
    border: none;
    border-radius: 12px;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 5px 15px rgba(254, 207, 3, 0.3);
    margin-top: 20px;

    &:hover {
        background-color: #e6b600;
        transform: translateY(-6px);
        box-shadow: 0 8px 20px rgba(254, 207, 3, 0.5);
    }
`;

const Subtitle = styled.p`
    font-size: 28px;
    margin-bottom: 20px;
    color: rgba(254, 207, 3, 0.85);
    text-shadow: 1px 1px 8px rgba(254, 207, 3, 0.5);

    @media (max-width: 768px) {
        font-size: 22px;
        margin-bottom: 20px;
    }
`;

const Highlight = styled.span`
    color: #e6b600;
    font-size: 3.5rem;

    @media (max-width: 768px) {
        font-size: 32px;
    }
`;


interface Flyer {
    url: string; // URL da imagem
    day: string; // Dia da semana correspondente
    dateAdded: string; // Data em que a imagem foi adicionada (ou timestamp)
  }
  
  const Programacao: React.FC = () => {
    const [flyers, setFlyers] = useState<Flyer[]>([]);
  
    const fetchFlyers = async (day: string) => {
      try {
        const response = await fetch(`http://localhost:5000/flyers/${day}`);
        const data: Flyer[] = await response.json();
  
        console.log('Dados recebidos:', data); // Log da resposta do servidor
  
        // Atualiza o estado, mantendo apenas o flyer mais recente por dia
        setFlyers(prevFlyers => {
          const updatedFlyers = [...prevFlyers];
          data.forEach(newFlyer => {
            const existingIndex = updatedFlyers.findIndex(f => f.day === newFlyer.day);
            if (existingIndex > -1) {
              // Substitui o flyer existente se o novo for mais recente
              if (new Date(newFlyer.dateAdded) > new Date(updatedFlyers[existingIndex].dateAdded)) {
                updatedFlyers[existingIndex] = newFlyer;
              }
            } else {
              // Adiciona novo flyer se não existir
              updatedFlyers.push(newFlyer);
            }
          });
          return updatedFlyers;
        });
      } catch (error) {
        console.error('Error fetching flyers:', error);
      }
    };
  
    useEffect(() => {
      // Carrega os flyers ao montar o componente
      fetchFlyers('quinta-feira');
      fetchFlyers('sexta-feira');
      fetchFlyers('sábado');
  
      // Configura o polling para atualizar os flyers a cada 10 segundos
      const interval = setInterval(() => {
        fetchFlyers('quinta-feira');
        fetchFlyers('sexta-feira');
        fetchFlyers('sábado');
      }, 10000); // 10 segundos
  
      // Limpeza do intervalo ao desmontar o componente
      return () => clearInterval(interval);
    }, []);
  
    // Função para obter os flyers mais recentes por dia
    const getRecentFlyersByDay = () => {
      const recentFlyers: { [key: string]: Flyer } = {};
      flyers.forEach(flyer => {
        // Verifica se já temos um flyer para este dia ou se o atual é mais recente
        if (!recentFlyers[flyer.day] || new Date(flyer.dateAdded) > new Date(recentFlyers[flyer.day].dateAdded)) {
          recentFlyers[flyer.day] = flyer;
        }
      });
      return recentFlyers;
    };
  
    const recentFlyers = getRecentFlyersByDay();
  
    // Definindo a ordem dos dias da semana
    const daysOfWeek = ['quinta-feira', 'sexta-feira', 'sábado'];
  
    // Obter os dias da semana e as imagens mais recentes
    const upcomingEventDates = daysOfWeek.map(day => ({
      day,
      flyer: recentFlyers[day],
    }));
  
    return (
      <ProgramacaoContainer id="programacao">
        <ContentWrapper>
          <Title>PROGAMAÇÃO <Highlight>SEMANAL</Highlight></Title>
          <Subtitle>Confira os eventos da semana ⚡</Subtitle>
          <EventList>
            {upcomingEventDates.map((event, index) => (
              <EventCard key={index}>
                <EventDate>{event.day.charAt(0).toUpperCase() + event.day.slice(1)}</EventDate> {/* Formata a primeira letra para maiúscula */}
                {event.flyer ? (
                  <Flyer src={event.flyer.url} alt={`Flyer para ${event.day}`} />
                ) : (
                  <div>No flyer available</div>
                )}
                <ReserveButton href="#reserve">Reserve Aqui</ReserveButton>
              </EventCard>
            ))}
          </EventList>
        </ContentWrapper>
      </ProgramacaoContainer>
    );
  };
  
  export default Programacao;