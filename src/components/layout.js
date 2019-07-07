import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import './base.css'
import 'normalize.css'

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 20vh;
  max-height: 100px;
  font-size: 1.25rem;
`

const NavigationItem = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 1em;
`

class Layout extends React.Component {
  render() {
    const { location, children } = this.props
    const language = location.pathname.split('/')[1];

    return (
      <Container>
        <Navigation>
          <NavigationItem>
            <Link to={`/${language}`}>Home</Link>
          </NavigationItem>
        </Navigation>
        {children}
      </Container>
    )
  }
}

export default Layout
