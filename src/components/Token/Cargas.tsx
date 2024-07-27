import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  max-width: 80%;
  @media (max-width: 768px) {
    padding: 10px;
  }
`

const Text = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-top: 10px;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
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
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 16px;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  border: 12px solid rgba(0, 0, 0, 0.1);
  border-top: 12px solid #ff6600;
  border-right: 12px solid #ff0000;
  border-bottom: 12px solid #000000; 
  border-left: 12px solid #ff6600; 
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: ${spin} 1s linear infinite;
`

export const Cargando: React.FC = () => (
  <Container>
    <Content>
      <Spinner />
      <Text>Loading...</Text>
    </Content>
  </Container>
)

const Cross = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  margin: 0 auto 10px auto;
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
    width: 40px;
    height: 40px;
    &:before,
    &:after {
      height: 6px;
    }
  }
`

export const Error: React.FC = () => {
  const [closed, setClosed] = useState(false)

  if (closed) return null

  return (
    <Container>
      <Content>
        <Cross />
        <Text>Error. Please contact support.</Text>
        <CloseButton onClick={() => setClosed(true)}>Close</CloseButton>
      </Content>
    </Container>
  )
}
export const ErrorLowCap: React.FC = () => {
  const [closed, setClosed] = useState(false)

  if (closed) return null

  return (
    <Container>
      <Content>
        <Cross />
        <Text>The potential revenue cannot be less than the lowcap</Text>
        <CloseButton onClick={() => setClosed(true)}>Close</CloseButton>
      </Content>
    </Container>
  )
}

const CheckMark = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: green;
  position: relative;
  margin: 0 auto 10px auto;
  &:before {
    content: '';
    position: absolute;
    width: 12px;
    height: 24px;
    border: solid white;
    border-width: 0 6px 6px 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    &:before {
      width: 10px;
      height: 20px;
      border-width: 0 4px 4px 0;
    }
  }
`

interface ExitosoProps {
  onClose: () => void
  message: string
}

// eslint-disable-next-line react/prop-types
export const Exitoso: React.FC<ExitosoProps> = ({ onClose, message }) => (
  <Container>
    <Content>
      <CheckMark />
      <Text>{message}</Text>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </Content>
  </Container>
)
