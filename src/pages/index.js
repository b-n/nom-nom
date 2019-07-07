import React from 'react'
import { graphql, navigate } from 'gatsby'
import { getUserLangKey } from 'ptz-i18n'

class RouteIndex extends React.Component {
  constructor(props) {
    super(props)

    if (typeof window !== 'undefined') {
      const { languages, defaultLocale } = props.data.site.siteMetadata.locales;
      const langKey = getUserLangKey(languages, defaultLocale);
      navigate(`/${langKey}`)
    }
  }

  render() {
    return (
      <div />
    )
  }
}

export default RouteIndex

export const pageQuery = graphql`
  query RouteQuery {
    site {
      siteMetadata {
        locales {
          languages
          defaultLocale
        }
      }
    }
  }
`
