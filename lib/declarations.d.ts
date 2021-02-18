declare module 'i18next-fs-backend';

interface Locale {
  locale: string;
  path: string;
  language: string;
  label: string;
}

interface SiteMetadata {
  title: string;
  locales: Array<Locale>;
}

declare module 'gatsby-config' {
  export = {
    siteMetadata: SiteMetadata,
  }
}
