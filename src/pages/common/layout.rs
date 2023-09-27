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
        display: flex;
        justify-content: center;
        "#
    );

    html!(
        <>
            <section class={style}>{ for props.children.iter() }</section>
            <Navigation title={&props.title} />
        </>
    )
}
