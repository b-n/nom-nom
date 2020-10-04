import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Dish, Home } from 'styled-icons/boxicons-regular'

import { useLocale } from '../../components/withI18n'

const NavBackground = styled.nav`
  display: flex;
  justify-content: space-between;
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
  font-weight: bold;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  title: string;
}

const Navigation: React.FC<Props> = (props) => {
  const { title } = props
  const locale = useLocale()

  return (
    <NavBackground>
      <NavIcon to={`/${locale.path}`}>
        <HomeIcon />
      </NavIcon>
      <NavTitle>{title}</NavTitle>
      <NavIcon to={`/${locale.path}/inspiration`}>
        <InspirationIcon />
      </NavIcon>
    </NavBackground>
  )
}

export default Navigation
