use stylist::yew::use_style;
use yew::{classes, function_component, html, virtual_dom::AttrValue, Html, Properties};

use crate::components::{Icon, IconType, Typography, TypographyVariant};

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
        align-items: center;
        height: 60px;
        max-height: 60px;
        background-color: white;
        position: fixed;
        top: 0;
        width: 100%;
        box-shadow: 0px 1px 5px black;

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

    let icon_style = use_style!(
        r#"
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        margin: 0 16px;
        width: 32px;
        height: 32px;
        "#
    );

    // useLocales
    let locales = vec![];

    html!(
        <nav class={style}>
            <Icon icon={IconType::Home} class={classes!(icon_style.clone())} />
            <Typography variant={TypographyVariant::SubTitle} class={classes!("title")}>
                <span>{ props.title.clone() }</span>
            </Typography>
            <LocaleSelector active="en" locales={locales} />
            <Icon icon={IconType::Inspiration} class={classes!(icon_style.clone())} />
        </nav>
    )
}
