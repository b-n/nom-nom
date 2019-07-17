import React from 'react'

import { graphql, navigate } from 'gatsby'
import { getUserLangKey } from 'ptz-i18n'

interface IProps {
  data: ISite
}

class RouteIndex extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props)

    if (typeof window !== 'undefined') {
      const { languages, defaultLocale } = props.data.site.siteMetadata
      const langKey = getUserLangKey(
        languages.map(({ locale }) => locale),
        defaultLocale
      )
      navigate(`/${langKey}`)
    }
  }

  public render() {
    return <div />
  }
}

export default RouteIndex

export const pageQuery = graphql`
  query RouteQuery {
    site {
      siteMetadata {
        languages {
          locale
        }
        defaultLocale
      }
    }
  }
`
