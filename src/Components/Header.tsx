import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    width: 100%;
    color: #fecf03;
    padding: 20px 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;

    @media (max-width: 768px) {
    background: linear-gradient(135deg, rgba(0,0,0,0.65), rgba(38,57,63,260)); /* Adicionando um gradiente */
        border-radius: 4px;
        padding: 8px 0;
    }
`;

const Hamburger = styled.button<{ isOpen: boolean }>`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px; /* Diminuir o tamanho do ícone */
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 999;

    div {
        width: 100%;
        height: 3px; /* Linhas mais finas */
        background-color: #fecf03; /* Amarelo */
        transition: all 0.3s ease;
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
    position: fixed;
    top: 0;
    right: 0;
    width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    height: 100vh;
    background: linear-gradient(135deg, rgba(0,0,0,0.85), rgba(38,57,63,280)); /* Adicionando um gradiente */
    z-index: 9999;
    transition: width 0.4s ease, opacity 0.4s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: center;
    }

    li {
        margin: 20px 0; /* Maior espaçamento entre os itens */
        opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
        transition: opacity 0.5s ease;
    }

    a {
        color: #fecf03;
        font-size: 2rem; /* Aumentando o tamanho da fonte */
        font-weight: bold;
        letter-spacing: 1.2px;
        text-decoration: none;

        &:hover {
            color: #e6b800; /* Cor de hover */
        }
    }

    .close-icon {
        position: absolute;
        top: -8px;
        right: 22px;
        font-size: 3.8rem;
        color: #fecf03;
        cursor: pointer;
        transition: transform 0.3s ease;

        &:hover {
            transform: rotate(90deg);
        }
    }
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
    gap: 10px;
`;

const LogoImage = styled.img`
    width: 50px;
    height: auto;
    margin-right: 5px;
    border-radius: 50%;

    @media (max-width: 768px) {
        width: 45px;

    }

`;

const LogoText = styled.h1`
    font-size: 24px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 20px;
    }
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
        position: relative; /* Necessário para o posicionamento da barrinha */
    }

    a {
        color: #fecf03;
        text-decoration: none;
        font-weight: 600;
        padding-bottom: 5px; /* Para espaço entre o nome e a barra */
        position: relative;

        &.active {
            text-decoration: none; /* Retirar sublinhado padrão */
        }

        &:hover {
            text-decoration: none; /* Remover sublinhado ao hover */
        }
    }

    .active::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -8px; /* Colocar um pouco abaixo do nome */
        height: 4px;
        background-color: #fecf03; /* Cor da barrinha */
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        display: none; /* Esconder o menu em telas pequenas */
    }
`;




const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('inicio');
    const mobileNavRef = useRef<HTMLDivElement>(null); // Usar ref para detectar cliques fora

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Fechar o menu ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const options = {
            threshold: 0.1, // Alterar para 10% de visibilidade
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <HeaderContainer>
            <ContentWrapper>
                <LogoContainer>
                    <LogoImage src="src/assets/logo-life.png" alt="Logo" />
                    <LogoText>Life Experience</LogoText>
                </LogoContainer>
                <Nav>
                    <ul>
                        <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Início</a></li>
                        <li><a href="#life" className={activeSection === 'life' ? 'active' : ''}>Life</a></li>
                        <li><a href="#programacao" className={activeSection === 'programacao' ? 'active' : ''}>Programação</a></li>
                        <li><a href="#gallery" className={activeSection === 'gallery' ? 'active' : ''}>Galeria</a></li>
                        <li><a href="#reservas" className={activeSection === 'reservas' ? 'active' : ''}>Reservas</a></li>
                        <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contato</a></li>
                    </ul>
                </Nav>
                <Hamburger onClick={toggleMenu} isOpen={isOpen}>
                    <div />
                    <div />
                    <div />
                </Hamburger>
                <MobileNav ref={mobileNavRef} isOpen={isOpen}>
                    <ul>
                        <li><a href="#home" onClick={closeMenu}>Início</a></li>
                        <li><a href="#life" onClick={closeMenu}>Life</a></li>
                        <li><a href="#programacao" onClick={closeMenu}>Programação</a></li>
                        <li><a href="#gallery" onClick={closeMenu}>Galeria</a></li>
                        <li><a href="#reservas" onClick={closeMenu}>Reservas</a></li>
                        <li><a href="#contact" onClick={closeMenu}>Contato</a></li>
                    </ul>
                    <div className="close-icon" onClick={closeMenu}>&times;</div>
                </MobileNav>
            </ContentWrapper>
        </HeaderContainer>
    );
};

export default Header;
