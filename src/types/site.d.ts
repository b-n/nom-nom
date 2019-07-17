interface ISite {
  site: {
    siteMetadata: ISiteMetadata
  }
}

interface ISiteMetadata {
  languages: Array<ILanguage>
  defaultLocale: string,
  title: string
}

interface ILanguage {
  label: string
  locale: string
}

interface IPageContext extends IGatsbyPageContext {
  url: string
  locale: string
}
