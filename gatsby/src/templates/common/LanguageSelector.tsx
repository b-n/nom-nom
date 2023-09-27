import React from 'react'

import Select, { SelectItem } from '../../components/Select'

import { Locale } from '../../interfaces/site'

interface Props {
  label: string;
  locales: Array<Locale>;
  onSelect: (locale: Locale) => void;
}

const LanguageSelector: React.FC<Props> = ({ label, locales, onSelect }) => (
  <Select label={label}>
    {locales.map((locale) => (
      <SelectItem key={locale.label} onClick={() => onSelect(locale)}>
        {locale.label}
      </SelectItem>
    ))}
  </Select>
)

export default LanguageSelector
