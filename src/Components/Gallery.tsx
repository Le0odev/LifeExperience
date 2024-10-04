import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import StarRating from './StarRating';

const GalleryContainer = styled.section`
    padding: 60px 20px;
    text-align: center;
    background-color: #000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    height: 100vh;
    display: block;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 768px) {
        height: 100vh;
        height: 100%
    }
`;

const ContentWrapper = styled.div`
    margin-top: 65px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
        margin-bottom: 65px;
    }
    .slick-list {margin: 0 -7px;}
    .slick-slide>div {padding: 0 7px;}
`;

const SectionTitle = styled.h2`
    font-size: 2.8rem;
    font-weight: 600;
    color: rgba(254, 207, 3, 0.9);
    letter-spacing: 0.05rem;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }
`;

const SectionSubtitle = styled.p`
    font-size: 28px;
    margin-bottom: 50px;
    color: #ffffff;
    text-shadow: 1px 1px 8px rgba(254, 207, 3, 0.5);

    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 30px;
    }
`;

const GalleryItem = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid rgba(254, 207, 3, 0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 10px;
    margin-bottom: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        border: none;
    }
`;

const Media = styled.div`
    width: 100%;
    height: 450px; 
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
        opacity: 0.95;
    }
`;

const EventTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 8px;
    color: #fecf03;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
`;

const EventDate = styled.p`
    font-size: 1.1rem;
    color: #ffffff;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const ReserveButton = styled.a`
    background-color: #fecf03;
    color: #000;
    padding: 14px 28px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 20px rgba(254, 207, 3, 0.4);
    cursor: pointer;
    margin-top: 30px;

    &:hover {
        background-color: #e6b600;
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    }
`;

interface Event {
    title: string;
    date: string;
    url: string;
    isVideo?: boolean;
}

const GallerySection: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Índice do card em foco

    const fetchEvents = async () => {
        try {
            const response = await fetch('https://backendlife-production.up.railway.app/gallery-media');
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };
    
    useEffect(() => {
        fetchEvents();
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
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
                    arrows: false
                }
            }
        ]
    };

    return (
        <GalleryContainer id='gallery'>
            <ContentWrapper>
                <SectionTitle>FEEL THE EXPERIENCE</SectionTitle>
                <SectionSubtitle>Veja os melhores momentos dos nossos eventos anteriores!</SectionSubtitle>
                <Slider {...settings}>
                    {events.map((event, index) => (
                        <GalleryItem 
                            key={event.title}
                            onMouseEnter={() => setHoveredIndex(index)} 
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <Media>
                                {event.isVideo ? (
                                    <Video src={event.url} autoPlay loop muted={hoveredIndex !== index} />
                                ) : (
                                    <Image src={event.url} alt={event.title} />
                                )}
                            </Media>
                            <Overlay>
                                <EventTitle>{event.title}</EventTitle>
                                <EventDate>{new Date(event.date).toLocaleDateString()}</EventDate>
                            </Overlay>
                        </GalleryItem>
                    ))}
                </Slider>
                <StarRating />
            </ContentWrapper>
        </GalleryContainer>
    );
};

export default GallerySection;
