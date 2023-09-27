use asset_pipeline::AssetMap;
use rkyv::{to_bytes, Archive, Serialize};
use std::collections::HashMap;
use std::error::Error;
use std::path::PathBuf;

mod processors;
pub mod utils;

use asset_pipeline::{Options, Pipeline};

const RECIPE_ROOT: &str = "data/recipes";
const STATIC_OUTPUT_ROOT: &str = "static/";
const ASSETS_PATH: &str = "assets-dict";

#[derive(Archive, Serialize)]
pub struct Assets(HashMap<String, String>);

impl From<AssetMap> for Assets {
    fn from(dict: AssetMap) -> Self {
        Assets(dict.iter().map(|(k, v)| (k.into(), v.into())).collect())
    }
}

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
        processors::RecipeMarkdownProcessor::new_with_path(recipe_path)
    };

    let target = target_root();

    let options = Options::new(&target);

    let mut pipeline = Pipeline::with_options(options);
    pipeline.add_processor(recipe_processor);

    let assets = pipeline.run()?;
    let assets_binary = to_bytes::<Assets, 1024>(&assets.into())?;
    let assets_file = target.join(ASSETS_PATH);
    std::fs::write(assets_file, &assets_binary)?;

    Ok(())
}
