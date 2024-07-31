/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import styled from 'styled-components'

const data = [
  { name: 'Community Allocation', value: 27.5 },
  { name: 'Liquidity Pool', value: 20 },
  { name: 'DiviSwap Launchpad', value: 15 },
  { name: 'DiviSwap KEWL', value: 15 },
  { name: 'Development and Maintenance', value: 12.5 },
  { name: 'Liquidity Incentives', value: 7.5 },
  { name: 'Marketing', value: 2.5 }
]

const COLORS = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#F0A500', '#E94F37'];

interface ChartData {
  name: string
  value: number
  startAngle: number
  endAngle: number
  color: string
}

const calculateChartData = (data: { name: string; value: number }[]): ChartData[] => {
  const total = data.reduce((acc, item) => acc + item.value, 0)
  let cumulativeValue = 0

  return data.map((item, index) => {
    const startAngle = (cumulativeValue / total) * 360
    const endAngle = ((cumulativeValue + item.value) / total) * 360
    cumulativeValue += item.value

    return {
      ...item,
      startAngle,
      endAngle,
      color: COLORS[index % COLORS.length]
    }
  })
}

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y, 'L', x, y, 'Z'].join(' ')

  return d
}

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

export const TokenSale = () => {
  const chartData = calculateChartData(data)

  return (
    <TokenSection>
      <SectionTitle>The Native Token of DiviSwap: $DSWAP</SectionTitle>
      <TokenDescription>TOTAL SUPPLY: 888.888</TokenDescription>
      <ChartContainer>
        <Svg width={300} height={300} viewBox="0 0 300 300">
          {chartData.map((slice, index) => (
            <g key={index}>
              <path d={describeArc(150, 150, 100, slice.startAngle, slice.endAngle)} fill={slice.color} />
            </g>
          ))}
        </Svg>
        <TokenList>
          {chartData.map((item, index) => (
            <TokenItem key={index}>
              <ColorDot color={item.color} /> {item.name} - {item.value}%
            </TokenItem>
          ))}
        </TokenList>
      </ChartContainer>
    </TokenSection>
  )
}

const TokenSection = styled.section`
  background: #121212;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: #fff;
  margin-top: 2rem;
  text-align: center;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
`

const TokenDescription = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
`

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const Svg = styled.svg`
  width: 50%;
  height: auto;
`

const TokenList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`

const TokenItem = styled.li`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`

const ColorDot = styled.span<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
`