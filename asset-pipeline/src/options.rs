use std::path::{Path, PathBuf};

const IMAGE_ROOT: &str = "images";
const DEFAULT_CACHE_PATH: &str = ".cache/assets/";

/// Options for the Pipeline.
///
/// Requires a user provided `target_root`. `image_root` defaults to `images/`.
#[derive(Default)]
pub struct Options {
    pub target_root: PathBuf,
    pub image_root: PathBuf,
    pub use_cache: bool,
    pub cache_path: PathBuf,
}

impl Options {
    #[must_use]
    pub fn new(target_root: &Path) -> Self {
        let mut image_root = PathBuf::new();
        image_root.push(IMAGE_ROOT);

        let cache_path = PathBuf::from(DEFAULT_CACHE_PATH);

        Self {
            target_root: target_root.to_owned(),
            image_root,
            use_cache: true,
            cache_path,
        }
    }

    pub fn with_image_root(&mut self, image_root: &Path) {
        self.image_root = image_root.to_owned();
    }
}
