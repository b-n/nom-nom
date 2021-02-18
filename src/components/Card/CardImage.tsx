import Img, { FluidObject, FixedObject } from 'gatsby-image'
import React from 'react'

interface Props {
  fluid?: FluidObject;
  fixed?: FixedObject;
  maxHeight?: string;
}

const CardImage: React.FC<Props> = (props) => {
  const { maxHeight = '300px' } = props

  const defaultProps = {
    style: {
      maxHeight,
    },
  }

  if (props.fixed) {
    return (<Img {...defaultProps} fixed={props.fixed} />)
  }
  return (<Img {...defaultProps} fluid={props.fluid!} />)
}

export default CardImage
