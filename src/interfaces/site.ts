export interface Site {
  site: {
    siteMetadata: SiteMetadata;
  };
}

export interface SiteMetadata {
  locales: Array<Locale>;
  title: string;
}

export interface Locale {
  label: string;
  locale: string;
  path: string;
  language: string;
}

export interface PageContext {
  path: string;
  i18n: {
    locale: Locale;
  };
}
