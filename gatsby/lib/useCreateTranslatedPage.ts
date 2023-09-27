import { resolve } from 'path'

import { Locale } from '../gatsby-config'
import { CreatePage } from '../src/interfaces/gatsby'

import { LanguageDefinition } from './i18n'

// Returns a function which resolves to create a page based on locale, url, and any context to be sent (including added i18n context
const useCreateTranslatedPage = (
  { createPage, componentPath, languageDefinitions = {} } :
  { createPage: CreatePage; componentPath: string; languageDefinitions?: Record<string, LanguageDefinition> }
) => async (
  { locale, url, context } :
  { locale: Locale; url: any; context: any }
): Promise<void> => {
  const component = await resolve(componentPath)
  return new Promise(resolve => {
    const urlParts = []
    const i18n = languageDefinitions[locale.language]
    if (i18n) {
      urlParts.push(locale.path)
    }
    urlParts.push(url)

    const fullUrl = `/${urlParts.join('/')}`
    createPage({
      path: fullUrl,
      component,
      context: {
        ...context,
        i18n: {
          locale,
          i18nextResources: i18n.i18next.services.resourceStore.data,
          dateFnsLocale: i18n.dateFnsLocale,
        },
      },
    })
    console.log(`Created page ${fullUrl}`)
    resolve()
  })
}

export default useCreateTranslatedPage
