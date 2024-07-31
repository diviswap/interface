import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { useLaunchpadContract } from '../../hooks/useContract'
import { Cargando, Exitoso, Error } from './Cargas'
import { Tabla } from './Tabla'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  color: #ecf0f1;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 50px;
  }
`

const LeftSection = styled.div`
  padding: 20px;
  text-align: center;
  width: 100%;

  @media (min-width: 768px) {
    flex: 1;
    text-align: left;
  }
`

const RightSection = styled.div`
  padding: 20px;
  background: #800000;
  border: 2px solid #3498db;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin-top: 20px;

  @media (min-width: 768px) {
    flex: 0.8;
    max-width: 80vw;
  }

  @media (max-width: 767px) {
    max-width: 100vw;
  }
`

const Box = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  span {
    color: #3498db;
  }
`
const SmallGrayText = styled.span`
  display: block;
  font-size: 0.8em;
  color: gray;
  margin-top: 8px;
`

const Description = styled.p`
  font-size: 0.9rem;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
`

const ButtonGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

const SocialButton = styled.a`
  padding: 10px 20px;
  font-size: 0.9rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  background: linear-gradient(99deg, rgb(255, 166, 0) 14.7%, rgb(255, 99, 97) 73%);
  color: #fff;
  transition: background 0.3s ease;
  text-decoration: none;
  margin: 5px 0;

  @media (min-width: 768px) {
    padding: 15px 30px;
    font-size: 1.2rem;
    margin: 0 10px;
  }

  &:hover {
    background: #e67e22;
  }
`

const TokenTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 15px;
  }
`

const TokenDetail = styled.p`
  font-size: 0.9rem;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`

const CountdownContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`

const CountdownElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Time = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`

const Label = styled.div`
  font-size: 0.8rem;
  color: #bdc3c7;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

const ExpiredText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`

const InputContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    font-size: 0.9rem;
    color: #ecf0f1;
    margin-bottom: 5px;

    @media (min-width: 768px) {
      font-size: 1rem;
      margin-right: 10px;
    }
  }

  input {
    padding: 10px;
    font-size: 1rem;
    width: 80%;
    border: none;
    border-bottom: 2px solid #ddd;
    background: transparent;
    color: #ecf0f1;
    transition: border-color 0.3s ease;

    &:focus {
      border-bottom-color: #007bff;
      outline: none;
    }

    @media (min-width: 768px) {
      width: 50%;
      font-size: 1.1rem;
    }
  }
`

const TokensPurchasedDetail = styled.p`
  font-size: 1rem;
  margin-top: 10px;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`

const BuyButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  background: linear-gradient(99deg, rgb(255, 166, 0) 14.7%, rgb(255, 99, 97) 73%);
  color: #fff;
  transition: background 0.3s ease;
  margin-top: 10px;

  @media (min-width: 768px) {
    padding: 15px 30px;
    font-size: 1.2rem;
  }

  &:hover {
    background: #e67e22;
  }
