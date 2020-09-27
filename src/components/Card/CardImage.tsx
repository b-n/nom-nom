import React from 'react';
import styled from 'styled-components';

interface Props {
  src: string;
}

const Image = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 10px;
`

const CardImage: React.FC<Props> = (props) => {
  const { src } = props;

  return (
    <Image src={src} />
  )
}

export default CardImage;
