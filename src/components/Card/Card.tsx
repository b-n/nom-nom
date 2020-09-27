import React from 'react';
import styled from 'styled-components';

type CardWrapperProps = {
  margin?: string;
  width?: string;
}

const CardWrapper = styled.div<CardWrapperProps>`
  border-radius: 5px;
  border: 3px solid black;
  box-shadow: 1px 1px 3px black;
  background-color: white;
  margin: ${props => props.margin || '0px' };
  width: ${props => props.width || '100%' };
`

const CardContent = styled.div`
  width: 100%;
`

interface Props {
  children: React.ReactNode;
  margin?: string;
  width?: string;
}

const Card: React.FC<Props> = (props) => {
  const { children, margin, width } = props;
  return (
    <CardWrapper margin={margin} width={width}>
      <CardContent>
        {children}
      </CardContent>
    </CardWrapper>
  )
}

export default Card;
