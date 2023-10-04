use rand::prelude::SliceRandom;
use rand::thread_rng;
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
use crate::services::asset::get_deserialized_index;

#[derive(PartialEq, Properties, Debug)]
pub struct PageProps {
    pub locale: AttrValue,
}

#[function_component]
pub fn Inspiration(props: &PageProps) -> Html {
    rust_i18n::set_locale(&props.locale);
    let locale_context = use_locale_context();

    let index_info = {
        let location = use_asset(&[&props.locale, "-index"].concat()).unwrap();
        use_async(async move { get_deserialized_index(&location).await })
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
        let mut rng = thread_rng();
        let mut recipes = index.recipes.clone();
        recipes.shuffle(&mut rng);

        let recipes = recipes.iter().enumerate().map(|(index, recipe)| {
            html!(
                <Card recipe={recipe.clone()} full={false} key={index}/>
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
