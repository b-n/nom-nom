import React, { useEffect } from 'react'
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { navigate } from 'gatsby'

// unfortunately createRedirect doesn't invoke wrapElement, which means the 
// redirected page doesn't have the i18n context which is needed

const RouteIndex: React.FC<{}> = ({}) => {
  useEffect(() => {
    const getLanguage = async () => {
      await i18next
        .use(LanguageDetector)
        .init({
          fallbackLng: 'nl',
          whitelist: ['en', 'nl'],
        });
      navigate(`/${i18next.language}/`)
    }

    getLanguage();
  }, []);

  return (<div />);
}

export default RouteIndex
