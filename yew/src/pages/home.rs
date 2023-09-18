use stylist::yew::use_style;
use yew::{
    function_component, html, use_effect_with_deps, virtual_dom::AttrValue, Html, Properties,
};
use yew_hooks::{use_async_with_options, UseAsyncOptions};

use super::common::{recipe, Layout};
use crate::hooks::i18n::{use_locale_context, LocaleConfig, LocaleConfigAction};
use crate::services::index::get_index;

#[derive(PartialEq, Properties, Debug)]
pub struct PageProps {
    pub locale: AttrValue,
}

#[function_component]
pub fn Home(props: &PageProps) -> Html {
    rust_i18n::set_locale(&props.locale);
    web_sys::console::log_1(&format!("{:?}", props.locale).into());
    let locale_context = use_locale_context();

    let data = {
        let locale = props.locale.clone();
        use_async_with_options(
            async move {
                web_sys::console::log_1(&"getting content".to_string().into());
                get_index(locale).await
            },
            UseAsyncOptions::enable_auto(),
        )
    };

    {
        let locale = props.locale.clone();
        let data = data.clone();
        use_effect_with_deps(
            move |_| {
                data.run();
            },
            locale,
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

    let content = if let Some(index) = &data.data {
        let recipes = index.recipes.iter().enumerate().map(|(index, recipe)| {
            html!(
                <recipe::Card recipe={recipe.clone()} full={true} key={index}/>
            )
        });

        web_sys::console::log_1(&format!("{:?}", LocaleConfig::from(index)).into());

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
