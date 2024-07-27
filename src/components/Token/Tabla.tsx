import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Purchase {
  _id: string
  tokenAddress: string
  buyerAddress: string
  cantidadComprada: number
  fechaCompra: string
}

interface TablaProps {
  tokenAddress: string
}

const Container = styled.div`
  width: 100%;
  padding: 15px;
  overflow-x: auto;
  margin-top: -20px;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.5);
  background-color: #800000;

  th,
  td {
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  th {
    text-align: left;
  }

  thead th {
    background: #850101;
    color: #fff;
  }

  tbody tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  tbody tr:hover {
    background-color: inherit;
  }

  tbody td:hover::before {
    content: '';
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 10px;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 8px;
      font-size: 0.8rem;
    }

    th:last-child,
    td:last-child {
      display: none; /* Hide the last column (Purchase Date) on small screens */
    }

    td.buyerAddress {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px; /* Adjust based on your design needs */
    }
  }
`

export const Tabla: React.FC<TablaProps> = ({ tokenAddress }) => {
  const [data, setData] = useState<Purchase[]>([])

  useEffect(() => {
    fetch(`https://backend-dswap-production.up.railway.app/compras/${tokenAddress}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [tokenAddress])

  return (
    <Container>
      <StyledTable>
        <thead>
          <tr>
            <th>Buyer Address</th>
            <th>Tokens Bought</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(purchase => (
            <tr key={purchase._id}>
              <td className="buyerAddress">{purchase.buyerAddress}</td>
              <td>{purchase.cantidadComprada}</td>
              <td>{new Date(purchase.fechaCompra).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  )
}
