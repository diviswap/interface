import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/svg/logo.png'
import logo2 from './logo.jpg'

const CardContainer = styled.div`
  background-color: #ffe0b6;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
  }
`

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  padding: 0;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Content = styled.div`
  padding: 20px;
  text-align: center;
`

const BrandLogo = styled.img`
  width: 50px;
  margin-bottom: 10px;
`

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
`

const Price = styled.div`
  font-size: 1.3rem;
  color: #333;
  margin: 10px 0;
`

const BuyButton = styled.button`
  background: linear-gradient(
    34deg,
    rgba(113, 0, 0, 1) 5%,
    rgba(170, 72, 72, 1) 48%,
    rgba(9, 5, 0, 1) 80%,
    rgba(26, 12, 8, 1) 95%
  );
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(34deg, rgba(255, 0, 0, 1) 0%, rgba(221, 51, 96, 1) 79%);
  }
`

interface CardProps {
  imagen: string
  title: string
  price: string
  address: string
}

// eslint-disable-next-line react/prop-types
export const Card: React.FC<CardProps> = ({ title, price, address, imagen }) => {
  const history = useHistory()

  const handleBuyClick = () => {
    history.push(`/buy/${title}/${address}`)
  }

  return (
    <CardContainer>
      <ImageContainer>
        <Image src={imagen || logo2} alt={title} />
      </ImageContainer>
      <Content>
        <BrandLogo src={logo} alt="Brand Logo" />
        <Title>{title}</Title>
        <Price>${price} CHZ</Price>
        <BuyButton onClick={handleBuyClick}>Buy</BuyButton>
      </Content>
    </CardContainer>
  )
}
