import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import despegue from './cargando.jpg'
import error from './error.png'
import exitoso from './exitoso2.jpg'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const Content = styled.div`
  position: relative;
  text-align: center;
  background-color: black;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
  padding-bottom: 60px;
  max-width: 80%;
  @media (max-width: 768px) {
    padding: 10px;
    padding-bottom: 50px;
  }
`

const Image = styled.img`
  width: 400px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 6px;
  @media (max-width: 768px) {
    width: 300px;
  }
  @media (max-width: 480px) {
    width: 200px;
  }
`

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Text = styled.p`
  color: white;
  font-size: 1.2rem;
  animation: ${blink} 1.5s infinite;
  margin-left: 10px;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const Spinner = styled.div`
  border: 8px solid
    linear-gradient(
      34deg,
      rgba(255, 0, 0, 0.9853992622439601) 24%,
      rgba(0, 251, 224, 1) 34%,
      rgba(210, 1, 120, 1) 45%,
      rgba(83, 2, 166, 1) 57%,
      rgba(69, 3, 135, 1) 65%,
      rgba(3, 120, 70, 1) 69%,
      rgba(4, 94, 54, 1) 76%,
      rgba(9, 5, 0, 1) 100%
    );
  border-top: 8px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

const Cross = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin-right: 10px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 8px;
    background-color: red;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    &:before,
    &:after {
      height: 6px;
    }
  }
`

const CloseButton = styled.button`
  background-color: #9f002b;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 16px;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
`

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: -1;
`

const TokenData = styled.div`
  color: white;
  margin-top: 10px;
  font-size: 0.9rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`

export const Cargando: React.FC = () => (
  <Container>
    <DarkOverlay />
    <Content>
      <Image src={despegue} alt="Cargando" />
      <Row>
        <Spinner />
        <Text>Creating Launchpad...</Text>
      </Row>
    </Content>
  </Container>
)

export const Error: React.FC = () => {
  const [closed, setClosed] = useState(false)

  if (closed) return null

  return (
    <Container>
      <DarkOverlay />
      <Content>
        <Image src={error} alt="Error" />
        <Row>
          <Cross />
          <Text>Error. Contact support.</Text>
        </Row>
        <CloseButton onClick={() => setClosed(true)}>Cerrar</CloseButton>
      </Content>
    </Container>
  )
}

export const Exitoso: React.FC<{
  tokenData: { nombre: string; tasa: number; lowcap: number; duracion: number; cantidadDisponible: number }
  onClose: () => void
}> = ({ tokenData, onClose }) => (
  <Container>
    <Content>
      <Image src={exitoso} alt="Exitoso" />
      <Text>Successful Launch!!</Text>
      <TokenData>
        <p>Token Name: {tokenData.nombre}</p>
        <p>Rate: {tokenData.tasa}</p>
        <p>Min Cap: {tokenData.lowcap}</p>
        <p>Duration (in days): {tokenData.duracion}</p>
        <p>Available Quantity: {tokenData.cantidadDisponible}</p>
      </TokenData>
      <CloseButton onClick={onClose}>Cerrar</CloseButton>
    </Content>
  </Container>
)
