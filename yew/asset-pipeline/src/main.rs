use std::error::Error;
use std::path::PathBuf;

mod pipeline;
mod processors;
pub mod utils;

use pipeline::{Pipeline, PipelineOptions};

const RECIPE_ROOT: &str = "data/recipes";
const STATIC_OUTPUT_ROOT: &str = "static/";

// serialize markdown into binaries which can be imported by the frontend
fn target_root() -> PathBuf {
    let mut res = PathBuf::new();

    res.push(match std::env::var("TRUNK_STAGING_DIR") {
        Ok(val) => val,
        Err(_) => STATIC_OUTPUT_ROOT.to_string(),
    });

    res
}

fn main() -> Result<(), Box<dyn Error>> {
    let recipe_processor = {
        let mut recipe_path = PathBuf::new();
        recipe_path.push(RECIPE_ROOT);
        processors::RecipeProcessor::new_with_path(recipe_path)
    };

    let options = PipelineOptions::new(target_root());

    let mut pipeline = Pipeline::with_options(options);
    pipeline.add_processor(Box::new(recipe_processor));

    pipeline.run()?;

    Ok(())
}
