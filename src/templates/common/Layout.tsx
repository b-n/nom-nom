import React from 'react';

import { PageProps } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Site, Locale } from '../../interfaces/site';

import Navigation from './Navigation'

import '../../styles/index.css';

const Container = styled.div`
  padding-top: 60px;
  display: flex;
  justify-content: center;
`;

const theme = {};

interface LayoutProps {
  children: React.ReactNode;
  pageType: 'index' | 'meal';
  title: string;
}

type Props = Omit<PageProps, keyof { children: undefined }> & LayoutProps;

const Layout: React.FC<Props> = (props) => {
  const { children, title, pageType } = props;

  return (
    <ThemeProvider theme={theme}>
      <Navigation title={title} pageType={pageType} />
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default Layout;
