import React from 'react'
import styled from 'styled-components'

type CardProps = {
  lineHeight?: number;
}

const CardWrapper = styled.div<CardProps>`
  border-radius: 5px;
  border: 3px solid black;
  box-shadow: 1px 1px 3px black;
  background-color: white;
  margin-bottom: 12px;

  width: 100%;
  ${props => props.lineHeight !== undefined && `line-height: ${props.lineHeight};`}
`

interface Props extends CardProps {
  children: React.ReactNode;
}

const Card: React.FC<Props> = (props) => {
  const { children, lineHeight } = props
  return (
    <CardWrapper lineHeight={lineHeight}>
      {children}
    </CardWrapper>
  )
}

export default Card
