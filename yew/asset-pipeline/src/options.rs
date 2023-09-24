use std::path::PathBuf;

const IMAGE_ROOT: &str = "images";

#[derive(Default)]
pub struct Options {
    pub target_root: PathBuf,
    pub dictionary_target_path: PathBuf,
    pub image_root: PathBuf,
}

impl Options {
    #[must_use]
    pub fn new(target_root: PathBuf) -> Self {
        let mut dictionary_target_path = PathBuf::new();
        dictionary_target_path.push("assets");

        let mut image_root = PathBuf::new();
        image_root.push(IMAGE_ROOT);

        Self {
            target_root,
            dictionary_target_path,
            image_root,
        }
    }
}
