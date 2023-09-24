use stylist::yew::use_style;
use yew::{
    function_component, html, use_effect_with_deps, virtual_dom::AttrValue, Html, Properties,
};
use yew_hooks::use_async;

use super::common::{Card, Layout};
use crate::hooks::{
    assets::use_asset,
    i18n::{use_locale_context, LocaleConfig, LocaleConfigAction},
};
use crate::services::asset::get_index;

#[derive(PartialEq, Properties, Debug)]
pub struct PageProps {
    pub locale: AttrValue,
}

#[function_component]
pub fn Home(props: &PageProps) -> Html {
    rust_i18n::set_locale(&props.locale);
    let locale_context = use_locale_context();

    let index_name = format!("{}-index", props.locale.clone());
    let index_location = use_asset(&index_name);

    let index_info = {
        let location = index_location.clone();
        use_async(async move { get_index(location.unwrap()).await })
    };

    {
        // Re-fetch if the locale changes
        let index_info = index_info.clone();
        use_effect_with_deps(
            move |_| {
                index_info.run();
            },
            props.locale.clone(),
        );
    }

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

    let content = if let Some(index) = &index_info.data {
        let recipes = index.recipes.iter().enumerate().map(|(index, recipe)| {
            html!(
                <Card recipe={recipe.clone()} full={true} key={index}/>
            )
        });

        locale_context.dispatch(LocaleConfigAction::Set {
            config: LocaleConfig::from(index),
        });

        html!(
            <div class={style}>
                { for recipes }
            </div>
        )
    } else {
        html!(
            <div>{ "Loading" }</div>
        )
    };

    html!(
        <Layout title="Nom nom. Om nom nom nom.">
            {content}
        </Layout>
    )
}
