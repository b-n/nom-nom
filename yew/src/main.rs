use yew::prelude::*;

// Setup rust_i18n to use locales from locales/ folder
rust_i18n::i18n!("locales");

mod components;
mod pages;
mod utils;

use pages::Recipe;

use utils::recipe_parser::RecipeParser;

#[function_component]
fn App() -> Html {
    let md = include_str!("../data/recipes/en/chana_masala.md");

    let recipe = RecipeParser::default().parse(md).unwrap();

    html! {
        <Recipe recipe={recipe} />
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
