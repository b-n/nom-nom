use crate::utils::recipe_parser::{Recipe as ParsedRecipe, RecipeParser};
use yew::virtual_dom::AttrValue;

pub fn get_recipe(_recipe: AttrValue, _locale: AttrValue) -> ParsedRecipe {
    let md = include_str!("../../data/recipes/en/chana_masala.md");

    RecipeParser::default().parse(md).unwrap()
}
