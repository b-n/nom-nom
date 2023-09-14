use yew::{function_component, html, virtual_dom::AttrValue, Html, Properties};

use crate::components::{Select, SelectItem};

#[derive(Properties, PartialEq)]
pub struct Locale {
    pub label: AttrValue,
    pub code: AttrValue,
}

#[derive(Properties, PartialEq)]
pub struct LocaleSelectorProps {
    pub active: AttrValue,
    pub locales: Vec<Locale>,
}

#[function_component]
pub fn LocaleSelector(props: &LocaleSelectorProps) -> Html {
    // TODO: make a useLocales hook to get all allowed locales
    let locales = vec![
        Locale {
            label: AttrValue::from("🇳🇿"),
            code: AttrValue::from("en"),
        },
        Locale {
            label: AttrValue::from("🇳🇱"),
            code: AttrValue::from("nl"),
        },
    ];

    let active_locale = locales
        .iter()
        .find(|locale| locale.code == props.active)
        .expect("Invalid locale")
        .clone();

    let locale_elems = locales
        .iter()
        .map(|locale| html!(<SelectItem>{locale.label.clone()}</SelectItem>));

    html!(
        <Select label={active_locale.label.clone()}>
            { for locale_elems }
        </Select>
    )
}
