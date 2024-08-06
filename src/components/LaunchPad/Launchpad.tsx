import React, { useState, ChangeEvent, FormEvent } from 'react'
import styled, { keyframes } from 'styled-components'
import launchImage from './despegue.png'
import { ethers } from 'ethers'
import { useLaunchpadContract } from '../../hooks/useContract'
import { Cargando, Error, Exitoso } from './Cargas'
import { ErrorLowCap } from '../Token/Cargas'
import { subirImagen } from './SubirImangen'

const Card = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px 0 rgba(153, 153, 153, 0.25);
  padding: 0.75rem;
`

const vibrate = keyframes`
  0% { transform: translate(0, 0) rotate(30deg); }
  20% { transform: translate(-1px, 1px) rotate(30deg); }
  60% { transform: translate(1px, 1px) rotate(30deg); }
  80% { transform: translate(1px, -1px) rotate(30deg); }
  100% { transform: translate(0, 0) rotate(30deg); }
`

const CardImage = styled.div`
  background: linear-gradient(
    34deg,
    rgba(23, 23, 23, 0.9853992622439601) 28%,
    rgba(251, 68, 0, 1) 57%,
    rgba(9, 5, 0, 1) 100%
  );
  padding-bottom: 20%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-bottom: 30%;
  }
`

const CardHeading = styled.h2`
  position: absolute;
  left: 8%;
  top: 15%;
  right: 10%;
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.222;

  small {
    display: block;
    font-size: 0.75em;
    font-weight: 400;
    margin-top: 0.25em;
  }

  @media (max-width: 768px) {
    left: 5%;
    top: 10%;
    font-size: 1.5rem;
  }
`

const LaunchImage = styled.img`
  position: absolute;
  right: 200px;
  bottom: 16px;
  width: 230px;
  height: auto;
  transform: rotate(30deg);
  animation: ${vibrate} 0.3s infinite;

  @media (max-width: 768px) {
    right: 10px;
    bottom: 10px;
    width: 180px;
  }
`

const CardForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem 1rem 0;
`

const Input = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  padding-top: 1.5rem;
  flex: 1 1 45%;

  & + & {
    margin-top: 1.5rem;
  }
`

const InputLabel = styled.label`
  color: black;
  position: absolute;
  top: 1.5rem;
  transition: 0.25s ease;
`

const InputField = styled.input`
  border: 0;
  z-index: 1;
  background-color: transparent;
  border-bottom: 2px solid #eee;
  font: inherit;
  font-size: 1.125rem;
  padding: 0.25rem 0;

  &:focus,
  &:valid {
    outline: 0;
    border-bottom-color: orange;

    & + ${InputLabel} {
      color: orange;
      transform: translateY(-1.5rem);
    }
  }
`

const Action = styled.div`
  margin-top: 2rem;
  flex: 1 1 100%;
  display: flex;
  justify-content: center;
`

const ActionButton = styled.button`
  font: inherit;
  font-size: 1.25rem;
  padding: 1em;
  width: 100%;
  max-width: 200px;
  font-weight: 500;
  background-color: #8b0000;
  border-radius: 6px;
  color: #fff;
  border: 0;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: #ff0000;
  }
`
const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
`

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: orange;
  border: 2px solid orange;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: white;
    color: orange;
  }
`

const FileInput = styled.input`
  display: none;
