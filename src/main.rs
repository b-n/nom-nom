use yew::prelude::*;
use yew_router::prelude::*;

// Setup rust_i18n to use locales from locales/ folder
rust_i18n::i18n!("locales");

#[derive(Clone, Routable, PartialEq)]
pub enum Route {
    #[at("/")]
    Base,
    #[at("/:locale/")]
    Home { locale: String },
    #[at("/:locale/inspiration")]
    Inspiration { locale: String },
    #[at("/:locale/:recipe")]
    Recipe { locale: String, recipe: String },
}

mod components;
mod hooks;
mod models;
mod pages;
mod services;
mod utils;

use hooks::{AssetsProvider, LocaleProvider, LowResImageProvider};
use pages::{Home, Inspiration, Recipe};

fn switch(routes: Route) -> Html {
    match routes {
        Route::Base => html!(<Home locale={AttrValue::from("en")} />),
        Route::Home { locale } => html!(<Home locale={AttrValue::from(locale)} />),
        Route::Inspiration { locale } => html!(<Inspiration locale={AttrValue::from(locale)} />),
        Route::Recipe { locale, recipe } => html!(<Recipe locale={locale} recipe={recipe} />),
    }
}

#[function_component]
fn App() -> Html {
    html! {
        <LowResImageProvider>
            <AssetsProvider>
                <LocaleProvider default_locale={AttrValue::from("en")}>
                    <BrowserRouter>
                        <Switch<Route> render={switch} />
                    </BrowserRouter>
                </LocaleProvider>
            </AssetsProvider>
        </LowResImageProvider>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}