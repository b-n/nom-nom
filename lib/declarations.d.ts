declare module 'i18next-fs-backend';

declare module 'gatsby-config' {

  interface Locale {
    locale: string;
    path: string;
    language: string;
    label: string;
  }

  interface SiteMetadata {
    title: string;
    locales: Array<Locale>
  }

  export = {
    siteMetadata: SiteMetadata,
  }
}
