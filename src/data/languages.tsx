import { formatDistanceToNow, Locale } from 'date-fns'

import enNZ from './messages/en-NZ.json'
import nlNL from './messages/nl-NL.json'

const languages = [
  {
    label: '🇳🇿 English',
    locale: 'en-NZ',
  },
  {
    label: '🇳🇱 Nederlands',
    locale: 'nl-NL',
  },
]

const defaultLocale = 'en-NZ'

const messages: Record<string, Record<string, string>> = {
  'en-NZ': enNZ as Record<string, string>,
  'nl-NL': nlNL as Record<string, string>,
}

const formatLocales: Record<string, Locale> = {
  'en-NZ': require('date-fns/locale/en-GB'),
  'nl-NL': require('date-fns/locale/nl'),
}

console.log('en-NZ')

const getMessage: (locale: string) => (message: string) => string = (
  locale: string
) => {
  return (message: string): string => messages[locale][message]
}
const formatDateDistanceToNow = (locale: string, date: Date) => {
  const msgs = getMessage(locale)
  return `${msgs('LAST_UPDATED')} ${formatDistanceToNow(date, {
    locale: formatLocales[locale],
  })} ${msgs('AGO')}`
}

export { languages, defaultLocale, getMessage, formatDateDistanceToNow }
