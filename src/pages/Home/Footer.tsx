import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaTelegram, FaDiscord, FaMedium } from 'react-icons/fa'; // Importa los iconos correctos

const FooterContainer = styled.footer`
  padding: 65px 20px;
    margin: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 30px; 
  margin-top: 20px;
`;

const IconLink = styled.a`
  color: white;
  font-size: 30px; /* Tamaño de los iconos */
  transition: color 0.3s;

  &:hover {
    color: #ff9900; /* Color al hacer hover */
  }
`;

const FooterText = styled.p`
  margin: 10px;
  font-size: 14px;
  text-align: center;
  color: #ccc;
  margin-top: 10px;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <SocialIcons>
        <IconLink href="http://x.com/DSwap" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </IconLink>
        <IconLink href="https://t.me/diviswap" target="_blank" rel="noopener noreferrer">
          <FaTelegram />
        </IconLink>
        <IconLink href="http://discord.gg/NPtd83jvGN" target="_blank" rel="noopener noreferrer">
          <FaDiscord />
        </IconLink>
        <IconLink href="https://medium.com/@dswap" target="_blank" rel="noopener noreferrer">
          <FaMedium />
        </IconLink>
      </SocialIcons>
      <FooterText>&copy; 2024 DIVISWAP. All rights reserved.</FooterText>
    </FooterContainer>
  );
};
