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
    margin-top: 50px;
    gap: 40px;
    margin-bottom: 0px;

    @media (max-width: 768px) {
    margin: 0 auto;
    flex-wrap: wrap; /* Permite que as colunas se ajustem em telas menores */

     }

`;

const EventCard = styled.div`
    background: rgba(255, 255, 255, 0.1); /* Fundo semi-transparente */
    border: 1px solid #fecf03; /* Borda amarela */
    border-radius: 8px;
    padding: 20px;
    margin: 10px; /* Espaçamento entre os cards */
    width: 50%; /* Largura dos cards */
    max-width: 300px; /* Largura máxima dos cards */

    /* Estilos responsivos */
    @media (max-width: 768px) {
        width: 100%; /* Largura total em telas menores */
        margin: 10px 0; /* Espaçamento vertical em vez de horizontal */
    }
`;

const EventDate = styled.h3`
    margin: 0;
    font-size: 24px; /* Tamanho da data */
`;

const Flyer = styled.img`
    width: 100%; /* Imagem responsiva */
    border-radius: 8px;
    margin: 10px 0 20px 0;
`;

const ReserveButton = styled.a`
    background-color: #fecf03;
    color: #000000;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e6b600;
    }
`;

const Subtitle = styled.p`
    font-size: 28px; /* Tamanho do subtítulo */
    margin-bottom: 40px; /* Espaçamento abaixo do subtítulo */

    /* Responsividade para o subtítulo */
    @media (max-width: 768px) {
        font-size: 18px; /* Tamanho do subtítulo em telas menores */
        margin-bottom: 20px; /* Ajuste de espaçamento */
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
