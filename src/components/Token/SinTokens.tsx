/* eslint-disable react/prop-types */
// NoDataMessage.tsx
import React from 'react'
import styled from 'styled-components'

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  font-size: 1.5rem;
  padding: 20px;
  border-radius: 10px;
`

interface NoDataMessageProps {
  message?: string
}

export const SinTokens: React.FC<NoDataMessageProps> = ({ message = 'Tokens will be available soon' }) => {
  return <MessageContainer>{message}</MessageContainer>
}
