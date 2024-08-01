import React from 'react';
import styled from 'styled-components';
import { FaExchangeAlt, FaLock, FaGavel } from 'react-icons/fa';

interface StepProps {
  active: boolean;
}

const RoadmapContainer = styled.div`
  background: #121212;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: #fff;
  margin-top: 1rem;
  text-align: center;
  width: 90%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  margin-bottom: 60px;
  font-size: 2rem;
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around; /* Changed to space-around */
  }
`;

const Step = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    width: 20px;
    height: 3px;
    background-color: ${props => (props.active ? 'linear-gradient(90deg, #ff7e5f, #feb47b)' : '#ddd')};
    z-index: -1;
    @media (min-width: 768px) {
      right: -25px;
      width: 50px;
    }
  }

  svg {
    font-size: 2rem;
    @media (min-width: 768px) {
      font-size: 3rem;
    }
    color: ${props => (props.active ? 'url(#gradient)' : '#333')};
    background: ${props => (props.active ? 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)' : 'none')};
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${props => (props.active ? 'transparent' : 'auto')};
  }

  span {
    margin-top: 10px;
    font-size: 1rem;
    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
    color: ${props => (props.active ? '#ff7e5f' : '#333')};
  }
`;

const DescriptionBox = styled.div`
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 800px;
  height: auto;
  overflow-y: auto;
  margin: 0 auto;
  margin-bottom: 20px;

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;

    &::before {
      content: '●';
      color: #ff7e5f;
      margin-right: 8px;
      font-size: 1.5rem;
      line-height: 1.25rem;
    }
  }

  @media (min-width: 768px) {
    padding: 30px;
  }
`;

const steps = [
  {
    icon: <FaExchangeAlt />,
    label: 'Phase 1',
    fecha: 'Swap and Launchpad July 2024',
    description: [
      'Swap: Platform for token swapping with support for multiple pairs.',
      'Launchpad: Platform for new token launches.',
      'Launch of the native token $DSwap.'
    ]
  },
  {
    icon: <FaLock />,
    label: 'Phase 2',
    fecha: 'Staking and NFT Marketplace September 2024',
    description: ['Staking: Fixed and flexible staking options.', 'NFT Marketplace']
  },
  {
    icon: <FaGavel />,
    label: 'Phase 3',
    fecha: 'Governance December 2024',
    description: [
      'Governance: Decentralized system for proposals and voting.',
      'Voting mechanisms based on token holdings.',
      'Incentives to encourage active participation.'
    ]
  }
];

export const Roadmap: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <RoadmapContainer>
      <Title>Roadmap 2024</Title>
      <Timeline>
        {steps.map((step, index) => (
          <Step key={index} active={index === activeStep} onClick={() => setActiveStep(index)}>
            {step.icon}
            <span>{step.label}</span>
          </Step>
        ))}
      </Timeline>
      <DescriptionBox>
        <h3>{steps[activeStep].fecha}</h3>
        <ul>
          {steps[activeStep].description.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </DescriptionBox>
    </RoadmapContainer>
  );
};
