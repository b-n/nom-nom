import React, { MouseEvent } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  variant?: 'contained' | 'text';
}

const BaseButton = styled.button<ButtonProps>`
  border: none;
  background-color: transparent;
  padding: 8px 15px;
  
  &:focus {
    outline: none;
  }
`

const ContainedButton = styled(BaseButton)<ButtonProps>`
  background-color: blue;
  border: 3px solid black;
  border-radius: 5px;
  color: black;
`

const TextButton = styled(BaseButton)<ButtonProps>`
  color: blue;

  &:hover {
    background-color: grey;
  }

  &:focus {
    background-color: blue;
    color: white;
  }
`

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'text',
    onClick,
    children,
  } = props;

  const ButtonElem = variant === 'contained'
    ? ContainedButton
    : TextButton;

  return (
    <ButtonElem
      {...props}
      onClick={onClick}
    >
      {children}
    </ButtonElem>
  )
}

export default Button;
