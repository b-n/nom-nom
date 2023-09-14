use stylist::yew::use_style;
use yew::{classes, function_component, html, Children, Classes, Html, Properties};

#[derive(Properties, PartialEq)]
pub struct CardProps {
    #[prop_or_default]
    pub class: Classes,
    pub children: Children,
}

#[function_component]
pub fn Card(props: &CardProps) -> Html {
    let style = use_style!(
        r#"
        border-radius: 5px;
        border: 3px solid black;
        box-shadow: 1px 1px 3px black;
        background-color: white;
        margin-bottom: 12px;

        display: flex;
        flex-direction: column;
        width: 100%;
        "#
    );

    html!(
        <div class={classes!(style, props.class.clone())}> { for props.children.iter() } </div>
    )
}
