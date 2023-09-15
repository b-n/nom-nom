use stylist::yew::use_style;
use yew::{function_component, html, virtual_dom::AttrValue, Html, Properties};
use yew_hooks::{use_async_with_options, UseAsyncOptions};

use super::common::{recipe, Layout};
use crate::services::recipe::get_recipes;

#[derive(PartialEq, Properties)]
pub struct PageProps {
    pub locale: AttrValue,
}

#[function_component]
pub fn Home(props: &PageProps) -> Html {
    rust_i18n::set_locale(&props.locale);

    let recipes = {
        let locale = props.locale.clone();
        use_async_with_options(
            async move { get_recipes(locale).await },
            UseAsyncOptions::enable_auto(),
        )
    };

    let style = use_style!(
        r#"
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(375px, 1fr));
        grid-gap: 1em;
        width: 100%;
        max-width: 2768px;
        padding: 1em;
        "#
    );

    let recipes = if let Some(recipes) = &recipes.data {
        recipes
            .iter()
            .enumerate()
            .map(|(index, recipe)| {
                html!(
                    <recipe::Card recipe={recipe.clone()} full={true} key={index}/>
                )
            })
            .collect()
    } else {
        vec![html!()]
    };

    html!(
        <Layout title="Nom nom. Om nom nom nom.">
            <div class={style}>
                { for recipes }
            </div>
        </Layout>
    )
}
