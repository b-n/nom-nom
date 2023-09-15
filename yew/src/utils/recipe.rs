use crate::models::recipe::Recipe;
use crate::utils::recipe_parser::RecipeParser;
use yew::virtual_dom::AttrValue;

pub fn get_recipe(_recipe: AttrValue, _locale: AttrValue) -> Recipe {
    let md = include_str!("../../data/recipes/en/chana_masala.md");

    RecipeParser::default().parse(md).unwrap()
}
