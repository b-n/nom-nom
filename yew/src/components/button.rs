use stylist::yew::use_style;
use yew::{function_component, html, Callback, Children, Html, MouseEvent, Properties};

#[allow(dead_code)]
#[derive(PartialEq)]
pub enum ButtonVariant {
    Contained,
    Text,
}

#[derive(Properties, PartialEq)]
pub struct ButtonProps {
    pub onclick: Callback<MouseEvent>,
    pub children: Children,
    pub variant: Option<ButtonVariant>,
}

#[function_component]
pub fn Button(props: &ButtonProps) -> Html {
    let contained_style = use_style!(
        r#"
            border: 3px solid black;
            border-radius: 5px;
            background-color: blue;
            padding: 8px 15px;
            color: white;

            &:focus {
                outline: none;
            }
            "#
    );
    let text_style = use_style!(
        r#"
            border: none;
            background-color: transparent;
            padding: 8px 15px;
            color: blue;

            &:hover {
                background-color: grey;
            }

            &:focus {
                outline: none;
                background-color: blue;
                color: white;
            }

            "#
    );

    let style = match props.variant {
        Some(ButtonVariant::Text) => text_style,
        _ => contained_style,
    };

    html!(
    <button onclick={props.onclick.clone()} class={style}>
        { for props.children.iter() }
    </button>
    )
}
