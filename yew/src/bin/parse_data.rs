use rkyv::to_bytes;
use std::collections::HashMap;
use std::error::Error;
use std::fs;
use std::path::Path;
use walkdir::WalkDir;

use nom_nom::models::i18n::LocalisedLink;
use nom_nom::models::index::Index;
use nom_nom::models::recipe::Recipe;
use nom_nom::utils::recipe_parser::RecipeParser;

const SCRATCH_SPACE: usize = 1024;
const RECIPE_ROOT: &str = "data/recipes";
const RECIPE_OUT_ROOT: &str = "static/data/recipes";
const INDEX_FILENAME: &str = "index";

// serialize markdown into binaries which can be imported by the frontend

fn extract_recipes(path: &std::path::Path) -> Result<Vec<Recipe>, Box<dyn Error>> {
    let mut recipes = vec![];

    for entry in WalkDir::new(path)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| !e.file_type().is_dir())
    {
        let contents = fs::read_to_string(entry.path())?;

        let parser = RecipeParser::default();

        let recipe = parser.parse(&contents)?;

        recipes.push(recipe)
    }

    Ok(recipes)
}

fn flag_for(flag: &str) -> String {
    match flag {
        "nl" => "🇳🇱",
        "en" => "🇳🇿",
        _ => "🏴",
    }
    .to_string()
}

fn main() -> Result<(), Box<dyn Error>> {
    //let output_root = Path::new("static/data");

    // Get all the recipes from the data/recipes folder and:
    // - Collate by recipe id
    // - use the collated values to populate the available_locales
    // - create a new sort by locale for index
    // - serialize all the things
    println!("Parsing recipe information");

    let recipes = extract_recipes(Path::new(RECIPE_ROOT))?;

    let mut by_recipe = recipes.iter().fold(HashMap::new(), |mut acc, r| {
        let recipes = acc.entry(&r.id).or_insert(vec![]);
        recipes.push(r.clone());
        acc
    });

    for (_, values) in by_recipe.iter_mut() {
        let locales: Vec<LocalisedLink> = values
            .iter()
            .map(|r| LocalisedLink {
                locale: r.locale.clone(),
                label: flag_for(&r.locale),
                slug: r.slug.clone(),
            })
            .collect();

        for recipe in values.iter_mut() {
            recipe.alternate_locales.extend(locales.clone());
        }
    }

    let by_locale = by_recipe.values().fold(HashMap::new(), |mut acc, recipes| {
        for recipe in recipes {
            let locale = acc.entry(&recipe.locale).or_insert(vec![]);
            locale.push(recipe.clone());
        }
        acc
    });

    let output_dir = Path::new(RECIPE_OUT_ROOT);

    if let Ok(()) = fs::remove_dir_all(output_dir) {
        println!("Cleaned output directory");
    }

    let index_links: Vec<LocalisedLink> = by_locale
        .keys()
        .map(|l| LocalisedLink {
            locale: l.to_string(),
            label: flag_for(l),
            slug: "".to_string(),
        })
        .collect();

    println!("Writing indexes");
    for (locale, mut recipes) in by_locale {
        // lighten the recipe model since we don't need this extra information for index
        for recipe in recipes.iter_mut() {
            recipe.ingredients.clear();
            recipe.steps.clear();
        }

        let index = Index {
            locale: locale.clone(),
            alternate_locales: index_links.clone(),
            recipes: recipes.clone(),
        };

        let output_dir = output_dir.join(locale);

        if !output_dir.exists() {
            fs::create_dir_all(output_dir.clone())?;
        }

        let output_file = output_dir.join(INDEX_FILENAME);

        let index_contents = to_bytes::<_, SCRATCH_SPACE>(&index).unwrap();

        fs::write(&output_file, index_contents)?;
        println!("Writing {}", output_file.display());
    }

    println!("Writing recipe pages");
    for (_, recipes) in by_recipe {
        for recipe in recipes {
            let output_file = output_dir.join(&recipe.locale).join(&recipe.slug);

            let recipe_contents = to_bytes::<_, SCRATCH_SPACE>(&recipe).unwrap();

            fs::write(&output_file, recipe_contents)?;
            println!("Writing {}", output_file.display());
        }
    }

    Ok(())
}
