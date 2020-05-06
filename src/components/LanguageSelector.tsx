import React from 'react'

import { graphql, Link, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next';

import { Locale } from '../interfaces/Site';

const Selector = styled.div`
  font-size: 1rem;
  width: 150px;
  position: relative;
  display: flex;
  padding: 10px;
  border: 1px solid #333;

  & a {
    text-decoration: none;
  }

  &:hover {
    background-color: white;
    border-top: 1px solid #333;
    border-left: 1px solid #333;
    border-right: 2px solid #000;
  }
`

const SelectorLabel = styled.span`
  width: 100%;

  &::after {
    content: '\\25BC';
    margin-left: 10px;
    float: right;
  }

  ${Selector}:hover &::after {
    content: '\\25B2';
  }
`

const Items = styled.div`
  display: none;
  position: absolute;
  margin-top: 30px;
  background-color: white;
  width: 150px;
  margin-left: -11px;
  z-index: 99999;
  border-top: 1px solid #eee;
  border-left: 1px solid #333;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;

  ${Selector}:hover & {
    display: block;
  }
`

const Item = styled.div`
  padding: 10px;
`

interface Props {
  label: string;
  locales: Array<Locale>;
  onSelect: (locale: Locale) => void
}

const LanguageSelector: React.FC<Props> = ({ label, locales, onSelect }) => (
  <Selector>
    <SelectorLabel>{label}</SelectorLabel>
    <Items>
      {
        locales.map((locale) => (
          <Item key={locale.locale} onClick={() => onSelect(locale)}>
            {locale.label}
          </Item>
        ))
      }
    </Items>
  </Selector>
)

export default LanguageSelector
