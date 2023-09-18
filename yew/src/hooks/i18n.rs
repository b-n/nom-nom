use std::rc::Rc;
use yew::{
    function_component, hook, html, use_context, use_reducer, virtual_dom::AttrValue, Children,
    ContextProvider, Html, Properties, Reducible, UseReducerHandle,
};

use crate::models::{i18n::LocalisedLink, index::Index, recipe::Recipe};

pub type Locale = AttrValue;

#[derive(Clone, PartialEq, Properties, Debug)]
pub struct LocaleConfig {
    pub active: AttrValue,
    pub alternatives: Vec<LocalisedLink>,
}

#[derive(Debug)]
pub enum LocaleConfigAction {
    Set { config: LocaleConfig },
}

impl Reducible for LocaleConfig {
    type Action = LocaleConfigAction;

    fn reduce(self: Rc<Self>, action: Self::Action) -> Rc<Self> {
        match action {
            LocaleConfigAction::Set { config } => config.into(),
        }
    }
}

impl From<&AttrValue> for LocaleConfig {
    fn from(locale: &AttrValue) -> Self {
        LocaleConfig {
            active: locale.clone(),
            alternatives: vec![],
        }
    }
}

impl From<&Index> for LocaleConfig {
    fn from(index: &Index) -> Self {
        LocaleConfig {
            active: AttrValue::from(index.locale.clone()),
            alternatives: index.alternate_locales.clone(),
        }
    }
}

impl From<&Recipe> for LocaleConfig {
    fn from(recipe: &Recipe) -> Self {
        LocaleConfig {
            active: AttrValue::from(recipe.locale.clone()),
            alternatives: recipe.alternate_locales.clone(),
        }
    }
}

type LocaleContext = UseReducerHandle<LocaleConfig>;

#[derive(PartialEq, Properties)]
pub struct LocaleProviderProps {
    pub default_locale: AttrValue,
    pub children: Children,
}

#[function_component]
pub fn LocaleProvider(props: &LocaleProviderProps) -> Html {
    let ctx = {
        let default_locale = props.default_locale.clone();
        use_reducer(|| LocaleConfig::from(&default_locale))
    };

    html!(
        <ContextProvider<LocaleContext> context={ctx}>
            { for props.children.clone() }
        </ContextProvider<LocaleContext>>
    )
}

#[hook]
pub fn use_locale_context() -> LocaleContext {
    use_context::<LocaleContext>().unwrap()
}

#[hook]
pub fn use_locale() -> Locale {
    use_context::<LocaleContext>().unwrap().active.clone()
}
