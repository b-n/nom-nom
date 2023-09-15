use rkyv::to_bytes;
use std::error::Error;
use std::fs;
use std::path::Path;
use walkdir::WalkDir;

use nom_nom::utils::recipe_parser::RecipeParser;

const SCRATCH_SPACE: usize = 1024;

// serialize markdown into binaries which can be imported by the frontend

fn main() -> Result<(), Box<dyn Error>> {
    let input_root = Path::new("data");
    let output_root = Path::new("static/data");

    if let Ok(()) = fs::remove_dir_all(output_root) {
        println!("Removed output directory");
    }

    for entry in WalkDir::new(input_root)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| !e.file_type().is_dir())
    {
        let contents = fs::read_to_string(entry.path())?;

        let path = entry.path().strip_prefix(input_root)?;

        let output_dir = output_root.join(path.parent().unwrap());

        if !output_dir.exists() {
            fs::create_dir_all(output_dir.clone())?;
        }

        let output_path = output_dir.join(entry.path().file_stem().unwrap());

        let parser = RecipeParser::default();
        match parser.parse(&contents) {
            Ok(recipe) => {
                let recipe = to_bytes::<_, SCRATCH_SPACE>(&recipe).unwrap();

                fs::write(output_path.clone(), recipe)?;
                println!("Writing {}", output_path.display());
            }
            Err(error) => println!("{error}"),
        };
    }

    Ok(())
}
