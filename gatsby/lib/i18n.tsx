import { realpathSync } from 'fs'
import { resolve } from 'path'

import * as i18next from 'i18next'
/// <reference types="./declarations.d.ts" />
import i18nextFsBackend from 'i18next-fs-backend'

export type InitOptions = i18next.InitOptions
export type i18n = i18next.i18n

const srcPath = resolve(realpathSync(process.cwd()), 'src')

export const createI18nextInstance = async (language: string, options: i18next.InitOptions): Promise<i18next.i18n> => {
  const i18n = i18next.default.createInstance()
  i18n.use(i18nextFsBackend)

  await new Promise(resolve =>
    i18n.init(
      {
        ...options,
        lng: language,
        fallbackLng: [language],
        interpolation: { escapeValue: false },
        backend: {
          loadPath: `${srcPath}/translations/{{lng}}/{{ns}}.json`,
        },
      },
      resolve
    )
  )

  return i18n
}

export interface LanguageDefinition {
  language: string;
  i18next: i18n;
  dateFnsLocale: string;
}

const dateFnsLocaleMap: Record<string, string> = {
  en: 'enGB',
  nl: 'nl',
}

export const useLanguageDefinitions = async (languages: Array<string>, options: InitOptions): Promise<Record<string, LanguageDefinition>> => {
  const defs = await Promise.all(
    languages.map(lang => createI18nextInstance(lang, options))
  )

  return defs.reduce((a, c) => {
    a[c.language] = {
      language: c.language,
      i18next: c,
      dateFnsLocale: dateFnsLocaleMap[c.language],
    }
    return a
  }, {} as Record<string, LanguageDefinition>)
}