`

const SECONDS_IN_DAY = 86400

export const Launchpad: React.FC = () => {
  const launchpadContract = useLaunchpadContract()
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(false)
  const [errorl, setErrorl] = useState(false)
  const [exito, setExito] = useState(false)
  const [imagen, setImagen] = useState<File | null>(null)

  const [formValues, setFormValues] = useState({
    direccionToken: '',
    descripcion: '',
    tasa: '',
    lowcap: '',
    duracion: '',
    cantidadDisponible: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let parsedValue = value

    if (['tasa', 'lowcap', 'duracion', 'cantidadDisponible'].includes(name)) {
      parsedValue = value.replace(/[^0-9.]/g, '')
      if (parseFloat(parsedValue) < 0) {
        parsedValue = ''
      }
    }

    setFormValues({ ...formValues, [name]: parsedValue })
  }

  const [fileName, setFileName] = useState<string | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImagen(file)
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Formulario enviado')
    setCargando(true)
    setError(false)
    setExito(false)

    if (!launchpadContract) return

    const { direccionToken, tasa, lowcap, duracion, cantidadDisponible, descripcion } = formValues

    const posibleRecaudacion = parseFloat(cantidadDisponible) * parseFloat(tasa)
    if (posibleRecaudacion < parseFloat(lowcap)) {
      setCargando(false)
      setErrorl(true)
      console.error('La posible recaudación no puede ser menor que el lowcap.')
      return
    }

    if (!direccionToken) {
      console.error('El campo direccionToken está vacío.')
      setError(true)
      setCargando(false)
      return
    }

    try {
      const tokenContract = new ethers.Contract(
        direccionToken,
        [
          'function decimals() view returns (uint8)',
          'function approve(address spender, uint256 amount) public returns (bool)',
          'function symbol() view returns (string)'
        ],
        launchpadContract.signer
      )
      const dswapToken = new ethers.Contract(
        '0x2eBEc8E89BB4B9C3681BE4eAA85C391F1cd717cE',
        [
          'function decimals() view returns (uint8)',
          'function approve(address spender, uint256 amount) public returns (bool)',
          'function symbol() view returns (string)'
        ],
        launchpadContract.signer
      )

      const decimals = await tokenContract.decimals()

      const durationInSeconds = SECONDS_IN_DAY * parseInt(duracion)
      console.log(durationInSeconds)
      const parsedTasa = ethers.utils.parseUnits(tasa, 'ether')
      const parsedLowcap = ethers.utils.parseUnits(lowcap, 'ether')
      const parsedCantidadDisponible = ethers.utils.parseUnits(cantidadDisponible, decimals)
      const tokenSymbol: string = await tokenContract.symbol()

      const approveDswap = await dswapToken.approve(launchpadContract.address, '150000000000000000000')
      await approveDswap.wait()
      console.log('Aprobación exitosa DSWAP:', approveDswap)

      const approveTx = await tokenContract.approve(launchpadContract.address, parsedCantidadDisponible)
      await approveTx.wait()
      console.log('Aprobación exitosa:', approveTx)


      const fechaInicio = new Date()
      const fechaFin = new Date(fechaInicio)
      fechaFin.setDate(fechaInicio.getDate() + parseInt(duracion))

      await launchpadContract.agregarToken(direccionToken, parsedTasa, parsedLowcap, durationInSeconds, parsedCantidadDisponible)

      let imageUrl = ''

      if (imagen) {
        const cidImagen = await subirImagen(imagen)
        imageUrl = `https://green-worrying-dragon-360.mypinata.cloud/ipfs/${cidImagen}`
      }

      const requestData = {
        TokenAddress: direccionToken,
        TokenName: tokenSymbol,
        rate: tasa,
        cantidadTotal: cantidadDisponible,
        cantidadDisponible: cantidadDisponible,
        lowcap: lowcap,
        imagenURL: imageUrl,
        descripcion: descripcion,
        fechafin: fechaFin.toISOString()
      }

      console.log('Request Data:', requestData)

      const response = await fetch('https://backend-dswap-production.up.railway.app/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Token creado exitosamente en la base de datos:', data)
        setExito(true)
      } else {
        console.error('Error al crear el token en la base de datos:', response.statusText)
        setError(true)
      }
    } catch (error) {
      setError(true)
      console.error('Transacción fallida:', error)
    } finally {
      setCargando(false)
    }
  }

  const handleCloseExito = () => {
    setExito(false)
    setFormValues({
      direccionToken: '',
      descripcion: '',
      tasa: '',
      lowcap: '',
      duracion: '',
      cantidadDisponible: ''
    })
    setImagen(null)
  }

  return (
    <Card>
      <CardImage>
        <CardHeading>
          Get Started
          <small> Create a token launch</small>
        </CardHeading>
        <LaunchImage src={launchImage} alt="Imagen Lateral" />
      </CardImage>
      <CardForm onSubmit={handleSubmit}>
        <Input>
          <InputField
            type="text"
            name="direccionToken"
            value={formValues.direccionToken}
            onChange={handleChange}
            required
          />
          <InputLabel>Token Address</InputLabel>
        </Input>
        <Input>
          <InputField type="text" name="tasa" value={formValues.tasa} onChange={handleChange} required />
          <InputLabel>Rate</InputLabel>
        </Input>
        <Input>
          <InputField type="text" name="lowcap" value={formValues.lowcap} onChange={handleChange} required />
          <InputLabel>Min Cap</InputLabel>
        </Input>
        <Input>
          <InputField type="text" name="duracion" value={formValues.duracion} onChange={handleChange} required />
          <InputLabel>Duration (in days)</InputLabel>
        </Input>
        <Input>
          <InputField
            type="text"
            name="cantidadDisponible"
            value={formValues.cantidadDisponible}
            onChange={handleChange}
            required
          />
          <InputLabel>Available Quantity</InputLabel>
        </Input>
        <Input>
          <InputField type="text" name="descripcion" value={formValues.descripcion} onChange={handleChange} required />
          <InputLabel>Description</InputLabel>
        </Input>
        <Input>
          <FileInputContainer>
            <FileInput type="file" id="file-upload" name="imagen" onChange={handleImageChange} accept="image/*" />
            <FileInputLabel htmlFor="file-upload">{imagen ? fileName : 'Upload Image'}</FileInputLabel>
          </FileInputContainer>
        </Input>
        <Action>
          <ActionButton type="submit">Launch</ActionButton>
        </Action>
      </CardForm>
      {cargando && <Cargando />}
      {error && <Error />}
      {errorl && <ErrorLowCap />}
      {exito && (
        <Exitoso
          tokenData={{
            nombre: formValues.descripcion,
            tasa: parseFloat(formValues.tasa),
            lowcap: parseFloat(formValues.lowcap),
            duracion: parseInt(formValues.duracion),
            cantidadDisponible: parseFloat(formValues.cantidadDisponible)
          }}
          onClose={handleCloseExito}
        />
      )}
    </Card>
  )
}

