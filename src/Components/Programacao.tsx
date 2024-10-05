
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Estilização do container principal
const ProgramacaoContainer = styled.section`
    padding: 60px 20px;
    background-color: #000000;
    color: #fecf03;
    text-align: center;
    height: 100vh;
    overflow: auto;
    border-top:   0.5px solid #fecf03;
    border-bottom:   0.5px solid #fecf03;


    @media (max-width: 768px) {
        height: auto;
    }
`;

// Wrapper para o conteúdo
const ContentWrapper = styled.div`
    margin-top: 55px;

    @media (max-width: 768px) {
        margin-top: 45px;
    }
`;

// Título da programação
const Title = styled.h2`
    font-size: 2.8rem;
    font-weight: 600;
    color: rgba(254, 207, 3, 0.9);
    letter-spacing: 0.05rem;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }
`;

// Estilização da lista de eventos
const EventList = styled.div`
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 0px;

    @media (max-width: 768px) {
        margin: 0 auto;
        flex-wrap: wrap;
    }
`;

// Estilização do card de eventos
const EventCard = styled.div`
    position: relative;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border: 1px solid rgba(254, 207, 3, 0.3);
    border-radius: 20px;
    padding: 30px;
    margin: 15px;
    width: 40%;
    max-width: 350px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    height: 580px; // Define a altura fixa para uniformizar os cards
     position: relative;
  overflow: hidden; /* Para evitar que a mídia ultrapasse os limites do card */
  transition: transform 0.3s ease; /* Transição suave para o aumento */


    &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.05); /* Aumenta o card um pouco no hover */
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), inset 0 3px 3px rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 768px) {
        width: 90%;
        margin: 10px 0;
    }
`;

// Estilização da data do evento
const EventDate = styled.h3`
    margin: 0;
    font-size: 26px;
    font-weight: bold;
    color: #fecf03;
    letter-spacing: 1px;
    text-shadow: 1px 1px 2px rgba(254, 207, 3, 0.8);
    text-transform: uppercase;
    background: linear-gradient(90deg, rgba(254, 207, 3, 0.8), rgba(255, 255, 255, 0.2));
    -webkit-background-clip: text;

    @media (max-width: 768px) {
        font-size: 22px;
    }
`;

// Estilização do flyer e do vídeo
const Media = styled.div`
    width: 100%;
    height: 400px; // Define a altura para uniformizar a mídia
    margin: 20px 0 25px;
    overflow: hidden;
    border-radius: 16px;
      transition: transform 0.3s ease; /* Transição suave para a mídia */

      ${EventCard}:hover & {
        transform: scale(1.05); /* Aumenta a mídia também no hover */
      }

    img, video {
        width: 100%;
        height: 100%;
        object-fit: cover; // Faz com que a imagem ou vídeo se ajuste sem distorção
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
    }
`;

// Estilização do botão de reserva
const ReserveButton = styled.button`
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
    cursor: pointer;
    margin-bottom: 25px ;


    &:hover {
        background-color: #e6b600;
        transform: translateY(-6px);
        box-shadow: 0 8px 20px rgba(254, 207, 3, 0.5);
    }
`;

// Estilização da mensagem de ausência de eventos
const NoEvents = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    font-size: 1.2em;
    text-align: center;
    margin: 20px;
`;

// Componente Overlay
const Overlay = styled.div<{ title: string }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;

    ${EventCard}:hover & {
        opacity: 1;
    }
`;





// Estilização do subtítulo
const Subtitle = styled.p`
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: #ddd;

    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 20px;
    }
`;


// Definição da interface para Flyers
interface Flyer {
    url: string;
    day: string;
    createdAt: number;
    isVideo?: boolean;
    title: string;
    name: string;
}

