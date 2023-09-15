//use std::rc::Rc;
use yew::{hook, use_context, virtual_dom::AttrValue, ContextProvider};

pub type Locale = AttrValue;
pub type LocaleProvider = ContextProvider<Locale>;

#[hook]
pub fn use_locale() -> Locale {
    use_context::<Locale>().unwrap_or(Locale::from("en"))
}
