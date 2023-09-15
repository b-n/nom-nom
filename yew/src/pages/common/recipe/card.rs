use rust_i18n::t;
use stylist::yew::use_style;
use yew::{classes, function_component, html, Callback, Classes, Html, Properties};

use crate::components as c;

use crate::utils::recipe_parser::Recipe;

#[derive(Properties, PartialEq)]
pub struct CardProps {
    #[prop_or_default]
    pub class: Classes,
    pub recipe: Recipe,
    #[prop_or_default]
    pub full: bool,
}

#[function_component]
pub fn Card(props: &CardProps) -> Html {
    let style = use_style!(
        r#"
        "#
    );

    let image_style = use_style!(
        r#"
        max-height: 300px;
        "#
    );

    let onclick = { Callback::from(move |_| {}) };

    html!(
        <c::Card class={classes!(style, props.class.clone())}>
            <c::CardImage src={props.recipe.image.clone()} class={image_style} />
            if props.full {
                <c::Typography variant={c::TypographyVariant::SubTitle}>{props.recipe.name.clone()}</c::Typography>
                <c::CardActions>
                    <c::Button variant={c::ButtonVariant::Text} onclick={onclick}> { t!("view") }</c::Button>
                </c::CardActions>
            }
        </c::Card>
    )
}
