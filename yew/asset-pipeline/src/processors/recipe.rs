use rkyv::to_bytes;
use std::collections::HashMap;
use std::error::Error;
use std::fs;
use std::path::PathBuf;
use walkdir::WalkDir;

use crate::pipeline::{PipelineOptions, PipelineTask, Processor};
use crate::utils::{locale::flag_for, markdown_parser::RecipeParser};
use nom_nom::models::i18n::LocalisedLink;
use nom_nom::models::index::Index;
use nom_nom::models::recipe::Recipe;

const SCRATCH_SPACE: usize = 1024;
const RECIPE_ROOT: &str = "data/recipes";
const INDEX_FILENAME: &str = "index";

type RecipeId = String;
type IndexLocale = String;

pub struct RecipeProcessor {
    paths: Vec<PathBuf>,
    recipes: HashMap<RecipeId, Vec<Recipe>>,
    indexes: HashMap<IndexLocale, Index>,
}

impl RecipeProcessor {
    pub fn new_with_path(path: PathBuf) -> Self {
        RecipeProcessor {
            paths: vec![path],
            recipes: HashMap::new(),
            indexes: HashMap::new(),
        }
    }
}

impl Processor for RecipeProcessor {
    fn parse(&mut self) -> Result<(), Box<dyn Error>> {
        for path in self
            .paths
            .iter()
            .flat_map(|path| WalkDir::new(path).into_iter())
            .filter_map(|e| e.ok())
            .filter(|e| !e.file_type().is_dir())
        {
            let contents = fs::read_to_string(path.path())?;
            let recipe = RecipeParser::default().parse(&contents)?;

            {
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

            let collection = self.recipes.entry(recipe.id.clone()).or_insert(vec![]);
            collection.push(recipe);
        }

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

        Ok(())
    }

    fn tasks(&self) -> Result<Vec<Box<dyn PipelineTask>>, Box<dyn Error>> {
        let mut tasks = vec![];

        for (_, recipes) in self.recipes.iter() {
            for recipe in recipes.iter() {
                tasks.push(recipe.into());
            }
        }

        for (_, index) in self.indexes.iter() {
            tasks.push(index.into());
        }

        Ok(tasks)
    }
}

pub struct RecipeTask(Recipe);

impl From<&Recipe> for Box<dyn PipelineTask> {
    fn from(recipe: &Recipe) -> Self {
        Box::new(RecipeTask(recipe.clone()))
    }
}

impl PipelineTask for RecipeTask {
    fn run(&self, options: &PipelineOptions) -> Result<(), Box<dyn Error>> {
        let recipe = &self.0;

        let output_dir = options.target_root.join(RECIPE_ROOT).join(&recipe.locale);

        if !output_dir.exists() {
            fs::create_dir_all(output_dir.clone())?;
        }

        let output_file = output_dir.join(&recipe.slug);

        let recipe_contents = to_bytes::<_, SCRATCH_SPACE>(recipe).unwrap();

        fs::write(output_file, recipe_contents)?;

        Ok(())
    }
}

pub struct IndexTask(Index);

impl From<&Index> for Box<dyn PipelineTask> {
    fn from(index: &Index) -> Self {
        Box::new(IndexTask(index.clone()))
    }
}

impl PipelineTask for IndexTask {
    fn run(&self, options: &PipelineOptions) -> Result<(), Box<dyn Error>> {
        let index = &self.0;

        let output_dir = options.target_root.join(RECIPE_ROOT).join(&index.locale);

        if !output_dir.exists() {
            fs::create_dir_all(output_dir.clone())?;
        }

        let output_file = output_dir.join(INDEX_FILENAME);

        let index_contents = to_bytes::<_, SCRATCH_SPACE>(index).unwrap();

        fs::write(output_file, index_contents)?;
        Ok(())
    }
}
