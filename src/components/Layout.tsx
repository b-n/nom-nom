import React, { ReactNode } from 'react'

import { Link } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'

import { getMessage } from '../data/languages'
import LanguageSelector from './LanguageSelector'

import 'normalize.css'
import './base.css'

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
`

const theme = {}

interface IProps {
  pageContext: IPageContext
  children: ReactNode
}

const Layout: React.FC<IProps> = ({ pageContext, children }) => {
  const { locale, url } = pageContext

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
            <LanguageSelector currentLocale={locale} currentUrl={url} />
          </NavigationItem>
        </Navigation>
        <Container>{children}</Container>
      </>
    </ThemeProvider>
  )
}

export default Layout
