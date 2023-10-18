use stylist::yew::use_style;
use yew::{function_component, html, virtual_dom::AttrValue, Children, Html, Properties};

use super::Navigation;

#[derive(Properties, PartialEq, Debug)]
pub struct LayoutProps {
    pub title: AttrValue,
    pub children: Children,
}

#[function_component]
pub fn Layout(props: &LayoutProps) -> Html {
    let style = use_style!(
        r#"
        padding-top: 60px;
        display: grid;
        grid-template-columns: 1fr minmax(1px, max-content) 1fr;

        & > * {
            grid-column: 2;
        }
        "#
    );

    html!(
        <>
            <Navigation title={&props.title} />
            <section class={style}>{ for props.children.iter() }</section>
        </>
    )
}
