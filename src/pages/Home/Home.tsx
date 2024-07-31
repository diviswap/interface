import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import buildingImage from '../../assets/images/divi.png'
import { TokenSale } from './TokenSale'
import { Roadmap } from './Roadmap'
import { Footer } from './Footer'

export const Home: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.52
  })

  const [wasInView, setWasInView] = useState(false)

  useEffect(() => {
    if (inView) {
      setWasInView(true)
    }
  }, [inView])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setWasInView(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <HeroBody>
        <Container>
          <Columns>
            <ColumnLeft>
              <MainTitle>DiviSwap</MainTitle>
              <Subtitle>Decentralized exchange (DEX) built on the Chiliz Chain, The Sports Blockchain.</Subtitle>
              <Buttons>
                <Button href="#start" className="primary">
                  <span className="text">Get Started</span>
                  <span className="front-gradient"></span>
                </Button>
              </Buttons>
            </ColumnLeft>
            <ColumnRight>
              <ImageWrapper>
                <img src={buildingImage} alt="1" />
              </ImageWrapper>
            </ColumnRight>
          </Columns>
        </Container>
        <TokenSaleWrapper ref={ref} inView={inView || wasInView}>
          <TokenSale />
        </TokenSaleWrapper>
      </HeroBody>
      <Roadmap />
      <Footer />
    </>
  )
}

const HeroBody = styled.div`
  padding: 3rem 1.5rem;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`

const Columns = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const ColumnLeft = styled.div`
  flex: 0 0 40%;
  max-width: 40%;
`

const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
`

const Subtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 300;
  margin-bottom: 2rem;
  color: #ddd;
`

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
  border-radius: 8px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  transition: background 0.3s ease;
  position: relative;

  .text {
    position: relative;
    z-index: 1;
  }

  .front-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
    border-radius: 8px;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &:hover .front-gradient {
    opacity: 0.1;
  }
`

const ColumnRight = styled.div`
  flex: 0 0 60%;
  max-width: 60%;
  display: flex;
  justify-content: center;
`

const ImageWrapper = styled.figure`
  width: 100%;
  max-width: 600px;

  img {
    width: 100%;
    height: auto;
  }
`

const TokenSaleWrapper = styled.div<{ inView: boolean }>`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;

  ${({ inView }) =>
    inView &&
    `
    opacity: 1;
    transform: translateY(0);
  `}
`
