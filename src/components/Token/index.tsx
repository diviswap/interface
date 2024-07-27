import React, { useState, useEffect } from 'react'
import { Card } from './Cards'
import styled from 'styled-components'
import { SinTokens } from './SinTokens'

interface CardData {
  image: string
  title: string
  price: string
  symbol: string
  address: string
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`

export const TokenSale: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([])

  useEffect(() => {
    const fetchTokenList = async () => {
      try {
        const response = await fetch('https://backend-dswap-production.up.railway.app/tokens')
        const data = await response.json()

        console.log(data)

        const cardData = data.map(
          (token: any): CardData => ({
            image: token.imagenURL,
            title: token.TokenName,
            price: token.rate,
            symbol: token.TokenName,
            address: token.TokenAddress
          })
        )

        setCards(cardData)
      } catch (error) {
        console.error('Error al obtener la lista de tokens:', error)
      }
    }

    fetchTokenList()
  }, [])

  return (
    <Container>
      {cards.length === 0 ? (
        <SinTokens />
      ) : (
        cards.map((card, index) => (
          <Card key={index} imagen={card.image} title={card.title} price={card.price} address={card.address} />
        ))
      )}
    </Container>
  )
}
