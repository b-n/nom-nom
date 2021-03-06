import { navigate } from 'gatsby'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import React, { useEffect } from 'react'

// unfortunately createRedirect doesn't invoke wrapElement, which means the
// redirected page doesn't have the i18n context which is needed

const RouteIndex: React.FC = () => {
  useEffect(() => {
    const navigateToLanguageRoot = async () => {
      await i18next
        .use(LanguageDetector)
        .init({
          fallbackLng: 'nl',
          whitelist: ['en', 'nl'],
        })
      navigate(`/${i18next.language}/`)
    }

    navigateToLanguageRoot()
  }, [])

  return (<div />)
}

export default RouteIndex
