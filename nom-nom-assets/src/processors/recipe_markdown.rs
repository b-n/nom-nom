use asset_pipeline::{task, Processor, Task};
use rkyv::to_bytes;
use std::collections::HashMap;
use std::error::Error;
use std::fs;
use std::path::{Path, PathBuf};

use crate::utils::{locale::flag_for, markdown_parser::RecipeParser};
use nom_nom::models::i18n::LocalisedLink;
use nom_nom::models::index::Index;
use nom_nom::models::recipe::Recipe;

const SCRATCH_SPACE: usize = 1024;
const RECIPE_ROOT: &str = "data/recipes";
const INDEX_FILENAME: &str = "index";

type RecipeId = String;
type IndexLocale = String;

pub struct RecipeMarkdownProcessor {
    paths: Vec<PathBuf>,
    recipes: HashMap<RecipeId, Vec<Recipe>>,
    indexes: HashMap<IndexLocale, Index>,
}

impl RecipeMarkdownProcessor {
    pub fn new_with_path(path: PathBuf) -> Self {
        RecipeMarkdownProcessor {
            paths: vec![path],
            recipes: HashMap::new(),
            indexes: HashMap::new(),
        }
    }
}

impl RecipeMarkdownProcessor {
    fn parse_recipe_for_index(&mut self, recipe: &Recipe) {
        // For the index, we need a list of recipes by locale, but no child values are
        // needed
        let mut recipe = recipe.clone();
        recipe.ingredients.clear();
        recipe.steps.clear();

        let index = self.indexes.entry(recipe.locale.clone()).or_insert(Index {
            locale: recipe.locale.clone(),
            alternate_locales: vec![],
            recipes: vec![],
        });
        index.recipes.push(recipe);
    }
}

impl Processor for RecipeMarkdownProcessor {
    fn paths(&self) -> &Vec<PathBuf> {
        &self.paths
    }

    fn parse(&mut self, path: &Path) -> Result<(), Box<dyn Error>> {
        let contents = fs::read_to_string(path)?;
        let recipe = RecipeParser::default().parse(&contents)?;

        self.parse_recipe_for_index(&recipe);

        let collection = self.recipes.entry(recipe.id.clone()).or_insert(vec![]);
        collection.push(recipe);
        Ok(())
    }

    fn after_parse(&mut self) {
        // Each recipe could have many translations (thus why we group by id). For each of the
        // localised recipe, we need to create a link list, which we duplicate on each localised
        // version for localised linking.
        for values in self.recipes.values_mut() {
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

        // Same for indexes, however they all use the same list of links
        let index_links: Vec<LocalisedLink> = self
            .indexes
            .keys()
            .map(|l| LocalisedLink {
                locale: l.to_string(),
                label: flag_for(l),
                slug: "".to_string(),
            })
            .collect();

        for index in self.indexes.values_mut() {
            index.alternate_locales = index_links.clone();
        }
    }

    fn tasks(&self) -> Result<Vec<Task>, Box<dyn Error>> {
        let mut tasks: Vec<Task> = vec![];

        let mut recipe_root = PathBuf::new();
        recipe_root.push(RECIPE_ROOT);

        let image_options = task::ResizeOptions {
            height: 250,
            width: 433,
            keep_aspect_ratio: true,
        };

        for (_, recipes) in self.recipes.iter() {
            for recipe in recipes.iter() {
                let mut target = recipe_root.clone();
                target.push(&recipe.locale);
                target.push(&recipe.slug);

                let task = task::WriteBytes {
                    id: format!("{}-{}", &recipe.locale, &recipe.slug),
                    source: to_bytes::<_, SCRATCH_SPACE>(recipe)
                        .expect("Failed converting Recipe to bytes")
                        .to_vec(),
                    target,
                };

                tasks.push(task.into());

                let image_source = PathBuf::from(recipe.image.clone());
                let file_name = image_source
                    .file_name()
                    .expect("An image should have been specified");

                let task = task::ResizeImage {
                    source: image_source.clone(),
                    options: image_options.clone(),
                    target: PathBuf::from(file_name),
                };

                tasks.push(task.into());
            }
        }

        for (_, index) in self.indexes.iter() {
            let mut target = recipe_root.clone();
            target.push(&index.locale);
            target.push(INDEX_FILENAME);

            let task = task::WriteBytes {
                id: format!("{}-index", &index.locale),
                source: to_bytes::<_, SCRATCH_SPACE>(index)
                    .expect("Failed converting Index to bytes")
                    .to_vec(),
                target,
            };

            tasks.push(task.into());
        }

        Ok(tasks)
    }
}
