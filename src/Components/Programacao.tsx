// src/components/Programacao.tsx
import React from 'react';
import styled from 'styled-components';

const ProgramacaoContainer = styled.section`
    padding: 60px 20px;
    background-color: #000000; /* Cor de fundo */
    color: #fecf03; /* Cor do texto */
    text-align: center;
    height: auto; /* Ajuste automático da altura */
    height: 100vh;

     @media (max-width: 768px) {
    margin: 0 auto;
    height: 100%
    }

`;


const ContentWrapper = styled.div`
    margin-top: 55px; /* Espaço acima do conteúdo */
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
    justify-content: center; /* Distribui as colunas */
    margin-top: px;
    gap: 40px;
    margin-bottom: 0px;

    @media (max-width: 768px) {
    margin: 0 auto;
    flex-wrap: wrap; /* Permite que as colunas se ajustem em telas menores */

     }

`;

const EventCard = styled.div`
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)); /* Gradiente suave de vidro */
    border: 1px solid rgba(254, 207, 3, 0.3); /* Borda amarela com transparência */
    border-radius: 20px; /* Bordas bem arredondadas */
    padding: 30px;
    margin: 15px;
    width: 40%;
    max-width: 350px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2); /* Sombras externas e internas */
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.3); /* Fundo com mais transparência no hover */
        transform: translateY(-12px); /* Elevação maior no hover */
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), inset 0 3px 3px rgba(255, 255, 255, 0.3); /* Sombras mais profundas no hover */
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
    text-shadow: 1px 1px 8px rgba(254, 207, 3, 0.8); /* Brilho maior */
    text-transform: uppercase;
    background: linear-gradient(90deg, rgba(254, 207, 3, 0.8), rgba(255, 255, 255, 0.2)); /* Gradiente para um brilho extra */
    -webkit-background-clip: text;
`;

const Flyer = styled.img`
    width: 100%;
    border-radius: 16px; /* Bordas arredondadas */
    margin: 20px 0 25px;
    

    &:hover {
        transform: scale(1); /* Ampliação suave no hover */
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5); /* Sombra mais intensa no hover */
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
    box-shadow: 0 5px 15px rgba(254, 207, 3, 0.3); /* Sombra do botão */
    margin-top: 20px;

    &:hover {
        background-color: #e6b600;
        transform: translateY(-6px); /* Elevação do botão no hover */
        box-shadow: 0 8px 20px rgba(254, 207, 3, 0.5); /* Sombra mais intensa no hover */
    }
`;

const Subtitle = styled.p`
    font-size: 28px;
    margin-bottom: 20px;
    color: rgba(254, 207, 3, 0.85); /* Cor amarela com transparência */
    text-shadow: 1px 1px 8px rgba(254, 207, 3, 0.5); /* Leve sombra para destacar */

    
    @media (max-width: 768px) {
        font-size: 22px; /* Ajuste em telas menores */
        margin-bottom: 20px;
    }
`;


const Highlight = styled.span`
    color: #e6b600; /* Cor de destaque para a palavra CONCEITO */
    font-size: 3.5rempx; /* Tamanho maior para destaque */

    /* Responsividade para a palavra em destaque */
    @media (max-width: 768px) {
        font-size: 32px; /* Tamanho em telas menores */
    }
`;


// Função para gerar as próximas datas
const getUpcomingDates = () => {
    const today = new Date();
    const upcomingEvents = [];
    const weekdays = ['Quinta', 'Sexta', 'Sábado'];
    const dayOffsets = [4, 5, 6]; // 4: Quinta, 5: Sexta, 6: Sábado
    let week = 0;

    while (upcomingEvents.length < 3) {
        for (let i = 0; i < dayOffsets.length; i++) {
            const date = new Date(today.getFullYear(), today.getMonth(), (week * 7) + dayOffsets[i]);
            if (date >= today) {
                upcomingEvents.push({ date: date.toLocaleDateString(), day: weekdays[i] });
                if (upcomingEvents.length === 3) break; // Para quando 3 eventos forem adicionados
            }
        }
        week++;
    }
    return upcomingEvents;
};

const Programacao: React.FC = () => {
    const upcomingEventDates = getUpcomingDates(); // Gera as próximas datas

    return (
        <ProgramacaoContainer id="programacao">
            <ContentWrapper>
                <Title>PROGAMAÇÃO <Highlight>SEMANAL</Highlight></Title>
                <Subtitle>Confira os eventos da semana  ⚡</Subtitle>
                <EventList>
                    {upcomingEventDates.map((event, index) => (
                        <EventCard key={index}>
                            <EventDate>{event.day} - {event.date}</EventDate>
                            <Flyer src={`src/assets/teste-flyer.jpg`} alt={`Flyer ${event.day}`} />
                            <ReserveButton href="#reserve">Reserve Aqui</ReserveButton>
                        </EventCard>
                    ))}
                </EventList>
            </ContentWrapper>
        </ProgramacaoContainer>
    );
};

export default Programacao;