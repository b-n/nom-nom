import React, { ReactNode } from 'react'

import { Link } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import { mb } from 'styled-components-spacing'
import { Dish, Home } from 'styled-icons/boxicons-regular'

import { getMessage } from '../data/languages'
import LanguageSelector from './LanguageSelector'

import './base.css'

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  ${mb({ mobile: 0, tablet: 4, desktop: 5 })}
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

const NavigationLink = styled(props => <Link {...props} />)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`

const NavigationSpacer = styled.div`
  display: inline-flex;
  width: 100%;
`

const HomeIcon = styled(Home)`
  width: 1em;
  height: 1em;
  margin-right: 6px;
`

const InspirationIcon = styled(Dish)`
  width: 1em;
  height: 1em;
  margin-right: 6px;
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
            <NavigationLink to={`/${locale}/`}>
              <HomeIcon />
              {messages('HOME')}
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink to={`/${locale}/inspiration`}>
              <InspirationIcon />
              {messages('INSPIRATION')}
            </NavigationLink>
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
