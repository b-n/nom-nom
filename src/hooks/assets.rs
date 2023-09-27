use rkyv::{archived_root, Archive, Deserialize};
use std::collections::HashMap;
use yew::{
    function_component, hook, html, use_context, Children, ContextProvider, Html, Properties,
};

#[derive(PartialEq, Clone, Archive, Deserialize, Debug)]
pub struct AssetsContext(HashMap<String, String>);

impl AssetsContext {
    pub fn get(&self, key: &str) -> Option<String> {
        self.0.get(key).cloned()
    }
}

#[derive(PartialEq, Properties)]
pub struct AssetsProviderProps {
    pub children: Children,
}

#[function_component]
pub fn AssetsProvider(props: &AssetsProviderProps) -> Html {
    let assets_dictionary = include_bytes!("../../dist/assets-dict");

    let ctx: AssetsContext = unsafe {
        archived_root::<AssetsContext>(&assets_dictionary[0..])
            .deserialize(&mut rkyv::Infallible)
            .unwrap()
    };

    html!(
        <ContextProvider<AssetsContext> context={ctx}>
            { for props.children.clone() }
        </ContextProvider<AssetsContext>>
    )
}

#[hook]
pub fn use_assets() -> AssetsContext {
    use_context::<AssetsContext>().unwrap()
}

#[hook]
pub fn use_asset(key: &str) -> Option<String> {
    use_assets().get(key)
}

#[derive(PartialEq, Clone, Archive, Deserialize, Debug)]
pub struct LowResImageContext(HashMap<String, String>);

impl LowResImageContext {
    pub fn get(&self, key: &str) -> Option<String> {
        self.0.get(key).cloned()
    }
}

#[derive(PartialEq, Properties)]
pub struct LowResImageProviderProps {
    pub children: Children,
}

#[function_component]
pub fn LowResImageProvider(props: &LowResImageProviderProps) -> Html {
    let bytes = include_bytes!("../../dist/low-res-images");

    let ctx: LowResImageContext = unsafe {
        archived_root::<LowResImageContext>(&bytes[0..])
            .deserialize(&mut rkyv::Infallible)
            .unwrap()
    };

    web_sys::console::log_1(&format!("{ctx:?}").into());

    html!(
        <ContextProvider<LowResImageContext> context={ctx}>
            { for props.children.clone() }
        </ContextProvider<LowResImageContext>>
    )
}

#[hook]
pub fn use_low_res_image(key: &str) -> Option<String> {
    web_sys::console::log_1(&format!("{key:?}").into());
    use_context::<LowResImageContext>().unwrap().get(key)
}
