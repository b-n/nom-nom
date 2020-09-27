import React from 'react';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { NavigateFn, NavigateOptions } from "@reach/router"
import { Link, GatsbyLinkProps, navigate } from 'gatsby';
import { Locale as DateFnsLocale } from 'date-fns';
import i18next, { Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enGB, nl } from 'date-fns/locale';

export interface Locale {
  dateFns: DateFnsLocale;
  language: string;
  locale: string;
  path: string;
  label: string;
  navigate: NavigateFn; 
};

const LocaleContext = React.createContext({} as Locale);
export const useLocale = () => React.useContext(LocaleContext);

const dateFnsLocaleMap: Record<string, DateFnsLocale> = { enGB, nl };

interface Props {
  element: React.ReactNode;
  props: {
    pageContext: {
      i18n: {
        locale: Locale;
        i18nextResources: Resource;
      };
    };
  };
}

export const wrapWithI18nProvider = ({ element, props }: Props) => {
  if (!props.pageContext.i18n) return;
  const { locale, i18nextResources } = props.pageContext.i18n;
  const { path, language } = locale;

  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      lng: language,
      whitelist: ['en', 'nl'],
      interpolation: { escapeValue: false },
      initImmediate: false,
      resources: i18nextResources,
    });

  const navigateFunction = (to: string | number, options?: NavigateOptions<{}>) => navigate(`/${path}${to}`, options);

  return (
    <LocaleContext.Provider
      value={{
        ...locale,
        dateFns: dateFnsLocaleMap[language],
        navigate: navigateFunction,
      }}
    >
      <I18nextProvider i18n={i18next}>
        <Helmet htmlAttributes={{ lang: language }} />
        {element}
      </I18nextProvider>
    </LocaleContext.Provider>
  );
};

//Omit related to https://github.com/gatsbyjs/gatsby/issues/1668
const LocalisedLink: React.FC<Omit<GatsbyLinkProps<{}>, 'ref'>> = (props) => {
  const { path } = useLocale();

  return (
    <Link {...props} to={`/${path}${props.to}`} />
  )
}

export { LocalisedLink as Link }
