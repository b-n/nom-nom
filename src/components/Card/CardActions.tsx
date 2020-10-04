import React from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode;
}

const Content = styled.div`
  border-top: 1px solid #AAA;
  box-shadow: inset 0px 5px 8px -8px black;
`

const CardActions: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <Content>
      { children }
    </Content>
  )
}

export default CardActions
