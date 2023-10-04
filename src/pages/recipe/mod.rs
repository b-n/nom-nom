use yew::{
    function_component, html, use_effect_with_deps, virtual_dom::AttrValue, Html, Properties,
};
use yew_hooks::use_async;

mod container;
mod page;
mod step;

use super::common::Layout;
use crate::hooks::{
    assets::use_asset,
    i18n::{use_locale_context, LocaleConfig, LocaleConfigAction},
};
use crate::services::asset::get_deserialized_recipe;
use container::Container;

#[derive(PartialEq, Properties, Debug)]
pub struct PageProps {
    pub locale: AttrValue,
    pub recipe: AttrValue,
}

#[function_component]
pub fn Recipe(props: &PageProps) -> Html {
    rust_i18n::set_locale(&props.locale);
    let locale_context = use_locale_context();

    let recipe_info = {
        let location = use_asset(&[&props.locale, "-", &props.recipe].concat()).unwrap();
        use_async(async move { get_deserialized_recipe(&location).await })
    };

    // Initiate get
    {
        let recipe_info = recipe_info.clone();
        use_effect_with_deps(
            move |_| {
                recipe_info.run();
            },
            props.locale.clone(),
        );
    }

    let (title, content) = if let Some(recipe) = &recipe_info.data {
        locale_context.dispatch(LocaleConfigAction::Set {
            config: LocaleConfig::from(recipe),
        });

        (
            recipe.name.clone(),
            html!(<Container recipe={recipe.clone()} key={recipe.locale.clone()}/>),
        )
    } else {
        ("...".to_string(), html!({ "Loading" }))
    };

    html!(
        <Layout title={title}>
            {content}
        </Layout>
    )
}
