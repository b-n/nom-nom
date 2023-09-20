use yew::{function_component, html, Callback, Html};
use yew_router::hooks::use_navigator;

use crate::components::{Select, SelectItem};
use crate::hooks::i18n::use_locale_context;
use crate::Route;

#[function_component]
pub fn LocaleSelector() -> Html {
    let locale_config = use_locale_context();
    let navigator = use_navigator().unwrap();

    let active_locale = locale_config.active.to_string();

    if let Some(active_locale) = locale_config
        .alternatives
        .iter()
        .find(|locale| locale.locale.clone() == active_locale)
    {
        let alternate_links = locale_config.alternatives.iter().map(|alternate| {
            let onclick = {
                let navigator = navigator.clone();
                let slug = alternate.slug.clone();
                let locale = alternate.locale.clone();
                Callback::from(move |_| {
                    navigator.replace(&Route::Recipe {
                        locale: locale.clone(),
                        recipe: slug.clone(),
                    })
                })
            };

            html!(<SelectItem onclick={onclick.clone()} selected={active_locale.locale == alternate.locale}>{alternate.label.clone()}</SelectItem>)
        });

        html!(
            if alternate_links.len() > 1 {
                <Select label={active_locale.label.clone()}>
                    { for alternate_links }
                </Select>
            } else {
                <div />
            }
        )
    } else {
        html!(
            <div />
        )
    }
}
