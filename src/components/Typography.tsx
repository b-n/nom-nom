import React from 'react';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'body' | 'subtitle';
  className?: string;
  children?: React.ReactNode;
}

const variantMapping: Record<string, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  body: 'p',
  subtitle: 'h6',
}

const Typography: React.FC<TypographyProps> = (props) => {
  const {
    variant = 'body',
    className,
    ...other
  } = props;

  const Component = variantMapping[variant]; 

  return (
    <Component 
      className={className}
      {...other} />
  )
}

export default Typography;
