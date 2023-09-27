export interface Locale {
  locale: string;
  path: string;
  language: string;
  label: string;
}

interface SiteMetadata {
  title: string;
  locales: Array<Locale>
}

export const siteMetadata: SiteMetadata;

