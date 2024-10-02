import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const GalleryContainer = styled.section`
    padding: 60px 20px;
    text-align: center;
    background-color: #000000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    height: 100vh;  
`;

const ContentWrapper = styled.div`
    margin-top: 45px;
`;

const SectionTitle = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 15px;
    font-weight: bold;
    color: rgba(254, 207, 3, 0.85);
    text-shadow: 1px 1px 5px rgba(254, 207, 3, 0.5);

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const SectionSubtitle = styled.p`
    font-size: 1.2rem;
    margin-bottom: 25px;
    color: #ffffff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const GalleryItem = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    border: 0.5px solid rgba(254, 207, 3, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
`;

const Media = styled.div`
    width: 100%;
    height: 450px; // Altura do item do carrossel
    object-fit: cover;
    border-radius: 10px;
    overflow: hidden;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fecf03;

    ${GalleryItem}:hover & {
        opacity: 0.9;
    }
`;

const EventTitle = styled.h3`
    font-size: 1.4rem;
    margin-bottom: 5px;
    color: #fecf03;
`;

const EventDate = styled.p`
    font-size: 1rem;
    color: #ffffff;
`;

const ReserveButton = styled.a`
    background-color: #fecf03;
    color: #000;
    padding: 12px 24px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 15px rgba(254, 207, 3, 0.3);
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #e6b600;
        transform: translateY(-4px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
`;

interface Event {
    title: string;
    date: string;
    mediaUrl: string;
    isVideo?: boolean; // Novo campo para indicar se o item é um vídeo
}

const pastEvents: Event[] = [
    { title: 'Evento 1', date: '10/09/2024', mediaUrl: 'src/assets/gallery1.jpg' },
    { title: 'Evento 2', date: '17/09/2024', mediaUrl: 'src/assets/gallery3.mp4', isVideo: true },
    { title: 'Evento 3', date: '24/09/2024', mediaUrl: 'src/assets/gallery2.jpg' },
    // Adicione mais eventos conforme necessário
];

const GallerySection: React.FC = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <GalleryContainer id='gallery'>
            <ContentWrapper>
                <SectionTitle>Galeria de Eventos Passados</SectionTitle>
                <SectionSubtitle>Veja os melhores momentos dos nossos eventos anteriores!</SectionSubtitle>
                <Slider {...settings}>
                    {pastEvents.map((event) => (
                        <GalleryItem key={event.title}>
                            <Media>
                                {event.isVideo ? (
                                    <Video src={event.mediaUrl} autoPlay loop muted />
                                ) : (
                                    <Image src={event.mediaUrl} alt={event.title} />
                                )}
                            </Media>
                            <Overlay>
                                <EventTitle>{event.title}</EventTitle>
                                <EventDate>{event.date}</EventDate>
                            </Overlay>
                        </GalleryItem>
                    ))}
                </Slider>
                <ReserveButton href="/reservar-ingressos">Reservar Ingressos</ReserveButton>
            </ContentWrapper>
        </GalleryContainer>
    );
};

export default GallerySection;
