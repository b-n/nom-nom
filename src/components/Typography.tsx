import React from 'react'

interface TypographyProps {
  variant: 'h1' | 'h2' | 'body' | 'title' | 'subtitle';
  className?: string;
  children?: React.ReactNode;
}

const variantMapping: Record<string, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  body: 'p',
  title: 'h5',
  subtitle: 'h6',
}

const Typography: React.FC<TypographyProps> = (props) => {
  const {
    variant = 'body',
    className,
    ...other
  } = props

  const Component = variantMapping[variant]

  return (
    <Component
      className={className}
      {...other} />
  )
}

export default Typography
