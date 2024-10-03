import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Estilização do container principal
const ProgramacaoContainer = styled.section`
    padding: 60px 20px;
    background-color: #000000;
    color: #fecf03;
    text-align: center;
    height: 100vh;
    overflow: auto; // Para permitir rolagem em telas menores

    @media (max-width: 768px) {
        height: auto; // Ajustar a altura para auto em telas menores
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
    margin-top: 40px;
    gap: 40px;
    margin-bottom: 0px;

    @media (max-width: 768px) {
        margin: 0 auto;
        flex-wrap: wrap;
    }
`;

// Estilização do card de eventos
const EventCard = styled.div`
    position: relative; // Adiciona position relativa para o overlay
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
        width: 90%; // Aumenta a largura em dispositivos menores
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

// Estilização do flyer
const Flyer = styled.img`
    width: 100%;
    border-radius: 16px;
    margin: 20px 0 25px;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05); // Leve aumento ao passar o mouse
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }
`;

// Estilização do vídeo
const Video = styled.video`
    width: 100%;
    border-radius: 16px;
    margin: 20px 0 25px;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05); // Leve aumento ao passar o mouse
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }
`;

// Estilização do botão de reserva
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
    cursor: pointer; // Muda o cursor para indicar que é clicável

    &:hover {
        background-color: #e6b600;
        transform: translateY(-6px);
        box-shadow: 0 8px 20px rgba(254, 207, 3, 0.5);
    }
`;

// Estilização do subtítulo
const Subtitle = styled.p`
    font-size: 28px;
    margin-bottom: 20px;
    color: #ffffff;
    text-shadow: 1px 1px 8px rgba(254, 207, 3, 0.5);

    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 20px;
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

// Definição da interface para Flyers
interface Flyer {
    url: string;
    day: string;
    createdAt: number;
    isVideo?: boolean;
    title: string;
}

const Programacao: React.FC = () => {
    const [flyers, setFlyers] = useState<Flyer[]>([]);

    const daysInOrder = ['quinta', 'sexta', 'sábado'];

    // Função para buscar os flyers por dia
    const fetchFlyers = async (day: string) => {
        try {
            const response = await fetch(`https://backendlife-production.up.railway.app/flyers/${day}`);
            const data: Flyer[] = await response.json();
            console.log(`Dados recebidos para ${day}:`, data);
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

    // Função para verificar se o evento já ocorreu
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

    // Função para obter os flyers mais recentes por dia
    const getRecentFlyersByDay = () => {
        const recentFlyers: { [key: string]: Flyer } = {};

        flyers.forEach(flyer => {
            if (!recentFlyers[flyer.day] || flyer.createdAt > recentFlyers[flyer.day].createdAt) {
                recentFlyers[flyer.day] = flyer;
            }
        });

        return recentFlyers;
    };

    const recentFlyers = getRecentFlyersByDay();

    return (
        <ProgramacaoContainer id='programacao'>  
            <Title>Programação</Title>
            <Subtitle>Não fique de fora! Veja os eventos que preparamos para você!</Subtitle>
            <ContentWrapper>
                <EventList>
                    {daysInOrder.map((day, index) => {
                        const flyer = recentFlyers[day];

                        return flyer ? (
                            <EventCard key={index}>
                                <EventDate>{day}</EventDate>
                                {flyer.isVideo ? (
                                    <Video src={flyer.url} autoPlay loop muted/>
                                ) : (
                                    <Flyer src={flyer.url} alt={flyer.title} />
                                )}
                                <Overlay title={flyer.title}>
                                    
                                </Overlay>
                            </EventCard>
                        ) : (
                            <NoEvents key={index}>
                                Nenhum evento programado para {day}.
                            </NoEvents>
                        );
                    })}
                </EventList>
            </ContentWrapper>
        </ProgramacaoContainer>
    );
};

export default Programacao;
