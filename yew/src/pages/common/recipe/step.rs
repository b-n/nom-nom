use stylist::yew::use_style;
use yew::{function_component, html, Children, Html, Properties};

use crate::components as c;

#[derive(PartialEq, Properties)]
pub struct StepProps {
    pub width: f64,
    pub children: Children,
}

#[function_component]
pub fn Step(props: &StepProps) -> Html {
    let style = use_style!(
        r#"
        padding: 12px;
        "#
    );

    let card_style = use_style!(
        r#"
        padding: 15px;
        "#
    );

    let width = props.width;
    html!(
        <div class={style} style={format!("width: {width}%")}>
            <c::Card class={card_style}>
                { for props.children.iter() }
            </c::Card>
        </div>
    )
}
