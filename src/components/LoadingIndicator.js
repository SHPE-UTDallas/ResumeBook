import React from 'react'
import styled, { keyframes } from 'styled-components'

const IndicatorRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Indicator = styled.div`
  content: ' ';
  display: block;
  width: 45px;
  height: 45px;
  margin: 8px;
  border-radius: 50%;
  border: 3px solid #fff;
  /* border-color: #73aabe #f16533 #4d92c8 #d43f27; */
  border-color: #a6addb transparent #a6addb transparent;
  animation: ${IndicatorRotation} 1.2s linear infinite;
`

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 247px);
`

const LoadingIndicator = () => {
  return (
    <>
      <IndicatorContainer>
        <Indicator></Indicator>
      </IndicatorContainer>
    </>
  )
}

export default LoadingIndicator
