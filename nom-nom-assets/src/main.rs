use asset_pipeline::{AssetKey, AssetValue, Options, Pipeline};
use rkyv::{to_bytes, Archive, Serialize};
use std::collections::HashMap;
use std::error::Error;
use std::path::{Path, PathBuf};

mod processors;
pub mod utils;

const RECIPE_ROOT: &str = "data/recipes";
const STATIC_OUTPUT_ROOT: &str = "static/";
const ASSETS_PATH: &str = "assets-dict";
const LOW_RES_IMAGES: &str = "low-res-assets";

#[derive(Archive, Serialize)]
pub struct Assets(HashMap<String, String>);

// serialize markdown into binaries which can be imported by the frontend
fn target_root() -> PathBuf {
    let mut res = PathBuf::new();

    res.push(match std::env::var("TRUNK_STAGING_DIR") {
        Ok(val) => val,
        Err(_) => STATIC_OUTPUT_ROOT.to_string(),
    });

    res
}

fn write_assets_map(map: HashMap<String, String>, path: &Path) -> Result<(), Box<dyn Error>> {
    let wrapped = Assets(map);
    let data = to_bytes::<Assets, 1024>(&wrapped)?;
    std::fs::write(path, &data)?;
    Ok(())
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
    pipeline.run()?;

    // Retrieve assets from pipeline, split by low-res assets
    let assets = pipeline.asset_map();

    let (asset_map, low_res_assets) = assets
        .iter()
        .map(|(k, v)| {
            (
                <&AssetKey as Into<String>>::into(k),
                <&AssetValue as Into<String>>::into(v),
            )
        })
        .fold(
            (HashMap::new(), HashMap::new()),
            |(mut asset_map, mut low_res_assets), (key, value)| {
                if key.ends_with("-low-res") {
                    low_res_assets.insert(key, value)
                } else {
                    asset_map.insert(key, value)
                };

                (asset_map, low_res_assets)
            },
        );

    write_assets_map(asset_map, &target.join(ASSETS_PATH))?;
    write_assets_map(low_res_assets, &target.join(LOW_RES_IMAGES))?;

    Ok(())
}
