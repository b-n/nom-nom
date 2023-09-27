use stylist::yew::use_style;
use yew::{classes, function_component, html, Callback, Classes, Html, MouseEvent, Properties};

#[derive(PartialEq, Clone)]
pub enum IconType {
    Home,
    Inspiration,
}

impl From<IconType> for Html {
    fn from(i: IconType) -> Html {
        match i {
            IconType::Home => html!(
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 00.707-1.707l-9-9a.999.999 0 00-1.414 0l-9 9A1 1 0 003 13zm7 7v-5h4v5h-4zm2-15.586l6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path>
                </svg>
            ),
            IconType::Inspiration => html!(
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15c0-4.625-3.507-8.441-8-8.941V4h-2v2.059c-4.493.5-8 4.316-8 8.941v2h18v-2zM5 15c0-3.859 3.141-7 7-7s7 3.141 7 7H5zm-3 3h20v2H2z"></path>
                </svg>
            ),
        }
    }
}

#[derive(Properties, PartialEq)]
pub struct Props {
    #[prop_or_default]
    pub class: Classes,
    pub icon: IconType,
    pub onclick: Callback<MouseEvent>,
}

#[function_component]
pub fn Icon(props: &Props) -> Html {
    let style = use_style!();

    html! {
        <div class={classes!(style, props.class.clone())} onclick={&props.onclick}>
            { props.icon.clone() }
        </div>
    }
}
