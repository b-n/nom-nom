use rust_i18n::t;
use stylist::yew::use_style;
use yew::{classes, function_component, html, Callback, Classes, Html, Properties};
use yew_router::hooks::use_navigator;

use crate::components as c;
use crate::hooks::use_locale;
use crate::models::recipe::Recipe;
use crate::Route;

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
    let navigator = use_navigator().unwrap();
    let locale = use_locale().to_string();

    let style = use_style!(
        r#"
        "#
    );

    let image_style = use_style!(
        r#"
        max-height: 300px;
        "#
    );

    let onclick = {
        let navigator = navigator.clone();
        let slug = props.recipe.slug.clone();
        let locale = locale.clone();
        Callback::from(move |_| {
            navigator.push(&Route::Recipe {
                locale: locale.clone(),
                recipe: slug.clone(),
            });
        })
    };

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
