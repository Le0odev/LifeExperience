import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const ContentWrapper = styled.div`
    margin-top: 55px;

    
    @media (max-width: 768px) {
    margin-top: 25px;
    }
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
    margin-top: 40px;
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
        width: 90%; // Aumenta a largura em dispositivos menores
        margin: 10px 0;
    }
`;

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
`;

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

const Subtitle = styled.p`
    font-size: 28px;
    margin-bottom: 20px;
    color: #ffffff;
    text-shadow: 1px 1px 8px rgba(254, 207, 3, 0.5);

    @media (max-width: 768px) {
        font-size: 22px;
        margin-bottom: 20px;
    }
`;

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

interface Flyer {
    url: string;
    day: string;
    createdAt: number;
}

const Programacao: React.FC = () => {
    const [flyers, setFlyers] = useState<Flyer[]>([]);

    const daysInOrder = ['quinta', 'sexta', 'sábado'];

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

        return daysInOrder.reduce((acc, day) => {
            if (recentFlyers[day] && !isEventPassed(day)) {
                acc[day] = recentFlyers[day];
            }
            return acc;
        }, {} as { [key: string]: Flyer });
    };

    const getDatesForDays = () => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const dates: { [key: string]: string } = {};

        const days: { [key: string]: number } = {
            'quinta': 4,
            'sexta': 5,
            'sábado': 6,
        };

        for (const [day, value] of Object.entries(days)) {
            const diff = value - dayOfWeek;
            const eventDate = new Date(now);
            eventDate.setDate(now.getDate() + diff);
            dates[day] = `${String(eventDate.getDate()).padStart(2, '0')}/${String(eventDate.getMonth() + 1).padStart(2, '0')}/${eventDate.getFullYear()}`;
        }

        return dates;
    };

    const recentFlyers = getRecentFlyersByDay();
    const dates = getDatesForDays();
    const hasUpcomingEvents = Object.keys(recentFlyers).length > 0;

    return (
        <ProgramacaoContainer id='programacao'>
            <ContentWrapper>
                <Title>Programação Semanal</Title>
                <Subtitle>Confira os eventos da semana ⚡</Subtitle>
                {!hasUpcomingEvents ? (
                    <NoEvents>Não há mais eventos programados para essa semana!</NoEvents>
                ) : (
                    <EventList>
                        {Object.entries(recentFlyers).map(([day, flyer]) => (
                            <EventCard key={day}>
                                <EventDate>{day.charAt(0).toUpperCase() + day.slice(1)} - {dates[day]}</EventDate>
                                <Flyer src={flyer.url} alt={flyer.day} />
                                <ReserveButton href={`https://wa.me/5598999999999?text=Olá, gostaria de reservar para o evento de ${day}!`} target="_blank">
                                    Reservar
                                </ReserveButton>
                            </EventCard>
                        ))}
                    </EventList>
                )}
            </ContentWrapper>
        </ProgramacaoContainer>
    );
};

export default Programacao;
