import React from 'react'
import { Link } from 'gatsby'
import Container from './container'
import Navigation from './navigation'

import './base.css'
import 'normalize.css'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Navigation />
        {children}
      </Container>
    )
  }
}

export default Template
