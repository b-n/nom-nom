import { Link, navigate } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Dish, Home } from 'styled-icons/boxicons-regular'

import Typography from '../../components/Typography'
import { useLocale, useLocales } from '../../components/withI18n'
import { Locale } from '../../interfaces/site'

import LanguageSelector from './LanguageSelector'

const NavBackground = styled.nav`
  display: flex;
  height: 60px;
  max-height: 60px;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0px 1px 5px black;
`

const NavIcon = styled(props => <Link {...props} />)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  margin-left: 16px;
  margin-right: 16px;
  flex: 0;
`

const NavTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  flex-grow: 1;
  width: 0px;

  > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const HomeIcon = styled(Home)`
  width: 32px;
  height: 32px;
`

const InspirationIcon = styled(Dish)`
  width: 32px;
  height: 32px;
`

interface Props {
  path: string;
  title: string;
}

const Navigation: React.FC<Props> = (props) => {
  const { title } = props
  const locale = useLocale()
  const locales = useLocales()

  const handleLanguageClick = ({ path }: Locale) => {
    const [_, __, ...currentPath] = props.path.split('/')
    const newPath = currentPath.join('/') || ''
    navigate(`/${path}/${newPath}`)
  }

  return (
    <NavBackground>
      <NavIcon to={`/${locale.path}`}>
        <HomeIcon />
      </NavIcon>
      <NavTitle>
        <Typography variant="title">{title}</Typography>
      </NavTitle>
      <LanguageSelector
        label={locale.label}
        locales={locales}
        onSelect={handleLanguageClick}
      />
      <NavIcon to={`/${locale.path}/inspiration`}>
        <InspirationIcon />
      </NavIcon>
    </NavBackground>
  )
}

export default Navigation
