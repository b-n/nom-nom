import React from 'react';

import { useStaticQuery, graphql, navigate, Link, PageProps } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import { mb } from 'styled-components-spacing';
import { Dish, Home } from 'styled-icons/boxicons-regular';
import { useTranslation } from 'react-i18next';

import { useLocale } from '../../components/withI18n';
import LanguageSelector from '../../components/LanguageSelector';

import { Site, Locale } from '../../interfaces/site';

import '../../styles/index.css';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  ${mb({ mobile: 0, tablet: 4, desktop: 5 })}
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 20vh;
  max-height: 100px;
  font-size: 1.25rem;
`;

const NavigationItem = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 1em;
`;

const NavigationLink = styled(props => <Link {...props} />)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;

const NavigationSpacer = styled.div`
  display: inline-flex;
  width: 100%;
`;

const HomeIcon = styled(Home)`
  width: 1em;
  height: 1em;
  margin-right: 6px;
`;

const InspirationIcon = styled(Dish)`
  width: 1em;
  height: 1em;
  margin-right: 6px;
`;

const theme = {};

interface LayoutProps {
  children: React.ReactNode;
}

type Props = Omit<PageProps, keyof { children: undefined }> & LayoutProps;

const Layout: React.FC<Props> = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  const locale = useLocale();
  const languageData = useStaticQuery(graphql`
    query LanguageQuery {
      site {
        siteMetadata {
          locales {
            path
            label
            locale
          }
        }
      }
    }
  `) as Site;

  const handleLanguageSelect = async ({ path }: Locale) => {
    const [_, __, ...currentPath] = props.path.split('/');
    const newPath = currentPath.join('/') || '';
    navigate(`/${path}/${newPath}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navigation>
          <NavigationItem>
            <NavigationLink to={`/${locale.path}`}>
              <HomeIcon />
              {t('common:Home')}
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink to={`/${locale.path}/inspiration`}>
              <InspirationIcon />
              {t('common:Inspiration')}
            </NavigationLink>
          </NavigationItem>
          <NavigationSpacer />
          <NavigationItem>
            <LanguageSelector
              label={t('common:Language')}
              locales={languageData.site.siteMetadata.locales}
              onSelect={handleLanguageSelect}
            />
          </NavigationItem>
        </Navigation>
        <Container>{children}</Container>
      </>
    </ThemeProvider>
  );
};

export default Layout;