const Programacao: React.FC = () => {
    const [flyers, setFlyers] = useState<Flyer[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Índice do card em foco



    const daysInOrder: WeekDays[] = ['quinta', 'sexta', 'sábado']; // Define a ordem dos dias

    const fetchFlyers = async (day: string) => {
        try {
            const response = await fetch(`https://backendlife-production.up.railway.app/flyers/${day}`);
            const data: Flyer[] = await response.json();
            setFlyers(prevFlyers => {
                const updatedFlyers = prevFlyers.filter(f => f.day !== day);
                return [...updatedFlyers, ...data];
            });
        } catch (error) {
            console.error('Error fetching flyers:', error);
        }
    };

    useEffect(() => {
        daysInOrder.forEach(day => fetchFlyers(day));

        const interval = setInterval(() => {
            daysInOrder.forEach(day => fetchFlyers(day));
        }, 90000);

        return () => clearInterval(interval);
    }, []);

    const isEventPassed = (day: string): boolean => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const days: { [key: string]: number } = {
            'quinta': 4,
            'sexta': 5,
            'sábado': 6,
        };

        return days[day] < dayOfWeek;
    };

    const getRecentFlyersByDay = () => {
        const recentFlyers: { [key: string]: Flyer } = {};

        flyers.forEach(flyer => {
            if (!recentFlyers[flyer.day] || flyer.createdAt > recentFlyers[flyer.day].createdAt) {
                recentFlyers[flyer.day] = flyer;
            }
        });

        return recentFlyers;
    };
    type WeekDays = 'quinta' | 'sexta' | 'sábado';

    const getDatesForWeek = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (domingo) a 6 (sábado)
    
        // Função auxiliar para formatar a data
        const formatDate = (date: Date) => {
            return date.toLocaleDateString();
        };
    
        // Função para calcular a próxima data de um dia da semana
        const getNextDate = (daysOffset: number) => {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + daysOffset);
            return formatDate(nextDate);
        };
    
        // Dias até a próxima quinta-feira
        const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
    
        let dates: Record<WeekDays, string>;
    
        // Se hoje for domingo (0) ou qualquer dia após sábado (>=1), usa a próxima semana
        if (dayOfWeek === 0 || dayOfWeek > 6) {
            dates = {
                quinta: getNextDate(daysUntilThursday),
                sexta: getNextDate(daysUntilThursday + 1),
                sábado: getNextDate(daysUntilThursday + 2),
            };
        } else {
            // Até sábado, mantém a data da semana atual
            dates = {
                quinta: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + (4 - dayOfWeek))),
                sexta: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + (5 - dayOfWeek))),
                sábado: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - dayOfWeek))),
            };
        }
    
        return dates;
    };

    useEffect(() => {
        const dates = getDatesForWeek(); // Pega as datas para a semana atual

        daysInOrder.forEach((day) => {
            fetchFlyers(day);
        });
    }, []);

    const recentFlyers = getRecentFlyersByDay();

    return (
        <ProgramacaoContainer id='programacao'>  
        <ContentWrapper>
            <Title>PROGRAMAÇÃO DA SEMANA</Title>
            <Subtitle>Não fique de fora! Veja os eventos que preparamos para você!</Subtitle>
            <EventList>
                {daysInOrder.map((day, index) => {
                    const flyer = recentFlyers[day];
                    const date = getDatesForWeek()[day]; // Obtém a data para o dia correspondente
                    const dayFlyers = flyers.filter(f => f.day === day);


                    return flyer ? (
                        <EventCard 
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)} // Define o índice do card em foco
                            onMouseLeave={() => setHoveredIndex(null)} // Limpa o índice ao sair
                        >
                                <EventDate>{`${day.charAt(0).toUpperCase() + day.slice(1)} - ${date}`}</EventDate>
                                <Media>
                                {flyer.isVideo ? (
                                    <video src={flyer.url} 
                                    autoPlay
                                    loop
                                    muted={hoveredIndex !== index} // Muta ou desmuta o vídeo conforme o hover
                                    style={{ pointerEvents: 'none' }} // Para impedir a interação com o vídeo
                                       
                                    />
                                ) : (
                                    <img src={flyer.url} alt={day} />
                                )}
                            </Media>
                            <a href={flyer.name} target='_blank' rel='noopener noreferrer'>
                            <ReserveButton>Reservar ingresso</ReserveButton>
                            </a>
                            {/* Removido o Overlay para o nome do evento */}
                        </EventCard>
                    ) : null;
                })}
            </EventList>

            {Object.keys(recentFlyers).length === 0 && (
                <NoEvents>Nenhum evento disponível no momento.</NoEvents>
            )}
        </ContentWrapper>
    </ProgramacaoContainer>
);
};


export default Programacao;



