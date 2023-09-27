import { PageProps } from 'gatsby'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Navigation from './Navigation'

import '../../styles/index.css'

const Container = styled.div`
  padding-top: 60px;
  display: flex;
  justify-content: center;
`

const theme = {}

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

type Props = Omit<PageProps, keyof { children: undefined }> & LayoutProps;

const Layout: React.FC<Props> = ({ children, title, path }) => (
  <ThemeProvider theme={theme}>
    <Container>{children}</Container>
    <Navigation title={title} path={path}/>
  </ThemeProvider>
)

export default Layout
