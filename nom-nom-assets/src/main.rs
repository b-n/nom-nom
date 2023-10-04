use asset_pipeline::{AssetKey, AssetValue, Options, Pipeline};
use rkyv::{to_bytes, Archive, Serialize};
use std::collections::HashMap;
use std::error::Error;
use std::path::{Path, PathBuf};

mod processors;
pub mod utils;

const DEFAULT_OUTPUT_ROOT: &str = "dist/";
const RECIPE_ROOT: &str = "data/recipes";
const ASSETS_MAP_FILENAME: &str = "assets-dict";
const LR_IMAGES_MAP_FILENAME: &str = "low-res-images";
const ASSET_MAP_PATH: &str = ".cache/maps/";

#[derive(Archive, Serialize)]
pub struct Assets(HashMap<String, String>);

// serialize markdown into binaries which can be imported by the frontend
fn target_root() -> PathBuf {
    let mut res = PathBuf::new();

    res.push(match std::env::var("TRUNK_STAGING_DIR") {
        Ok(val) => val,
        Err(_) => DEFAULT_OUTPUT_ROOT.to_string(),
    });

    res
}

fn write_assets_map(map: HashMap<String, String>, path: &Path) -> Result<(), Box<dyn Error>> {
    let wrapped = Assets(map);
    let data = to_bytes::<Assets, 1024>(&wrapped)?;
    println!("Writing asset map to: {}", path.display());
    std::fs::write(path, &data)?;
    Ok(())
}

fn main() -> Result<(), Box<dyn Error>> {
    let recipe_processor = {
        let mut recipe_path = PathBuf::new();
        recipe_path.push(RECIPE_ROOT);
        processors::RecipeMarkdownProcessor::new_with_paths(&[recipe_path])
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
                    low_res_assets.insert(key[0..key.len() - 8].to_string(), value)
                } else {
                    asset_map.insert(key, value)
                };

                (asset_map, low_res_assets)
            },
        );

    // Write the serialized asset maps out so they can be included by the app
    let assets_path = PathBuf::from(ASSET_MAP_PATH);
    write_assets_map(asset_map, &assets_path.join(ASSETS_MAP_FILENAME))?;
    write_assets_map(low_res_assets, &assets_path.join(LR_IMAGES_MAP_FILENAME))?;

    Ok(())
}
