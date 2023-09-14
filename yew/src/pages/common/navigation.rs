use stylist::yew::use_style;
use yew::{classes, function_component, html, virtual_dom::AttrValue, Html, Properties};

use crate::components::{Typography, TypographyVariant};

use super::LocaleSelector;

#[derive(Properties, PartialEq)]
pub struct NavigationProps {
    pub title: AttrValue,
}

#[function_component]
pub fn Navigation(props: &NavigationProps) -> Html {
    let style = use_style!(
        r#"
        display: flex;
        height: 60px;
        max-height: 60px;
        background-color: white;
        position: fixed;
        top: 0;
        width: 100%;
        box-shadow: 0px 1px 5px black;
        padding-left: 10px;
        padding-right: 10px;

        & .title {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            flex-grow: 1;
            width: 0px;
        }

        & .title > * {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        "#
    );

    let locales = vec![];

    html!(
        <nav class={style}>
            <Typography variant={TypographyVariant::SubTitle} class={classes!("title")}>
                { props.title.clone() }
            </Typography>
            <LocaleSelector active="en" locales={locales} />
        </nav>
    )
}

/*
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'
import { Dish, Home } from 'styled-icons/boxicons-regular'

import Typography from '../../components/Typography'

const NavIcon = styled(props => <Link {...props} />)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  margin-left: 16px;
  margin-right: 16px;
  flex: 0;
`

const HomeIcon = styled(Home)`
  width: 32px;
  height: 32px;
`

const InspirationIcon = styled(Dish)`
  width: 32px;
  height: 32px;
`

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
*/
