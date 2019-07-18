interface IGatsbyLocation {
  href: string
  hostname: string
  origin: string
  pathname: string
  port: string
  protocol: string
}

interface IGatsbyPageContext {
  isCreatedByStatefulCreatePages: boolean
}

interface IGatsbyPluginSharp {
  resolutions?: IGatsbySharp
  fixed?: IGatsbySharp
  fluid?: IGatsbySharp
  resize?: IGatsbySharp
}

interface IGatsbySharp {
  base64: string
  aspectRatio: float
  width: number
  height: number
  src: string
  srcSet: string
}
