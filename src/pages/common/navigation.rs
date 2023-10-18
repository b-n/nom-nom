use stylist::yew::use_style;
use yew::{classes, function_component, html, virtual_dom::AttrValue, Callback, Html, Properties};
use yew_router::hooks::use_navigator;

use crate::components::{Icon, IconType, Typography, TypographyVariant};
use crate::hooks::use_locale;
use crate::Route;

use super::LocaleSelector;

#[derive(Properties, PartialEq)]
pub struct NavigationProps {
    pub title: AttrValue,
}

#[function_component]
pub fn Navigation(props: &NavigationProps) -> Html {
    let navigator = use_navigator().unwrap();
    let locale = use_locale().to_string();

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
        z-index: 1;

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
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        margin: 0 16px;
        width: 32px;
        height: 32px;
        "#
    );

    let home_icon = {
        let navigator = navigator.clone();
        let locale = locale.clone();
        let onclick = Callback::from(move |_| {
            navigator.push(&Route::Home {
                locale: locale.clone(),
            });
        });
        html!(<Icon onclick={onclick} icon={IconType::Home} class={icon_style.clone()} />)
    };

    let inspiration_icon = {
        let navigator = navigator.clone();
        let locale = locale.clone();
        let onclick = Callback::from(move |_| {
            navigator.push(&Route::Inspiration {
                locale: locale.clone(),
            });
        });
        html!(<Icon onclick={onclick} icon={IconType::Inspiration} class={icon_style.clone()} />)
    };

    html!(
        <nav class={style}>
            {home_icon}
            <Typography variant={TypographyVariant::SubTitle} class={classes!("title")}>
                <span>{ &props.title }</span>
            </Typography>
            <LocaleSelector />
            {inspiration_icon}
        </nav>
    )
}
