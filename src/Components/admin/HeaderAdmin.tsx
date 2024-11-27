import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    width: 100%;
    color: #fecf03; /* Amarelo */
    padding: 20px 0;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: #000; /* Cor de fundo para contraste */
`;

const ContentWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LogoImage = styled.img`
    width: 50px;
    height: auto;
    margin-right: 10px;
`;

const LogoText = styled.h1`
    font-size: 24px;
    font-weight: bold;
`;

const Nav = styled.nav`
    ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-left: 20px;
        position: relative;
    }

    a {
        color: #fecf03;
        text-decoration: none;
        font-weight: 600;
        padding-bottom: 5px;
        position: relative;

        &.active {
            text-decoration: none;
        }

        &:hover {
            text-decoration: none;
        }
    }

    .active::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -8px;
        height: 4px;
        background-color: #fecf03;
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const Hamburger = styled.button<{ isOpen: boolean }>`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;

    div {
        width: 100%;
        height: 3px;
        background-color: #fecf03;
        border-radius: 2px;
        transition: all 0.3s ease-in-out;
        transform-origin: 1px;

        &:nth-child(1) {
            transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
        }
        &:nth-child(2) {
            opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
            transform: ${({ isOpen }) => (isOpen ? 'translateX(20px)' : 'translateX(0)')};
        }
        &:nth-child(3) {
            transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
        }
    }

    @media (max-width: 768px) {
        display: flex;
    }
`;

const MobileNav = styled.nav<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.95); /* Fundo mais translúcido */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Sombra mais suave */
    border-radius: 8px;
    padding: 20px 0;
    text-align: center;
    transition: all 0.4s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin: 15px 0;
        }

        a {
            color: #fecf03;
            text-decoration: none;
            font-weight: 600;
            font-size: 18px; /* Aumentando a fonte */
            transition: color 0.2s ease-in-out;
            &:hover {
                color: #fff; /* Efeito de hover para maior contraste */
                text-decoration: underline;
            }
        }
    }
`;

const HeaderAdmin: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('home');

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const options = { threshold: 0.5 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <HeaderContainer>
            <ContentWrapper>
                <LogoContainer>
                <LogoImage src="/src/assets/LIFE-4.webp" alt="Logo" />
                <LogoText>Life Admin</LogoText>
                </LogoContainer>
                <Nav>
                    <ul>
                        <li>
                            <a href="/admin" className={activeSection === 'home' ? 'active' : ''}>
                                Flyer Admins
                            </a>
                        </li>
                        <li>
                            <a href="/admin/media" className={activeSection === 'gallery' ? 'active' : ''}>
                                Gallery Admins
                            </a>
                        </li>
                        <li>
                            <a href="/admin/contatos" className={activeSection === 'responses' ? 'active' : ''}>
                                Contatos
                            </a>
                        </li>
                    </ul>
                </Nav>
                <Hamburger onClick={toggleMenu} isOpen={isOpen} aria-label="Toggle menu" aria-expanded={isOpen}>
                    <div />
                    <div />
                    <div />
                </Hamburger>
                <MobileNav isOpen={isOpen}>
                    <ul>
                        <li>
                            <a href="/admin" onClick={() => setIsOpen(false)}>
                                Flyer Admins
                            </a>
                        </li>
                        <li>
                            <a href="/admin/media" onClick={() => setIsOpen(false)}>
                                Gallery Admins
                            </a>
                        </li>
                        <li>
                            <a href="/admin/contatos" onClick={() => setIsOpen(false)}>
                                Contatos
                            </a>
                        </li>
                    </ul>
                </MobileNav>
            </ContentWrapper>
        </HeaderContainer>
    );
};

export default HeaderAdmin;
