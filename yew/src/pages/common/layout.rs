use stylist::yew::use_style;
use yew::{function_component, html, virtual_dom::AttrValue, Children, Html, Properties};

use super::Navigation;
use crate::hooks::locale::{Locale, LocaleProvider};

#[derive(Properties, PartialEq)]
pub struct LayoutProps {
    pub locale: Locale,
    pub title: AttrValue,
    pub children: Children,
}

#[function_component]
pub fn Layout(props: &LayoutProps) -> Html {
    let style = use_style!(
        r#"
        padding-top: 60px;
        display: flex;
        justify-content: center;
        "#
    );

    html!(
        <LocaleProvider context={props.locale.clone()}>
            <section class={style}>{ for props.children.iter() }</section>
            <Navigation title={props.title.clone()} />
        </LocaleProvider>
    )
}
