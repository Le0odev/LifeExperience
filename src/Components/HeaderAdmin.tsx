import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    width: 100%;
    color: #fecf03; /* Amarelo */
    padding: 20px 0;
    top: 0; /* Para que fique no topo */
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

const Hamburger = styled.div<{ isOpen: boolean }>`
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
        height: 4px;
        background-color: #fecf03;
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
        display: flex; /* Mostrar o ícone do menu em telas pequenas */
    }
`;

const MobileNav = styled.nav<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    margin-top: 10px;
    top: 60px;
    right: 0;
    width: 100%;
    text-align: center;
    background-color: #000; /* Cor de fundo para o menu móvel */

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin: 10px 0;
        }

        a {
            color: #fecf03;
            text-decoration: none;
            font-weight: 600;
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

const HeaderAdmin: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('home');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const options = {
            threshold: 0.5,
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
                    <LogoText>Life Admin</LogoText>
                </LogoContainer>
                <Nav>
                    <ul>
                        <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Flyer Admins</a></li>
                     
                    </ul>
                </Nav>
                <Hamburger onClick={toggleMenu} isOpen={isOpen}>
                    <div />
                    <div />
                    <div />
                </Hamburger>
                <MobileNav isOpen={isOpen}>
                    <ul>
                        <li><a href="#home" onClick={() => setIsOpen(false)}>Início</a></li>
                        <li><a href="#reports" onClick={() => setIsOpen(false)}>Relatórios</a></li>
                        <li><a href="#settings" onClick={() => setIsOpen(false)}>Configurações</a></li>
                        <li><a href="#users" onClick={() => setIsOpen(false)}>Usuários</a></li>
                    </ul>
                </MobileNav>
            </ContentWrapper>
        </HeaderContainer>
    );
};

export default HeaderAdmin;