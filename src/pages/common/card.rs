use rust_i18n::t;
use stylist::yew::use_style;
use yew::{function_component, html, virtual_dom::AttrValue, Callback, Classes, Html, Properties};
use yew_router::hooks::use_navigator;

use crate::components as c;
use crate::hooks::{use_asset, use_locale, use_low_res_image};
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

    let low_res_image = use_low_res_image(&props.recipe.image).map(AttrValue::from);
    let recipe_image_url = use_asset(&props.recipe.image);

    let content_style = use_style!(
        r#"
        padding: 0px 15px;
        "#
    );

    let image_style = use_style!(
        r#"
        max-height: 300px;
        "#
    );

    let button_style = use_style!(
        r#"
        font-size: 0.8rem;
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
        <c::Card class={props.class.clone()}>
            <c::CardImage src={recipe_image_url.unwrap()} low_res={low_res_image} class={image_style} onclick={&onclick}/>
            if props.full {
                <c::Typography variant={c::TypographyVariant::SubTitle} class={content_style}>{&props.recipe.name}</c::Typography>
                <c::CardActions class="">
                    <c::Button variant={c::ButtonVariant::Text} class={button_style} onclick={&onclick}> { t!("view") }</c::Button>
                </c::CardActions>
            }
        </c::Card>
    )
}
