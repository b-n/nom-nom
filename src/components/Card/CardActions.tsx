import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Content = styled.div`
  border-top: 1px solid #AAA;
`

const CardActions: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <Content>
      { children }
    </Content>
  )
}

export default CardActions;