`

const ClaimButton = styled(BuyButton)<{ disabled: boolean }>`
  background: #f39c12;

  &:hover {
    background: ${props => (props.disabled ? '#f39c12' : '#e67e22')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const TokenInfo = styled.div`
  margin-bottom: 20px;
`
interface TokenData {
  description: string
  price: number
  endDate: string
  availableAmount: number
  tokensPurchased: number
  decimals: number
  weiRecaudados: number
  lowcap: string
  ownerToken: string
  fondosRetirados: boolean
  fondsoRetiradosOwner: boolean
  cantidadTotal: number
}

export const BuyToken: React.FC = () => {
  const { account } = useWeb3React()
  const { tokenTitle, tokenAddress } = useParams<{ tokenTitle: string; tokenAddress: string }>()
  const launchpadContract = useLaunchpadContract()
  const [tokensAmount, setTokensAmount] = useState<string>('0')
  const [tokenData, setTokenData] = useState<TokenData | null>(null)
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [tokensPurchased, setTokensPurchased] = useState<number>(0)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(false)
  const [exito, setExito] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [saleExpired, setSaleExpired] = useState(false)
  const [lowcapReached, setLowcapReached] = useState(false)
  const [dbData, setDbData] = useState<any>(null)
  const [isClaimDisabled, setIsClaimDisabled] = useState(false);


  const fetchDbData = async () => {
    try {
      const response = await fetch(`https://backend-dswap-production.up.railway.app/tokens/${tokenAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setDbData(data)
    } catch (error) {
      console.error('Error fetching data from DB:', error)
    }
  }

  useEffect(() => {
    fetchDbData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!launchpadContract || !dbData) return

      try {
        let decimals = 0
        let info = {
          weiRecaudados: 0,
          ownerToken: '',
          fondosRetirados: false,
          fondsoRetiradosOwner: false
        }
        let tokensPurchased = 0
        let tokenComprados = 0

        if (account) {
          const tokenContract = new ethers.Contract(
            tokenAddress,
            ['function decimals() view returns (uint8)'],
            launchpadContract.signer
          )
          decimals = await tokenContract.decimals()
          info = await launchpadContract.ventasTokens(tokenAddress)
          tokensPurchased = await launchpadContract.getTokensComprados(tokenAddress, account)
          tokenComprados = Number(ethers.utils.formatUnits(tokensPurchased, decimals))
        }

        const tokenData: TokenData = {
          description: 'Token description',
          price: dbData.rate,
          endDate: dbData.fechafin,
          availableAmount: dbData.cantidadDisponible,
          tokensPurchased: tokenComprados,
          decimals: decimals,
          weiRecaudados: info.weiRecaudados,
          lowcap: dbData.lowcap,
          ownerToken: info.ownerToken,
          fondosRetirados: info.fondosRetirados,
          fondsoRetiradosOwner: info.fondsoRetiradosOwner,
          cantidadTotal: dbData.cantidadTotal
        }

        setTokenData(tokenData)
        setTokensPurchased(tokenComprados)
        setIsOwner(info.ownerToken.toLowerCase() === account?.toLowerCase())
        setSaleExpired(
          new Date().getTime() / 1000 > new Date(dbData.fechafin).getTime() / 1000 || dbData.cantidadDisponible === 0
        )
        setLowcapReached(Number(info.weiRecaudados) >= Number(dbData.lowcap))
      } catch (error) {
        console.error('Error fetching token data:', error)
      }
    }

    fetchTokenData()
  }, [launchpadContract, tokenAddress, account, dbData])

  useEffect(() => {
    if (!tokenData) return

    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = new Date(tokenData.endDate).getTime() - now

      if (distance < 0 || tokenData.availableAmount === 0) {
        setTimeLeft('EXPIRED')
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      }
    }

    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [tokenData])

  const handleBuyTokens = async () => {
    if (!launchpadContract || !account || !tokenData) return

    try {
      setCargando(true)
      setError(false)

      const chzToPay = (parseFloat(tokensAmount) * tokenData.price).toString()
      const value = ethers.utils.parseUnits(chzToPay, 'ether')

      const tx = await launchpadContract.comprarTokens(tokenAddress, { value })
      await tx.wait()
      setExito(true)

      const newTokensPurchased = tokensPurchased + parseFloat(tokensAmount)
      setTokensPurchased(newTokensPurchased)
      await fetch('https://backend-dswap-production.up.railway.app/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tokenAddress: tokenAddress,
          buyerAddress: account,
          cantidadComprada: parseFloat(tokensAmount)
        })
      })

      // Vuelve a obtener los datos de la base de datos
      await fetchDbData()

      setTokensAmount('0')
    } catch (error) {
      console.error('Error al comprar tokens:', error)
      setError(true)
    } finally {
      setCargando(false)
    }
  }

  const handleClaimTokens = async () => {
    if (!launchpadContract || !account || tokensPurchased === 0) return

    try {
      setCargando(true)
      setError(false)
      const tx = await launchpadContract.reclamarTokens(tokenAddress)
      await tx.wait()
      setIsClaimDisabled(true)
      setExito(true)

    } catch (error) {
      console.error('Error al reclamar tokens:', error)
      setError(true)
    } finally {
      setCargando(false)
    }
  }

  const handleWithdrawCHZ = async () => {
    if (!launchpadContract || !account || !isOwner || !tokenData || tokenData.fondosRetirados) {
      return
    }

    try {
      setCargando(true)
      setError(false)
      const tx = await launchpadContract.retirarCHZPorToken(tokenAddress)
      await tx.wait()
      setExito(true)
    } catch (error) {
      console.error('Error al retirar CHZ:', error)
      setError(true)
    } finally {
      setCargando(false)
    }
  }

  const handleReclaimContribution = async () => {
    if (!launchpadContract || !account) return

    try {
      setCargando(true)
      setError(false)
      const tx = await launchpadContract.reclamarContribucion(tokenAddress)
      await tx.wait()
      setExito(true)
    } catch (error) {
      console.error('Error al reclamar contribución:', error)
      setError(true)
    } finally {
      setCargando(false)
    }
  }

  const handleClaimTokensOwner = async () => {
    if (!launchpadContract || !account || !isOwner || !tokenData) return

    try {
      setCargando(true)
      setError(false)
      const tx = await launchpadContract.reclamarTokensOwner(tokenAddress)
      await tx.wait()
      setExito(true)
    } catch (error) {
      console.error('Error al reclamar tokens del propietario:', error)
      setError(true)
    } finally {
      setCargando(false)
    }
  }

  if (!tokenData) {
    return <Cargando />
  }

  const reclaimableAmount = tokensPurchased * tokenData.price

  const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const decimalPattern = new RegExp(`^\\d*(\\.\\d{0,${tokenData?.decimals}})?$`)
    if (decimalPattern.test(value)) {
      setTokensAmount(value)
    }
  }

  return (
    <>
      <PageContainer>
        <LeftSection>
          <Title>
            Powered by <span>DSWAP</span>
          </Title>
          <Description>
            Supporting the launch of innovative tokens on Chiliz, unlocking the full potential of tokenization.
          </Description>
          <ButtonGroup>
            <SocialButton href="http://x.com/DSwap" target="_blank">
              Twitter
            </SocialButton>
            <SocialButton href="http://discord.gg/NPtd83jvGN" target="_blank">
              Discord
            </SocialButton>
            <SocialButton href="https://t.me/diviswap" target="_blank">
              Telegram
            </SocialButton>
          </ButtonGroup>
        </LeftSection>
        <RightSection>
          <Box>
            {saleExpired ? (
              <ExpiredText>EXPIRED</ExpiredText>
            ) : (
              <CountdownContainer>
                <CountdownElement>
                  <Time>{timeLeft.split(' ')[0]}</Time>
                  <Label>Days</Label>
                </CountdownElement>
                <CountdownElement>
                  <Time>{timeLeft.split(' ')[1]}</Time>
                  <Label>Hours</Label>
                </CountdownElement>
                <CountdownElement>
                  <Time>{timeLeft.split(' ')[2]}</Time>
                  <Label>Minutes</Label>
                </CountdownElement>
                <CountdownElement>
                  <Time>{timeLeft.split(' ')[3]}</Time>
                  <Label>Seconds</Label>
                </CountdownElement>
              </CountdownContainer>
            )}
          </Box>
          <Box>
            <TokenInfo>
              <TokenTitle>BUY {tokenTitle}</TokenTitle>
              <TokenDetail>Total number of tokens: {tokenData.cantidadTotal}</TokenDetail>
              <TokenDetail>Price: ${tokenData.price} CHZ per token</TokenDetail>
              <TokenDetail>Tokens for sale: {tokenData.availableAmount}</TokenDetail>
              <TokenDetail>Address Tokens: {tokenAddress}</TokenDetail>
            </TokenInfo>
          </Box>
          {!saleExpired && (
            <>
              <Box>
                <InputContainer>
                  <label htmlFor="tokensAmount">Token Amount:</label>
                  <input
                    id="tokensAmount"
                    type="text"
                    value={tokensAmount}
                    onChange={handleTokenAmountChange}
                    placeholder="Enter token amount"
                  />
                  <TokenDetail>CHZ to pay: {(parseFloat(tokensAmount) * tokenData.price).toFixed(2)}</TokenDetail>
                </InputContainer>
              </Box>
              <Box>
                {!account ? (
                  <ClaimButton disabled={true}>Connect to a wallet</ClaimButton>
                ) : (
                  <>
                    <BuyButton onClick={handleBuyTokens} disabled={cargando}>
                      Buy Now
                    </BuyButton>
                    <TokensPurchasedDetail>
                      Tokens Purchased: {tokensPurchased.toFixed(tokenData.decimals)}
                    </TokensPurchasedDetail>
                  </>
                )}
              </Box>
            </>
          )}
          {saleExpired && !lowcapReached && reclaimableAmount > 0 && (
            <Box>
              <ClaimButton onClick={handleReclaimContribution} disabled={false}>
                Reclaim Contribution ({reclaimableAmount.toFixed(2)} CHZ)
              </ClaimButton>
              <SmallGrayText>
                *This sale has been canceled as it did not reach the minimum funding threshold. Please reclaim your
                contribution.
              </SmallGrayText>
            </Box>
          )}
          {saleExpired && lowcapReached && (
            <Box>
              <ClaimButton onClick={handleClaimTokens} disabled={tokensPurchased === 0 || isClaimDisabled}>
                Claim Tokens ({tokensPurchased.toFixed(tokenData.decimals)})
              </ClaimButton>
            </Box>
          )}
          {isOwner && (
            <Box>
              {tokenData.fondosRetirados ? (
                <ClaimButton disabled={true}>Funds already withdrawn</ClaimButton>
              ) : (
                <ClaimButton onClick={handleWithdrawCHZ} disabled={!saleExpired || !lowcapReached}>
                  Withdraw ({parseFloat(ethers.utils.formatEther(tokenData.weiRecaudados)).toFixed(2)} CHZ)
                </ClaimButton>
              )}
              {!lowcapReached && saleExpired && (
                <ClaimButton onClick={handleClaimTokensOwner} disabled={tokenData.fondsoRetiradosOwner}>
                  {tokenData.fondsoRetiradosOwner ? 'Tokens no vendidos ya reclamados' : 'Reclaim Unsold Tokens'}
                </ClaimButton>
              )}
            </Box>
          )}
        </RightSection>
        {cargando && <Cargando />}
        {error && <Error />}
        {exito && <Exitoso onClose={() => setExito(false)} message="Transaction Successful" />}
      </PageContainer>
      {tokenData.availableAmount !== tokenData.cantidadTotal && <Tabla tokenAddress={tokenAddress} />}
    </>
  )
}
