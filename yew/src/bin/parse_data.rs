use std::error::Error;
use std::fs;

use nom_nom::utils::recipe_parser::RecipeParser;

fn main() -> Result<(), Box<dyn Error>> {
    let file = fs::read_to_string("data/recipes/en/test.md")?;

    println!("{file}");

    let parser = RecipeParser::default();

    match parser.parse(&file) {
        Ok(recipe) => println!("{recipe}"),
        Err(error) => println!("{error}"),
    };

    Ok(())
}
