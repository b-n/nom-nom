import React from 'react'
import { Link } from 'gatsby'
import { css, ThemeProvider } from 'styled-components'
import styled from 'styled-components'

import LanguageSelector from './LanguageSelector'
import { getMessage } from '../data/languages'

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

  & a {
    text-decoration: none;
  }
`

const NavigationSpacer = styled.div`
  display: inline-flex;
  width: 100%;
`;

const theme = {}

const Layout = ({ location, children }) => {
  const locationParts = location.pathname.substring(1).split('/');
  const locale = locationParts.shift();
  const path = locationParts.join('/')

  const messages = getMessage(locale)

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navigation>
          <NavigationItem>
            <Link to={`/${locale}/`}>{messages('HOME')}</Link>
          </NavigationItem>
          <NavigationItem>
            <Link to={`/${locale}/inspiration`}>{messages('INSPIRATION')}</Link>
          </NavigationItem>
          <NavigationSpacer />
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
