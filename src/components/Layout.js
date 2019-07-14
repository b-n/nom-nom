import React from 'react'
import { Link } from 'gatsby'
import { css, ThemeProvider } from 'styled-components'
import styled from 'styled-components'

import LanguageSelector from './LanguageSelector'

import './base.css'
import 'normalize.css'

  //max-width: 1180px;
const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
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

const sizes = {
  phone: [0, 480],
  tablet: [481, 768],
  landscape: [769, 1024],
  desktop: [1025, 1280]
}

const mediaQueries = Object.keys(sizes).reduce((accumulator, current) => {
  accumulator[current] = (...args) => css`
    @media (min-width: ${sizes[current][0]}px) and (max-width: ${sizes[current][1]}px) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

const theme = {
  ...mediaQueries 
}

const Layout = ({ location, children }) => {
  const locationParts = location.pathname.substring(1).split('/');
  const locale = locationParts.shift();
  const path = locationParts.join('/')

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navigation>
          <NavigationItem>
            <Link to={`/${locale}/`}>Home</Link>
          </NavigationItem>
          <NavigationItem>
            <LanguageSelector currentLocale={locale} path={path}/>
          </NavigationItem>
        </Navigation>
        <Container>
          {children}
        </Container>
      </>
    </ThemeProvider>
  )
}

export default Layout
