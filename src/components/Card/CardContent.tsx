import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Content = styled.div`
  padding: 7px 10px;
`

const CardContent: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <Content>
      { children }
    </Content>
  )
}

export default CardContent;
