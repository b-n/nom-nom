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
