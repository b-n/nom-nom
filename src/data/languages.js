const formatDistanceToNow = require('date-fns/formatDistanceToNow').default;

const languages = [
  {
    locale: 'en-NZ',
    label: '🇳🇿 English',
  },
  {
    locale: 'nl-NL',
    label: '🇳🇱 Nederlands',
  }
]

const defaultLocale = 'en-NZ'

const messages = {
  'en-NZ': require('./messages/en-NZ'),
  'nl-NL': require('./messages/nl-NL'),
}

const formatLocales = {
  'en-NZ': require('date-fns/locale/en-GB'),
  'nl-NL': require('date-fns/locale/nl'),
}

const getMessage = locale => message => messages[locale][message];
const formatDateDistanceToNow = (locale, date)  => {
  const messages = getMessage(locale);
  return `${messages('LAST_UPDATED')} ${formatDistanceToNow(date, { locale: formatLocales[locale] })} ${messages('AGO')}`
}

module.exports = {
  languages,
  defaultLocale,
  getMessage,
  formatDateDistanceToNow,
}
